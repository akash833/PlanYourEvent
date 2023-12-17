const express = require("express");
const router = express.Router();

const {
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
  getIncomeDetailsYearly,
  getIncomeDetailsMonthly,
  getIncomeDetailsWeekly,
  getTicketDetails
} = require("../controllers/dashboard.controller");


router.get("/getIncomeDetailsYearly", getIncomeDetailsYearly);
router.get("/getIncomeDetailsMonthly", getIncomeDetailsMonthly);
router.get("/getIncomeDetailsWeekly", getIncomeDetailsWeekly);

router.get("/getLineChartDataYearly", getLineChartDataYearly);
router.get("/getLineChartDataMonthly", getLineChartDataMonthly);
router.get("/getLineChartDataWeekly", getLineChartDataWeekly);

router.get("/getAreaChartDataYearly", getAreaChartDataYearly);
router.get("/getAreaChartDataMonthly", getAreaChartDataMonthly);
router.get("/getAreaChartDataWeekly", getAreaChartDataWeekly);

router.get("/getBarChartDataYearly", getBarChartDataYearly);
router.get("/getBarChartDataMonthly", getBarChartDataMonthly);
router.get("/getBarChartDataWeekly", getBarChartDataWeekly);

router.get("/getWeeklyTicketsSales", getWeeklyTicketsSales);

router.get("/getTicketDetails",getTicketDetails)


module.exports = router;