const express = require("express");
const User = require("../models/UserModel");
const bcryptjs = require("bcryptjs");
const authRouter = express.Router();

//! SIGN-UP ROUTE
authRouter.post("/api/signUp", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //validation the email if it already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User with same email already exists!" });
    }
    const hashedPassword = await bcryptjs.hash(password, 8);
    let user = new User({
      email,
      password: hashedPassword,
      name
    });
    user = await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//! SIGN-IN ROUTE
authRouter.post("/api/signIn", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "User with this email does not exist!" });
    }
    const isMatched = await bcryptjs.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({ msg: "Incorrect Password!" });
    }
    res.json(user._doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = authRouter;
