const db = require("../models");
const passport = require("passport");

const User = db.users;

const failed = (req, res) => res.send("You Failed to log in!");

const good = async (req, res) => {
  res.send(`Welcome mr ${req.user.displayName}!`);
};

const google = passport.authenticate("google", { scope: ["profile", "email"] });

const logout = (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
};

module.exports = { failed, good, google, logout };
