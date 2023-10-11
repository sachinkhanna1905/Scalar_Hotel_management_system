const express = require("express");
const {
  Login,
  OTPLoginGenerator,
  verifyLoginOTP,
  BookingDetail,
  userDetail,
  updateUser,
  timeSlotFinder,
  deleteBooking,
  logout,
} = require("../Contoller/User");
const router = express.Router();

router.route("/login").post(Login);
router.route("/generateloginotp").post(OTPLoginGenerator);
router.route("/verifyloginotp").post(verifyLoginOTP);
router.route("/booking").post(BookingDetail);
router.route("/userdetail").post(userDetail);
router.route("/updateuser").put(updateUser);
router.route("/deleteBooking").put(deleteBooking);
router.route("/slotfinder").post(timeSlotFinder);
router.route("/logout").get(logout)

module.exports = router;
