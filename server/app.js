var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var employees = require('./routes/employees');
var salaries = require('./routes/salaries');


//middleware
app.use(bodyParser.urlencoded({ extended: true }));


//routes
app.use('/employees', employees);
app.use('/salaries', salaries);



// Catchall route
app.get('/*', function (req, res) {
  var file = req.params[0] || '/views/index.html';
  res.sendFile(path.join(__dirname, './public', file));
});

//set port
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
  console.log('Listening on port ', app.get('port'));
});
