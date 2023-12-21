const { v4 } = require("uuid");
const { phaseData, taskData } = require("./data");

const NO_OF_PHASES = phaseData.length;
const NO_OF_TASKS = taskData.length;

// generate 3 phaseIds
const phaseIds = Array.from(
  { length: NO_OF_PHASES },
  (_, i) => `phase-${v4()}`
);

const phases = phaseIds.map((id, i) => {
  return {
    id,
    title: phaseData[i].title,
    color: phaseData[i].color,
    tasks: Array.from(
      { length: phaseData[i].initialTaskCount },
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
    title: taskData[i].title,
    createdOn: taskData[i].createdOn,
  };
});

const getPhases = ({ phaseId }) => {
  if (phaseId) {
    return phases.find((phase) => phase.id === phaseId);
  }
  return phases;
};

const getTasks = ({ taskId, phaseId }) => {
  if (taskId) {
    return tasks.find((task) => task.id === taskId);
  } else if (phaseId) {
    const taskIdsInPhase = getPhases({ phaseId })?.tasks;
    return tasks.filter((task) => taskIdsInPhase.includes(task.id));
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
