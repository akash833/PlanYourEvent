const { getTransactions } = require("../services/transaction.services");

exports.getTransactions = async (req, res) => {
  try {
    const { transactions, totalTransactions, availableBalance } =
      await getTransactions(req.user._id, req.body.page, req.body.pageSize);
    res
      .status(200)
      .send({ data: transactions, total: totalTransactions, balance:availableBalance, success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
