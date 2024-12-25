const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const CollectionRecipe = sequelize.define("CollectionRecipe", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  collectionId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  recipeId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

// Associations
CollectionRecipe.associate = models => {
  CollectionRecipe.belongsTo(models.Collection, {
    foreignKey: "collectionId",
  });
  CollectionRecipe.belongsTo(models.Recipe, {
    foreignKey: "recipeId",
  });
};

module.exports = CollectionRecipe;