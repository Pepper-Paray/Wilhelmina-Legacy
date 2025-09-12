// server for website
const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb://localhost:27017/wilhelminaDB", {
  useNewUrlParser: true,
});

const CounterSchema = new mongoose.Schema({ count: Number });
const Counter = mongoose.model("Counter", CounterSchema);

Counter.findOne().then(async (doc) => {
  if (!doc) {
    const newCounter = new Counter({ count: 0 });
    await newCounter.save();
  }

  app.use(express.json());

  app.get("/api/counter", async (req, res) => {
    const counter = await Counter.findOne();
    res.json({ count: counter.count });
  });

  app.post("/api/counter/increment", async (req, res) => {
    const counter = await Counter.findOne();
    counter.count += 1;
    await counter.save();
    res.json({ count: counter.count });
  });

  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
});
