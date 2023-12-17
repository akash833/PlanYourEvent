const {
  createGroup,
  getUserGroups,
  getGroup
} = require("../services/chat_group.services");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    let group = req.body;
    group.members.push({ "userId" : req.user._id });
    const created = await createGroup(group);
    res.json({ data: created, status: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getUserGroups = async (req, res) => {
  try {
    const groups = await getUserGroups(req.query.userId);
    res.json({ groups, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getGroup = async (req, res) => {
  let query = req.query._id
  try {
    const members = await getGroup(query);
    res.status(200).send({ data: members, success: true });
  } catch (err) {
    res.status(400).send({ success: false, message: "User not found" });
  }
};
