import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const RECIPES_PATH = path.join(path.resolve(), "recipes.json");
let RECIPES = JSON.parse(fs.readFileSync(RECIPES_PATH, "utf8"));

// Health check
app.get("/", (_, res) => {
  res.json({ status: "ok", service: "AI Recipe Recommender API" });
});

// Get all recipes
app.get("/api/recipes", (_, res) => {
  res.json(RECIPES);
});

// Recommend recipes based on ingredients
app.get("/api/recommend", (req, res) => {
  const raw = (req.query.ingredients || "").toString().toLowerCase();
  const pantry = [...new Set(raw.split(/[\s,]+/).filter(Boolean))];

  const scored = RECIPES.map(r => {
    const need = new Set(r.ingredients.map(i => i.toLowerCase()));
    const have = new Set(pantry);

    let matches = 0;
    need.forEach(n => { if (have.has(n)) matches++; });
    const coverage = matches / Math.max(need.size, 1);

    const hasAllKey = (r.keyIngredients || []).every(k => have.has(k.toLowerCase()));
    const keyBonus = hasAllKey ? 0.15 : 0;
    const timeBonus = r.time && r.time <= 20 ? 0.1 : 0;

    const score = coverage + keyBonus + timeBonus;
    return { ...r, score, matches };
  })
    .filter(r => r.matches > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 30);

  res.json({ query: pantry, results: scored });
});

// Add a recipe
app.post("/api/recipes", (req, res) => {
  const body = req.body || {};
  if (!body.title || !Array.isArray(body.ingredients)) {
    return res.status(400).json({ error: "title and ingredients[] required" });
  }
  const recipe = {
    id: Date.now().toString(36),
    title: body.title,
    description: body.description || "",
    ingredients: body.ingredients,
    steps: body.steps || [],
    time: body.time || null,
    cuisine: body.cuisine || "General",
    image: body.image || "",
    keyIngredients: body.keyIngredients || []
  };
  RECIPES.push(recipe);
  fs.writeFileSync(RECIPES_PATH, JSON.stringify(RECIPES, null, 2));
  res.status(201).json(recipe);
});

app.listen(PORT, () => console.log(`✅ API running on http://localhost:${PORT}`));