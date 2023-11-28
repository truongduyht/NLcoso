require("dotenv").config();
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
