const express = require("express");
const router = express.Router();

const {
  create,
  getUserGroups,
  getGroup
} = require("../controllers/chat_group.controller");

router.post("/", create);
router.get("/groups", getUserGroups);
router.get("/get-members", getGroup)

module.exports = router;
