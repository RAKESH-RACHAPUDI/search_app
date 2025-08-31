# TODO List for API-Driven Mini Web App

## Backend Setup
- [x] Install axios in Backend (npm install axios)
- [x] Create Backend/server.js: Set up Express app, connect to MongoDB, enable CORS
- [x] Create Backend/models/SearchResult.js: Define Mongoose schema for search results
- [x] Create Backend/routes/search.js: Implement POST /search and GET /results endpoints
- [x] Create .env file for MongoDB connection string

## Frontend Setup
- [x] Modify Frontend/src/App.jsx: Add keyword form and dashboard display
- [x] Modify Frontend/src/App.css: Add basic styling for form and dashboard

## Testing and Deployment
- [x] Run backend server (npm start) - Running on port 5000
- [x] Run frontend (npm run dev) - Running on port 5173
- [x] Test app: Enter keyword, fetch from GitHub API, store in DB, display on dashboard - Backend has MongoDB connection issue (buffering timeout), needs restart or use cloud MongoDB
- [ ] Add error handling and pagination (bonus)
- [ ] Deploy to free service (e.g., Vercel for frontend, Render for backend)
