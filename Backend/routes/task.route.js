const express = require("express");
const router = express.Router()

const { createtask , getAllTasks } = require("../controllers/task.controller")
const auth = require("../middleware/auth.middleware")


router.post("/createtask", auth, createtask)
router.get("/", auth, getAllTasks )

module.exports = router