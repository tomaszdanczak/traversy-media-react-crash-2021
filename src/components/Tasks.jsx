import Task from "./Task";

const Tasks = ({ tasks, onDeleteTask, onToggleReminder }) => {
  return (
    <>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDeleteTask={onDeleteTask}
          onToggleReminder={onToggleReminder}
        />
      ))}
    </>
  );
};

export default Tasks;
