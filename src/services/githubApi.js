// GitHub API service for fetching user repositories
const GITHUB_API_BASE = 'https://api.github.com'
const USERNAME = 'Keshavraj52'

export const githubApi = {
  // Fetch user profile information
  async getUserProfile() {
    try {
      const response = await fetch(`${GITHUB_API_BASE}/users/${USERNAME}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching user profile:', error)
      throw error
    }
  },

  // Fetch all public repositories
  async getRepositories(page = 1, perPage = 30) {
    try {
      const response = await fetch(
        `${GITHUB_API_BASE}/users/${USERNAME}/repos?page=${page}&per_page=${perPage}&sort=updated&direction=desc`
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching repositories:', error)
      throw error
    }
  },

  // Fetch all repositories (handles pagination automatically)
  async getAllRepositories() {
    try {
      let allRepos = []
      let page = 1
      const perPage = 100 // Maximum allowed by GitHub API

      while (true) {
        const repos = await this.getRepositories(page, perPage)
        if (repos.length === 0) break
        
        allRepos = [...allRepos, ...repos]
        
        // If we got less than perPage, we've reached the end
        if (repos.length < perPage) break
        
        page++
      }

      return allRepos
    } catch (error) {
      console.error('Error fetching all repositories:', error)
      throw error
    }
  },

  // Fetch repository details including README
  async getRepositoryDetails(repoName) {
    try {
      const response = await fetch(`${GITHUB_API_BASE}/repos/${USERNAME}/${repoName}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching repository details:', error)
      throw error
    }
  },

  // Fetch repository languages
  async getRepositoryLanguages(repoName) {
    try {
      const response = await fetch(`${GITHUB_API_BASE}/repos/${USERNAME}/${repoName}/languages`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching repository languages:', error)
      throw error
    }
  },

  // Transform repository data for frontend use
  transformRepositoryData(repo) {
    return {
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      htmlUrl: repo.html_url,
      homepage: repo.homepage,
      language: repo.language,
      stargazersCount: repo.stargazers_count,
      forksCount: repo.forks_count,
      watchersCount: repo.watchers_count,
      size: repo.size,
      defaultBranch: repo.default_branch,
      topics: repo.topics || [],
      createdAt: repo.created_at,
      updatedAt: repo.updated_at,
      pushedAt: repo.pushed_at,
      isPrivate: repo.private,
      isFork: repo.fork,
      isArchived: repo.archived,
      hasIssues: repo.has_issues,
      hasProjects: repo.has_projects,
      hasWiki: repo.has_wiki,
      hasPages: repo.has_pages,
      hasDownloads: repo.has_downloads,
      openIssuesCount: repo.open_issues_count,
      license: repo.license ? {
        key: repo.license.key,
        name: repo.license.name,
        spdxId: repo.license.spdx_id
      } : null
    }
  },

  // Get repository statistics
  async getRepositoryStats() {
    try {
      const repos = await this.getAllRepositories()
      const publicRepos = repos.filter(repo => !repo.private)
      
      const stats = {
        totalRepos: publicRepos.length,
        totalStars: publicRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
        totalForks: publicRepos.reduce((sum, repo) => sum + repo.forks_count, 0),
        languages: {},
        topics: {},
        mostStarred: null,
        mostForked: null,
        recentlyUpdated: null
      }

      // Calculate language distribution
      publicRepos.forEach(repo => {
        if (repo.language) {
          stats.languages[repo.language] = (stats.languages[repo.language] || 0) + 1
        }
      })

      // Calculate topic distribution
      publicRepos.forEach(repo => {
        if (repo.topics) {
          repo.topics.forEach(topic => {
            stats.topics[topic] = (stats.topics[topic] || 0) + 1
          })
        }
      })

      // Find most starred repository
      stats.mostStarred = publicRepos.reduce((max, repo) => 
        repo.stargazers_count > (max?.stargazers_count || 0) ? repo : max, null)

      // Find most forked repository
      stats.mostForked = publicRepos.reduce((max, repo) => 
        repo.forks_count > (max?.forks_count || 0) ? repo : max, null)

      // Find most recently updated repository
      stats.recentlyUpdated = publicRepos.reduce((latest, repo) => 
        new Date(repo.updated_at) > new Date(latest?.updated_at || 0) ? repo : latest, null)

      return stats
    } catch (error) {
      console.error('Error calculating repository stats:', error)
      throw error
    }
  }
}

export default githubApi

