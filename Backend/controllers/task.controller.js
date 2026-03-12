const Task = require("../models/task.model");


const createtask = async (req, res) => {
  try {
    const { title, description, completed, } = req.body

    const task = new Task({
      title,
      description,
      completed,
      user: req.user.id
    });
    await task.save()

    res.status(201).json({
      message: "Task Created Succesfully",
      task
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Server.error"
    });


  }
};


const getAllTasks = async (req, res) => {
  try {
    console.log("User:", req.user)
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json({
      message: "Tasks fetched Succesfully",
      tasks
    })

  } catch (error) {
    console.log("Error", error);
    res.status(500).json({
      message: "server error"
    });

  }
};

const updateTask = async (req, res) => {
  try {

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Task updated successfully",
      updatedTask
    });

  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({
      message: "server error"
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(401).json({
        message: "Task Not Found"
      });
    }
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "you can not delete this task "
      });
    }
    await task.deleteOne();
    res.json({
      message: "Task deleted Succesfully"
    });


  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "server error "
    });
  }
}

const deleteAllTask = async (req, res) => {
  try {
    await Task.deleteMany({ user: req.user.id });
    res.json({
      message: "All Tasks deleted SuccessFully"
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Server Error"
    });
  }
}

module.exports = { createtask, getAllTasks, updateTask, deleteTask, deleteAllTask }