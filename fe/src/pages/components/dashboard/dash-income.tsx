import { CALL_GET_API } from "@/api";
import { SetStateAction, useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

const DashIncome = () => {
  const [selectedSecOption, setSelectedSecOption] = useState("yearly");
  const [yearlyIncomeData, setYearlyIncomeData] = useState([]);
  const [totalIncome, setTotalIncome] = useState<any>();
  const handleOptionSecChange = (newOption: SetStateAction<string>) => {
    setSelectedSecOption(newOption);
    getIncomeDetailsYearly(newOption as string);
  };

  const getIncomeDetailsYearly = async (type: string) => {
    const { data } = await CALL_GET_API(
      "dashboard/getTicketDetails?type=" + type + "&opType=income"
    );
    console.log(data);
    setYearlyIncomeData(data.data);
    const record = data.data;
   if (record) {
    const totalIncome = record.reduce((total:any, obj:any) => total + obj.income, 0);
    setTotalIncome(totalIncome);
   }
  };

  useEffect(() => {
    getIncomeDetailsYearly(selectedSecOption);
  }, []);

  return (
    <div>
      <div className="flex p-8 pb-0 pt-5">
        <div>
          <p>${totalIncome}</p>
          <small className="income">income</small>
        </div>
        <select
          value={selectedSecOption}
          onChange={(e) => handleOptionSecChange(e.target.value)}
          className="incomeDrp"
          style={{ backgroundColor: "#24292E" }}
        >
          <option value="weekly">This Week</option>
          <option value="monthly">This Month</option>
          <option value="yearly">This Year</option>
        </select>
      </div>
      <div className="p-8">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={yearlyIncomeData}
            margin={{ left: 10, right: 10, top: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 0"
              horizontal={false}
              vertical={false}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              interval={0}
              tick={{
                fontSize:
                  selectedSecOption === "yearly"
                    ? 8
                    : selectedSecOption === "monthly"
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
                        {selectedSecOption === "yearly"
                          ? payload[0]?.payload.month
                          : payload[0]?.payload.day}
                      </span>{" "}
                      <br />
                      <span>Income: {payload[0]?.value}</span>
                    </p>
                  );
                }
                return null;
              }}
              wrapperStyle={{ width: 100 }}
            />
            <Line type="monotone" dataKey="income" stroke="#13B497" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default DashIncome;
