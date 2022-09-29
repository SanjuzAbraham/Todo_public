const db = require("../models");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

const User = db.users;

const addUser = async (req, res) => {
  const salt = genSaltSync(10);
  req.body.password = hashSync(req.body.password, salt);

  let data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  const alreadyExistUser = await User.findOne({
    where: { email: req.body.email },
  }).catch((err) => {
    console.log("Error: ", err);
  });

  if (alreadyExistUser && alreadyExistUser.flag === "email") {
    return res.json({ message: "User with email already exists " });
  }

  if (alreadyExistUser && alreadyExistUser.flag === "google") {
    const updateGoogleUser = await User.update(
      { password: req.body.password, flag: "email" },
      {
        where: {
          email: req.body.email,
        },
      }
    );
  } else {
    console.log(req.user);
    const user = await User.create(data);
    res.status(200).send(user);
    console.log(user);
  }
};

const getUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    return res.json({ message: "user with this email doesn't exist" });
  }
  if (req.body.password) {
    User.update({ flag: "email" }, { where: { email: req.body.email } });
  }
  if (user.flag === "email") {
    const result = compareSync(req.body.password, user.password);
    if (!result) {
      return res.json({
        message: "Invalid Email or Password",
      });
    }
  }
  const jsontoken = sign({ result: user }, "qwe1234", {
    expiresIn: "1h",
  });
  return res.json({
    message: "Login Successful",
    token: jsontoken,
  });
};

module.exports = { addUser, getUser };
