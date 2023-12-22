const express = require("express");
const { getPhases } = require("../mock-data");
const { populateTasks } = require("../helper");
const router = express.Router();

router.get("/", (req, res) => {
  const phases = getPhases({});
  // to populate the phases with tasks based on taskIds
  const populatedPhases = populateTasks({ phases });
  res.send(populatedPhases);
});

router.get("/search", (req, res) => {
  const { taskTitle, phaseId } = req.query;
  if (!taskTitle && !phaseId) {
    res.send(getPhases({}));
    return;
  }

  const phases = getPhases({ phaseId: phaseId?.split(",") });
  // to filter and populate based on title and phaseIds
  const populatedPhases = populateTasks({ phases, taskTitle });
  res.send(populatedPhases);
});

module.exports = router;
