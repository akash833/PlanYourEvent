import { CALL_GET_API } from "@/api";
import { SetStateAction, useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const BestSelling = () => {
  const [selectedFirOption, setSelectedFirOption] = useState("yearly");
  const [yearlyIncomeData, setYearlyIncomeData] = useState([]);
  const [bestSelling, setBestSelling] = useState<any>();
  const handleOptionFirChange = (newOption: SetStateAction<string>) => {
    setSelectedFirOption(newOption);
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
      const maxIncome = record.reduce(
        (max:any, obj:any) => Math.max(max, obj.income),
        -Infinity
      );
      const objectsWithMaxIncome = record.filter(
        (obj: any) => obj.income === maxIncome
      );
      setBestSelling(objectsWithMaxIncome[0]);
    }
    console.log(bestSelling)
  };

  useEffect(() => {
    getIncomeDetailsYearly(selectedFirOption);
  }, []);

  return (
    <div className="graph-right graph width-100 p-8">
      <div className="flex items-center justify-between">
        <p>Best Selling</p>
        <select
          value={selectedFirOption}
          onChange={(e) => handleOptionFirChange(e.target.value)}
          className="incomeDrp"
          style={{ backgroundColor: "#24292E" }}
        >
          <option value="weekly">This Week</option>
          <option value="monthly">This Month</option>
          <option value="yearly">This Year</option>
        </select>
        {/* <small className="fontSize-12">This Week</small> */}
      </div>
      <div className="day-div flex justify-between">
        <p className="text-white">{bestSelling?.name}</p>
        <p className="text-white">{bestSelling?.income}</p>
      </div>
      <div className="">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={yearlyIncomeData} margin={{}}>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              interval={0}
              tick={{
                fontSize:
                  selectedFirOption === "yearly"
                    ? 8
                    : selectedFirOption === "monthly"
                    ? 5
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
                        {selectedFirOption === "yearly"
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
            <Bar
              dataKey="income"
              fill="#13B497"
              barSize={
                selectedFirOption === "weekly"
                  ? 8
                  : selectedFirOption === "monthly"
                  ? 3
                  : 6
              }
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default BestSelling;
