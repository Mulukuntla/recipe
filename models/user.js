const Sequelize=require("sequelize");

const sequelize=require("../util/database");

const user=sequelize.define("user",{
  id:{
    type: Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
  },
  userName: Sequelize.STRING,
  email:{
    type:Sequelize.STRING,
    unique:true
    
  },
  password:{
    type:Sequelize.STRING,
   
  },
  phone: {
    type:Sequelize.STRING,
    
  },
  street: {
    type:Sequelize.STRING,
   
  },
  apartment: {
    type:Sequelize.STRING,
  
  },
  zip: {
    type:Sequelize.STRING,
    
  },
  city: {
    type:Sequelize.STRING,
    
  },
  country: {
    type:Sequelize.STRING,
    
  },
  preferences: {
    type:Sequelize.JSON,
    
  },
  isApproved: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isnotApproved: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isAdmin:{
    type: Sequelize.BOOLEAN,
    defaultValue: false,
},
})
 


module.exports = user;
