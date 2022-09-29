const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const db = require("./models");
const User = db.users;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "702920093411-8kqdubr5tfvnsa1v9a21d5v58ace4a61.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/api/auth/google/callback",
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
