$(document).ready(function () {
  $.get("/api/allEmployee").then(function (dbEmployee) {


    for (let index = 0; index < dbEmployee.length; index++) {
      console.log(dbEmployee[0].id);
      $('#employeeList').append($('<option>', {
        value: dbEmployee[index].id,
        text: dbEmployee[index].employeeName
      }));
    }
  });
  $("#employeewebcam").on("click", function () {

    var id = $('#employeeList :selected').val();
    window.location.href = "webcam/?id=" + id;
  })

  $("#employeecheckin").on("click", function () {

    var id = $('#employeeList :selected').val();
    window.location.href = "checkin/?id=" + id;
  })

})