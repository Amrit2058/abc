const express = require("express");
const cors = require("cors");
const issueRoutes = require("./routes/issueRoutes");
const connectDB = require("./db/connect");
const path = require("path");

require('dotenv').config();
const app = express();

const PORT = process.env.SERVER_PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.use("/issues", issueRoutes);

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
