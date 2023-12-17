const mongoose = require("mongoose");
const events = mongoose.model("events");
const orders = mongoose.model("orders");
const now = new Date();
const startOfWeek = new Date(now);
const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
const startOfYear = new Date(now.getFullYear(), 0, 1);
startOfWeek.setHours(0, 0, 0, 0);
startOfWeek.setDate(now.getDate() - now.getDay());
const endOfWeek = new Date(startOfWeek);
endOfWeek.setDate(startOfWeek.getDate() + 7);
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dateOfMonth = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
];

const YearlyIncomeData = [
  { month: "January", name: "Jan", income: 1000 },
  { month: "February", name: "Feb", income: 1500 },
  { month: "March", name: "Mar", income: 2000 },
  { month: "April", name: "Apr", income: 1200 },
  { month: "May", name: "May", income: 1000 },
  { month: "June", name: "Jun", income: 3000 },
  { month: "July", name: "Jul", income: 1500 },
  { month: "August", name: "Aug", income: 6000 },
  { month: "September", name: "Sep", income: 5000 },
  { month: "October", name: "Oct", income: 3000 },
  { month: "November", name: "Nov", income: 1000 },
  { month: "December", name: "Dec", income: 4000 },
];

const MonthlyIncomeData = [
  { day: 1, name: "1", income: 1000 },
  { day: 2, name: "2", income: 1500 },
  { day: 3, name: "3", income: 1200 },
  { day: 4, name: "4", income: 1500 },
  { day: 5, name: "5", income: 1500 },
  { day: 6, name: "6", income: 1500 },
  { day: 7, name: "7", income: 1400 },
  { day: 8, name: "8", income: 1500 },
  { day: 9, name: "9", income: 300 },
  { day: 10, name: "10", income: 1500 },
  { day: 11, name: "11", income: 1500 },
  { day: 12, name: "12", income: 1500 },
  { day: 13, name: "13", income: 1500 },
  { day: 14, name: "14", income: 600 },
  { day: 15, name: "15", income: 600 },
  { day: 16, name: "16", income: 400 },
  { day: 17, name: "17", income: 700 },
  { day: 18, name: "18", income: 800 },
  { day: 19, name: "19", income: 700 },
  { day: 20, name: "20", income: 900 },
  { day: 21, name: "21", income: 700 },
  { day: 22, name: "22", income: 300 },
  { day: 23, name: "23", income: 700 },
  { day: 24, name: "24", income: 800 },
  { day: 25, name: "25", income: 900 },
  { day: 26, name: "26", income: 1500 },
  { day: 27, name: "27", income: 1500 },
  { day: 28, name: "28", income: 1500 },
  { day: 29, name: "29", income: 1500 },
  { day: 30, name: "30", income: 1500 },
];

const weeklyIncomeData = [
  { day: "Sunday", name: "S", income: 500 },
  { day: "Monday", name: "M", income: 400 },
  { day: "Tuesday", name: "T", income: 200 },
  { day: "Wednesday", name: "W", income: 500 },
  { day: "Thursday", name: "T", income: 400 },
  { day: "Friday", name: "F", income: 100 },
  { day: "Saturday", name: "S", income: 300 },
];

const weeklyTicketsSales = [
  { day: "Monday", tickets: 0 },
  { day: "Tuesday", tickets: 14 },
  { day: "Wednesday", tickets: 18 },
  { day: "Thursday", tickets: 23 },
  { day: "Friday", tickets: 4 },
  { day: "Saturday", tickets: 23 },
  { day: "Sunday", tickets: 0 },
];

exports.getIncomeDetailsYearly = async () => {
  try {
    const data = YearlyIncomeData;
    return data;
  } catch (error) {
    throw new Error("Error getting data : " + error.message);
  }
};

exports.getIncomeDetailsMonthly = async () => {
  try {
    const data = MonthlyIncomeData;
    return data;
  } catch (error) {
    throw new Error("Error getting data : " + error.message);
  }
};

exports.getIncomeDetailsWeekly = async () => {
  try {
    const data = weeklyIncomeData;
    return data;
  } catch (error) {
    throw new Error("Error getting data : " + error.message);
  }
};

exports.getLineChartDataYearly = async () => {
  try {
    const data = YearlyIncomeData;
    return data;
  } catch (error) {
    throw new Error("Error getting data : " + error.message);
  }
};

exports.getLineChartDataMonthly = async () => {
  try {
    const data = MonthlyIncomeData;
    return data;
  } catch (error) {
    throw new Error("Error getting data : " + error.message);
  }
};

exports.getLineChartDataWeekly = async () => {
  try {
    const data = weeklyIncomeData;
    return data;
  } catch (error) {
    throw new Error("Error getting data : " + error.message);
  }
};

exports.getAreaChartDataYearly = async () => {
  try {
    const data = YearlyIncomeData;
    return data;
  } catch (error) {
    throw new Error("Error getting data : " + error.message);
  }
};

exports.getAreaChartDataMonthly = async () => {
  try {
    const data = MonthlyIncomeData;
    return data;
  } catch (error) {
    throw new Error("Error getting data : " + error.message);
  }
};

exports.getAreaChartDataWeekly = async () => {
  try {
    const data = weeklyIncomeData;
    return data;
  } catch (error) {
    throw new Error("Error getting data : " + error.message);
  }
};

exports.getBarChartDataYearly = async () => {
  try {
    const data = YearlyIncomeData;
    return data;
  } catch (error) {
    throw new Error("Error getting data : " + error.message);
  }
};

exports.getBarChartDataMonthly = async () => {
  try {
    const data = MonthlyIncomeData;
    return data;
  } catch (error) {
    throw new Error("Error getting data : " + error.message);
  }
};

exports.getBarChartDataWeekly = async () => {
  try {
    const data = weeklyIncomeData;
    return data;
  } catch (error) {
    throw new Error("Error getting data : " + error.message);
  }
};

exports.getWeeklyTicketsSales = async () => {
  try {
    const data = weeklyTicketsSales;
    return data;
  } catch (error) {
    throw new Error("Error getting data : " + error.message);
  }
};

exports.getTicketDetails = async (query) => {
  try {
    let startDate =
      query.type == "weekly"
        ? startOfWeek
        : query.type == "monthly"
        ? startOfMonth
        : startOfYear;
    let endDate = query.type == "weekly" ? endOfWeek : now;

    // user: query.userId
    let eventsByUser = await events.find({  });
    let eventIds = eventsByUser.map((res) => res._id);
    let orderData = await orders.find({
      eventId: { $in: eventIds },
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    orderData = orderData.map((o) => {
      var createdAt = o.createdAt;

      var day = daysOfWeek[createdAt.getDay()];
      var date = createdAt.getDate();
      var month = monthNames[createdAt.getMonth() + 1];

      return {
        ...o,
        day,
        date,
        month,
      };
    });

    let toReturn = [];
    if (query.type == "weekly") {
      for (var day of daysOfWeek) {
        let orderDetails = orderData.filter((o) => o.day == day);
        let ticketCount = 0;
        let income = 0;

        let obj = {
          day: day,
        };

        for (let j = 0; j < orderDetails.length; j++) {
          if (query.opType == "sale") {
            ticketCount = ticketCount + orderDetails[j]._doc.quantity;
          } else {
            income = income + orderDetails[j]._doc.totalAmount;
          }
        }

        if (query.opType == "sale") {
          obj.tickets = ticketCount;
        } else {
          obj.income = income;
          obj.name = day.substring(0,1)
        }
        toReturn.push(obj);
      }
    } else if (query.type == "monthly") {
      for (var date of dateOfMonth) {
        let orderDetails = orderData.filter((o) => o.date == date);
        let ticketCount = 0;
        let income = 0;

        let obj = {
          day: date,
        };

        for (let j = 0; j < orderDetails.length; j++) {
          if (query.opType == "sale") {
            ticketCount = ticketCount + orderDetails[j]._doc.quantity;
          } else {
            income = income + orderDetails[j]._doc.totalAmount;
          }
        }

        if (query.opType == "sale") {
          obj.tickets = ticketCount;
        } else {
          obj.income = income;
          obj.name = date.toString()
        }
        toReturn.push(obj);
      }
    } else {
      for (var month of monthNames) {
        let orderDetails = orderData.filter((o) => o.month == month);
        let ticketCount = 0;
        let income = 0;

        let obj = {
          month: month
        };

        for (let j = 0; j < orderDetails.length; j++) {
          if (query.opType == "sale") {
            ticketCount = ticketCount + orderDetails[j]._doc.quantity;
          } else {
            income = income + orderDetails[j]._doc.totalAmount;
          }
        }

        if (query.opType == "sale") {
          obj.tickets = ticketCount;
        } else {
          obj.income = income;
          obj.name = month.substring(0,3)
        }
        toReturn.push(obj);
      }
    }
    return toReturn;
  } catch (error) {
    throw new Error("Error getting data : " + error.message);
  }
};
