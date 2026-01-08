let express = require("express");
let urlrouter = express.Router();
const verifyTokenMiddleware = require("../middleware/authmiddlware");
const {
  posturl,
  findshorturl,
  geturl,
  deleteurl,
} = require("../controllers/urlshortnercontroller");

urlrouter.post("/createurl", verifyTokenMiddleware, posturl);

urlrouter.get("/shorturl/:id", verifyTokenMiddleware, findshorturl);

urlrouter.get("/urls", verifyTokenMiddleware, geturl);
urlrouter.delete("/delete/:id", verifyTokenMiddleware, deleteurl);
module.exports = urlrouter;
