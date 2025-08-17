
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../frontend")));

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/agentsdb")
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// Schema & Model
const agentSchema = new mongoose.Schema({
    name: String,
    role: String,
    online: Boolean
});
const Agent = mongoose.model("Agent", agentSchema);

// Seed sample data
async function seedData() {
    const count = await Agent.countDocuments();
    if (count === 0) {
        await Agent.insertMany([
            { name: "Alex Johnson", role: "Sales AI", online: true },
            { name: "Sophia Lee", role: "Support AI", online: false },
            { name: "David Smith", role: "Marketing AI", online: true },
            { name: "Emma Brown", role: "Technical AI", online: false }
        ]);
        console.log("🌱 Sample agents seeded");
    }
}
seedData();

// API routes
app.get("/agents", async (req, res) => {
    const agents = await Agent.find();
    res.json(agents);
});

app.put("/agents/:id/toggle", async (req, res) => {
    const agent = await Agent.findById(req.params.id);
    if (!agent) return res.status(404).json({ error: "Agent not found" });
    agent.online = !agent.online;
    await agent.save();
    res.json(agent);
});

// Serve index.html for root
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Start server
app.listen(5000, () => console.log(`🚀 Server running on http://localhost:5000`));
