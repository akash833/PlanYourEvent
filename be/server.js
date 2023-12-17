const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const app = require("./app/app");
const server = http.createServer(app);
const eventRoutes = require("./app/routes/event.route");
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    // origin: "https://app.popup.us.com"
    // origin: "http://localhost:3000"
    origin: process.env.API_URL
  }
});
const { create, getMessageById, createOffer, updateOffer } = require("./app/services/groups_messages.services");
const {
  getGroup,
  getUserGroups,
  setLastMessage
} = require("./app/services/chat_group.services");
const { addEventStaffData } = require("./app/services/event_staff.services");
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

const fs = require("fs");

app.get("/openChat", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

sockets = {};

process.on("uncaughtException", (error, source) => {
  console.log(error);
  console.log(source);
  // fs.writeSync(process.stderr.fd, error, source);
});

async function sendChatMessageToGroupMembers(eventName, groupId, senderId, message) {
  try {
    let group = await getGroup(groupId);

    for (const member of group.members) {
      var memberId = member.userId.toString();
      if (true|| memberId !== senderId) {
        var socket = sockets[memberId];
        if (socket && socket.id) {
          io.to(socket.id).emit(eventName, { group,  message });
        }
      }
    }
  } catch (error) {
    console.error("Error sending chat message:", error);
  }
}

io.on("connection", (socket) => {
  socket.on("userInfo", async (userId) => {
    sockets[userId] = socket;
    let groups = await getUserGroups(userId);
    socket.emit("groups", groups);
  });

  socket.on("chat message", async (msg) => {
    let created = await create(msg);
    let message = await getMessageById(created._id.toString());
    setLastMessage(msg.groupId, created._id.toString())
    await sendChatMessageToGroupMembers("chatMessage", msg.groupId, msg.senderId, message);
  });

  socket.on("send offer", async (msg) => {
    let created = await createOffer(msg);
    let message = await getMessageById(created._id.toString());
    setLastMessage(msg.groupId, created._id.toString())
    await sendChatMessageToGroupMembers("send offer", msg.groupId, msg.senderId, message);
  });

  socket.on("offer updated", async (msg) => {
    let update = await updateOffer(msg);
    let message = await getMessageById(update._id.toString());
    await addEventStaffData({
      eventId: message.eventId,
      staffId: msg.senderId,
      offer: message.offer,
    });
    await sendChatMessageToGroupMembers("offer updated", msg.groupId, msg.senderId, message);
  });

  socket.on("typingMsg", async(msg) => {
    await sendChatMessageToGroupMembers("typingMsg" , msg.groupId, msg.senderId, msg);
    // socket.emit()
  });

  socket.on("typing", async (msg) => {
    try {
      if (msg && msg.groupId && msg.senderId) {
        await sendChatMessageToGroupMembers("typing" , msg.groupId, msg.senderId, msg);

        // const buffer = Buffer.from("Hello, world!");
        // fs.writeFileSync("output.txt", buffer);

        // const userSocket = sockets[socket.id];
        // if (userSocket) {
        //   userSocket.isTyping = isTyping;
        //   socket.broadcast.emit("typing", {
        //     userId: socket.id,
        //     isTyping: isTyping,
        //   });
        // }
      }
    } catch (error) {
      console.error("Error handling typing event:", error);
    }
  });

 
});

// server listening
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
