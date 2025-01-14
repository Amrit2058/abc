const express = require("express");
const cors = require("cors");
const issueRoutes = require("./routes/issueRoutes");
const archiveRoutes = require("./routes/archiveRoutes");
const connectDB = require("./db/connect");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.use("/issues", issueRoutes);
app.use("/archives", archiveRoutes);

app.listen(5001, async () => {
    console.log("Server is running on port 5001");
});

module.exports = app;
