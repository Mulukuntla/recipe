const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const review = sequelize.define("review", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    
  },
  recipeId: {
    type: Sequelize.INTEGER,
   
  },
  rating: {
    type: Sequelize.INTEGER,
   
    validate: {
      min: 1,
      max: 5,
    },
  },
  comment: {
    type: Sequelize.TEXT,
    
  },
});

module.exports = review;