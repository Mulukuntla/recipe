
const Favorite=require("../models/favorite")
const Collection=require("../models/collection")
const CollectionRecipe=require("../models/collectionRecipe")
const Recipe=require("../models/recipes")
const addRecipe=async (req, res) => {
    const userId = req.user.id;
    const { recipeId } = req.params;
  
    try {
      console.log("Hii")
      // Check if the recipe is already in favorites
      const existingFavorite = await Favorite.findOne({ where: { userId, recipeId } });
      if (existingFavorite) {
        return res.status(400).json({ message: 'Recipe already in favorites.' });
      }
  
      const favorite=await Favorite.create({ userId, recipeId });
      res.status(200).json({ message: 'Recipe added to favorites!',favorite:favorite });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Failed to add recipe to favorites.' });
    }
  };

  const addCollection=async (req, res) => {
    const userId = req.user.id;
    const { collectionName } = req.body;
  
    try {
      const collection = await Collection.create({ userId, name: collectionName });
      res.status(201).json({ message: 'Collection created!', collection });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create collection.' });
    }
  };

  // POST /collections/:collectionId/:recipeId
const addRecipeCollection=async (req, res) => {
    const { collectionId, recipeId } = req.params;
  
    try {
      const collection = await Collection.findByPk(collectionId);
      if (!collection) {
        return res.status(404).json({ message: 'Collection not found.' });
      }
  
      const recipe = await Recipe.findByPk(recipeId);
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found.' });
      }
  
      // Add recipe to collection
      const favorite=await CollectionRecipe.create({ collectionId, recipeId });
      res.status(200).json({ message: 'Recipe added to collection!',favorite:favorite,userId:req.user.id });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add recipe to collection.' });
    }
  };

  // GET /favorites
const favorites=async (req, res) => {
    const userId = req.user.id;
  
    try {
      const favorites = await Favorite.findAll({ where: { userId }, include: { model: Recipe } });
      const collections = await Collection.findAll({
        where: { userId },
        include: { model: Recipe }
      });
      res.status(200).json({ favorites, collections });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Failed to fetch favorites and collections.' });
    }
  };





  const allfavorites=async (req, res) => {
    const userId = req.user.id; // User ID from the authenticated request
  
    try {
      // Fetch favorite recipes
      const favorites = await Favorite.findAll({
        where: { userId },
        include: {
          model: Recipe, // Include associated recipe details
          attributes: ["id", "title"], // Select specific recipe fields
        },
      });
  
      // Fetch collections with recipes
      const collections = await Collection.findAll({
        where: { userId },
        include: {
          model: Recipe, // Include recipes in each collection
          attributes: ["id", "title"], // Select recipe fields to include in collections
          through: { attributes: [] }, // Exclude intermediate table fields
        },
      });
  
      res.status(200).json({ favorites, collections });
    } catch (error) {
      console.error("Error fetching favorites and collections:", error);
      res.status(500).json({ error: "Failed to fetch favorites and collections." });
    }
  };
  const followfavorites=async (req, res) => {
    const userId = req.params.id;
  
    try {
      const favorites = await Favorite.findAll({ where: { userId }, include: { model: Recipe } });
      const collections = await Collection.findAll({
        where: { userId },
        include: { model: Recipe }
      });
      res.status(200).json({ favorites, collections });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Failed to fetch favorites and collections.' });
    }
  };
  
  





  module.exports={
    addRecipe,
    addCollection,
    addRecipeCollection,
    favorites,
    allfavorites,
    followfavorites,
  }