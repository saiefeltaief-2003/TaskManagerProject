require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config({path: "./.env"});
mongoose.connect(process.env.DATABASE).then(() => (
    console.log("DB connection established.")
)).catch((error) => (
    console.log("Error: " + error)
));

const app = express();

const port = 1337;

app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

app.listen(port, () => (
    console.log("Listening to port " + port)
));