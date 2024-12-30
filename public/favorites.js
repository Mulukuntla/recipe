const favoritesList = document.getElementById("favorites-list");
const collectionsList = document.getElementById("collections-list");

// Fetch Data from API
async function fetchFavoritesAndCollections() {
  try {
    const token=localStorage.getItem("token")
    
    const response = await axios.get(`http://51.20.172.55:4088/favorite/allfavorites`,{headers :{"Authorization" :token}})
    console.log(response)

  
    const { favorites, collections } = response.data;

    console.log("Favorites:", favorites);
    console.log("Collections:", collections);

    // Populate your frontend using favorites and collections
    renderFavorites(favorites);
    renderCollections(collections);
  } catch (error) {
    console.error(error);
    favoritesList.innerHTML = `<p class="error">Error fetching favorites. Please try again later.</p>`;
    collectionsList.innerHTML = `<p class="error">Error fetching collections. Please try again later.</p>`;
  }
}

// Render Favorites
function renderFavorites(favorites) {
  if (favorites.length === 0) {
    favoritesList.innerHTML = "<p>No favorite recipes found.</p>";
    return;
  }

  favoritesList.innerHTML = favorites
    .map(
      (fav) => `
      <div class="item">
       
        <div class="item-details">
          <ul>
          <li>${fav.recipe.title}</li>
          <ul>
        </div>
       
      </div>
    `
    )
    .join("");
}

// Render Collections
function renderCollections(collections) {
  if (collections.length === 0) {
    collectionsList.innerHTML = "<p>No collections found.</p>";
    return;
  }

  collectionsList.innerHTML = collections
    .map(
      (collection) => `
      <div class="item">
        <div class="item-details">
          <h3>collection:${collection.name}</h3>
          <ul>
            ${collection.recipes
              .map((recipe) => `<li>${recipe.title}</li>`)
              .join("")}
          </ul>
        </div>
      </div>
    `
    )
    .join("");
}

// Remove Favorite
async function removeFavorite(recipeId) {
  try {
    const response = await fetch(`/api/favorites/${recipeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    if (!response.ok) {
      throw new Error("Failed to remove favorite.");
    }

    // Re-fetch data to update the UI
    fetchFavoritesAndCollections();
  } catch (error) {
    console.error(error);
    alert("Failed to remove favorite. Please try again.");
  }
}
fetchFavoritesAndCollections();