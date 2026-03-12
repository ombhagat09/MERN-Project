const express = require("express");
const router = express.Router()

const { createtask , getAllTasks, updateTask, deleteTask, deleteAllTask } = require("../controllers/task.controller")
const auth = require("../middleware/auth.middleware")


router.post("/createtask", auth, createtask)
router.get("/", auth, getAllTasks )
router.put("/:id",auth, updateTask)
router.delete("/:id",auth, deleteTask)
router.delete("/", auth, deleteAllTask)

module.exports = router