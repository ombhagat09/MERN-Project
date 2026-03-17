require("dotenv").config();

const express = require('express')
const connectDB = require("./config/db")
const authRoutes = require("./routes/auth.route");
const taskRoutes = require("./routes/task.route")
const cors = require("cors")

const app = express();
app.use(cors())
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes)


app.get('/', (req, res) => {
    res.send('Hellow World')
});

app.listen(3000, () => {
    console.log("server is running on port 3000")
})