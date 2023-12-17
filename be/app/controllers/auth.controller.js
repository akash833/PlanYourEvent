const { register, login, forgetPassword , verifyOtp, checkUserName } = require('../services/auth.service');
const { getToken } = require('../util')

exports.register = async (req, res, next) => {
    try {
        const { created } = await register(req.body)
        if (created) {
            res.send({ success: true, access_token: getToken(created) })
        } else {
            res.status(400).send({ message: "Invalid request" })
        }
    } catch (err) {
        res.status(400).send({ message: "Bad request" })
    }
}


exports.login = async (req, res, next) => {
    try {
        const user = await login(req.body)
        if (user) {
            res.status(200).send({ success: true, access_token: getToken(user) })
        } else {
            res.status(404).send({ message: "Invalid user" })
        }
    } catch (err) {
        res.status(400).send({ message: "Bad request" })
    }
}

exports.checkUserName = async(req, res) => {
    try {
        const user_name = await checkUserName(req.body)
        if(user_name){
            res.status(500).send({ message: "is exists already 😌"})
        }else{
            res.status(200).send({message: "😀"})
        }
    } catch (err) {
        
    }
}

exports.forgetPassword = async (req, res, next) => {
    try {
        const response = await forgetPassword(req.body)
        res.status(200).json({ Message: "OTP sent" });
    } catch (err) {
        res.status(500).json({ Message: "Failed to send" });
    }
};

exports.verifyOtp = async (req, res) => {
    try {
        let requestData = {
            email: req.body.email,
            password: req.body.password,
            otp: req.body.otp
        }

        await verifyOtp(requestData)

        res.status(200).json({ Message: "Password Changed" })

    } catch (err) {
        res.status(401).json({ Message: "Otp Invalid" })
    }
}