const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { urlencoded } = require("express");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./passport-setup");

const app = express();

var corOptions = {
  origin: "https://localhost:8081",
};

app.use(cors(corOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "tuto-session",
    keys: ["key1", "key2"],
  })
);

app.use(passport.initialize());
app.use(passport.session());

const userrouter = require("./routes/userRouter.js");
app.use("/api/users", userrouter);

const listrouter = require("./routes/listRouter.js");
app.use("/api/lists", listrouter);

const googlerouter = require("./routes/googleRouter.js");
app.use("/api/auth/", googlerouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Landing Page" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
