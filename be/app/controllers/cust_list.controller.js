const { trace } = require("../routes/cust_list.route");
const {
  getCustList,
  createCustList,
} = require("../services/cust_list.service");

exports.getCustList = async (req, res) => {
  try {
    const customerList = await getCustList();
    res.status(200).send({ data: customerList, success: true });
  } catch (err) {
    res.status(400).send({ Message: err });
  }
};

exports.createCustList = async (req, res) => {
  try {
    const custListData = req.body;
    if (custListData) {
      const savedCustomerList = await createCustList(custListData);
      res.status(201).json({ success: true, data: savedCustomerList });
    } else {
      res.status(201).json({ success: true, message: "Please fill the data" });
      return;
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error inserting data",
      error: error.message,
    });
  }
};
