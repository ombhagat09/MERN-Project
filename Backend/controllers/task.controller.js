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

module.exports = { createtask }