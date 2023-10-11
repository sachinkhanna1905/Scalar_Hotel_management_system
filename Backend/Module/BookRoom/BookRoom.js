const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BookRoomSchema = new Schema(
  {
    email: {
      type: String,
      // required: [true, "Email can not be blank"],
    },
    mobilenumber: {
      type: Number,
      // required: [true],
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    roomname: {
      type: String,
    },
    toDate: {
      type:String,
    },
    fromDate: {
      type: String,
    },
    toHour: {
      type: String,
    },
    fromHour: {
      type: String,
    },
    paymentStatus: {
      type: String,
    },
    amount: {
      type: Number,
    },
    created: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
const BookRoom = mongoose.model("BookRoom", BookRoomSchema);
module.exports = BookRoom;
