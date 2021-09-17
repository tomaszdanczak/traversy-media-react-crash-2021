import React, { useState } from "react";

const AddTask = ({ onAddTask }) => {
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(false);

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (!text) {
      alert("Please add a task");
      return;
    }

    const newTask = { text, day, reminder };
    onAddTask(newTask);

    setText("");
    setDay("");
    setReminder(false);
  };

  return (
    <form className="add-form" onSubmit={handleSubmitForm}>
      <div className="form-control">
        <label htmlFor="">Task</label>
        <input
          type="text"
          placeholder="Add task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label htmlFor="">Day & Time</label>
        <input
          type="text"
          placeholder="Add Day & Time"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>

      <div className="form-control form-control-check">
        <label htmlFor="">Set Reminder</label>
        <input
          type="checkbox"
          checked={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>

      <input type="submit" value="Save Task" className="btn btn-block" />
    </form>
  );
};

export default AddTask;
