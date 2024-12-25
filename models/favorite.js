const Sequelize = require("sequelize");
const sequelize = require("../util/database");

// Import the User and Recipe models to establish associations


const Favorite = sequelize.define("Favorite", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  recipeId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

// Associations (as needed for relationships)
Favorite.associate = models => {
  // Define the relationship between Favorite and User
  Favorite.belongsTo(models.User, {
    foreignKey: "userId",
  });

  // Define the relationship between Favorite and Recipe
  Favorite.belongsTo(models.Recipe, {
    foreignKey: "recipeId",
  });
};

module.exports = Favorite;