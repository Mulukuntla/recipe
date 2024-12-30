var imageUrl;
async function loadUsers() {
    const token=localStorage.getItem("token")
    const response = await axios.get('http://51.20.172.55:4088/admin/users',{headers :{"Authorization" :token}});
    console.log(response)
    const users = response.data.users;

    const userList = document.getElementById('user-list');
    userList.innerHTML = '';

    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.innerHTML = `
            <p>${user.userName} (${user.email})</p>
            <button onclick="approveUser(${user.id})">Approve</button>
            <button onclick="notApproveUser(${user.id})">notApprove</button>
        `;
        userList.appendChild(userElement);
    });
}

async function approveUser(userId) {
    const token=localStorage.getItem("token")
    const response=await axios.get(`http://51.20.172.55:4088/admin/users/approve/${userId}`,{headers :{"Authorization" :token}});
    console.log(response)
    loadUsers();
}

async function notApproveUser(userId) {
    const token=localStorage.getItem("token")
    const response=await axios.get(`http://51.20.172.55:4088/admin/users/notApprove/${userId}`,{headers :{"Authorization" :token}});
    console.log(response)
    loadUsers();
}

loadUsers();
async function loadRecipes() {
    const token=localStorage.getItem("token")
    const response = await axios.get('http://51.20.172.55:4088/admin/recipes',{headers :{"Authorization" :token}});
    console.log(response)
    const recipes = response.data.recipe;


    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = '';

    recipes.forEach(recipe => {
        const recipeElement = document.createElement('div');
        recipeElement.innerHTML = `
            <p>${recipe.title} by ${recipe.user.userName}</p>
            <button onclick="deleteRecipe(${recipe.id})">Delete</button>
            <button onclick="showRecipe(${recipe.id})">seeRecipe</button>
        `;
        recipeList.appendChild(recipeElement);
    });
}

async function deleteRecipe(recipeId) {
    console.log("Hi")
    const token=localStorage.getItem("token")
    const response = await axios.delete(`http://51.20.172.55:4088/recipe/deleteRecipe/${recipeId}`,{headers :{"Authorization" :token}});
    console.log(response)
    loadRecipes();
}
loadRecipes();


async function showRecipe(recipeId){
    console.log(recipeId)
    const token=localStorage.getItem("token")
    const response = await axios.get(`http://51.20.172.55:4088/recipe/getRecipes/${recipeId}`,{headers :{"Authorization" :token}});
    console.log(response)
    recipename=response.data.recipe.title
    console.log(recipename)
    imageUrl=response.data.recipe.imageUrl
    
    const resultsDiv = document.getElementById('recipe-results');
    resultsDiv.innerHTML = '';
    const showRecipe = document.getElementById('showRecipe');
    const a=`
       <h4>${response.data.recipe.user.userName}</h4><br><br>
       <img src="${response.data.recipe.imageUrl}" alt="${response.data.recipe.title}" width="500" height="500"/>
       <h2>title:${response.data.recipe.title}</h2>
       <p>Ingredients:${response.data.recipe.ingredients}</p>
       <p>Cooking Time:${response.data.recipe.prepTime}</p>
       <p>difficulty:${response.data.recipe.difficulty}</p>
       <p>cooking instructions:${response.data.recipe.instructions}</p>
       <div id="edit">
            edit:<button type="submit" onclick="edit(${response.data.recipe.id})">edit</button>
       </div>
       
       
      
    `
    showRecipe.innerHTML=a
   
}
async function edit(recipeId){
    console.log("Hi")
    const showRecipe = document.getElementById('showRecipe');
    showRecipe.innerHTML=""
    const a=`
    <form id="recipeForm">
    <input type="hidden" id="userId"></input>
    <div class="form-group">
      <label>Title: <input type="text" id="title" required></label>
    </div>
    <div class="form-group">
      <label>Ingredients: <textarea id="ingredients" required></textarea></label>
    </div>
    <div class="form-group">
      <label>Instructions: <textarea id="instructions" required></textarea></label>
    </div>
    <div class="form-group">
        difficulty:<select id="difficulty">
            <option value="">All</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
        </select>
    </div>
    <div class="form-group">
      <label>Prep Time (mins): <input type="number" id="prepTime"></label>
    </div>
    <div class="form-group">
      dietaryPreferences:<select id="dietaryPreferences">
        <option value="">All</option>
        <option value="Vegetarian">Vegetarian</option>
        <option value="Vegan">Vegan</option>
        <option value="Gluten-Free">Gluten-Free</option>
      </select>
    </div>
    <button type="submit" id="submitRecipe">edit Recipe</button>
  </form>
    `
    showRecipe.innerHTML=a
    const b=` <img src="${imageUrl}" width="500" height="500"/>
    <button type="submit" onclick="deletePic(${recipeId})">delete pic</button><br><br>`
    showRecipe.innerHTML=showRecipe.innerHTML+b
    const token=localStorage.getItem("token")
    const response = await axios.get(`http://51.20.172.55:4088/recipe/getRecipes/${recipeId}`,{headers :{"Authorization" :token}});
    console.log(response)
    document.getElementById('title').value=response.data.recipe.title
    document.getElementById('ingredients').value=response.data.recipe.ingredients
    document.getElementById('instructions').value=response.data.recipe.instructions
    document.getElementById('difficulty').value=response.data.recipe.difficulty
    document.getElementById('prepTime').value=response.data.recipe.prepTime
    document.getElementById('dietaryPreferences').value=response.data.recipe.dietaryPreferences



    document.getElementById('recipeForm').addEventListener('submit', async (e) => {

        try {
          //await axios.post(apiBase, recipe);
          //alert('Recipe submitted successfully!');
          //fetchRecipes();
          e.preventDefault();
          
          const formData = new FormData();
          formData.append("title", document.getElementById('title').value); // Text message
          formData.append("ingredients",document.getElementById('ingredients').value);
          formData.append("instructions", document.getElementById('instructions').value); // Text message
          formData.append("difficulty",document.getElementById('difficulty').value);
          formData.append("preparationTime", document.getElementById('prepTime').value,); // Text message
          formData.append("dietaryPreferences",document.getElementById('dietaryPreferences').value);
          
         
          let response;
          
            const token=localStorage.getItem("token")
            response = await axios.post(`http://51.20.172.55:4088/recipe/addRecipe/${recipeId}`, formData, {
              headers: {
                  "Authorization" :token,
                  "Content-Type": "multipart/form-data",
              },
          });
      
          
    
          console.log(response)
         
        } catch (error) {
          console.error('Error submitting recipe:', error);
        }
      });

}
async function deletePic(recipeId){
    const token=localStorage.getItem("token")
    console.log(recipeId)
    const response = await axios.delete(`http://51.20.172.55:4088/admin/recipes/pic/${recipeId}`,{headers :{"Authorization" :token}});
    console.log(response)
}
