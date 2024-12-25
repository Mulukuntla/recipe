const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
  

const user = require('./routes/user');
const recipe = require('./routes/recipe');
const favorite = require('./routes/favorite');
const reviews = require('./routes/reviews');

const follows = require('./routes/follow');

const admin = require('./routes/admin');
const sequelize=require('./util/database')
const userTable = require("./models/user")
const recipeTable = require("./models/recipes")
const favoriteTable = require("./models/favorite")
const collectionTable = require("./models/collection")
const collectionRecipeTable = require("./models/collectionRecipe")
const reviewsTable = require("./models/reviews")
//const followTable = require("./models/follow")
//const activityTable = require("./models/activity")
const follow = require('./models/follow'); 
const activity = require('./models/activity');









var cors=require("cors")
const app = express();
const dotenv = require('dotenv');

// get config vars
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

userTable.hasMany(favoriteTable, { foreignKey: "userId" });
favoriteTable.belongsTo(userTable, { foreignKey: "userId" });

recipeTable.hasMany(favoriteTable, { foreignKey: "recipeId" });
favoriteTable.belongsTo(recipeTable, { foreignKey: "recipeId" });

userTable.hasMany(collectionTable, { foreignKey: "userId" });
collectionTable.belongsTo(userTable, { foreignKey: "userId" });

collectionTable.belongsToMany(recipeTable, { through: collectionRecipeTable, foreignKey: "collectionId" });
recipeTable.belongsToMany(collectionTable, { through: collectionRecipeTable, foreignKey: "recipeId" });
userTable.hasMany(recipeTable,{ foreignKey: "userId" }); // User has many Posts
recipeTable.belongsTo(userTable,{ foreignKey: "userId" }); 
userTable.hasMany(reviewsTable, { foreignKey: "userId" });
reviewsTable.belongsTo(userTable, { foreignKey: "userId" });

recipeTable.hasMany(reviewsTable, { foreignKey: "recipeId" });
reviewsTable.belongsTo(recipeTable, { foreignKey: "recipeId" });




















follow.belongsTo(userTable, { foreignKey: 'followerId', as: 'follower' });
follow.belongsTo(userTable, { foreignKey: 'followedId', as: 'followed' });

// A user can have many activities (one-to-many relationship)
userTable.hasMany(activity, { foreignKey: 'userId' });
activity.belongsTo(userTable, { foreignKey: 'userId' });







































app.use("/user",user)
app.use("/recipe",recipe)
app.use("/favorite",favorite)
app.use("/review",reviews)
app.use("/follow",follows)
app.use("/admin",admin)


 // Add a userId field in the Salon table















app.get('/search', (req, res) => {
  const query = req.query.query;
  const page = req.query.page;
  console.log(query)
  console.log(page)
  // Process the search logic here
  res.send(`Search query: ${query}, Page: ${page}`);
});



//cron.schedule("* * * * *", async () => {
//  console.log("Starting cron job to archive old messages...");
// await archieveMessages.archieveMessages();}, {
//  scheduled: true,
  
//});



sequelize
.sync()
.then(result =>{
  console.log(result)
  const PORT = process.env.PORT || 4008; // Change to a different port
  app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
})
.catch(err =>{
  console.log(err)
})


