const User = require("../model/userscema");

let registermiddleware = async (req, res, next) => {
  let result = await User.find({ email: req.body.email });
  if (result.length == 0) {
    return next();
  }

  return res
    .status(404)
    .json({ ok: false, massage: "Your email allredy exist" });
};

module.exports = registermiddleware;
