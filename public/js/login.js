$(document).ready(function() {
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var emailInput = $("input#employerEmail");
  var passwordInput = $("input#employerPassword");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      employerEmail: emailInput.val().trim(),
      employerPassword: passwordInput.val().trim()
    };

    if (!userData.employerEmail || !userData.employerPassword) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(employer) {
    $.post("/api/login", {
      employerEmail: employer.employerEmail,
      employerPassword: employer.employerPassword
    })
      .then(function(data) {
        if (data) {
          window.location.replace("/employer/dashboard");
        } else {
          $("#loginAlert").removeClass("invisible");
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});
