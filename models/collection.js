const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Collection = sequelize.define("Collection", {
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
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Associations
Collection.associate = models => {
  Collection.belongsTo(models.User, {
    foreignKey: "userId",
  });
  Collection.belongsToMany(models.Recipe, {
    through: models.CollectionRecipe,
    foreignKey: "collectionId",
  });
};

module.exports = Collection;