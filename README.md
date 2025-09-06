AI-Recipe-Recommender
AI Recipe Recommender – Enter ingredients you have at home and get instant, personalized recipe suggestions. Built with Node.js, Express, and a responsive frontend using HTML/CSS/JS. Features dark/light mode, favorites, and easy deployment on Netlify/Vercel + Render/Heroku.

🍳 AI Recipe Recommender – Made by Suraj CB
The AI Recipe Recommender helps you find recipes based on the ingredients you already have at home.
Features:
* Enter available ingredients to get instant recipe suggestions
* Dark/Light mode toggle
* Save and manage favorite recipes
* Simple backend API (Node.js + Express)
* Responsive frontend (HTML/CSS/JS)
* Easy deployment on Netlify/Vercel (frontend) + Render/Heroku (backend)
 
📂 Project Structure
AI_Recipe_Recommender/
│── server/   # Node.js backend API
│── web/      # Frontend (HTML/CSS/JS)
│── docs/     # Deployment guide (DOCX)
│── README.md # Project description
 
▶️ Running Locally
1. Start Backend
cd server
npm install
npm run dev
The API will be available at http://localhost:8080.
2. Open Frontend
Open web/index.html in your browser.
Update API_BASE in web/app.js if needed.
 
🌍 Deployment
Backend (Render or Heroku)
Render (Recommended)
1. Go to Render → New Web Service
2. Connect your GitHub repo → root = server/
3. Build command: npm install
4. Start command: npm start
5. Deploy 🚀
6. Backend API URL example: https://ai-recipe-api.onrender.com
Heroku
heroku login
heroku create ai-recipe-recommender
git push heroku main
Backend URL example: https://ai-recipe-recommender.herokuapp.com
 
Frontend (Netlify or Vercel)
Netlify
1. Drag & drop web/ folder or connect GitHub repo
2. Publish directory: web
3. Deploy 🚀
Vercel
1. Import repo from GitHub
2. Root directory: web
3. Deploy 🚀
Connect Frontend & Backend
Open web/app.js and update:

const API_BASE = "https://your-backend-url.com";
 
📝 Notes
* Use localStorage to persist favorites
* Responsive design works across desktop and mobile
* Auto-deploy happens on every git push
❤️ Credits
Made by Suraj CB
