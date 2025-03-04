const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user"); 
const Task=require("./models/task");
const app = express();
app.use(express.json()); 
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

mongoose.connect("mongodb://127.0.0.1:27017/taskmanager", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Connection Error:", err));

app.post('/users', async (req, res) => {
    try {
        console.log("Received Data:", req.body);
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        console.error("Error saving to DB:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.post('/login_det', async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });

        if (!user) {
            return res.json("No record existed");
        }
        if (user.password === password) {
            return res.json("Success");

        } else {
            return res.json("Incorrect password");
        }
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/task_show', async (req, res) => {
    try {
        console.log("Task Show Request Received:", req.body);

        const { userName, Todo, In_Progress, Completed } = req.body;
        const user = await User.findOne({ userName });

        if (!user) {
            console.log("User not found:", userName);
            return res.status(404).json({ error: "User not found" });
        }

        console.log("User found:", user);

        const updatedTask = await Task.findOneAndUpdate(
            { userId: user._id },
            { 
                $set: { 
                    Todo: Todo || [], 
                    In_Progress: In_Progress || [], 
                    Completed: Completed || [] 
                } 
            },
            { new: true, upsert: true }
        );

        console.log("Task saved successfully:", updatedTask);
        res.json(updatedTask);
        
    } catch (err) {
        console.error("Error saving task:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.post('/get_tasks', async (req, res) => {
    try {
        const { userName } = req.body;
        const user = await User.findOne({ userName });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const userTasks = await Task.findOne({ userId: user._id });

        if (!userTasks) {
            return res.json({ Todo: [], In_Progress: [], Completed: [] });
        }

        res.json(userTasks);
    } catch (err) {
        console.error("Error fetching tasks:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


 app.listen(5000, () => console.log("Server running on port 5000"));
