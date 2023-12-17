const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
require('../models/user.model');
const User = mongoose.model('user')

const authenticatingUser = async (req, res, next) => {
  const token = req.headers.accesstoken;

  if (!token) {
    return res.status(401).json({ message: 'Authorization token not found' });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    const userData = await User.findOne({ _id: decoded.id })

    if (!userData) {
      return res.status(401).json({ message: 'user not found' });
    }

    req.user = userData;

    next();

  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const verifyRegister = async (req, res, next) => {
  if (req.body.email && req.body.password) {
    let existing = await User.findOne({
      $or: [
        { email: req.body.email },
      ],
    });
    if (existing) {
      res.status(401).send({ msg: "User already exit" });
    } else next();
  } else {
    res.status(422).send({ msg: "Invalid data" });
  }
};

const checkEmailExists = async (req, res, next) => {
  if (req.body.email) {
    let existing = await User.findOne({ email: req.body.email });
    if (!existing) {
      res.status(401).send({ msg: "User does not exists" });
    } else next();
  } else {
    res.status(422).send({ msg: "Invalid data" });
  }
};

module.exports = { authenticatingUser, verifyRegister, checkEmailExists };