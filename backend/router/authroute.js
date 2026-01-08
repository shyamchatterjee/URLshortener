let express = require("express");
const {
  register,
  login,
  logout,
  getacount,
} = require("../controllers/authcontrollers");
const registermiddleware = require("../middleware/registermiddleware");
const verifyTokenMiddleware = require("../middleware/authmiddlware");
let router = express.Router();

router.post("/register", registermiddleware, register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/acount", verifyTokenMiddleware, getacount);
module.exports = router;
