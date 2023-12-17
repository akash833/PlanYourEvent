const {
  getUserById,
  getEventsStaffUsers,
  updateContactImage,
  updatePassword,
  updateEmailPreferences,
  newEmailUpdate,
  newEmailVerifyOtp,
} = require("../services/user.service");

exports.getUserById = async (req, res) => {
  try {
    const userInfo = await getUserById(req.user._id);
    res.status(200).send({ data: userInfo, success: true });
  } catch (err) {
    res.status(400).send({ success: false, message: "User not found" });
  }
};

// exports.getEventsStaffUsers = async (req, res) => {
//   try {
//     const provider = await getEventsStaffUsers(req.query.type);
//     res.status(200).send({ data: provider, success: true });
//   } catch (err) {
//     res.status(400).send({ Messege: err });
//   }
// };

exports.getEventsStaffUsers = async (req, res) => {
  try {
    const page = parseInt(req.body.page);
    const pageSize = parseInt(req.body.pageSize);
    const { hireEvents, totalStaff, totalPage } = await getEventsStaffUsers(
      req.query.type,
      page,
      pageSize
    );
    res
      .status(200)
      .send({ data: hireEvents, totalStaff, totalPage, success: true });
  } catch (err) {
    res.status(400).send({ Messege: err });
  }
};

exports.updateContactImage = async (req, res) => {
  try {
    let requestData = {
      // _id: req.body._id,
      _id: req.user._id,
      contact_number: req.body.contact_number,
      image: req.body.image,
    };
    await updateContactImage(requestData);
    res.status(200).json({ Message: "Data Updated", success: true });
  } catch (err) {
    res.status(400).send({ Messege: err });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    let requestData = {
      userId: req.user._id,
      password: req.body.password,
      newPassword: req.body.newPassword,
    };

    const user = await updatePassword(requestData);
    if (user) {
      res.status(200).json({ Message: "Password  Updated", success: true });
    }else {
      res.status(500).send({success: false, Messege: "Please Enter Valid Old Password"})
    }
  } catch (error) {
    res.status(400).send({ Messege: error });
  }
};

exports.updateEmailPreferences = async (req, res) => {
  try {
    let requestData = {
      userId: req.user._id,
      preferences: req.body.preferences,
    };
    await updateEmailPreferences(requestData);
    res.status(200).json({ Message: "Data Updated" });
  } catch (err) {
    res.status(400).send({ Messege: err });
  }
};

exports.newEmailUpdate = async (req, res, next) => {
  let requestData = {
    userId: req.user._id,
    newEmail: req.body.newEmail,
  };
  try {
    const response = await newEmailUpdate(requestData);
    res.status(200).json({ Message: "OTP sent"});
  } catch (err) {
    res.status(500).json({ Message: "Failed to send" });
  }
};

exports.newEmailVerifyOtp = async (req, res) => {
  try {
    let requestData = {
      userId: req.user._id,
      newEmail: req.body.newEmail,
      otp: req.body.otp,
    };

    console.log(req.body)

    console.log(requestData)


    await newEmailVerifyOtp(requestData);

    res.status(200).json({ Message: "Email Changed" });
  } catch (err) {
    res.status(401).json({ Message: "Otp Invalid" });
  }
};