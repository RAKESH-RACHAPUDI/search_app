import { useState, useEffect } from 'react'

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    results: [],
    totalResults: 0,
    totalPages: 0,
    currentPage: 1
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchDashboardData = async (page = 1) => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`http://localhost:5000/api/results?page=${page}&limit=5`)
      if (!response.ok) throw new Error('Failed to fetch results')
      const data = await response.json()
      setDashboardData(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= dashboardData.totalPages) {
      fetchDashboardData(newPage)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  return (
    <div className="dashboard-view">
      <h2>Search History Dashboard</h2>

      {/* Statistics */}
      <div className="stats">
        <div className="stat-item">
          <h3>Total Searches</h3>
          <p>{dashboardData.totalResults}</p>
        </div>
        <div className="stat-item">
          <h3>Total Pages</h3>
          <p>{dashboardData.totalPages}</p>
        </div>
        <div className="stat-item">
          <h3>Current Page</h3>
          <p>{dashboardData.currentPage}</p>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(dashboardData.currentPage - 1)}
          disabled={dashboardData.currentPage === 1 || loading}
        >
          Previous
        </button>
        <span>Page {dashboardData.currentPage} of {dashboardData.totalPages}</span>
        <button
          onClick={() => handlePageChange(dashboardData.currentPage + 1)}
          disabled={dashboardData.currentPage === dashboardData.totalPages || loading}
        >
          Next
        </button>
      </div>

      {/* Results */}
      {loading ? (
        <p>Loading...</p>
      ) : dashboardData.results.length === 0 ? (
        <p>No search results yet. Perform a search first!</p>
      ) : (
        dashboardData.results.map((result, index) => (
          <div key={result._id || index} className="result-item">
            <h3>Keyword: {result.keyword}</h3>
            <p>Searched at: {new Date(result.timestamp).toLocaleString()}</p>
            <div className="repo-list">
              {result.data.map((repo, i) => (
                <div key={i} className="repo-item">
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    {repo.full_name}
                  </a>
                  <p>{repo.description}</p>
                  <div className="repo-meta">
                    <span>⭐ {repo.stars}</span>
                    <span>Language: {repo.language || 'N/A'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      {error && <p className="error">{error}</p>}
    </div>
  )
}

export default Dashboard
