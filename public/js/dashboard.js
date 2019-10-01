$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/employer_data").then(function(data) {
    $(".employer-name").text("You ae loged in as " + data.email);
  });

});
