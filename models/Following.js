module.exports = function(sequelize, DataTypes) {
	const Following = sequelize.define("Following", {}, {timestamps: false} );
	return Following;
};