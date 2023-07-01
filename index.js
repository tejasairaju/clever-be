const express = require("express");
const db = require("./models/index");

db.sequelize.sync();

const app = express();
// use json middleware
app.use(express.json());

// enable cors for all routes
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// import contact routes
const contactRoutes = require("./services/contacts");

// use contact routes
app.use("/api/contacts", contactRoutes);

// listen on port 5000
app.listen(8080, () => {
  console.log("Server started on port 5000");
});
