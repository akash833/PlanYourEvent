const {
  getIncomeDetailsYearly,
  getIncomeDetailsMonthly,
  getIncomeDetailsWeekly,
  getLineChartDataYearly,
  getLineChartDataMonthly,
  getLineChartDataWeekly,
  getAreaChartDataYearly,
  getAreaChartDataMonthly,
  getAreaChartDataWeekly,
  getBarChartDataYearly,
  getBarChartDataMonthly,
  getBarChartDataWeekly,
  getWeeklyTicketsSales,
  getTicketDetails
} = require("../services/dashboard.services");
  
  exports.getIncomeDetailsYearly = async (req, res) => {
    try {
      const incomeData = await getIncomeDetailsYearly();
      res.json({ data: incomeData, status: "success" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  };

  exports.getIncomeDetailsMonthly = async (req, res) => {
    try {
      const incomeData = await getIncomeDetailsMonthly();
      res.json({ data: incomeData, status: "success" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  };

  exports.getIncomeDetailsWeekly = async (req, res) => {
    try {
      const incomeData = await getIncomeDetailsWeekly();
      res.json({ data: incomeData, status: "success" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.getLineChartDataYearly = async (req, res) => {
    try {
      const incomeData = await getLineChartDataYearly();
      res.json({ data: incomeData, status: "success" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  };

  exports.getLineChartDataMonthly = async (req, res) => {
    try {
      const incomeData = await getLineChartDataMonthly();
      res.json({ data: incomeData, status: "success" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  };

  exports.getLineChartDataWeekly = async (req, res) => {
    try {
      const incomeData = await getLineChartDataWeekly();
      res.json({ data: incomeData, status: "success" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  };

  exports.getAreaChartDataYearly = async (req, res) => {
    try {
      const incomeData = await getAreaChartDataYearly();
      res.json({ data: incomeData, status: "success" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  };

  exports.getAreaChartDataMonthly = async (req, res) => {
    try {
      const incomeData = await getAreaChartDataMonthly();
      res.json({ data: incomeData, status: "success" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  };

  exports.getAreaChartDataWeekly = async (req, res) => {
    try {
      const incomeData = await getAreaChartDataWeekly();
      res.json({ data: incomeData, status: "success" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  };

  exports.getBarChartDataYearly = async (req, res) => {
    try {
      const incomeData = await getBarChartDataYearly();
      res.json({ data: incomeData, status: "success" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  };

  exports.getBarChartDataMonthly = async (req, res) => {
    try {
      const incomeData = await getBarChartDataMonthly();
      res.json({ data: incomeData, status: "success" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  };

  exports.getBarChartDataWeekly = async (req, res) => {
    try {
      const incomeData = await getBarChartDataWeekly();
      res.json({ data: incomeData, status: "success" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.getWeeklyTicketsSales = async (req, res) => {
    try {
      const incomeData = await getWeeklyTicketsSales();
      res.json({ data: incomeData, status: "success" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  };

  exports.getTicketDetails = async (req, res) => {
    try {
      var query = req.query;
      const user = req.user;
      query.userId = user._id;
      
      const incomeData = await getTicketDetails(query);
      res.json({ data: incomeData, status: "success" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  };


  

  