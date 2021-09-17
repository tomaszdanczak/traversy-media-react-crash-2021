import { FaTimes } from "react-icons/fa";

const Task = ({ task, onDeleteTask, onToggleReminder }) => {
  return (
    <div
      className={task.reminder ? "task reminder" : "task"}
      onDoubleClick={() => onToggleReminder(task)}
    >
      <h3>
        {task.text}
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => onDeleteTask(task.id)}
        />
      </h3>
      <p>{task.day}</p>
    </div>
  );
};

export default Task;
