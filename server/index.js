const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const wardenAppController = require("./controllers/wardenAppController");



//middleware
app.use(express.json()) //req.body
app.use(cors())

//ROUTES

//register and login routes

app.use("/auth", require("./routes/jwtAuth"));
app.use("/wardens", require("./routes/wardens"));
app.use("/pmc", require("./routes/pmcRoutes"));
app.use("/parkinglots", require("./routes/parkingLotRoutes"))
app.use("/driver", require('./routes/driverRoutes'));
app.use("/vehicle",require('./routes/vehicleRoutes'));
app.use("/parking",require('./routes/parkingRoute'));
app.use("/reviews", require('./routes/reviewRoutes'));
app.use("/card", require('./routes/cardRoutes'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/wardenApp", wardenAppController);
// app.get('/', (req, res) => {
//     res.send('Static file server running');
//   });
// //Dashboard route

// app.use("/dashboard", require("./routes/dashboard"))

app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});