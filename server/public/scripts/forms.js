
$(document).ready(function() {
    var valuesArray = [];
    var totalMonthlySal = 0;

    //function on clicking submit button
    $('#employeeinfo').on('submit', function(event) {
      event.preventDefault();

      var values = {};
      $.each($('#employeeinfo').serializeArray(), function(i, field) {
        values[field.name] = field.value;
      });

      //push salary from values object to valuesArray
      valuesArray.push(parseInt(values.employeeannualsalary));
      //console.log(values);
      console.log(valuesArray);

      $('#employeeinfo').find('input[type=text]').val('');

      appendDom(values);
    });

    //append to DOM
    function appendDom(empInfo) {
      $('#empContainer').append('<div class="person"></div>');
      var $el = $('#empContainer').children().last();
      for (var i = 0; i < valuesArray.length; i++) {
        $el.data("id",i);
      }


      $el.append('<p>' + 'Employee Name: ' + empInfo.employeefirstname + ' ' +
        empInfo.employeelastname + '</p>');
      $el.append('<p>' + 'Employee ID: ' + empInfo.employeeid + '</p>');
      $el.append('<p>' + 'Title: ' + empInfo.employeejobtitle + '</p>');
      //$el.append('<p>' + 'Salary: $' + empInfo.employeeannualsalary + '</p>');
      $el.append('<p class="sal">Salary: $<span class="salary">' + empInfo.employeeannualsalary + '</span></p>');

      //update total monthly salary by calling calcTotalMonSal function
      $('#totalsalaries').find('span').text(' $' + Math.round(calcTotalMonSal(valuesArray)));

      //create and append delete button
      $el.append('<div class="deleteEmp"><button>Remove Employee</button></div>');
      $('#container .deleteEmp').css({'marginBottom': '30px', 'width': '100px',
        'marginLeft': 'auto', 'marginRight': 'auto'});
    }


    //calculate total monthly salary by looping through salArray
    function calcTotalMonSal (salArray) {
      var totalSalary = 0;
      for (i = 0; i < salArray.length; i++) {
        totalSalary += salArray[i]/12;
      }
      return totalSalary;

    }

    //calculate/update total monthly salary after deleting an employee
    //remove employee
    $('#empContainer').on('click', 'button', function() {

      //remove the correct amount from valuesArray in order for it to be ran correctly with calcTotalMonSal function
      //choosing the right amount to delete from valuesArray
      //(this) would be choosing the correct monthly salary
      //append to DOM
      var number = $(this).parent().parent().data("id");
      console.log(number);
      valuesArray[number] = 0;
      $('#totalsalaries').find('span').text(' $' + Math.round(calcTotalMonSal(valuesArray)));

      console.log(valuesArray);
      $(this).parent().parent().remove();


    });








});
