const createError = require('http-errors');
const express = require("express"); 
const app = express();
const mongodb = require("./db/mongodb");
const routes = require("./routes");
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;



app
.use(bodyParser.json())
.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
})
.use("/", routes)
.use((err, req, res, next) => {
  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});


mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});


