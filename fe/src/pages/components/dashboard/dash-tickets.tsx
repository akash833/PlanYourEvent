import { CALL_GET_API } from "@/api";
import { SetStateAction, useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const DashTickets = () => {
  const [selectedThirdOption, setSelectedFirOption]  =useState("yearly");
  const [yearlyIncomeData, setYearlyIncomeData] = useState([]);
  const [totalTicket, setTotalTicket] = useState<any>();

  const handleOptionThirdChange = (newOption: SetStateAction<string>) => {
    setSelectedFirOption(newOption);
    getIncomeDetailsYearly(newOption as string);
  };

  const getIncomeDetailsYearly = async (type: string) => {
    const { data } = await CALL_GET_API(
      "dashboard/getTicketDetails?type=" + type + "&opType=sale"
    );
    console.log(data);
    setYearlyIncomeData(data.data);
     const record = data.data;
    if (record) {
      const totalTicket = record.reduce(
        (total: any, obj: any) => total + obj.tickets,
        0
      );
      setTotalTicket(totalTicket);
    }
  };

  useEffect(() => {
    getIncomeDetailsYearly(selectedThirdOption);
  }, []);

  return (
    <div>
      <div className="flex p-8 pb-0 pt-5">
        <div>
          <p>Tickets {totalTicket}</p>
          <small className="income">income</small>
        </div>
        <select
          value={selectedThirdOption}
          onChange={(e) => handleOptionThirdChange(e.target.value)}
          className="incomeDrp"
          style={{ backgroundColor: "#24292E" }}
        >
          <option value="weekly">This Week</option>
          <option value="monthly">This Month</option>
          <option value="yearly">This Year</option>
        </select>
        {/* <small className="income">Monthly</small> */}
      </div>
      <div className="p-6">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={yearlyIncomeData}
            margin={{ left: 10, right: 10, top: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 0"
              vertical={false}
              horizontal={false}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              interval={0}
              tick={{
                fontSize:
                  selectedThirdOption === "yearly"
                    ? 8
                    : selectedThirdOption === "monthly"
                    ? 8
                    : 16,
              }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#000",
                        background: "white",
                        textAlign: "center",
                        padding: "3px",
                      }}
                    >
                      <span>
                        {selectedThirdOption === "yearly"
                          ? payload[0]?.payload.month
                          : payload[0]?.payload.day}
                      </span>
                      <br />
                      <span>Income: {payload[0]?.value}</span>
                    </p>
                  );
                }
                return null;
              }}
              wrapperStyle={{ width: 100 }}
            />
            <Area type="monotone" dataKey="tickets" fill="#13B497" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default DashTickets;
