const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const expiresIn = "2h";
var nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const mongoose = require('mongoose');
const user = mongoose.model('user');
const { decrypt, compare } = require('../util')

exports.getToken = ({ id, email }) => {
    return jwt.sign({ id, email }, process.env.TOKEN_KEY, { expiresIn });;
}

exports.decrypt = async (input) => {
    return await bcrypt.hash(input, 10);
}

exports.compare = async (source, target) => {
    //return true;
    return await bcrypt.compare(source, target)
}

exports.sendForgetPasswordMail = async (email, subject) => {
    const userEmail = email;
    const otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
    });

    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    var mailOptions = {
        to: userEmail,
        subject: subject || "Send OTP for reset Password",
        text: otp,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { Message: "OTP send", isSent: true, otp: otp }
    } catch (err) {
        throw new Error("OTP not sent");
    }
};