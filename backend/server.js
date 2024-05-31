const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db"); // Ensure the path is correct
require("dotenv").config(); // Add this line to load environment variables
const authRoute = require("./routes/auth"); // Ensure this path is correct

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the backend server");
});

// Routes
app.use("/api/auth", authRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
