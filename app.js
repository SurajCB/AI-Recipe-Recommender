const API_BASE = "http://localhost:8080"; // change to your backend URL after deploy

const input = document.getElementById("ingredientInput");
const searchBtn = document.getElementById("searchBtn");
const resultsDiv = document.getElementById("results");
const favoritesDiv = document.getElementById("favorites");
const themeToggle = document.getElementById("themeToggle");

let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

// Toggle dark/light mode
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const mode = document.body.classList.contains("dark") ? "☀️ Light Mode" : "🌙 Dark Mode";
  themeToggle.textContent = mode;
});

// Load favorites
function renderFavorites() {
  favoritesDiv.innerHTML = "";
  favorites.forEach(r => {
    const card = createCard(r, true);
    favoritesDiv.appendChild(card);
  });
}

// Create recipe card
function createCard(recipe, isFavorite = false) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${recipe.image}" alt="${recipe.title}">
    <h3>${recipe.title}</h3>
    <p>${recipe.description}</p>
    <p><strong>Time:</strong> ${recipe.time || "?"} mins</p>
    <button class="favBtn">${isFavorite ? "Remove" : "Add to Favorites"}</button>
  `;
  const favBtn = card.querySelector(".favBtn");
  favBtn.addEventListener("click", () => {
    if (isFavorite) {
      favorites = favorites.filter(f => f.id !== recipe.id);
    } else {
      if (!favorites.find(f => f.id === recipe.id)) {
        favorites.push(recipe);
      }
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
  });
  return card;
}

// Search recipes
async function searchRecipes() {
  const query = input.value.trim();
  if (!query) return;
  resultsDiv.innerHTML = "<p>Loading...</p>";
  try {
    const res = await fetch(`${API_BASE}/api/recommend?ingredients=${encodeURIComponent(query)}`);
    const data = await res.json();
    resultsDiv.innerHTML = "";
    if (data.results.length === 0) {
      resultsDiv.innerHTML = "<p>No recipes found 😔</p>";
      return;
    }
    data.results.forEach(r => {
      const card = createCard(r);
      resultsDiv.appendChild(card);
    });
  } catch (err) {
    resultsDiv.innerHTML = "<p>⚠️ Error fetching recipes</p>";
    console.error(err);
  }
}

searchBtn.addEventListener("click", searchRecipes);

// Initial render
renderFavorites();