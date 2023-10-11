if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");
const Room = require("../Module/Room/room");
const User = require("../Module/Admin/user");

const connectMongo = async () => {
  await mongoose.connect(`${process.env.ATLUS_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
connectMongo()
  .then(() => {
    console.log("Yes I can establish the connection");
  })
  .catch((error) => {
    console.log("OH NO WHAT I MAKE MISTAKE MONGOOES IS NOT WORKING");
    console.log(error);
  });
const RoomName = [
  { roomname: "A", price: 100 },
  { roomname: "B", price: 80 },
  { roomname: "C", price: 50 },
];

// Credential information;

// const loginInfo = [{
//     username:"admin_123",
//     email:"sachin.ece.20112@iiitbh.ac.in",
//     password:"$2a$12$8FgVnebJze7CRdK8XaYI9.mFWHw4pRjpdedTZUBI9vL7AusSU6xgC"
// }]

const seedDB = async () => {
  await Room.deleteMany({});
    // await User.deleteMany({});
  await Room.insertMany(RoomName);
    // await User.insertMany(loginInfo);
};

seedDB()
  .then(() => {
    console.log("All Done");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err.message);
  });
