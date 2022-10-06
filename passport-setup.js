const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const db = require("./models");
const User = db.users;

require("dotenv").config()

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      callbackURL: process.env.CALLBACKURL,
    },
    async function (accessToken, refreshToken, profile, done) {
      const emailId = profile._json.email;
      let user = await User.findOne({
        where: {
          email: emailId,
        },
      });
      if (user) {
        let flagUpdate = User.update(
          { flag: "google" },
          { where: { email: emailId } }
        );
        console.log("user found");
      } else {
        const data = {
          name: profile.displayName,
          email: emailId,
          password: "none",
          flag: "google",
        };
        user = await User.create(data);
        console.log("user created");
      }

      return done(null, profile);
    }
  )
);
