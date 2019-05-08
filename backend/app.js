const express    = require("express");
const bodyParser = require("body-parser");
const app        = express();
const sequelize  = require('./database');
const task       = require("./routes/task");
const category   = require("./routes/category");
const message    = require("./routes/message");
const Task       = require("./Models/task");
const Category   = require("./Models/category");
let seedDB       = require("./seedDB");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//This is for cross browser api calls and setting headers.
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS, PUT"
    );
    next();
  });


//registering routes
app.use("/api",task);
app.use("/api",category);
app.use("/api",message);
Category.hasOne(Task,{foreignKey:'cat_id',targetKey:'cat_id'});
//sequelize.sync().then(()=>seedDB());
//seedDB();
sequelize.sync();

module.exports = app;
