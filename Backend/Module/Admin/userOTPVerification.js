const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const userOTPVerificationSchema = new Schema(
  {
    email: String,
    otp: String,
    createdAt: { type: Date, default: Date.now, index: { expires: 15 * 60 } },
  },
  { timestamps: true }
);
userOTPVerificationSchema.pre("save", async function () {
  this.otp = await bcrypt.hash(this.otp, 12);
});
const UserOTPVerification = mongoose.model(
  "UserOTPVerification",
  userOTPVerificationSchema
);
module.exports = UserOTPVerification;
