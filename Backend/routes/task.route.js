const express = require("express");
const router = express.Router()

const { createtask } = require("../controllers/task.controller")
const auth = require("../middleware/auth.middleware")

router.post("/createtask", auth, createtask)

module.exports = router