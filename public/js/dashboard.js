$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/employer_data").then(function (data) {
    var eId = data.id;
    $(".employer-name").text("You are logged in as " + data.email);
    $(".employer-company").text(data.company);


    // get the list of the employess on the dashboard
    $.get("/api/employees/" + eId).then(function (dbEmployee) {

      console.log(dbEmployee[0].id)
      for (let index = 0; index < dbEmployee.length; index++) {
        var edit = '<button class="editBtn" ><i class="fas fa-edit"></i></button>';
        var del = '<button class="delBtn" data-delete = ' + dbEmployee[index].id + '><i class="fas fa-trash"></i></button>';
        var safe = '<button class="safeBtn" data-edit = ' + dbEmployee[index].id + ">&#10004;</button>";
        var canCel = '<button class="cancelBtn"><i class="fas fa-window-close"></i></button>';

        // Create the new row
        var newRow = $("<tr>").append(
          $("<td>").html(
            "<div class='row_data' edit_type='click' col_name='name'>" + dbEmployee[index].employeeName +
            "</div>"
          ),
          $("<td>").html(
            "<div class='row_data' edit_type='click' col_name='department'>" + dbEmployee[index].employeeDepartment +
            "</div>"
          ),
          // $("<td>").text(firstTrainTime),
          $("<td>").html(
            "<div class='row_data' edit_type='click' col_name='contact'>" + dbEmployee[index].employeeContactNumber +
            "</div>"
          ),

          $("<td>").html(edit + " " + del),
          $("<td>").html(safe + " " + canCel)
        );

        // Append the new row to the table
        $("#train-table > tbody").append(newRow);
        $(".safeBtn").hide();
        $(".cancelBtn").hide();

      }
    });

  });

  // 


  // Edit button, edits a row 
  $(document).on("click", ".editBtn", function (event) {
    event.preventDefault();

    var tbl_row = $(this).closest("tr");
    var row_id = tbl_row.attr("row_id");

    tbl_row.find(".safeBtn").show();
    tbl_row.find(".cancelBtn").show();
    tbl_row.find(".delBtn").hide();
    tbl_row.find(".editBtn").hide();

    tbl_row
      .find(".row_data")
      .attr("contenteditable", "true")
      .attr("edit_type", "button")
      .addClass("bg-warning")
      .css("padding", "3px");

    tbl_row.find(".row_data").each(function (index, val) {
      //this will help in case user decided to click on cancel button
      $(this).attr("original_entry", $(this).html());
    });
  });


  // delete button, deletes the whole row
  $(document).on("click", ".delBtn", function (event) {
    event.preventDefault();

    var recordID = $(this).attr("data-delete");

    // database.ref("trains/" + recordID).remove();
    $.ajax({
        method: "DELETE",
        url: "/api/employee/" + recordID
      })
      .then(function () {
        $(this).parent().parent().remove();
        window.location.reload("");
      });
  });

  // cancel to edit the row
  $(document).on("click", ".cancelBtn", function (event) {
    event.preventDefault();

    var tbl_row = $(this).closest("tr");

    var row_id = tbl_row.attr("row_id");

    //hide save and cacel buttons
    tbl_row.find(".safeBtn").hide();
    tbl_row.find(".cancelBtn").hide();
    tbl_row.find(".delBtn").show();
    tbl_row.find(".editBtn").show();

    //make the whole row editable
    tbl_row
      .find(".row_data")
      .attr("edit_type", "click")
      .removeClass("bg-warning")
      .css("padding", "");

    tbl_row.find(".row_data").each(function (index, val) {
      $(this).html($(this).attr("original_entry"));
    });
  });


  //--->save whole row entery > start
  $(document).on("click", ".safeBtn", function (event) {
    event.preventDefault();
    var tbl_row = $(this).closest("tr");

    // var row_id = tbl_row.attr('row_id');
    var data_edit = $(this).attr("data-edit");

    tbl_row.find(".safeBtn").hide();
    tbl_row.find(".cancelBtn").hide();
    tbl_row.find(".delBtn").show();
    tbl_row.find(".editBtn").show();

    //make the whole row editable
    tbl_row
      .find(".row_data")
      .attr("edit_type", "click")
      .removeClass("bg-warning")
      .css("padding", "");

    //--->get row data > start
    var newValues = [];
    tbl_row.find(".row_data").each(function (index, val) {
      var col_name = $(this).attr("col_name");
      var col_val = $(this).html();
      newValues[col_name] = col_val;
    });
    console.log("here: " + newValues);
    var updatedValues = {
      employeeName: newValues.name,
      employeeDepartment: newValues.department,
      employeeContactNumber: newValues.contact
    }

    $.ajax({
      url: '/api/update/' + data_edit,
      type: 'PUT',
      data: updatedValues,
      success: function (data) {
        if (data) {

        }
      }
    });


  });


});

function downloadCSV(csv, filename) {
  var csvFile;
  var downloadLink;

  // CSV file
  csvFile = new Blob([csv], {
    type: "text/csv"
  });

  // Download link
  downloadLink = document.createElement("a");

  // File name
  downloadLink.download = filename;

  // Create a link to the file
  downloadLink.href = window.URL.createObjectURL(csvFile);

  // Hide download link
  downloadLink.style.display = "none";

  // Add the link to DOM
  document.body.appendChild(downloadLink);

  // Click download link
  downloadLink.click();
}

function exportTableToCSV(filename) {
  var csv = [];
  var rows = document.querySelectorAll("table tr");

  for (var i = 0; i < rows.length; i++) {
    var row = [],
      cols = rows[i].querySelectorAll("td, th");

    for (var j = 0; j < cols.length; j++)
      row.push(cols[j].innerText);

    csv.push(row.join(","));
  }

  // Download CSV file
  downloadCSV(csv.join("\n"), filename);
}