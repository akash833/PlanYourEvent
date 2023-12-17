require("dotenv").config();
require("./config/database").connect();

const fs = require("fs");
const path = require("path");

const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:4000",
    "https://app.popup.us.com",
    "http://app.popup.us.com",
  ],
};

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "images")));
// parse requests of content-type - application/json
app.use(express.json());
const { authenticatingUser } = require("./middleware/auth");

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

const modelDir = path.join(__dirname, "models");
fs.readdir(modelDir, (error, files) => {
  files.forEach((model) => {
    if (model.indexOf(".model.js") >= 0) {
      require(path.join(modelDir, model));
    }
  });
});

// Handling routes requestapp.use("/auth", require('./routes/auth.route'))
app.use("/auth", require("./routes/auth.route"));
app.use("/user", authenticatingUser, require("./routes/user.route"));
app.use("/util", require("./routes/util.route"));
app.use("/master_data", require("./routes/master_data.route"));
app.use("/events", authenticatingUser, require("./routes/event.route"));
app.use(
  "/chat_group",
  authenticatingUser,
  require("./routes/chat_group.route")
);
app.use("/group_messages", require("./routes/groups_messages.route"));
app.use(
  "/event-staff",
  authenticatingUser,
  require("./routes/event_staff.route")
);
app.use("/order", authenticatingUser, require("./routes/order.route"));
app.use("/public", require("./routes/public.route"));
app.use("/review", require("./routes/review.route"));
app.use("/notification", require("./routes/notification.route"));
app.use("/customer", require("./routes/cust_list.route"));
app.use("/schedule",authenticatingUser, require("./routes/schedule.route"));
app.use("/arrivedCustomer", require("./routes/customer.route"));
//app.use("/dashboard", authenticatingUser, require("./routes/dashboard.route"));
app.use("/dashboard", authenticatingUser, require("./routes/dashboard.route"));
app.use("/transaction", authenticatingUser, require("./routes/transaction.route"));




module.exports = app;
