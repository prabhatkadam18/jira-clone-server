const express = require("express");
const router = express.Router();

const { moveTask } = require("../helper.js");
const { getTasks } = require("../mock-data.js");

router.get("/", (req, res) => {
  const params = req.query;
  if (params.phaseId) {
    const phaseIds = params.phaseId.split(",");
    const tasks = getTasks({ phaseId: phaseIds });
    return res.json(tasks);
  } else if (params.taskId) {
    const tasks = getTasks({ taskId: params.taskId });
    return res.json(tasks);
  }
  return res.json(getTasks({}));
});

router.post("/move", (req, res) => {
  const {
    sourcePhaseId,
    destinationPhaseId,
    taskId,
    sourceIndex,
    destinationIndex,
  } = req.body;

  moveTask({
    sourcePhaseId,
    destinationPhaseId,
    taskId,
    sourceIndex,
    destinationIndex,
  });
  res.status(200).send();

  //   const tasks = getTasks({});
  //   console.log(tasks);
  //   const index = tasks.findIndex((task) => task.id === taskId);
  //   if (index === -1) {
  //     res.status(404).send("Task not found");
  //     return;
  //   }
  //   tasks[index].phaseId = phaseId;
  //   setTasks(tasks);
  //   res.send(tasks[index]);
});

router.get("/");

module.exports = router;
