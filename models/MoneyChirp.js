

var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
	var mc_user = sequelize.define("mc_user", {
		email: {
			type: DataTypes.STRING,
			allNulll: false,
			validate: {
				isEmail: true
			}
		},
		password: {
			type: DataTypes.STRING,
			allNulll: false
		}
	}, {
		instanceMethods: {
			validPassword: function(password) {
				return bcrypt.compareSync(password, this.password);
			}
		},
		hooks: {
			beforeCreate: function(user, options, cb) {
				user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
				cb(null, options);
			}
		}
	});
	return mc_user;
};