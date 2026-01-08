let mongoos = require("mongoose");

let urlscema = new mongoos.Schema(
  {
    shorturl: {
      type: String,
    },
    longurl: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoos.Schema.Types.ObjectId,
      ref: "user",
    },
    shortid: {
      type: String,
      unique: true,
    },
    count: {
      type: Number,
      default: 0,
    },
    qrimage: {
      type: String,
    },
  },
  { timestamps: true }
);

let url = mongoos.model("urls", urlscema);
module.exports = url;
