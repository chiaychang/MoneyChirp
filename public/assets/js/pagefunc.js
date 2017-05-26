$(document).ready(function() {
<<<<<<< HEAD
=======
	// signup jQuery capter of the sign up form
>>>>>>> c6f5e2d296c9c95418c2fff33305cc9d4bca150a
	var signUpForm = $("form.signup");
	var emailInput = $("input#email-input");
	var passwordInput = $('input#password-input');

<<<<<<< HEAD
=======
	//mambers seach company capture of the form
	var searchForm = $("form.search-add");
	var companySearch = $("input#search-input");


>>>>>>> c6f5e2d296c9c95418c2fff33305cc9d4bca150a
	signUpForm.on("submit", function(event) {
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

<<<<<<< HEAD
=======

	// searchForm.on("submit", function(event) {
	// 	event.preventDefault();

	// 	var searchData = {
	// 		search: companySearch.val().trim(),
	// 		email: userEmail
	// 	};
		
	// 	followCompany(searchData.search, searchData.email);
	// 	companySearch.val("");
	// });


>>>>>>> c6f5e2d296c9c95418c2fff33305cc9d4bca150a
	function signUpUser(email, password) {
		$.post("/api/signup", {
			email: email,
			password: password
		}).then(function(data) {
			window.location.replace(data);
		}).catch(function(err) {
			console.log(err);
		});
	}

<<<<<<< HEAD
});
=======

	// function followCompany(company, user) {
	// 	//its important that we route to search vs. members like we did in the signup function
	// 	//the scrip currently stops here
	// 	$.post("/api/search", {
	// 		company_name: company,
	// 	}).then(function(data) {
	// 		window.location.href = "/members";
	// 	}).catch(function(err) {
	// 		console.log(err);
	// 	});
	// }

});





























>>>>>>> c6f5e2d296c9c95418c2fff33305cc9d4bca150a
