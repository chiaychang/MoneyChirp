// var orm = require("./orm.js");

// var company_list = {
// 	create: function(cols, vals, cb) {
// 		orm.create("company_list", cols, vals, function(res) {
// 			cb(res);
// 		});
// 	}
// };

// module.exports = company_list;

module.exports = function(sequelize, DataTypes) {
	const company_list = sequelize.define("company_list", {
		company_name: {
			type: DataTypes.STRING,
			allNull: true
		},
		twitter_handle: {
			type: DataTypes.STRING,
			allNull: true
		},
		stock_sym: {
			type: DataTypes.STRING,
			allNull: true
		}
	}, {
		classMethods: {
			associate: function(models) {
				company_list.belongsToMany(models.User, {through: 'Following'})
			}
		}
	},
	 {
		timestamps: false
	});
	return company_list;
};
