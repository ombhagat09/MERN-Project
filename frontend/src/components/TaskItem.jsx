import React from "react";
import API from "../services/api";

const TaskItem = ({ task, refresh }) => {

  const handleDelete = async () => {
    await API.delete(`/tasks/${task._id}`);
    refresh();
  };

  return (
    <div>
      <p>{task.title}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TaskItem;