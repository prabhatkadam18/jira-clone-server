const express = require("express");
const { getPhases } = require("../mock-data");
const { populateTasks } = require("../helper");
const router = express.Router();

router.get("/", (req, res) => {
  const phases = getPhases({});
  const populatedPhases = populateTasks({ phases });
  res.send(populatedPhases);
});

module.exports = router;
