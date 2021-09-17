import { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
// import uniqid from "uniqid";
import { apiEndpoint } from "./config";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import Footer from "./components/Footer";
import About from "./components/About";

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
  const handleToggleReminder = async (task) => {
    const newTasks = [...tasks];
    const index = tasks.indexOf(task);
    newTasks[index] = { ...newTasks[index] };
    newTasks[index].reminder = !newTasks[index].reminder;

    await axios.put(`${apiEndpoint}/${task.id}`, newTasks[index]);

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

      <Route
        path="/"
        exact
        render={(props) => (
          <>
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
          </>
        )}
      />
      <Route path="/about" component={About} />
      <Footer />
    </div>
  );
}

export default App;
