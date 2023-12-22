const { getTasks, getPhases } = require("./mock-data");

const populateTasks = ({ phases, taskTitle }) => {
  return phases.map((phase) => {
    const tasks = getTasks({ phaseId: phase.id });
    return {
      ...phase,
      tasks: phase.tasks
        .map((taskId) => {
          const task = tasks.find((task) => task.id === taskId);
          return task;
        })
        .filter((task) => {
          return taskTitle
            ? task.title.toLowerCase().includes(taskTitle.toLowerCase())
            : true;
        }),
    };
  });
};

const moveTask = ({
  sourcePhaseId,
  taskId,
  destinationPhaseId,
  sourceIndex,
  destinationIndex,
}) => {
  const phases = getPhases({});
  if (
    sourcePhaseId === destinationPhaseId &&
    sourceIndex === destinationIndex
  ) {
    return;
  } else if (sourcePhaseId === destinationPhaseId) {
    const phase = phases.find((phase) => phase.id === sourcePhaseId);
    phase?.tasks?.splice(sourceIndex, 1);
    phase?.tasks?.splice(destinationIndex, 0, taskId);
    return;
  } else {
    const sourcePhase = phases.find((phase) => phase.id === sourcePhaseId);
    const destinationPhase = phases.find(
      (phase) => phase.id === destinationPhaseId
    );

    const [removed] = sourcePhase?.tasks?.splice(sourceIndex, 1);
    destinationPhase?.tasks?.splice(destinationIndex, 0, removed);

    return;
  }
};

module.exports = { moveTask, populateTasks };
