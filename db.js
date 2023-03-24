const mongoose = require("mongoose");
require("dotenv").config()
const connect = async () => {
  try {
    await mongoose.connect(process.env.mongodbURL);
    console.log("connected to db");
  } catch (er) {
    console.log(er.message);
  }
};
module.exports = connect;
