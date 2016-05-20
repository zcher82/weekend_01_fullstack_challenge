$(document).ready(function () {

  var totalMonthlySal = 0;
//event listeners
$('#employeeinfo').on('submit', createEmployee);

});


//create employee function, called when submit button on form is clicked
  function createEmployee() {
    event.preventDefault();

    var employees = {};

    $.each($('#employeeinfo').serializeArray(), function (i, field) {
      employees[field.name] = field.value;
    });
    console.log(employees);
    $('#employeeinfo')[0].reset();  //reset form fields

    $.ajax({
      type: 'POST',
      url: '/employees',
      data: employees, //data posted is the employees array
      success: function (response) { //response is the response from the server, usually true or false
        console.log(response);

        getEmployees();
      },
    });
  }

  //function to get employee from the server, called after the post request after clicking submit
  function getEmployees() {
    $.ajax({
      type: 'GET',
      url: '/employees',
      success: function (data) {  //"data" can be called anything, in this case "data" is now referencing the name of the array filled with objects returned from database
        $('#empContainer').empty();
        data.forEach(function(employee, i) { //"employee" can be called anything, in this case it's referring to each object in the returned array. once we "forEach" the data array, we get single "employee" objects


          $('#empContainer').append('<div class="person"></div>'); //this means, for each object in the array above, append a new div container with class "person"
          var $el = $('#empContainer').children().last();
          $el.data("id", employee.id); //assigned unique identifier is the id from employees table. ** each object is called employee though.


          //appending data from server to DOM (server info came from database)
          $el.append('<p>' + 'Employee Name: ' + employee.first_name + ' ' +
            employee.last_name + '</p>');
          $el.append('<p>' + 'Employee ID: ' + employee.employee_id + '</p>');
          $el.append('<p>' + 'Title: ' + employee.employee_title + '</p>');
          //$el.append('<p>' + 'Salary: $' + empInfo.employeeannualsalary + '</p>');
          $el.append('<p class="sal">Salary: $<span class="salary">' + employee.annual_salary + '</span></p>');


          //create and append delete button
          $el.append('<div class="deleteEmp"><button>Remove Employee</button></div>');
          $('#container .deleteEmp').css({'marginBottom': '30px', 'width': '100px',
            'marginLeft': 'auto', 'marginRight': 'auto'});

          $('#totalsalaries').find('span').empty(); //empties the span field in prep for new data
          updateSalaryTotal(); // call updateSalaryTotal function to update the company's total MONTHLY salary
        })
      }
    });
  }

//function to update company's total MONTHLY salary
  function updateSalaryTotal() {
    $.ajax({
      type: 'GET',
      url: '/salaries',
      success: function (data) { //data is the name of the array (containing objects) that is sent over through the GET request
        console.log(data);
        var amount = 0;  //variable to hold the total amount of all employee annual salaries
        for(i = 0; i < data.length - 1; i++) {
          amount += data[i].annual_salary;  // ** data[i] translates into the object at index[i] in the data object. ** annual_salary is the property of the object
          console.log(amount);
        }

        $('#totalsalaries').find('span').text(' $' + Math.round(amount/12));  //divides amount by 12 months to account for total MONTHLY salary and posts it to DOM
      }
    });
  }
  getEmployees();
