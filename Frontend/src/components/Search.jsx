import { useState } from 'react'

function Search() {
  const [keyword, setKeyword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!keyword.trim()) return

    setLoading(true)
    setError('')
    setSuccess('')
    try {
      const response = await fetch('http://localhost:5000/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword }),
      })
      if (!response.ok) throw new Error('Search failed')
      const data = await response.json()
      setSuccess(`Search completed! Found ${data.data.length} repositories for "${keyword}"`)
      setKeyword('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="search-view">
      <center><h2>Search GitHub Repositories</h2></center>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter keyword to search GitHub repos"
          className="search-input"
        />
        <button type="submit" disabled={loading} className="search-button">
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  )
}

export default Search
