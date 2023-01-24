const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
dotenv.config();

const UserModel = require("../model/user.model");

async function signup({ email, password }) {
  let user = await UserModel.findOne({ email: email });
  if (user) {
    return { status: "Failed", message: "Please try with different email" };
  }
  user = await UserModel.create({
    email: email,
    password: password,
  });
  return "Signed up successfully";
}

async function login({ email, password }) {
  let user = await UserModel.findOne({ email });

  if (!user) {
    return { status: "Failed", message: "Invalid Credentials" };
  }

  const match = await bcrypt.compare(password, user.password);
  console.log(match);

  if (match) {
    const token = jwt.sign({ user }, "1234", { expiresIn: "1 hr" });
    const refreshtoken = jwt.sign({ user }, "refresh1234", {
      expiresIn: "7 days",
    });
    return {
      status: "Success",
      jwttoken: token,
      userid: user._id,
      refreshtoken: refreshtoken,
      email: user.email,
      message: "Login Successful",
    };
  } else {
    return { status: "Failed", message: "Invalid Credentials" };
  }
}

module.exports = { signup, login };
