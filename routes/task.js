const express = require("express");
const router = express.Router();

const { moveTask } = require("../helper.js");
const { getTasks } = require("../mock-data.js");

router.get("/", (req, res) => {
  const params = req.query;
  //   const tasks = getTasks();

  //   if (params.phaseId) {
  //     const filteredTasks = tasks.filter(
  //       (task) => task.phaseId === params.phaseId
  //     );
  //     res.send(filteredTasks);
  //     return;
  //   } else {
  //     const tasksByPhaseId = Object.groupBy(tasks, ({ phaseId }) => phaseId);
  //     res.send(tasksByPhaseId);
  //   }

  if (params.phaseId) {
    const tasks = getTasks({ phaseId: params.phaseId });
    res.json(tasks);
  } else if (params.taskId) {
    const tasks = getTasks({ taskId: params.taskId });
    res.json(tasks);
  }
  res.json(getTasks({}));
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

module.exports = router;
