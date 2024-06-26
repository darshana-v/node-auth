const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const homeRoute = require("./routes/home");
const changeProfileRoute = require("./routes/changeProfile");

dotenv.config();

// connect to db
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log("Connected to mongodb")
);

// middleware
app.use(express.json());

// route middleware
app.use("/api/user", authRoute);
app.use("/api/home", homeRoute);
app.use("/api/changeProfile", changeProfileRoute);

app.listen(3000, () => console.log("Server running"));
