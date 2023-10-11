const jwt = require("jsonwebtoken");
module.exports.createSecretToken = (username) => {
  return jwt.sign({ username }, `${process.env.TOKEN_KEY}`, {
    expiresIn: 24 * 60 * 60,
  });
};
