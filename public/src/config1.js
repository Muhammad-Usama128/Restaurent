const mongoose = require("mongoose");
const connect = mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connect
  .then(() => {
    console.log("Connected to users successful");
  })
  .catch((error) => {
    console.log("Connection error users");
  });

const signupschema = new mongoose.Schema({
  name: String,
  address: String,
  email: String,
  password: String,
});

const connection = new mongoose.model("users", signupschema);
module.exports = connection;
