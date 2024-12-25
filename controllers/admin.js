// Approve User
const Recipe= require("../models/recipes")
const User= require("../models/user")
const approve=async (req, res) => {
    try {
        const { userId } = req.params;
        if(!req.user.isAdmin){
            return res.status(400).json({message:"you are not an admin"})
        }

        const user = await User.findOne({where:{id:userId}});

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.isApproved = true; // Set status to approved
        await user.save();

        res.status(200).json({ message: 'User approved successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to approve user' });
    }
}
const notApprove=async (req, res) => {
    try {
        if(!req.user.isAdmin){
            return res.status(400).json({message:"you are not an admin"})
        }
        const { userId } = req.params;
        const user = await User.findOne({where:{id:userId}});

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.isnotApproved = true; // Set status to banned
        await user.save();

        res.status(200).json({ message: 'User notApproved successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to ban user' });
    }
};


const notApproveRecipe=async (req, res) => {
    try {
        if(!req.user.isAdmin){
            return res.status(400).json({message:"you are not an admin"})
        }
        const { recipeId } = req.params;
        const recipe = await Recipe.findByPk({where:{id:recipeId}});

        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        const recipess=await recipe.destroy();

        res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to delete recipe' });
    }
};


const users=async (req, res) => {
    try {
        if(!req.user.isAdmin){
            return res.status(400).json({message:"you are not an admin"})
        }
        console.log(req.user.id)
        const user = await User.findAll()

       

        res.status(200).json({users:user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to approve user' });
    }
}
const recipes=async (req, res) => {
    try {
        if(!req.user.isAdmin){
            return res.status(400).json({message:"you are not an admin"})
        }
        const recipe = await Recipe.findAll({
            include: [
              {
                model: User, // Include the User model
                attributes: ['userName'] // Only retrieve the userName attribute from the User model
              }
            ]
        });



        res.status(200).json({ recipe:recipe });
    } catch (error) {
        res.status(500).json({ error: 'Failed to approve user' });
    }
}
const deletePic=async (req, res) => {
    try {
        if(!req.user.isAdmin){
            return res.status(400).json({message:"you are not an admin"})
        }
        const recipeId=req.params.id
        const recipe = await Recipe.findOne({where:{id:recipeId}})
        const recipess=await recipe.update({imageUrl:null})
        res.status(200).json({ recipe:recipe });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to approve user' });
    }
}


module.exports={
    approve,
    notApprove,
    notApproveRecipe,
    users,
    recipes,
    deletePic,
}