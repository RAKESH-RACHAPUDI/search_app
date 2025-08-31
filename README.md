# 🔍 GitHub Repository Search App

A modern, full-stack web application that allows users to search GitHub repositories and view their search history with a beautiful, animated dashboard interface.

![App Preview](https://via.placeholder.com/800x400/667eea/ffffff?text=GitHub+Search+App)

## ✨ Features

- **🔎 Real-time GitHub Search**: Search GitHub repositories by keywords with instant results
- **💾 Search History Storage**: All searches are stored in MongoDB Atlas for future reference
- **📊 Interactive Dashboard**: View search history with pagination and statistics
- **🎨 Modern UI**: Beautiful glassmorphism design with smooth animations
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **⚡ Fast Performance**: Optimized with efficient API calls and database queries
- **🔒 Secure**: Environment-based configuration for sensitive data

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern JavaScript library for building user interfaces
- **React Router** - Declarative routing for React applications
- **Vite** - Fast build tool and development server
- **CSS3** - Modern styling with animations and glassmorphism effects

### Backend
- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Fast, unopinionated web framework
- **MongoDB Atlas** - Cloud-hosted NoSQL database
- **Mongoose** - Elegant MongoDB object modeling

### APIs
- **GitHub REST API** - For fetching repository data
- **Axios** - HTTP client for API requests

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account
- GitHub account (for API access)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/github-search-app.git
   cd github-search-app
   ```

2. **Install backend dependencies**
   ```bash
   cd Backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../Frontend
   npm install
   ```

4. **Environment Setup**

   Create a `.env` file in the `Backend` directory:
   ```env
   MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/github_search_app
   PORT=5000
   ```

5. **Start the backend server**
   ```bash
   cd Backend
   npm start
   ```

6. **Start the frontend development server**
   ```bash
   cd Frontend
   npm run dev
   ```

7. **Open your browser**

   Navigate to `http://localhost:5173` to view the application.

## 📖 Usage

### Searching Repositories

1. Enter a keyword in the search box (e.g., "react", "machine learning", "nodejs")
2. Click the search button or press Enter
3. View the top 10 repositories sorted by stars
4. Results are automatically saved to your search history

### Viewing Dashboard

1. Click on the "Dashboard" navigation link
2. View your search statistics and history
3. Use pagination to navigate through previous searches
4. Each search result shows the timestamp and repository details

## 🔧 API Endpoints

### Search Repositories
```http
POST /api/search
Content-Type: application/json

{
  "keyword": "react"
}
```

**Response:**
```json
{
  "message": "Search completed and stored",
  "data": [
    {
      "name": "react",
      "full_name": "facebook/react",
      "html_url": "https://github.com/facebook/react",
      "description": "A declarative, efficient...",
      "stars": 180000,
      "language": "JavaScript"
    }
  ]
}
```

### Get Search History
```http
GET /api/results?page=1&limit=10
```

**Response:**
```json
{
  "results": [...],
  "totalResults": 25,
  "totalPages": 3,
  "currentPage": 1
}
```

## 🗄️ Database Schema

### SearchResult Model
```javascript
{
  keyword: String (required),
  data: Array (required),
  timestamp: Date (default: Date.now)
}
```

## 🎨 UI Features

- **Glassmorphism Design**: Modern frosted glass effects
- **Smooth Animations**: CSS transitions and keyframe animations
- **Responsive Layout**: Mobile-first design approach
- **Interactive Elements**: Hover effects and micro-interactions
- **Loading States**: Elegant loading indicators
- **Error Handling**: User-friendly error messages

## 🔧 Development

### Project Structure
```
github-search-app/
├── Backend/
│   ├── models/
│   │   └── SearchResult.js
│   ├── routes/
│   │   └── search.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Search.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

### Available Scripts

**Backend:**
```bash
npm start    # Start production server
npm run dev  # Start development server with nodemon
```

**Frontend:**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB Atlas connection string | Yes |
| `PORT` | Server port (default: 5000) | No |

## 🚀 Deployment

### Backend Deployment
1. Set up your MongoDB Atlas cluster
2. Configure environment variables on your hosting platform
3. Deploy to services like Heroku, Railway, or Vercel

### Frontend Deployment
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to services like Netlify, Vercel, or GitHub Pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [GitHub REST API](https://docs.github.com/en/rest) for repository data
- [MongoDB Atlas](https://www.mongodb.com/atlas) for cloud database
- [React](https://reactjs.org/) for the amazing frontend framework
- [Express.js](https://expressjs.com/) for the robust backend framework

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the maintainers.

---

**Made with ❤️ using React, Node.js, and MongoDB Atlas**
