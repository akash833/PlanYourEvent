const {
  createArrivedCust,
  getArrivedCust,
  
} = require("../services/customer.service");


exports.createArrivedCust = async (req, res) => {
  try {
    const custData = req.body;
    const savedEvent = await createArrivedCust(custData);
    res.status(201).json({ success: true, data: savedEvent });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error inserting data",
      error: error.message,
    });
  }
};

exports.getAllArrivedCust = async (req, res) => {
  let _id = req.body._id;
  let pageNum = req.body.pageNum;
  let pageLength = req.body.pageLength;
  try {
    const { getCustLength, getCust } = await getArrivedCust(
      _id,
      pageNum,
      pageLength
    );

    res.json({ data: getCust, total: getCustLength, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

