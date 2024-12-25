const Sequelize=require("sequelize");

const sequelize=require("../util/database");

const user=sequelize.define("recipe",{
    id:{
    type: Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
    },
    title:{
        type: Sequelize.STRING,

    },
    ingredients: {
        type: Sequelize.TEXT,
          
    },
    instructions: {
        type: Sequelize.TEXT,
    },
    difficulty: {
        type: Sequelize.STRING,
    },
    prepTime: {
        type: Sequelize.INTEGER,
    },
    dietaryPreferences: {
        type: Sequelize.STRING,
    },
    imageUrl: {
        type: Sequelize.STRING,
    }


  
 
})
 


module.exports = user;
