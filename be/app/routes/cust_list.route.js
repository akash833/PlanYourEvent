const express = require("express");
const router = express.Router();

const {
  getCustList,
  createCustList,
} = require("../controllers/cust_list.controller");

router.get("/get-cust-list", getCustList);
router.post("/create-cust-list", createCustList);

module.exports = router;
