var nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const mongoose = require('mongoose');
const user = mongoose.model('user');
const { decrypt, compare } = require('../util')

exports.forgetPassword = async (req, res) => {
  const userEmail = req.body.email;
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
    subject: "Send OTP for reset Password",
    text: otp,
  };

  try {
    await transporter.sendMail(mailOptions);
    await user.updateOne({email:userEmail}, {$set:{otp:otp}});
    res.status(200).json({ Messege: "OTP send" });

  } catch (err) {
    res.status(500).json({ Messege: "Failed To send" });
  }
};

exports.verifyOtp = async(req, res) => {
    try {
        const User = await user.findOne({email:req.body.email});
        const password = await decrypt(req.body.password);

        if(User.otp == req.body.otp){
            await user.updateOne({email:User.email}, {$set:{password:password}});
            res.status(200).json({Messege: "Password Changed 😀"})
        } else {
            res.status(401).json({Messege: "Otp Invalid"})
        }
        
    } catch (err) {
        res.status(500).json({Message: "failed"})
    }
}
