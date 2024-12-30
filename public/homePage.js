async function user(){
  const token=localStorage.getItem("token")
  const  responseUser = await axios.get(`http://51.20.172.55:4088/user/user`,{headers :{"Authorization" :token}});
  console.log(responseUser)
  if(responseUser.data.user.isnotApproved==true){
    alert("you are not a user.create new one")
    window.location.href = "./signin.html";
    
  }

}
user()
// Submit Recipe
document.getElementById('recipeForm').addEventListener('submit', async (e) => {

  try {
    //await axios.post(apiBase, recipe);
    //alert('Recipe submitted successfully!');
    //fetchRecipes();
    e.preventDefault();
    const submit=document.getElementById("submitRecipe")
    console.log(submit.textContent)
    let a;
    if(submit.textContent=="edit"){
      console.log("Hi")
      a=true
    }
    else{
      a=false
    }
    const userId=document.getElementById("userId")
    console.log(userId.textContent)
    const formData = new FormData();
    formData.append("title", document.getElementById('title').value); // Text message
    formData.append("ingredients",document.getElementById('ingredients').value);
    formData.append("instructions", document.getElementById('instructions').value); // Text message
    formData.append("difficulty",document.getElementById('difficulty').value);
    formData.append("preparationTime", document.getElementById('prepTime').value,); // Text message
    formData.append("dietaryPreferences",document.getElementById('dietaryPreferences').value);
    const fileInput = document.getElementById("fileInput");
    console.log(formData)
    if (fileInput.files[0]) {
        formData.append("file", fileInput.files[0]); // Attach the file if selected
    }
    formData.forEach((value, key) => {
        console.log(`${key}:`, value);
    });
    console.log(formData)
    let response;
    if(a===true){
      console.log("Hi")
      const token=localStorage.getItem("token")
      response = await axios.post(`http://51.20.172.55:4088/recipe/addRecipe/${userId.textContent}`, formData, {
        headers: {
            "Authorization" :token,
            "Content-Type": "multipart/form-data",
        },
    });

    }
    else{
      const token=localStorage.getItem("token")
      console.log("Hi")
      response = await axios.post(`http://51.20.172.55:4088/recipe/addRecipe`, formData, {
        headers: {
            "Authorization" :token,
            "Content-Type": "multipart/form-data",
        },
    });

    }
      
   

    
    console.log(response)
    logActivity(response.data.message.userId, 'Created a new recipe', `Recipe titled "${response.data.message.title}" has been created.`);
    getRecipies()
  } catch (error) {
    console.error('Error submitting recipe:', error);
  }
});

// Fetch Recipes
async function fetchRecipes(){
  try {
    const response = await axios.get("http://51.20.172.55:4088/recipe/Recipe");
    const recipes = response.data;
    const recipesContainer = document.getElementById('recipes');
    recipesContainer.innerHTML = '';

    recipes.forEach((recipe) => {
      const recipeDiv = document.createElement('div');
      recipeDiv.className = 'recipe';
      recipeDiv.innerHTML = `
        <h3>${recipe.title}</h3>
        <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
        <p><strong>Instructions:</strong> ${recipe.instructions}</p>
        <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
        <p><strong>Prep Time:</strong> ${recipe.prepTime} mins</p>
        <p><strong>Dietary Preferences:</strong> ${recipe.dietaryPreferences}</p>
      `;
      recipesContainer.appendChild(recipeDiv);
    });
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }
}

  



  async function getRecipies(){
    const submit=document.getElementById("userId")
    console.log(submit.textContent)
    const token=localStorage.getItem("token")
    const response = await axios.get("http://51.20.172.55:4088/recipe/getRecipes",{headers :{"Authorization" :token}});
    console.log(response)
    localStorage.setItem("userId",response.data.id)
    localStorage.setItem("userName",response.data.userName)
    const recipes = response.data.recipes;
    console.log(recipes)
    const recipesContainer = document.getElementById('recipes');
    recipesContainer.innerHTML = '';
    recipes.forEach((recipe) => {
        const recipeDiv = document.createElement('div');
        recipeDiv.className = 'recipe';
        recipeDiv.innerHTML = `
          <h3>title:${recipe.title}</h3>
          <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
          <button type="submit" onclick="edit(${recipe.id})">edit</button>
          <button type="submit" onclick="delet(${recipe.id})">delete</button>
        `;
        
        recipesContainer.appendChild(recipeDiv);
      });

  }
  getRecipies()

  async function edit(recipeId){
    console.log("Hi")
    const token=localStorage.getItem("token")
    const response = await axios.get(`http://51.20.172.55:4088/recipe/getRecipes/${recipeId}`,{headers :{"Authorization" :token}});
    console.log(response)
    document.getElementById('title').value=response.data.recipe.title
    document.getElementById('ingredients').value=response.data.recipe.ingredients
    document.getElementById('instructions').value=response.data.recipe.instructions
    document.getElementById('difficulty').value=response.data.recipe.difficulty
    document.getElementById('prepTime').value=response.data.recipe.prepTime
    document.getElementById('dietaryPreferences').value=response.data.recipe.dietaryPreferences
    const recipeform=document.getElementById("recipeForm")
    console.log(recipeform)
    
    
    
    
    
    
    
    
    
    
    
    
    const edit=document.getElementById("submitRecipe")
    edit.textContent="edit"
    console.log(edit)
    const userId=document.getElementById("userId")
    userId.textContent=response.data.recipe.id
    console.log(userId)
    

  }
  
  
  
  
  
  
  
  
  async function delet(recipeId){
    console.log("Hi")
    const token=localStorage.getItem("token")
    const response = await axios.delete(`http://51.20.172.55:4088/recipe/deleteRecipe/${recipeId}`,{headers :{"Authorization" :token}});
    console.log(response)
    getRecipies()
    
}


function searchRecipies(){
    window.location.href = "./searchRecipies.html";

}
async function logActivity(userId, activityType, description) {
  try {
    const token=localStorage.getItem("token")
    const obj={
      userId:userId,
      activityType:activityType,
      description:description,
    }
    const response = await axios.post(`http://51.20.172.55:4088/follow/activity`,obj,{headers :{"Authorization" :token}})
    console.log(response)
   

    console.log('Activity logged successfully:', response.data);
  } catch (error) {
    console.error('Error logging activity:', error);
  }
}

async function deletePic(recipeId){
  console.log(recipeId)
  const token=localStorage.getItem("token")
  const response = await axios.delete(`http://51.20.172.55:4088/recipe/recipes/pic/${recipeId}`,{headers :{"Authorization" :token}})
  console.log(response)

}
