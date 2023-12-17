const express = require("express");
const router = express.Router();

const {
  createGroupMessage,
  getGroupMessagesById,
} = require("../controllers/groups_messages.controller");

router.post("/", createGroupMessage);
router.get("/messages", getGroupMessagesById);


module.exports = router;
