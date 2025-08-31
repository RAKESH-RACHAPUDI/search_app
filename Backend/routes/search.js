const express = require('express');
const axios = require('axios');
const SearchResult = require('../models/SearchResult');

const router = express.Router();

// POST /api/search - Fetch from GitHub API and store
router.post('/search', async (req, res) => {
  const { keyword } = req.body;
  if (!keyword) {
    return res.status(400).json({ error: 'Keyword is required' });
  }

  try {
    const response = await axios.get(`https://api.github.com/search/repositories?q=${keyword}&sort=stars&order=desc&per_page=10`);
    const repos = response.data.items.map(repo => ({
      name: repo.name,
      full_name: repo.full_name,
      html_url: repo.html_url,
      description: repo.description,
      stars: repo.stargazers_count,
      language: repo.language,
    }));

    // Store in DB
    const searchResult = new SearchResult({
      keyword,
      data: repos,
    });
    await searchResult.save();

    res.json({ message: 'Search completed and stored', data: repos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data from GitHub API' });
  }
});

// GET /api/results - Retrieve stored results with pagination
router.get('/results', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalResults = await SearchResult.countDocuments();
    const results = await SearchResult.find()
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      results,
      totalResults,
      totalPages: Math.ceil(totalResults / limit),
      currentPage: page
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve results' });
  }
});

module.exports = router;
