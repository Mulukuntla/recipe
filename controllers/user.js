const users= require("../models/user")
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken")


function isstringinvalid(string){
  console.log(string)
  if(string.length==0){
    
    return true
  }
  else{
    return false
  }

}

const signup= async (req,res,next) =>{
    
  try{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    const admin=req.body.admin
    console.log(name,email,password)
    if(isstringinvalid(name) || isstringinvalid(email) || isstringinvalid(password)){
      console.log("Hi")
      return res.status(400).json({err:"Bad parameters - Something is missing"})
    }
    const saltrounds=10
    console.log(saltrounds)
    bcrypt.hash(password,saltrounds,async (err,hash)=>{
      console.log(err)
      if(admin=="true"){
        await users.create({userName:name,email:email,password:hash,isAdmin:true})

      }
      else{
        await users.create({userName:name,email:email,password:hash})

      }
    
    
      res.status(201).json({message:"Successfully created a new user"})

    })
    
    
  }  
  catch(err){
    res.status(500).json(err);
  }
}

function generateAccessToken(id,name){
  return jwt.sign({userId:id,name:name},"hi")
  
}
function generateAccessTokens(id,name,isAdmin){
  return jwt.sign({userId:id,name:name,isAdmin:true},"hi")
  
}

const signin= async (req,res,next) =>{
    
  try{
    const email=req.body.email;
    const password=req.body.password;
    if( isstringinvalid(email) || isstringinvalid(password)){
     
      return res.status(400).json({message:"email or password is missing",success:false,})
    }
    const user=await users.findAll({ where: { email} })
      
      if(user.length>0){
        bcrypt.compare(password,user[0].password,(err,result)=>{
          if(err){
            throw new Error("Something went wrong")

          }
          if(result === true){
            console.log(user[0])
            if(user[0].isAdmin==true){
              return res.status(200).json({success:true,message:"User loggedin Successfully",admin:true,token:generateAccessTokens(user[0].id,user[0].userName,user[0].isAdmin)})

            }
            else{
              return res.status(200).json({success:true,message:"User loggedin Successfully",token:generateAccessToken(user[0].id,user[0].userName)})

            }
           
  
          }
          else{
            return res.status(401).json({success:false,message:"Password is incorrect"})
  
          }

        })
        
      }
      else{
        return res.status(404).json({success:false,message:"User not found"})

      }
     
  }  
  catch(err){
    res.status(500).json({message:err,success:false});
  }}








const user= async (req,res,next) =>{
    
  try{
    const userId=req.user.id
    const user=await users.findOne({where:{id:userId}})
    res.status(201).json({user:user})
   
    
  }  
  catch(err){
    console.log(err)
    res.status(500).json(err);
  }
}
const updatePreferences= async (req,res,next) =>{
    
  try{
    console.log(req.user.id)
    const user=await users.findOne({where:{id:req.user.id}})
    const userUpdate=await user.update({userName:req.body.userName,email:req.body.email,phone:req.body.phone,street:req.body.street,apartment:req.body.apartment,zip:req.body.zip,city:req.body.city,country:req.body.country})
    res.status(201).json({userUpdate:userUpdate})
    
    
    
    
  }  
  catch(err){
    console.log(err)
    res.status(500).json(err);
  }
}



    
module.exports={
    signup,
    signin,
    user,
    updatePreferences,

    
    
}