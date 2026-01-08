require("dotenv").config();
let express = require("express");
let cors = require("cors");
let cokkieparser = require("cookie-parser");
const router = require("./router/authroute");
const connectDB = require("./config/connectDB");
const urlrouter = require("./router/urldetaroute");
const Url = require("./model/urlscema");

let app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cokkieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();
app.use("/authroute", router);
app.use("/urlshortner", urlrouter);

let PORT = process.env.PORT || "4000";

app.listen(PORT, () => {
  console.log("server started");
});
