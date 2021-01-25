const express = require("express");
const router = express.Router();
const Physician = require(__dirname + "/../models/physician");

/**
 * @swagger
 * /api/physicians:
 *    get:
 *      description: Returns all physicians
 *      parameters:
 *        - in: query
 *          name: lat
 *        - in: query
 *          name: lng
 *      responses:
 *        '200':
 *          description: Successfully returned all user
 *        '500':
 *          description: Failed to query for users
 */
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

/**
 * @swagger
 * /api/physicians:
 *    post:
 *      description: adds physician
 *      parameters:
 *        - in: query
 *          name: lat
 *        - in: query
 *          name: lng
 *      responses:
 *        '200':
 *          description: Successfully returned all user
 *        '500':
 *          description: Failed to query for users
 */
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
