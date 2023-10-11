const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username:{
    type:String,
  },
  email: {
    type: String,
    required: [true, "Email can not be blank"],
    unique: [true, "Already exits"],
  },
  password: {
    type: String,
  },
  created: { type: Date, default: Date.now },
});
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model("User", userSchema);
module.exports = User;
