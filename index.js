const express = require("express");
const routes = require(__dirname + "/routes/api");
const mongoose = require("mongoose");
const Physician = require(__dirname + "/models/physician");

const app = express();

// connect to mongo
mongoose.connect("mongodb://localhost/physicians");
mongoose.Promise = global.Promise;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

// error handling middleware
app.use((err, req, res, next) => {
  // console.log(err);
  res.status(422).send({
    error: err.message
  })
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
