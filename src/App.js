import { useState } from "react";
import uniqid from "uniqid";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Tasks from "./components/Tasks";

function App() {
  const [showAdd, setShowAdd] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Doctors Appointment",
      day: "Feb 5th at 2:30pm",
      reminder: true,
    },
    {
      id: 2,
      text: "Meeting at School",
      day: "Feb 6th at 1:30 pm",
      reminder: true,
    },
    {
      id: 3,
      text: "Food Shopping",
      day: "Feb 5th at 2:30pm",
      reminder: false,
    },
  ]);

  //---------------------------------------------------------------------------
  //                           ADD TASK
  //---------------------------------------------------------------------------
  const handleAddTask = (task) => {
    const newTasks = [...tasks, { ...task, id: uniqid() }];
    setTasks(newTasks);
  };

  //---------------------------------------------------------------------------
  //                           DELETE TASK
  //---------------------------------------------------------------------------
  const handleDeleteTask = (id) => {
    const newTasks = tasks.filter((t) => t.id !== id);
    setTasks(newTasks);
  };

  //---------------------------------------------------------------------------
  //                           TOGGLE REMINDER
  //---------------------------------------------------------------------------
  const handleToggleReminder = (task) => {
    const newTasks = [...tasks];
    const index = tasks.indexOf(task);
    newTasks[index] = { ...newTasks[index] };
    newTasks[index].reminder = !newTasks[index].reminder;
    setTasks(newTasks);
  };

  return (
    <div className="container">
      <Header
        onShowAdd={() => {
          setShowAdd(!showAdd);
        }}
        showAdd={showAdd}
      />
      {showAdd && <AddTask onAddTask={handleAddTask} />}
      {tasks.length ? (
        <Tasks
          tasks={tasks}
          onDeleteTask={handleDeleteTask}
          onToggleReminder={handleToggleReminder}
        />
      ) : (
        <p>There are no tasks to show</p>
      )}
    </div>
  );
}

export default App;
