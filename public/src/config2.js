const mongoose = require("mongoose");
const connect = mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connect
  .then(() => {
    console.log("Connected to dishes successful");
  })
  .catch((error) => {
    console.log("Connection error dishes");
  });

const foodschema = new mongoose.Schema({
  name: String,
  catagore: String,
  img: String,
  desc: String,
  price: Number,
  popular: Boolean,
});

const dishes = new mongoose.model("dishes", foodschema);
module.exports = dishes;
