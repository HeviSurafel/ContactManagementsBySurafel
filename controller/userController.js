const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//@des register user
//@route Post /api/user
//@access public
const registeruser = asyncHandler(async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  if (!username || !email || !password) {
    res.status(404);
    throw new Error("please fill all fileds");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("user already registered with the email");
  }
  const hashedpassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedpassword,
  });
  res.status(200).json({ message: `user ${username} successful created` });
});
//@des login user
//@route Post /api/user
//@access public
const loginuser = asyncHandler(async(req, res) => {
  const {username ,email, password } = req.body;
  if (!email || !password) {
    res.status(404);
    throw new Error("all filds are required");
  }
  const user = await User.findOne({email});
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.status(201).json(accessToken)
  } else {
    res.status(401);
    throw new Error("email or password not valid");
  }
});
//@des current user
//@route get /api/user
//@access private
const currentuser = asyncHandler(async (req, res) => {
  res.json(req.user)
});
module.exports = { registeruser, loginuser, currentuser };
