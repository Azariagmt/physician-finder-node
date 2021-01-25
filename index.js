const express = require("express");
const routes = require(__dirname + "/routes/api");
const mongoose = require("mongoose");
const Physician = require(__dirname + "/models/physician");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Physician api",
      description: "description of the physician api",
      contact: {
        name: "Azaria Gebremichael",
      },
      servers: ["http://localhost/3000", `${process.env.port}`],
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
    error: err.message,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
