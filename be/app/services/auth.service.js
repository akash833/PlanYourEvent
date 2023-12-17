const UserModel = require('../models/user.model');
const { decrypt, compare, sendForgetPasswordMail } = require('../util')

exports.register = async (user_body) => {
    const password = await decrypt(user_body.password);
    if(!user_body.location) {
      delete user_body.location;
    }
    const user = new UserModel({
        ...user_body,
        email: user_body.email.toLowerCase(),
        password
    });
    const created = await user.save()
    return { created }
}

exports.login = async ({ user_name, password }) => {
    const user = await UserModel.findOne({ $or: [{ email: user_name.toLowerCase() }, { user_name }] })
    if (user && (await compare(password, user.password)))
        return user;
    else return null;
}

exports.forgetPassword = async ({ email }) => {
    try {
        let { isSent, otp } = await sendForgetPasswordMail(email);
        if (isSent) {
            await UserModel.updateOne({ email: email }, { $set: { otp: otp } });
            return { Messege: "OTP send" };
        } else {
            throw new Error({ Messege: "Failed to send" })
        }
    } catch (err) {
        throw new Error({ Messege: "Failed to send" })
    }
};

exports.verifyOtp = async (data) => {
    try {
        const User = await UserModel.findOne({ email: data.email });
        const password = await decrypt(data.password);

        if (User.otp == data.otp) {
            await UserModel.updateOne({ email: User.email }, { $set: { password: password } });
            return ({ Message: "Password Changed" })
        } else {
            throw new Error({ Message: "Otp Invalid" })
        }

    } catch (err) {
        throw new Error({ Message: "failed" })
    }
}

exports.checkUserName = async (data) => {
    try {
        const user_name = await UserModel.findOne({ user_name: data.user_name });
        if (user_name) {
            return user_name;
        }
    } catch (err) {
    }
}