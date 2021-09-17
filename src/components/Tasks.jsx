import Task from "./Task";

const Tasks = ({ tasks, onDeleteTask }) => {
  return (
    <>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onDeleteTask={onDeleteTask} />
      ))}
    </>
  );
};

export default Tasks;
