const express = require("express");
const connection = require("./public/src/config1");
const Dishes = require("./public/src/config2");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "/index.html"));
});

app.get("/pakfood", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "/pakFood.html"));
});

app.get("/chinesefood", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "/ChinFood.html"));
});

app.get("/fastfood", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "/FastFood.html"));
});

app.get("/signin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "/Profile.html"));
});

app.get("/order", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "/order.html"));
});

app.post("/sign-up", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const address = req.body.address;
  const password = req.body.password;

  try {
    const user = await connection.findOne({ email: email });

    if (user) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      res.status(200).json({ message: "Email is available" });
      const result = await connection.create({
        name: name,
        address: address,
        email: email,
        password: password,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.post("/sign-in", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await connection.findOne({ email: email });
    if (user) {
      try {
        const user1 = await connection.findOne({
          email: email,
          password: password,
        });
        if (user1) {
          res
            .status(200)
            .json({ message: "Email exist", signin: user1.address });
        } else {
          res.status(400).json({ message: "Email exist", password: false });
        }
      } catch (error) {
        res.status(500).json({ message: "Server error", error });
      }
    } else {
      res.status(400).json({ message: "Email not found", email: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.post("/forgotten", async (req, res) => {
  const email = req.body.email;

  try {
    const user = await connection.findOne({ email: email });

    if (user) {
      res.status(200).json({ message: "Email already exist." });
    } else {
      res.status(400).json({ message: "Email not exist" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.post("/set-password", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await connection.findOne({ email: email });

    if (user) {
      res.status(200).json({ message: "Password changed successfully" });
      const user = await connection.updateOne(
        { email: email },
        { password: password }
      );
    } else {
      res.status(400).json({ message: "Email not exist" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.post("/dishes", async (req, res) => {
  const dish = req.body.dishname;
  if (dish == "home") {
    try {
      const trending = await Dishes.find({ rating: { $gt: 4.5 } });

      if (trending) {
        res.status(200).json({ trendfood: trending });
      } else {
        res.status(400).json({ message: "Nothing found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  } else {
    try {
      const trending = await Dishes.find({
        rating: { $gt: 4.5 },
        catagore: dish,
      });
      const cards = await Dishes.find({ catagore: dish });
      if (trending && cards) {
        res.status(200).json({ trendfood: trending, foodcards: cards });
      } else {
        res.status(400).json({ message: "Nothing found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }
});

app.post("/cart", async (req, res) => {
  const dish = req.body.dish;
  try {
    const dishes = await Dishes.findOne({ name: dish });

    if (dishes) {
      res.status(200).json({ dish: dishes });
    } else {
      res.status(400).json({ message: "Nothing found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// app.listen(3000, () => {
//   console.log(`App is listening at http://localhost:3000`);
// });

module.exports = app;
module.exports.handler = serverless(app);
