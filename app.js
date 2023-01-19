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
.use("/", routes); 

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});


