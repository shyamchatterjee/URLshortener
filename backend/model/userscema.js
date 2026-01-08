let mongoos = require("mongoose");

let userscema = new mongoos.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

let user = mongoos.model("user", userscema);
module.exports = user;
