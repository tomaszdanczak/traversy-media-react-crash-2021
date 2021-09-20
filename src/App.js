import { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import uniqid from "uniqid";
import { apiEndpoint } from "./config";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  const [showAdd, setShowAdd] = useState(false);
  const [tasks, setTasks] = useState([]);

  //***************************************************************************
  //     LOAD TASKS from localStorage (works without DB)
  //***************************************************************************

  useEffect(() => {
    const storageTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storageTasks);
    console.log("process.env.PUBLIC_URL:", process.env.PUBLIC_URL);
  }, []);

  //***************************************************************************
  //     LOAD TASKS from DB (works only locally after npm run server )
  //***************************************************************************

  // useEffect(() => {
  //   const getTasks = async () => {
  //     const { data: tasks } = await axios.get(apiEndpoint);
  //     setTasks(tasks);
  //   };

  //   getTasks();
  // }, []);

  //***************************************************************************
  //     ADD TASK to localStorage (works without DB)
  //***************************************************************************

  const handleAddTask = (task) => {
    const newTasks = [...tasks, { ...task, id: uniqid() }];
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setTasks(newTasks);
  };

  //***************************************************************************
  //     ADD TASK to DB (works only locally after npm run server)
  //***************************************************************************

  // const handleAddTask = async (task) => {
  //   const { data: newTask } = await axios.post(`${apiEndpoint}`, task);

  //   const newTasks = [...tasks, newTask];
  //   setTasks(newTasks);
  // };

  //***************************************************************************
  //     DELETE TASK from localStorage (works without DB)
  //***************************************************************************

  const handleDeleteTask = (id) => {
    const newTasks = tasks.filter((t) => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setTasks(newTasks);
  };

  //***************************************************************************
  //     DELETE TASK from DB (works only locally after npm run server)
  //***************************************************************************

  // const handleDeleteTask = async (id) => {
  //   await axios.delete(`${apiEndpoint}/${id}`);

  //   const newTasks = tasks.filter((t) => t.id !== id);
  //   setTasks(newTasks);
  // };

  //***************************************************************************
  //     TOGGLE REMINDER in localStorage (works without DB)
  //***************************************************************************

  const handleToggleReminder = (task) => {
    const newTasks = [...tasks];
    const index = tasks.indexOf(task);
    newTasks[index] = { ...newTasks[index] };
    newTasks[index].reminder = !newTasks[index].reminder;

    localStorage.setItem("tasks", JSON.stringify(newTasks));

    setTasks(newTasks);
  };

  //***************************************************************************
  //     TOGGLE REMINDER in DB (works only locally after npm run server)
  //***************************************************************************

  // const handleToggleReminder = async (task) => {
  //   const newTasks = [...tasks];
  //   const index = tasks.indexOf(task);
  //   newTasks[index] = { ...newTasks[index] };
  //   newTasks[index].reminder = !newTasks[index].reminder;

  //   await axios.put(`${apiEndpoint}/${task.id}`, newTasks[index]);

  //   setTasks(newTasks);
  // };

  return (
    <div className="container">
      <Header
        onShowAdd={() => {
          setShowAdd(!showAdd);
        }}
        showAdd={showAdd}
      />

      <Route
        path={`${process.env.PUBLIC_URL}/`}
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
      <Route path={`${process.env.PUBLIC_URL}/about`} component={About} />
      <Footer />
    </div>
  );
}

export default App;
