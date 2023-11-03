require("dotenv").config();

// const mongoose = require("mongoose");
// // connect to Mongo
// const connectionStr = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PW}@cluster0.inmk4v4.mongodb.net/ecomern?retryWrites=true&w=majority`;
// mongoose.set("strictQuery", false);
// mongoose
//   .connect(connectionStr, { useNewUrlparser: true })
//   .then(() => console.log("connected to mongodb"))
//   .catch((err) => console.log(err));

// mongoose.connection.on("error", (err) => {
//   console.log(err);
// });

const mongoose = require('mongoose');
async function connection(){
  try {
    await mongoose.connect('mongodb://localhost:27017/NLCS',{
      useNewUrlparser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to DB!!!');
  } catch (error) {
    console.log(error,'Fail!!!');
  }
}

module.exports = { connection };
