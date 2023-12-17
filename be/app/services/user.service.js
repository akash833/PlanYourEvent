const UserModel = require("../models/user.model");
const newEmailUpdateModel = require("../models/new_email_update.model");
const { decrypt, compare, sendForgetPasswordMail } = require("../util");

exports.getUserById = async (_id) => {
  return await UserModel.findById(_id)
  
    .populate("service_category")
    .populate("location");
};


// exports.getEventsStaffUsers = async (type) => {
//   var query = { provider: true };
//   if(type) {
//    query.service_category =  { $elemMatch: { $eq: type } }
//   };
//   return await UserModel.find(    query,    { user_name: 1, bio: 1, image: 1, provider: 1 }    )
//     .populate("service_category")
//     .populate("location");
// };

exports.getEventsStaffUsers = async (type, page, pageSize) => {
  var query = { provider: true };
  const skip = (page - 1) * pageSize;
  if (type) {
    query.service_category = { $elemMatch: { $eq: type } };
  }
  const hireEvents = await UserModel.find(query, {
    user_name: 1,
    bio: 1,
    image: 1,
    provider: 1,
    
  })
    .populate("service_category")
    .populate("tags")
    .populate("location")
    .skip(skip)
    .limit(pageSize);
  const totalStaff = await UserModel.countDocuments(query, {
    user_name: 1,
    bio: 1,
    image: 1,
    provider: 1,
    
  });
  // const totalStaff = hireEvents.length;
  const totalPage = Math.ceil(totalStaff / pageSize);
  return { hireEvents, totalStaff, totalPage };
};

exports.updateContactImage = async (data) => {
  await UserModel.findByIdAndUpdate(data._id, {
    $set: {
      contact_number: data.contact_number,
      image: data.image,
    },
  });
  return { Message: "Data Updated" };
};

exports.updatePassword = async (data) => {
  const password = data.password;
  const user = await UserModel.findById(data.userId);
  if (user && (await compare(password, user.password))) {
    if (user) {
      const newPassword = await decrypt(data.newPassword);
      await UserModel.findByIdAndUpdate(data.userId, {
        $set: { password: newPassword },
      });
      return user;
    } else return null;
  } else return null;
};

exports.updateEmailPreferences = async (data) => {
  await UserModel.findByIdAndUpdate(data.userId, {
    $set: {
      preferences: data.preferences,
    },
  });
  return { Message: "Data Updated" };
};

exports.newEmailUpdate = async ({ newEmail, userId }) => {
  try {
    let { isSent, otp } = await sendForgetPasswordMail(
      newEmail,
      subject = "Send OTP for reset Email"
    );
    let requestData = {
      newEmail: newEmail,
      userId:userId,
      otp: otp,
    };
    if (isSent) {
      await newEmailUpdateModel.create(requestData);
      return { Messege: "OTP send" };
    } else {
      throw new Error({ Messege: "Failed to send" });
    }
  } catch (err) {
    throw new Error({ Messege: "Failed to send" });
  }
};

exports.newEmailVerifyOtp = async (data) => {
  try {
    const User = await newEmailUpdateModel.findOne({ userId: data.userId, newEmail: data.newEmail });

    if (User.otp === data.otp) {
      await UserModel.findByIdAndUpdate(User.userId, {
        $set: { email: data.newEmail },
      });
      return { Message: "Email Changed" };
    } else {
      throw new Error({ Message: "Otp Invalid" });
    }
  } catch (err) {
    throw new Error({ Message: "failed" });
  }
};
