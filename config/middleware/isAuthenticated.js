module.exports = function(req, res, next) {
	//if the user is logged in they are pushed through the next();
	if (req.user) {
		return next();
	}
	//add logic to set req.user in login or sign up//

	//if no user in logged in they are directed to the home page
	return res.redirect("/");
}