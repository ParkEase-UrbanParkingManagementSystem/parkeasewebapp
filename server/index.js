const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Use the PORT variable from the .env file or default to 3000
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); //req.body
app.use(cors());

// Routes
app.use("/auth", require("./routes/jwtAuth"));
app.use("/wardens", require("./routes/wardens"));
app.use("/pmc", require("./routes/pmcRoutes"));
app.use("/parkinglots", require("./routes/parkingLotRoutes"));
app.use("/driver", require('./routes/driverRoutes'));
app.use("/vehicle", require('./routes/vehicleRoutes'));

// // Dashboard route
// app.use("/dashboard", require("./routes/dashboard"))

app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});
