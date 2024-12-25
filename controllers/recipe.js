const recipes=require("../models/recipes")
const user=require("../models/user")
const S3service=require("../services/S3services")
const { Op } = require('sequelize');
const addRecipe=async (req, res) => {
    try {
        const file = req.file
        console.log(file)
        //let fileUrl;
        //const recipe = await recipe.create(req.body);
        //res.status(201).json(recipe);
        let fileUrl;
        if (file!==undefined) {
            fileUrl = await S3service.uploadToS3(file.buffer, `${Date.now()}-${file.originalname}`);
        }
        console.log(fileUrl)
        
        const sendMessage=await recipes.create({title:req.body.title,ingredients:req.body.ingredients,instructions:req.body.instructions,difficulty:req.body.difficulty,prepTime:req.body.preparationTime,dietaryPreferences:req.body.dietaryPreferences,imageUrl:fileUrl,userId:req.user.id})
        res.status(200).json({message:sendMessage})
    } catch (error) {
        console.log(error)
       
        res.status(500).json({ error: error.message });
    }
};
  
const getRecipe= async (req, res) => {
    try {
      
      const recipe = await recipes.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: user, // Include the User model
            attributes: ['userName'] // Only retrieve the userName attribute from the User model
          }
        ]
      });
      
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
      res.status(200).json({recipe:recipe});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const deleteRecipe=async (req, res) => {
    try {
      const recipess = await recipes.findOne({where:{id:req.params.id}});
      
      await recipess.destroy();
      res.status(204).json({"message":"ok"});
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message });
    }
  };
  
  const searchRecipe=async (req, res) => {
   
    try {
        console.log("Hi")
        const { title, dietaryPreferences, difficulty, maxPrepTime } = req.body;

        // Construct the query conditions
        const conditions = {};

        if (title) {
            conditions.title = { [Op.like]: `%${title}%` }; // Case-insensitive search
        }

        if (dietaryPreferences) {
            conditions.dietaryPreferences = dietaryPreferences;
        }

        if (difficulty) {
            conditions.difficulty = difficulty;
        }

        if (maxPrepTime) {
            conditions.prepTime = { [Op.lte]: parseInt(maxPrepTime) }; // Less than or equal to maxPrepTime
        }
        console.log(conditions)

       
        const recipess = await recipes.findAll({where: conditions});
        console.log(recipess)
       
        
        res.status(200).json({ recipes:recipess });
   
    }
     
     catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message });
    }
  };
  const getRecipeAll=async (req, res) => {
    try {
      
      const recipies=await recipes.findAll({where:{userId:req.user.id}})   
      const users=await user.findOne({where:{id:req.user.id}})
      res.status(200).json({recipes:recipies,id:req.user.id,userName:users.userName});
    } catch (error) {
      console
      res.status(500).json({ error: error.message });
    }
  };
  const getfollowRecipeAll=async (req, res) => {
    console.log("Hii")
    try {
      console.log("Hi")
      const recipies=await recipes.findAll({where:{userId:req.params.id}})   
      console.log(recipies)
      res.status(200).json({recipes:recipies});
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message });
    }
  };










  const editRecipe=async (req, res) => {
    try {
        const id=req.params.id
        const file = req.file
        console.log(file)
        console.log(id)
        //let fileUrl;
        //const recipe = await recipe.create(req.body);
        //res.status(201).json(recipe);
        const recipess = await recipes.findOne({where:{id:req.params.id}});
      
      
        let fileUrl;
        if (file!==undefined) {
            fileUrl = await S3service.uploadToS3(file.buffer, `${Date.now()}-${file.originalname}`);
        }
        console.log(fileUrl)
        
        const sendMessage=await recipess.update({id:id,title:req.body.title,ingredients:req.body.ingredients,instructions:req.body.instructions,difficulty:req.body.difficulty,prepTime:req.body.preparationTime,dietaryPreferences:req.body.dietaryPreferences,imageUrl:fileUrl,userId:req.user.id})
        res.status(200).json({message:sendMessage})
    } catch (error) {
        console.log(error)
       
        res.status(500).json({ error: error.message });
    }
};


const deletePic=async (req, res) => {
  try {
     
      const recipeId=req.params.id
      const recipe = await recipes.findOne({where:{id:recipeId}})
      const recipess=await recipe.update({imageUrl:null})
      res.status(200).json({ recipe:recipe });
  } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Failed to approve user' });
  }
}

  module.exports={
    addRecipe,
    getRecipe,
    deleteRecipe,
    searchRecipe,
    getRecipeAll,
    editRecipe,
    deletePic,
    getfollowRecipeAll,
  }
  
  