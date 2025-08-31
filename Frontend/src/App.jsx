import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Search from './components/Search'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <h1>GitHub Repo Search</h1>

        {/* Navigation */}
        <nav className="nav-tabs">
          <Link to="/" className="nav-link">Search</Link>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
        </nav>

        <Routes>
          <Route path="/" element={
            <div className="search-page">
              <Search />
            </div>
          } />
          <Route path="/dashboard" element={
            <div className="dashboard-page">
              <Dashboard />
            </div>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
