// // Get references to page elements
// var $signupBtn = $("#signup");
// var $signInBtn = $("#employerSignIn");
// var $addEmployee = $("#addEmployee");

// // The API object contains methods for each kind of request we'll make
// var API = {
//   saveEmployer: function(employer) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/employerRegister",
//       data: JSON.stringify(employer)
//     });
//   },
//   checkEmployer: function(employer) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/login",
//       data: JSON.stringify(employer)
//     }).done(function() {
//       window.location.assign("/dashboard");
//     });
//   },
//   getEmployees: function() {
//     return $.ajax({
//       url: "api/employees",
//       type: "GET"
//     });
//   }
//   // deleteExample: function(id) {
//   //   return $.ajax({
//   //     url: "api/examples/" + id,
//   //     type: "DELETE"
//   //   });
//   // }
// };

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshEployeeLists = function() {
//   API.getEmployees().then(function(data) {
//     var $employees = data.map(function(employee) {
//       var $a = $("<a>")
//         .text(employee.employeeName)
//         .attr("href", "/employee/" + employee.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($employees);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSignUp = function(event) {
//   event.preventDefault();

//   var employer = {
//     employerEmail: $("#employerEmail")
//       .val()
//       .trim(),
//     employerName: $("#employerName")
//       .val()
//       .trim(),
//     employerPassword: $("#employerPassword")
//       .val()
//       .trim(),
//     employerCompanyName: $("#employerCompanyName")
//       .val()
//       .trim()
//   };

//   API.saveEmployer(employer).then(function() {
//     // refreshEployeeLists();
//   });
// };

// var handleEmployerSignIn = function(event) {
//   event.preventDefault();
//   var employer = {
//     employerEmail: $("#email")
//       .val()
//       .trim(),
//     employerPassword: $("#password")
//       .val()
//       .trim()
//   };

//   API.checkEmployer(employer).then(function() {
//     refreshEployeeLists();
//   });
// };

// var addNewEmployee = function(event){
//   event.preventDefault();

//   var employee = {
//     employerEmail: $("#employerEmail")
//       .val()
//       .trim(),
//     employerName: $("#employerName")
//       .val()
//       .trim(),
//     employerPassword: $("#employerPassword")
//       .val()
//       .trim(),
//     employerCompanyName: $("#employerCompanyName")
//       .val()
//       .trim()
//   };

// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// // var handleDeleteBtnClick = function() {
// //   var idToDelete = $(this)
// //     .parent()
// //     .attr("data-id");

// //   API.deleteExample(idToDelete).then(function() {
// //     refreshExamples();
// //   });
// // };

// // Add event listeners to the submit and delete buttons
// $signupBtn.on("click", handleFormSignUp);
// $signInBtn.on("click", handleEmployerSignIn);
// $addEmployee.on("click", addNewEmployee);
// // $exampleList.on("click", ".delete", handleDeleteBtnClick);
