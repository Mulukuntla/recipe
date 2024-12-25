const review= require("../models/reviews")
const User= require("../models/user")
const addReview=async (req, res) => {
    const { rating, comment } = req.body;
    const userId = req.user.id;
    const { recipeId } = req.params;
  
    try {
      const reviews = await review.create({ userId, recipeId, rating, comment });
      res.status(201).json({ message: "Review added successfully!", reviews });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to add review." });
    }
 
};

  const getReviews=async (req, res) => {
    const { recipeId } = req.params;
  
    try {
      const reviews = await review.findAll({
        where: { recipeId },
        include: [{ model: User, attributes: ["userName"] }],
      });
      res.status(200).json(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch reviews." });
    }
  };
  module.exports={
    addReview,
    getReviews,
  }