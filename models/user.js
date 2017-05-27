var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
	const User = sequelize.define("User", {
		// id: {
		// 	type: DataTypes.UUID,
		// 	primaryKey: true,
		// 	defaultValue: DataTypes.UUIDV4,
		// 	allowNull: false
		// },
		email: {
			type: DataTypes.STRING,
			// primaryKey: true,
			allowNull: false,
			//for testing lets leave this off
			// unique: true,
			validate: {
				isEmail: true
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNulll: false,
			// validate: {
			// 	len: [6, 18]
			// }
		},
		companyId: {
 			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		instanceMethods: {
			validPassword: function(password) {
				return bcrypt.compareSync(password, this.password);
			}
		},
		hooks: {
			beforeCreate: function(user, options, cb) {
				user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(12), null);
				cb(null, options);
			}
		},
		//connecting info here to the following companies table
		classMethods: {
			associate: function(models) {
				//new JOIN table
				User.belongsToMany(models.company_list, {through: models.Following})
				// User.hasMany(models.company_list, { foreignKey: 'email', allowNull: false})
			},
			validPassword: function(password, passwd, done, user) {
				bcrypt.compare(password, passwd, function(err, isMatch){
					if (err) console.log(err);
					if (isMatch) {
						return done(null, user)
					}
					else {
						return done(null, false)
					}
				});
			}
		},
		timestamps: false
	});

	return User;
};






