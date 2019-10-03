$(document).ready(function () {
  // Getting references to our form and input
  var addEmployeeForm = $("form.form-addAnEmployee");
  var employeeName = $("input#employeeName");
  var employeeDepartment = $("input#employeeDepartment");
  var employeePosition = $("input#employeePosition");
  var employeeAddress = $("input#employeeAddress");
  var employeeContactNumber = $("input#employeeContactNumber");
  var employeeDOB = $("input#employeeDOB");
  var employeeImage = $("input#employeeImage");
  var EmployerId;

  $.get("/api/employer_data").then(function (data) {
    EmployerId = data.id;
  });

  // When the signup button is clicked, we validate the email and password are not blank
  addEmployeeForm.on("submit", function (event) {
    // alert("you clic");
    event.preventDefault();
    var employeeData = {
      employeeName: employeeName.val().trim(),
      employeeDepartment: employeeDepartment.val().trim(),
      employeePosition: employeePosition.val().trim(),
      employeeAddress: employeeAddress.val().trim(),
      employeeContactNumber: employeeContactNumber.val().trim(),
      employeeDOB: employeeDOB.val().trim(),
      employeeImage: employeeImage.val().trim(),
      EmployerId: EmployerId
    };

    if (!employeeData.employeeName || !employeeData.employeeDOB) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    addEmployeeFun(employeeData);

    employeeName.val("");
    employeeDepartment.val("");
    employeePosition.val("");
    employeeAddress.val("");
    employeeContactNumber.val("");
    employeeDOB.val("");
    employeeImage.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function addEmployeeFun(employeeData) {
    $.post("/api/addEmployee", {
        employeeName: employeeData.employeeName,
        employeeDepartment: employeeData.employeeDepartment,
        employeePosition: employeeData.employeePosition,
        employeeAddress: employeeData.employeeAddress,
        employeeContactNumber: employeeData.employeeContactNumber,
        employeeDOB: employeeData.employeeDOB,
        employeeImage: employeeData.employeeImage,
        EmployerId: employeeData.EmployerId
      })
      .then(function (data) {
        console.log("::::::::::::::::::::::::::::::::::")
        if (data) {
          window.location.replace("/employer/dashboard");
          $("#employeeAddResultSuccess").removeClass("invisible");
          $("#employeeAddResultSuccess").text("Employee Added Successfully");
        } else {
          $("#employeeAddResultNotSuccess").removeClass("invisible");
          $("#employeeAddResultNotSuccess").text(
            "Employee Add Not Successful!"
          );
        }
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});