const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user"); 

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

app.listen(5000, () => console.log("Server running on port 5000"));

