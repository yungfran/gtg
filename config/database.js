//BOILERPLATE

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.mongoURI, {
      // async await deals with the promise with try catch block
      useNewUrlParser: true, //Will stop warnings in the console
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(`Successfully connected to MongoDB: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1); //1 is exit with failure
  }
};

module.exports = connectDB;
