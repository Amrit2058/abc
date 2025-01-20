const express = require("express");
const path = require('path');
const cors = require("cors");
const issueRoutes = require("./routes/issueRoutes");
const connectDB = require("./db/connect");

require('dotenv').config()
const app = express();

const SERVER_PORT = process.env.SERVER_PORT || 5006;

// Middleware
app.use(cors());
app.use(express.json());

connectDB();

// Serve static files from React build folder
app.use(express.static(path.join(__dirname, 'build')));

// Routes
app.use("/issues", issueRoutes);

// Catch-all for React routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(SERVER_PORT, async () => {
    console.log("Server is running on port 5001");
});

module.exports = app;
