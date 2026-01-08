let bcrypt = require("bcrypt");
const User = require("../model/userscema");
let jwt = require("jsonwebtoken");

let register = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res
        .status(404)
        .json({ ok: false, massage: "Please fill the deta" });
    }
    let password = await bcrypt.hash(req.body.password, 10);
    let deta = await User.create({
      email: req.body.email,
      password: password,
    });

    return res.status(200).json({ ok: true, deta: deta });
  } catch (err) {
    return res.status(500).json("Server eror");
  }
};

let login = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res
        .status(404)
        .json({ ok: false, massage: "Please fill the deta" });
    }

    let findemail = await User.findOne({ email: req.body.email });
    if (!findemail) {
      return res
        .status(404)
        .json({ ok: false, massage: "Your email not match, Please register" });
    }
    let match = await bcrypt.compare(req.body.password, findemail.password);
    if (!match)
      return res.status(404).json({ ok: false, massage: "Unvalied password" });
    let token = jwt.sign(findemail.id, process.env.SECRET_KEY);
    return res
      .cookie("token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ok: true, massage: "You're login" });
  } catch (err) {
    return res.status(500).json({ ok: false, massage: "Server eror" });
  }
};
let logout = (req, res) => {
  return res
    .clearCookie("token")
    .json({ ok: true, massage: "Logout sucessfully" });
};

let getacount = async (req, res) => {
  try {
    let finduser = await User.findOne({ _id: req.user });
    if (!finduser) {
      return res.json({
        ok: false,
        massage: "you are not login , please login",
      });
    }
    return res.json({ ok: true, user: finduser });
  } catch (err) {
    return res.status(500).json({ ok: false, massage: "Server eror" });
  }
};
module.exports = { register, login, logout, getacount };
