const mongoose = require("mongoose");
const dbURI =
  "mongodb+srv://haythem:12TamaraAdem1990@cluster0.u0opl.mongodb.net/guidance?retryWrites=true&w=majority";
const connectDb = async () => {
  try {
    const con = await mongoose.connect(dbURI);
    console.log("mongo is ready");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
module.exports = connectDb;
