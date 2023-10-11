const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TimeSlotSchema = new Schema({
  Date: {
    type: String,
  },
  toHour: {
    type: String,
  },
  fromHour: {
    type: String,
  },
  mobilenumber: {
    type: Number,
  },
});
const TimeSlot = mongoose.model("TimeSlot", TimeSlotSchema);
module.exports = TimeSlot;
