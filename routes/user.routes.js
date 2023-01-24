const express = require("express");
const bcrypt = require("bcryptjs");
const { signup, login } = require("../controllers/user.controller");

const app = express.Router();

app.post("/signup", async (req, res) => {
  let { email, password } = req.body;

  try {
    console.log(email, password);

    bcrypt.hash(password, 4, async (err, hash) => {
      let data = await signup({ email, password: hash });
      console.log(data);

      if (data.status == "Failed") {
        return res.status(500).json(data);
      }

      return res.status(201).send(data);
    });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({ message: error.message, status: "Failed" });
  }
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;

  try {
    let data = await login({ email, password });
    //console.log("data", data);
    if (data.status == "Failed") {
      return res.status(500).json(data);
    }
    return res.status(201).send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/logout", (req, res) => {
  return res.send({ message: "Logout successfuly" });
});

module.exports = app;
