import Link from "next/link";
import { FaGripVertical } from "react-icons/fa";
import Layout from "./components/layout";
import { useEffect, useState } from "react";
import { CALL_GET_API } from "@/api";
import moment from "moment";
import BestSelling from "./components/dashboard/best-selling";
import DashIncome from "./components/dashboard/dash-income";
import DashTickets from "./components/dashboard/dash-tickets";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router = useRouter();
  const [latestSale, setLatestSale] = useState([]);

  const [weeklyIncomeData, setWeeklyIncomeData] = useState([]);
  const [weeklyTicketsData, setWeeklyTicketsData] = useState([]);

  const [todaysIncomeData, setTodaysIncomeData] = useState(null);
  const [percentageIncrease, setPercentageIncrease] = useState(0);
  const [todaysTicketData, setTodaysTicketsData] = useState(null);

  const [yesterdayIncomeData, setYesterdayIncomeData] = useState(null);
  const [yesterdayTicketData, setYesterdayTicketsData] = useState(null);

  const getLatestSale = async () => {
    const { success, data } = await CALL_GET_API("order/get-latest-sale");
    if (success) {
      debugger
      setLatestSale(data.data);
    }
  };

  const getIncomeDetailsWeekly = async (type: string) => {
    const { data } = await CALL_GET_API(
      "dashboard/getTicketDetails?type=" + type + "&opType=income"
    );

    console.log(
      data,
      weeklyIncomeData,
      weeklyTicketsData,
      yesterdayIncomeData,
      yesterdayTicketData
    );
    setWeeklyIncomeData(data.data);

    const length = data?.data?.length;
    if (length > 1) {
      setTodaysIncomeData(data.data[length - 1].income);
      setYesterdayIncomeData(data.data[length - 2].income);
      const today_sales = data.data[length - 1].income;
      const yesterday_sales = data.data[length - 2].income;
      console.log(today_sales);
      console.log(yesterday_sales);

      const percentage_increase = ((today_sales - yesterday_sales) / yesterday_sales) * 100;
      console.log(percentage_increase);
      setPercentageIncrease(percentage_increase);
    }
  };

  const getTicketsDetailsWeekly = async (type: string) => {
    const { data } = await CALL_GET_API(
      "dashboard/getTicketDetails?type=" + type + "&opType=sale"
    );

    console.log(data);
    setWeeklyTicketsData(data.data);

    const length = data?.data?.length;
    if (length > 1) {
      setTodaysTicketsData(data.data[length - 1].tickets);
      setYesterdayTicketsData(data.data[length - 1].tickets);
    }
  };

  const handleViewDetails = () => {
    router.push('./order-list')
  }



  useEffect(() => {
    getLatestSale();
    getIncomeDetailsWeekly('weekly');
    getTicketsDetailsWeekly('weekly');
  }, []);

  return (
    <Layout>
      <div>
        <div className="dashboard-btn">
          <button className="mr-3">
            <Link href="/newevent" className="border-none text-white">
              + New Event
            </Link>
          </button>
          <button>
            <Link href="/hire-event-staff" className="border-none text-white">
              Hire Event Staff
            </Link>
          </button>
        </div>
        <div className="flex-column mx-width flex justify-between gap-8 py-8">
          <div className="graph-left graph  width-100 p-8">
            <small className="text-white">Ticket Sold Today</small>
            <div className="flex justify-between py-3">
              <p className="text-2xl text-white">{todaysIncomeData}</p>
              <div>
                <p className="text-white">{todaysTicketData}</p>
                <small className="pt-7 text-white">pcs</small>
              </div>
              <div>
                <p>+{percentageIncrease}%</p>
                <small className="msg">than last day</small>
              </div>
            </div>
            <div className="my-3 rounded-xl bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="500"
                className="max-w-full"
                height="18"
                viewBox="0 0 822 23"
                fill="none"
              >
                <path
                  d="M241.854 -432.69L263.228 -420.835L-30.626 68.1104L-52 56.2555L241.854 -432.69Z"
                  fill="#13B497"
                  fillOpacity="0.4"
                />
                <path
                  d="M295.289 -403.053L316.663 -391.198L22.8091 97.7474L1.43506 85.8926L295.289 -403.053Z"
                  fill="#13B497"
                  fillOpacity="0.4"
                />
                <path
                  d="M348.724 -373.416L370.098 -361.561L76.2442 127.384L54.8701 115.53L348.724 -373.416Z"
                  fill="#13B497"
                  fillOpacity="0.4"
                />
                <path
                  d="M402.159 -343.779L423.533 -331.924L129.679 157.021L108.305 145.167L402.159 -343.779Z"
                  fill="#13B497"
                  fillOpacity="0.4"
                />
                <path
                  d="M455.594 -314.142L476.968 -302.287L183.114 186.659L161.74 174.804L455.594 -314.142Z"
                  fill="#13B497"
                  fillOpacity="0.4"
                />
                <path
                  d="M509.029 -284.505L530.403 -272.65L236.549 216.296L215.175 204.441L509.029 -284.505Z"
                  fill="#13B497"
                  fillOpacity="0.4"
                />
                <path
                  d="M562.464 -254.868L583.838 -243.013L289.985 245.933L268.611 234.078L562.464 -254.868Z"
                  fill="#13B497"
                  fillOpacity="0.4"
                />
                <path
                  d="M615.899 -225.231L637.273 -213.376L343.42 275.57L322.046 263.715L615.899 -225.231Z"
                  fill="#13B497"
                  fillOpacity="0.4"
                />
                <path
                  d="M669.334 -195.594L690.708 -183.739L396.855 305.207L375.481 293.352L669.334 -195.594Z"
                  fill="#13B497"
                  fillOpacity="0.4"
                />
                <path
                  d="M722.769 -165.957L744.143 -154.102L450.29 334.844L428.916 322.989L722.769 -165.957Z"
                  fill="#13B497"
                  fillOpacity="0.4"
                />
                <path
                  d="M776.205 -136.32L797.579 -124.465L503.725 364.481L482.351 352.626L776.205 -136.32Z"
                  fill="#13B497"
                  fillOpacity="0.4"
                />
                <path
                  d="M829.64 -106.682L851.014 -94.8277L557.16 394.118L535.786 382.263L829.64 -106.682Z"
                  fill="#13B497"
                  fillOpacity="0.4"
                />
                <path
                  d="M883.075 -77.0454L904.449 -65.1906L610.595 423.755L589.221 411.9L883.075 -77.0454Z"
                  fill="#13B497"
                  fillOpacity="0.4"
                />
                <path
                  d="M936.51 -47.4084L957.884 -35.5536L664.03 453.392L642.656 441.537L936.51 -47.4084Z"
                  fill="#13B497"
                  fillOpacity="0.4"
                />
                <path
                  d="M989.945 -17.7714L1011.32 -5.91656L717.465 483.029L696.091 471.174L989.945 -17.7714Z"
                  fill="#13B497"
                  fillOpacity="0.4"
                />
              </svg>
            </div>
            <p className="msg w-4/5 py-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad mini
            </p>
            <button
              className="mt-5 flex text-white view-detail"
              onClick={handleViewDetails}
            >
              <span className="view-detail2">View details</span>
              <img
                src={`${router.basePath}/assets/images/arrow.png`}
                className="imgArr"
              />
            </button>
          </div>
          <BestSelling />
        </div>
        <div className="flex-column mx-width flex justify-between gap-8">
          <div className="graph latest-sale width-100 p-8">
            <div className="flex justify-between py-6">
              <p className="text-white">Latest Sales</p>
              <span className="cursor-pointer">
                <FaGripVertical />
              </span>
            </div>
            {latestSale.length == 0 && (
              <div className="text-white flex justify-center mt-8">
                No sale has taken place yet
              </div>
            )}
            {latestSale?.map((ev: any) => {
              return (
                <div key={ev._id} className="flex py-5">
                  <div className="w-2/12">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      viewBox="0 0 110 104"
                      fill="none"
                      className="max-w-full"
                    >
                      <ellipse
                        cx="54.6"
                        cy="51.794"
                        rx="54.6"
                        ry="51.3275"
                        fill="#13B497"
                      />
                      <path
                        d="M50.1988 34.3903L26.3677 56.793C25.7911 57.3351 25.7911 58.214 26.3677 58.756L32.0231 64.0725C32.4341 64.4589 33.0478 64.5826 33.5912 64.3887C35.7607 63.6146 38.2214 64.1098 39.8601 65.6503C41.4987 67.1907 42.0255 69.504 41.2021 71.5434C40.9958 72.0542 41.1274 72.6312 41.5384 73.0175L47.1939 78.3341C47.7706 78.8761 48.7055 78.8761 49.2821 78.3341L73.1132 55.9313L50.1988 34.3903Z"
                        fill="white"
                      />
                      <path
                        d="M82.8322 44.8319L77.1767 39.5154C76.7657 39.129 76.1519 39.0052 75.6086 39.1992C73.4391 39.9733 70.9785 39.478 69.3398 37.9375C67.7012 36.3971 67.1744 34.0839 67.9978 32.0444C68.204 31.5337 68.0723 30.9567 67.6614 30.5703L62.0059 25.2538C61.4293 24.7118 60.4943 24.7118 59.9177 25.2538L52.287 32.4272L75.2015 53.9683L82.8322 46.7949C83.4088 46.2529 83.4088 45.374 82.8322 44.8319Z"
                        fill="white"
                      />
                    </svg>
                  </div>

                  <div className="name w-10/12">
                    <p>{ev.customerName}</p>
                    <div className="flex justify-between">
                      <small>{ev.eventId.eventTitle}</small>
                      <small>{moment(ev.createdAt).fromNow()}</small>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="graph-child width-100">
            <DashIncome />
            <DashTickets />

            {/* <div>
              <div className="flex p-8 pb-0 pt-5">
                <div>
                  <p>$456,623</p>
                  <small className="income">income</small>
                </div>
                <select
                  value={selectedFourOption}
                  onChange={(e) => handleOptionFourChange(e.target.value)}
                  className="incomeDrp"
                  style={{ backgroundColor: "#24292E" }}
                >
                  <option value="week">Week</option>
                  <option value="month">Month</option>
                  <option value="year">Year</option>
                </select>
              </div>
              <div className="p-8">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={
                      selectedFourOption === "week"
                        ? weeklyBarChartData
                        : selectedFourOption === "month"
                        ? monthlyBarChartData
                        : yearlyBarChartData
                    }
                    margin={{}}
                  >
                    <CartesianGrid
                      strokeDasharray="0 0"
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
                          selectedFourOption === "year"
                            ? 8
                            : selectedFourOption === "month"
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
                                {selectedFourOption === "year"
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
                    <Bar
                      dataKey="income"
                      fill="#13B497"
                      barSize={
                        selectedFourOption === "week"
                          ? 12
                          : selectedFourOption === "month"
                          ? 6
                          : 10
                      }
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
