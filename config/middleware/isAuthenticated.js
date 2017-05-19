module.exports = function(req, res, next) {
	//if the user is logged in they are pushed through the next();
	if (req.user) {
		return next();
	}

	//if no user in logged in they are directed to the home page
	return res.redirect("/");
}