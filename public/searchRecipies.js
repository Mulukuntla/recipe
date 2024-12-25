let recipename;
const searchRecipes = async () => {
    const title = document.getElementById('title').value;
    const dietaryPreferences = document.getElementById('dietaryPreferences').value;
    const difficulty = document.getElementById('difficulty').value;
    const maxPrepTime = document.getElementById('maxPrepTime').value;


    try {
        console.log("Hi")
        const obj={
            title:title,
            dietaryPreferences:dietaryPreferences,
            difficulty:difficulty,
            maxPrepTime:maxPrepTime,
        }
        const token=localStorage.getItem("token")
        const response = await axios.post(`http://localhost:4008/recipe/searchRecipes`,obj,{headers :{"Authorization" :token}})
        console.log(response)
        const recipes = response.data.recipes;

        const resultsDiv = document.getElementById('recipe-results');
        resultsDiv.innerHTML = '';

        if (recipes.length === 0) {
            resultsDiv.innerHTML = '<p>No recipes found</p>';
            return;
        }

        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card';
            recipeCard.innerHTML = `
                <h3>title:${recipe.title}</h3>
                <p>Difficulty: ${recipe.difficulty}</p>
                <p>Prep Time: ${recipe.prepTime} mins</p>
                <p>Dietary Preferences: ${recipe.dietaryPreferences || 'N/A'}</p>
                <hr>
            `;
            recipeCard.addEventListener("click",()=>{
                showRecipe(recipe.id)
            })
            resultsDiv.appendChild(recipeCard);
        });
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }


};

async function showRecipe(recipeId){
    console.log(recipeId)
    const token=localStorage.getItem("token")
    const response = await axios.get(`http://localhost:4008/recipe/getRecipes/${recipeId}`,{headers :{"Authorization" :token}});
    console.log(response)
    recipename=response.data.recipe.title
    console.log(recipename)
    
    const resultsDiv = document.getElementById('recipe-results');
    resultsDiv.innerHTML = '';
    const showRecipe = document.getElementById('showRecipe');
    const a=`
      
       <div onclick="seeProfile('${response.data.recipe.userId}','${response.data.recipe.user.userName}')"><h4>${response.data.recipe.user.userName}</h4></div><button id="followbutton" onclick="toggleFollow(${response.data.recipe.userId})">Follow</button><br><br>
       <img src="${response.data.recipe.imageUrl}" alt="${response.data.recipe.title}" width="500" height="500"/>
       <h2>title:${response.data.recipe.title}</h2>
       <p>Ingredients:${response.data.recipe.ingredients}</p>
       <p>Cooking Time:${response.data.recipe.prepTime}</p>
       <p>difficulty:${response.data.recipe.difficulty}</p>
       <p>cooking instructions:${response.data.recipe.instructions}</p>
       <div id="favorites">
            add to collection<button type="submit" onclick="favorite(${response.data.recipe.id})">favorite</button>
       </div>
       <div >
            add to favorite:<button type="submit" onclick="addfavorite(${response.data.recipe.id})">favorite</button>
       </div>
       <div id="reviews-container">
        <h2>add review</h2>
        <div>
          <form onsubmit="addReview(event)">
          <input type="hidden" name="recipeId" value="${recipeId}"></input>
          <input type="hidden" name="recipename" value="${response.data.recipe.title}"></input>
          <input type="number" id="rating" min="1" max="5" placeholder="Rating (1-5)" name="rating" />
          <textarea id="comment" placeholder="Leave a comment..." name="comment"></textarea>
          <button type="submit">Submit Review</button>
          <form>
        </div>
        <div id="reviews-list"></div>
    </div>
    `
    showRecipe.innerHTML=a
    fetchReviews(recipeId)
}









async function favorite(recipeId){
    console.log(recipeId)
    const token=localStorage.getItem("token")
    
    const response = await axios.get(`http://localhost:4008/favorite/favorites`,{headers :{"Authorization" :token}})
    console.log(response)
    const favorites=document.getElementById("favorites")
    console.log(favorites)
    favorites.innerHTML=""
    
    response.data.collections.forEach(element => {
       
        const b=`${element.name}:<button type="submit" onclick="addfavoritesrecipe(${element.id},${recipeId})">add</button>`
      
        favorites.innerHTML=favorites.innerHTML+b

        
    });
  
}



async function createCollection(event){
    event.preventDefault()
    console.log(event.target.collection.value)
    const token=localStorage.getItem("token")
    const obj={
        collectionName:event.target.collection.value
    }
    const response = await axios.post(`http://localhost:4008/favorite/collections`,obj,{headers :{"Authorization" :token}})
    console.log(response)
}





async function addfavoritesrecipe(collectionId,recipeId){
    console.log(collectionId)
    
    console.log(recipeId)

    const token=localStorage.getItem("token")
    const response = await axios.get(`http://localhost:4008/favorite/collections/${collectionId}/${recipeId}`,{headers :{"Authorization" :token}})
    console.log(response)
    logActivity(response.data.userId, 'recipe added to favorite', `Recipe titled "${recipename}" has been added`);

}

function seefavorites(){
    window.location.href = "./favorites.html";
}
async function addfavorite(recipeId){
    const token=localStorage.getItem("token")
    const response = await axios.get(`http://localhost:4008/favorite/favorites/${recipeId}`,{headers :{"Authorization" :token}})
    console.log(response)
    logActivity(response.data.favorite.userId, 'recipe added to favorite', `Recipe titled "${recipename}" has been added`);
}

async function fetchReviews(recipeId) {
    try {
        const token=localStorage.getItem("token")
        const response = await axios.get(`http://localhost:4008/review/allReviews/${recipeId}`,{headers :{"Authorization" :token}})
        console.log(response)
        renderReviews(response.data);
    } catch (error) {
        console.error("Error fetching reviews:", error.message);
    }
  }
  
  async function addReview(event) {
    event.preventDefault()
    const recipeId=event.target.recipeId.value
    const recipename=event.target.recipename.value
    const rating = event.target.rating.value
    const comment = event.target.comment.value
    console.log(recipeId,rating,comment)
    const obj={
        rating:rating,
        comment:comment,
    }
    try {
        const token=localStorage.getItem("token")
        const response = await axios.post(`http://localhost:4008/review/addReview/${recipeId}`,obj,{headers :{"Authorization" :token}})
        console.log(response)
        logActivity(response.data.reviews.userId, 'wrote a review', `Recipe titled "${recipename}" has been created.`);
      
      //fetchReviews(recipeId); // Refresh the reviews
    } catch (error) {
      console.error("Error adding review:", error.message);
    }
  }
  
  function renderReviews(reviews) {
    const reviewsList = document.getElementById("reviews-list");
    reviewsList.innerHTML = ""; // Clear existing reviews
    const a="<h2>all reviews</h2>"
    reviewsList.innerHTML=a
    reviews.forEach((review) => {
      const reviewItem = document.createElement("div");
      reviewItem.classList.add("review");
      reviewItem.innerHTML = `
       <h4> ${review.user.userName}:</h4> <p>${review.rating}/5</p>
        comment:<p>${review.comment}</p>
      `;
      reviewsList.appendChild(reviewItem);
    });
  }
  
  //document.getElementById("submit-review").addEventListener("click", () => {
  //  const recipeId = 1; // Replace with actual recipe ID
  //  addReview(recipeId);
  //});
  
  // Fetch reviews on page load
  async function toggleFollow(userId) {
    const token=localStorage.getItem("token")
    const response = await axios.get(`http://localhost:4008/follow/follow/${userId}`,{headers :{"Authorization" :token}})
    console.log(response)
    if (response.status === 200) {
      alert('Successfully followed!');
      // Update the UI accordingly (change button text to "Unfollow")
    } else {
      alert('Failed to follow.');
    }
  }
function feed(){
    window.location.href = "./feed.html";

}





async function logActivity(userId, activityType, description) {
    try {
      const token=localStorage.getItem("token")
      const obj={
        userId:userId,
        activityType:activityType,
        description:description,
      }
      const response = await axios.post(`http://localhost:4008/follow/activity`,obj,{headers :{"Authorization" :token}})
      console.log(response)
     
  
      console.log('Activity logged successfully:', response.data);
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  }


function seeProfile(userId,name){
  console.log("Hi")
  console.log(userId)
  localStorage.setItem("followId",userId)
  localStorage.setItem("followName",name)
  console.log(name)
  window.location.href = "./profile.html";
}