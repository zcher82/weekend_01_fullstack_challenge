var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/mu';




router.get('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT * FROM employees', function (err, result) {
      done();
      res.send(result.rows); //database sends back data/rows as an array of objects
                              //with each row being it's own object
    });
  });
});

router.post('/', function (req, res) {
  var employees = req.body;


  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }
    console.log(employees);

    client.query('INSERT INTO employees (first_name, last_name, employee_id, employee_title, annual_salary) ' +
                  'VALUES ($1, $2, $3, $4, $5)',

                    //emplyees = the object sent over & employeefirstname = the property, which was given by the "name" field in input form of html
                   [employees.employeefirstname, employees.employeelastname, employees.employeeid, employees.employeejobtitle, employees.employeeannualsalary],
                 function (err, result) {
                   done();

                   if (err) {
                     res.sendStatus(500);
                     return;
                   }

                   res.send(true);
                 });
  });
});


module.exports = router;
