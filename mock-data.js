const { v4 } = require("uuid");
const { phaseData, taskData } = require("./data");

const NO_OF_PHASES = phaseData.length;
const MAX_NO_OF_TASKS = 10;

// generate 3 phaseIds
const phaseIds = Array.from(
  { length: NO_OF_PHASES },
  (_, i) => `phase-${v4()}`
);

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const phases = phaseIds.map((id, i) => {
  return {
    id,
    title: phaseData[i].title,
    color: phaseData[i].color,
    tasks: Array.from(
      { length: random(3, MAX_NO_OF_TASKS) },
      (_, i) => `task-${v4()}`
    ),
  };
});

// get task data from phase.tasks
const taskIds = phases.reduce((acc, phase) => {
  acc.push(...phase.tasks);
  return acc;
}, []);

const tasks = taskIds.map((id, i) => {
  return {
    id,
    title: taskData[i % taskData.length].title,
    createdOn: taskData[i % taskData.length].createdOn,
  };
});

const getPhases = ({ phaseId }) => {
  if (phaseId) {
    const phaseIdArray = Array.isArray(phaseId) ? phaseId : [phaseId];
    return phases.filter((phase) => phaseIdArray.includes(phase.id));
  }
  return phases;
};

const getTasks = ({ taskId, phaseId }) => {
  if (taskId) {
    return tasks.find((task) => task.id === taskId);
  } else if (phaseId) {
    if (!Array.isArray(phaseId)) {
      phaseId = [phaseId];
    }
    const taskIdsInPhase =
      getPhases({ phaseId })
        ?.map((phase) => phase.tasks)
        .flat() || [];
    return taskIdsInPhase.map((taskId) =>
      tasks.find((task) => task.id === taskId)
    );
  } else {
    return tasks;
  }
};

const setTasks = (newTasks) => {
  tasks = newTasks;
};

const setPhases = (newPhases) => {
  phases = newPhases;
};

module.exports = { setTasks, setPhases, getPhases, getTasks };
