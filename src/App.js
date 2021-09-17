import { useState, useEffect } from "react";
import axios from "axios";
// import uniqid from "uniqid";
import { apiEndpoint } from "./config";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Tasks from "./components/Tasks";

function App() {
  const [showAdd, setShowAdd] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const { data: tasks } = await axios.get(apiEndpoint);
      setTasks(tasks);
    };

    getTasks();
  }, []);

  //---------------------------------------------------------------------------
  //                           ADD TASK
  //---------------------------------------------------------------------------
  const handleAddTask = async (task) => {
    const { data: newTask } = await axios.post(`${apiEndpoint}`, task);

    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
  };

  //---------------------------------------------------------------------------
  //                           DELETE TASK
  //---------------------------------------------------------------------------
  const handleDeleteTask = async (id) => {
    await axios.delete(`${apiEndpoint}/${id}`);

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
