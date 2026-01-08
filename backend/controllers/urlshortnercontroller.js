let shortID = require("shortid");
const Url = require("../model/urlscema");
let qrcode = require("qrcode");
let posturl = async (req, res) => {
  try {
    if (!req.body.longurl) {
      return res
        .status(404)
        .json({ ok: false, massage: "Please fill the deta" });
    }
    let shortid = shortID.generate();

    let shorturl = "http://localhost:3000/urlshortner/shorturl/" + shortid;
    let qrimage = await qrcode.toDataURL(shorturl);
    let url = await Url.create({
      longurl: req.body.longurl,
      user_id: req.user,
      shorturl: shorturl,
      shortid: shortid,
      qrimage: qrimage,
    });

    return res
      .status(200)
      .json({ ok: true, massage: "Your url shorted", url: url });
  } catch (err) {
    return res.status(500).json({ ok: false, massage: err });
  }
};
let findshorturl = async (req, res) => {
  if (!req.params.id) {
    return res.status(404).send("Unvalied url");
  }
  let finddeta = await Url.findOne({ shortid: req.params.id });
  if (!finddeta)
    return res.status(404).json({ ok: false, massage: "Unvalied url" });
  finddeta.count++;
  await finddeta.save();
  return res.redirect(finddeta.longurl);
};

let geturl = async (req, res) => {
  let deta = await Url.find().populate("user_id");
  res.status(200).json({ ok: true, deta: deta });
};

let deleteurl = async (req, res) => {
  let deletedeta = await Url.findByIdAndDelete(req.params.id);
  if (!deletedeta) {
    return res.status(404).json({ ok: false, massage: "Not deleted" });
  }
  return res.status(200).json({ ok: true, massage: "Url deleted" });
};

module.exports = { posturl, findshorturl, geturl, deleteurl };
