const Sequelize = require("sequelize");
const sequelize = new Sequelize("recipies","root","Saketh@1234",{
    dialect:"mysql",
    host:"localhost"
});

module.exports=sequelize;