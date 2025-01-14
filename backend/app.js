const express = require("express");
const cors = require("cors");
const issueRoutes = require("./routes/issueRoutes");
const connectDB = require("./db/connect");
require('dotenv').config()

console.log(process.env.DB_URI) // remove this after you've confirmed it is working
const app = express();

const SERVER_PORT = process.env.SERVER_PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.use("/issues", issueRoutes);

app.listen(SERVER_PORT, async () => {
    console.log("Server is running on port 5001");
});

module.exports = app;
