$(document).ready(function() {
	var signuUpForm = $("form.signup");
	var emailInput = $("input#email-input");
	var passwordInput = $('input#password-input');

	signuUpForm.on("submit", function(event) {
		event.preventDefault();
		var userData = {
			email: emailInput.val().trim(),
			password: passwordInput.val().trim()
		};

		if (!userData.email || !userData.password) {
			return;
		}

		signUpUser(userData.email, userData.password);
		emailInput.val("");
		passwordInput.val("");
	});

	function signUpUser(email, password) {
		$.post("/api/signup", {
			email: email,
			password: password
		}).then(function(data) {
			console.log(data);
		}).catch(function(err) {
			console.log(err);
		});
	}

});