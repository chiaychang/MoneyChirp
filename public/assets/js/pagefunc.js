$(document).ready(function() {
	// signup jQuery capter of the sign up form
	var signUpForm = $("form.signup");
	var emailInput = $("input#email-input");
	var passwordInput = $('input#password-input');

	//mambers seach company capture of the form
	var searchForm = $("form.search-add");
	var companySearch = $("input#search-input");


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


	searchForm.on("submit", function(event) {
		event.preventDefault();

		var searchData = {
			search: companySearch.val().trim().toUpperCase()
		};
		
		searchCompany(searchData.search);
		companySearch.val("");
	});


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


	// function searchCompany(company) {
	// 	//its important that we route to search vs. members like we did in the signup function
	// 	//the scrip currently stops here
	// 	$.post("/api/search", {
	// 		company_name: company
	// 	}).then(function(data) {
	// 		window.location.href = "/members";
	// 	}).catch(function(err) {
	// 		console.log(err);
	// 	});
	// }


	function searchCompany(company) {
		//function for join table
	}

});





























