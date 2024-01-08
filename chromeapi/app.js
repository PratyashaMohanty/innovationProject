const express = require("express");
const cors = require("cors");
const userRouter = require("./Api/Routers/userRouter");
const tokenRouter = require("./Api/Routers/tokenRouter");
const accountRouter = require("./Api/Routers/accountRouter");

//setting the middleware:
const app = express();
app.use(express.json({
    //set the limit for uploading the data in each request
    limit: "500kb"
}));

app.use(cors());
app.options("*", cors());

// building the routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/tokens", tokenRouter);
app.use("/api/v1/account", accountRouter);

module.exports = app;