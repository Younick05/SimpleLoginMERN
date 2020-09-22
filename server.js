const express = require("express");

const cors = require("cors");

const app = express();

require("./model");

app.use(cors());

app.use(express.urlencoded({extended:false}));

app.use(express.json({extended:false}));

const userRoutes = require("./routes/user.routes");

app.use("/api/user", userRoutes);


app.listen(5151, () => {
    console.log("server started")
});