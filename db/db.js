const mongoose = require("mongoose");

const uri =
  "mongodb+srv://hello:6z8RCN7w2xu846Jb@interviews.l73k0.mongodb.net/asim?retryWrites=true&w=majority&appName=Interviews";

async function connectDb() {
  try {
    await mongoose.connect(uri);

    console.log("Connected to db");
  } catch (error) {
    console.error("❌ Error inserting data:", error);
  }
}
module.exports = connectDb;
