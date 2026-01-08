const { default: mongoose } = require("mongoose");

let connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/urlshortner-db")
    .then(() => {
      console.log("connect detabase");
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = connectDB;
