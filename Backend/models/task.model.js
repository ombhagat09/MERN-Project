const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,

    },
    Completed: {
        type: Boolean,
        Default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }

}, { timestamps: true });

const task = mongoose.model("Task", taskSchema)
module.exports = task;