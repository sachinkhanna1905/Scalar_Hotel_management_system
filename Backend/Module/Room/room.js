const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const RoomSchema = new Schema({
  roomname: {
    type: String,
    required: [true, "Email can not be blank"],
    unique: [true, "Already exits"],
  },
  price: {
    type: Number,
  },
});
const Room = mongoose.model("Room", RoomSchema);
module.exports = Room;
