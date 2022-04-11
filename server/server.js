const express = require('express');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8700;

//Body Parser
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
app.use(bodyParser.json({limit: '50mb', extended: true, parameterLimit: 1000000}));

// Requiring our models for syncing
const db = require("./models");

app.use(cors());

// // middleware
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
// app.use(bodyParser.json({limit: '50mb', extended: true, parameterLimit: 1000000}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
})

// Static directory
app.use(express.static("public"));



// Routes
const routes = require('./routes/apiRoutes');

app.use(routes);
app.use(express.static('../client/build'))
app.use( '/*' , express.static('../client/build'));


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, () => {
      console.log("App listening on PORT " + PORT);
    });
  });

 

  module.exports = app;