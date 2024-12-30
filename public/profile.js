const userId = localStorage.getItem("followId"); // Replace with the actual user ID
const names=document.getElementById("name")
names.textContent=localStorage.getItem("followName")
async function fetchUserData() {
    try {
        const token=localStorage.getItem("token")
        const response = await axios.get(`http://51.20.172.55:4088/recipe/getRecipes/follow/${userId}`,{headers :{"Authorization" :token}});
        console.log(response)
        const recipes = response.data.recipes;
        
       const responses = await axios.get(`http://51.20.172.55:4088/favorite/allfavorites/follow/${userId}`,{headers :{"Authorization" :token}})
       console.log(responses)
       const favorite = responses.data.favorites;
       const collections=responses.data.collections

      
        // Display data
        displayData(recipes, 'recipes-container');
        displayfavorite(favorite, 'favorites-container');
        displaycollections(collections, 'collections-container');
        
    } catch (error) {
        console.log(error)
        console.error('Error fetching user data:', error);
    }
}

function displayData(items, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    if (items.length === 0) {
        container.innerHTML = '<p>No items to display.</p>';
        return;
    }

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <img src="${item.imageUrl || 'placeholder.jpg'}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p><strong>Ingredients:</strong> ${item.ingredients}</p>
            <p><strong>Preparation Time:</strong> ${item.prepTime || 'N/A'} minutes</p>
            <p><strong>Difficulty:</strong> ${item.difficulty || 'N/A'}</p>
           
            
        `;

        container.appendChild(card);
    });
}
function displayfavorite(items, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    if (items === 0) {
        container.innerHTML = '<p>No items to display.</p>';
        return;
    }

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <img src="${item.recipe.imageUrl || 'placeholder.jpg'}" alt="${item.recipe.title}">
            <h3>${item.recipe.title}</h3>
            <p><strong>Ingredients:</strong> ${item.recipe.ingredients}</p>
            <p><strong>Preparation Time:</strong> ${item.recipe.prepTime || 'N/A'} minutes</p>
            <p><strong>Difficulty:</strong> ${item.recipe.difficulty || 'N/A'}</p>
           
            
        `;

        container.appendChild(card);
    });
}



function displaycollections(items, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    if (items === 0) {
        container.innerHTML = '<p>No items to display.</p>';
        return;
    }

    items.forEach(item => {
        
        const card = document.createElement('div');
        card.className = 'card';
        console.log(item.recipes)
        item.recipes.forEach(itemss =>{
            console.log(itemss)
            
            card.innerHTML = `
            <img src="${itemss.imageUrl || 'placeholder.jpg'}" alt="${itemss.title}">
            <h3>${itemss.title}</h3>
            <p><strong>Ingredients:</strong> ${itemss.ingredients}</p>
            <p><strong>Preparation Time:</strong> ${itemss.prepTime || 'N/A'} minutes</p>
            <p><strong>Difficulty:</strong> ${itemss.difficulty || 'N/A'}</p>
        
            
            `;

            container.appendChild(card);
        })

    });
}

function viewDetails(itemId) {
    alert(`View details for item ID: ${itemId}`);
    // You can implement redirection or a modal popup here
}

// Load data on page load
fetchUserData();