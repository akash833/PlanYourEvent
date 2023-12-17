const {
  create,
  getGroupMessage,
} = require("../services/groups_messages.services");

exports.createGroupMessage = async (req, res) => {
  try {
    const created = await create(req.body);
    res.json({ data: created, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.getGroupMessagesById = async (req, res) => {
  try {
    const messages = await getGroupMessage(req.query.groupId);
    res.json({ messages, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};