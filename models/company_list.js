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
				// created join table here called "following"
				company_list.belongsToMany(models.User, {through: 'Following'})
			}
		},
	   	timestamps: false
	});
	return company_list;
};
