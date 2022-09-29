const { verify } = require("jsonwebtoken");

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");

    if (token) {
      token = token.slice(7);
      verify(token, "qwe1234", (err, decoded) => {
        if (err) {
          res.json({
            message: "invalid Token",
          });
        } else {
          req.userId = decoded.result.id;
          next();
        }
      });
    } else {
      res.json({
        message: "Use Token!",
      });
    }
  },
};
