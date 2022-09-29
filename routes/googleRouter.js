const passport = require("passport");
const { isLoggedIn } = require("../auth/isLoggedin");
const googleController = require("../controllers/googleController.js");
const userController = require("../controllers/userController");
const { checkToken } = require("../auth/tokenValidation.js");
const router = require("express").Router();

router.get("/failed", googleController.failed);

router.get("/good", isLoggedIn, googleController.good);
router.get("/google", googleController.google);

router.get("/logout", googleController.logout);

router.get("/googlelogin", checkToken, userController.getUser);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/api/auth/failed" }),
  function (req, res) {
    res.redirect("/api/auth/googlelogin");
  }
);

module.exports = router;
