const express = require("express");
const app = express();
const cors = require("cors");


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

// //Dashboard route

// app.use("/dashboard", require("./routes/dashboard"))

app.listen(5000,()=>{
    console.log("The server is running on port 5000");
})