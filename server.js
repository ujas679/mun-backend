const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/munDB")
    .then(() => console.log("MongoDB Connected ✅"))
    .catch(err => console.log(err));

// Schema
const RegistrationSchema = new mongoose.Schema({
    name: String,
    email: String,
    committee: String,
    country: String
});

// Model
const Registration = mongoose.model("Registration", RegistrationSchema);

// Home Route
app.get("/", (req, res) => {
    res.send("MUN Backend Running 🚀");
});

// POST API (Save Data)
app.post("/register", async (req, res) => {
    try {
        const data = new Registration(req.body);
        await data.save();
        res.send("Registered Successfully ✅");
    } catch (error) {
        res.status(500).send("Error saving data ❌");
    }
});

// GET API (Fetch Data)
app.get("/registrations", async (req, res) => {
    try {
        const data = await Registration.find();
        res.json(data);
    } catch (error) {
        res.status(500).send("Error fetching data ❌");
    }
});

// Server Start
app.listen(3000, () => {
    console.log("Server running on port 3000 🚀");
});