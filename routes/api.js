const express = require("express");
const router = express.Router();
const Physician = require(__dirname + "/../models/physician");

// get list of pysicians from db
router.get("/physicians", (req, res, next) => {
  Physician.aggregate()
    .near({
      near: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
      maxDistance: 100000,
      spherical: true,
      distanceField: "dist.calculated",
    })
    .then((physicians) => {
      res.send(physicians);
    });
});

// add a physician
router.post("/physicians", (req, res, next) => {
  Physician.create(req.body)
    .then((physician) => {
      res.send(physician);
    })
    .catch(next);
});

// update a physician
router.put("/physicians/:id", (req, res, next) => {
  Physician.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    Physician.findOne({ _id: req.params.id }).then((physician) => {
      res.send(physician);
    });
  });
});

// delete a physician
router.delete("/physicians/:id", (req, res, next) => {
  Physician.findByIdAndRemove({
    _id: req.params.id,
  })
    .then((physician) => {
      res.send(physician);
    })
    .catch(next);
});

module.exports = router;
