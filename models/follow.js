const Sequelize = require('sequelize');
const sequelize = require('../util/database'); // your sequelize instance

const follow = sequelize.define('follow', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  followerId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  followedId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = follow;