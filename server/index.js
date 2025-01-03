const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const wardenAppController = require("./controllers/wardenAppController");

//middleware
app.use(express.json()); // req.body
app.use(cors());

// Custom logging middleware to check if requests are going to "/parkinglots"
const logParkingLotRequest = (req, res, next) => {
    if (req.originalUrl.startsWith("/parkinglots")) {
        console.log("Request received at parkinglots endpoint.");
        
    }
    next(); // Call the next middleware or route handler
};

// Add the logParkingLotRequest middleware for routes under "/parkinglots"
app.use("/parkinglots", logParkingLotRequest);

// Routes
app.use("/auth", require("./routes/jwtAuth"));
app.use("/wardens", require("./routes/wardens"));
app.use("/pmc", require("./routes/pmcRoutes"));
app.use("/parkinglots", require("./routes/parkingLotRoutes"));
app.use("/driver", require('./routes/driverRoutes'));
app.use("/vehicle", require('./routes/vehicleRoutes'));
app.use("/parking", require('./routes/parkingRoute'));
app.use("/reviews", require('./routes/reviewRoutes'));
app.use("/card", require('./routes/cardRoutes'));
app.use("/admin", require('./routes/adminRoutes'));
app.use("/notifications", require('./routes/notificationRoutes'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/wardenApp", wardenAppController);

// Dashboard route
// app.use("/dashboard", require("./routes/dashboard"));

app.listen(5000, () => {
    console.log("The server is running on port 5000");
});
