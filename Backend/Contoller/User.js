const User = require("../Module/Admin/user");
const UserOTPVerification = require("../Module/Admin/userOTPVerification");
const BookRoom = require("../Module/BookRoom/BookRoom");
const bcrypt = require("bcryptjs");
const otpGenerator = require("otp-generator");
const { createSecretToken } = require("../utility/JwtTokenGenerator");
const TimeSlot = require("../Module/TimeSlot/timeSlot");
const { RegisterMail } = require("../GenratorOTP/OTPMailer");
const { confirmMail } = require("../GenratorOTP/Confirm");
module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if ((!email && !mobilenumber) || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }
    try {
      const user = await User.findOne({
        email,
      });
      if (!user) {
        return res.json({
          success: false,
          message: "Incorrect password ",
        });
      }
      console.log(await bcrypt.hash(password, 12));
      const auth = await bcrypt.compare(password, user.password);
      if (!auth) {
        return res.json({
          success: false,
          message: "Incorrect password or email",
        });
      }
      const token = createSecretToken(user.username);
      res.cookie("userjwt", token, {
        withCredentials: true,
        httpOnly: true,
        maxAge: 7 * 24 * 3600 * 1000,
        sameSite: "none",
        secure: true,
        expires: 1,
      });
      res.status(201).json({
        message: "User logged in successfully",
        success: true,
        token,
      });
    } catch (err) {
      res
        .status(401)
        .json({ message: "User Not Found!" + err.message, success: false });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something Else Went Wrong!" + err.message,
      success: false,
    });
  }
};
module.exports.OTPLoginGenerator = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.json({ success: false, message: "All fields are required" });
    }
    try {
      const user = await User.find({email});
      if (!user) {
        return res.json({
          success: false,
          message: "Incorrect password or email",
        });
      }
      const otp = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
      const existingOTPUser = await UserOTPVerification.findOne({
        email
      });
      if (existingOTPUser) {
        const hashPassword = await bcrypt.hash(otp, 12);
        await UserOTPVerification.findOneAndUpdate(
          { email },
          {
            otp: hashPassword,
          }
        );
      } else {
        await UserOTPVerification.create({
          email,
          otp,
        });
      }
      await RegisterMail({
         text: `Your account login code is ${otp}. Verify and login to your account and do not these code to anyone.`,
        subject: "Account Login OTP",
        userEmail: email,
      })
      res.status(201).json({
        success: true,
        message: `OTP Send successfuly to ${email}`,
      });
    } catch (err) {
      res.json({ message: "User Not Found!" + err.message, success: false });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something Else Went Wrong!" + err.message,
      success: false,
    });
  }
};
module.exports.verifyLoginOTP = async (req, res) => {
  try {
    const { code, email} = req.body;
    try {
      const user = await User.findOne({
        email,
      });
      if (!user) {
        return res.json({
          success: false,
          message: "Incorrect password or email",
        });
      }
      const otpHolder = await UserOTPVerification.findOne({
        email,
      });
      if (!otpHolder) {
        return res
          .status(401)
          .json({ success: false, message: "You have used Expired OTP" });
      }
      const validOTP = await bcrypt.compare(code, otpHolder.otp);
      if (!validOTP) {
        return res.json({ success: false, message: "Invalid OTP Code" });
      }
      if (otpHolder.email === email && validOTP) {
        await UserOTPVerification.findByIdAndDelete(otpHolder._id);
      }
      const token = createSecretToken(user.username);
      res.cookie("userjwt", token, {
        withCredentials: true,
        httpOnly: true,
        maxAge: 7 * 24 * 3600 * 1000,
        sameSite: "none",
        secure: true,
        expires: 1,
      });
      res.status(201).json({
        message: "User logged in successfully",
        success: true,
        token: token,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "User Not Found " + error.message });
    }
  } catch (err) {
    res.status(500).json({
      message: "Something Else Went Wrong!" + err.message,
      success: false,
    });
  }
};
module.exports.BookingDetail = async (req, res) => {
  try {
    const {
      email,
      mobilenumber,
      firstname,
      lastname,
      roomname,
      toDate,
      fromDate,
      toHour,
      fromHour,
      amount,
    } = req.body;
    await BookRoom.create({
      email,
      mobilenumber,
      firstname,
      lastname,
      roomname,
      toDate,
      fromDate,
      toHour,
      fromHour,
      amount,
      paymentStatus: "pending",
    });
    await TimeSlot.create({ Date: toDate, toHour, fromHour, mobilenumber });
    // await RegisterMail({
    //   text: `Your booking time is ${toHour} to ${fromHour} in ${toDate} to ${fromDate}.`,
    //   subject: "Booking to Hotel Managements",
    //   userEmail: email,
    // });
    res.json({ success: true, message: "Booking confirm" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Something Else Went Wrong!" + error.message,
      success: false,
    });
  }
};
module.exports.userDetail = async (req, res) => {
  try {
    const { mobilenumber, toDate } = req.body;
    const user = await BookRoom.findOne({
      $and: [
        {
          toDate,
        },
        {
          mobilenumber,
        },
      ],
    });
    if (!user) {
      return res.json({ success: false, message: "Something went wrong" });
    }
    res.status(201).json({ success: true, user });
  } catch (err) {
    res.status(500).json({
      message: "Something Else Went Wrong!" + err.message,
      success: false,
    });
  }
};
module.exports.timeSlotFinder = async (req, res) => {
  try {
    const { Date } = req.body;
    const slot = await TimeSlot.find({ Date });
    res.status(201).json({ success: true, slot });
  } catch (error) {
    res.status(500).json({
      message: "Something Else Went Wrong!" + err.message,
      success: false,
    });
  }
};
module.exports.updateUser = async (req, res) => {
  try {
    const {
      email,
      mobilenumber,
      firstname,
      lastname,
      roomname,
      toDate,
      fromDate,
      toHour,
      fromHour,
      amount,
    } = req.body;
    const user = await BookRoom.findOne({
      $and: [
        {
          toDate,
        },
        {
          mobilenumber,
        },
      ],
    });
    if (!user) {
      return res.json({ success: false, message: "Invalid Request" });
    }
    const filter = {
      toDate,
      mobilenumber,
    };
    const timeFilter = {
      Date: toDate,
      mobilenumber,
    };
    await BookRoom.findOneAndUpdate(filter, {
      email,
      mobilenumber,
      firstname,
      lastname,
      roomname,
      toDate,
      fromDate,
      toHour,
      fromHour,
      amount,
    });
    await TimeSlot.findOneAndUpdate(timeFilter, {
      Date: toDate,
      toHour,
      fromHour,
      mobilenumber,
    });
    res.status(201).json({ success: true, message: "Update Successfully" });
  } catch (error) {
    res.status(401).json({ success: false, message: err.message });
  }
};

module.exports.deleteBooking = async (req, res) => {
  try {
    const { toHour, toDate } = req.body;
    console.log(req.body);
    const Timefilter = { toHour, Date: toDate };
    const filter = { toHour, toDate };
    const user = await TimeSlot.find({
      $and: [
        {
          toDate,
        },
        {
          toHour,
        },
      ],
    });
    if (!user) {
      return res.json({
        success: false,
        message: "Invalid user",
        sl: req.body,
      });
    }
    await TimeSlot.findOneAndDelete(Timefilter);
    await BookRoom.findOneAndDelete(filter);
    res.json({ success: true, message: "Cancel Successfully" });
  } catch (error) {
    res.status(401).json({ success: false, message: err.message });
  }
};
module.exports.logout = async (req, res) => {
  try {
    await res.clearCookie("userjwt", {
      path: "/",
      secure: false,
      httpOnly: false,
      sameSite: true,
    });
    res.status(201).json({ success: true, message: "Logout Successfully" });
  } catch (err) {
    res
      .status(401)
      .json({ success: false, message: "Something Went Wrong" + err.message });
  }
};
