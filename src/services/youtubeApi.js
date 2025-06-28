// YouTube API service for fetching channel videos
// Make sure to set your actual YouTube Data API key and Channel ID

const CHANNEL_ID = 'UC5C_ZtvS7TXJisGH2IhuptQ' // Replace with your actual channel ID
const API_KEY = 'AIzaSyAV1GzrZxyAv6sCOM72kEBfQ7e1NOvQXTM' // Replace with your actual API key
const BASE_URL = 'https://www.googleapis.com/youtube/v3'

export const youtubeApi = {
  // Fetch videos from YouTube API
  async fetchFromAPI(endpoint, params = {}) {
    try {
      const searchParams = new URLSearchParams({
        key: API_KEY,
        ...params
      })
      
      const response = await fetch(`${BASE_URL}/${endpoint}?${searchParams}`)
      
      if (!response.ok) {
        throw new Error(`YouTube API Error: ${response.status} - ${response.statusText}`)
      }
      
      const data = await response.json()
      
      if (data.error) {
        throw new Error(`YouTube API Error: ${data.error.message}`)
      }
      
      return data
    } catch (error) {
      console.error('YouTube API Error:', error)
      throw error
    }
  },

  // Get all videos from the channel
  async getAllVideos(maxResults = 50) {
    try {
      // First, get the channel's uploads playlist ID
      const channelData = await this.fetchFromAPI('channels', {
        part: 'contentDetails',
        id: CHANNEL_ID
      })

      if (!channelData.items || channelData.items.length === 0) {
        throw new Error('Channel not found')
      }

      const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads

      // Get videos from the uploads playlist
      const playlistData = await this.fetchFromAPI('playlistItems', {
        part: 'snippet',
        playlistId: uploadsPlaylistId,
        maxResults: maxResults,
        order: 'date'
      })

      if (!playlistData.items) {
        return []
      }

      // Get video IDs
      const videoIds = playlistData.items.map(item => item.snippet.resourceId.videoId).join(',')

      // Get detailed video information including statistics and content details
      const videosData = await this.fetchFromAPI('videos', {
        part: 'snippet,statistics,contentDetails',
        id: videoIds
      })

      return videosData.items.map(video => this.transformVideoData(video))
    } catch (error) {
      console.error('Error fetching all videos:', error)
      throw error
    }
  },

  // Search videos in the channel
  async searchChannelVideos(query, maxResults = 25) {
    try {
      const searchData = await this.fetchFromAPI('search', {
        part: 'snippet',
        channelId: CHANNEL_ID,
        q: query,
        type: 'video',
        maxResults: maxResults,
        order: 'relevance'
      })

      if (!searchData.items || searchData.items.length === 0) {
        return []
      }

      // Get video IDs
      const videoIds = searchData.items.map(item => item.id.videoId).join(',')

      // Get detailed video information
      const videosData = await this.fetchFromAPI('videos', {
        part: 'snippet,statistics,contentDetails',
        id: videoIds
      })

      return videosData.items.map(video => this.transformVideoData(video))
    } catch (error) {
      console.error('Error searching videos:', error)
      throw error
    }
  },

  // Get SQL-related videos for the SQL Learning page
  async getSQLVideos() {
    try {
      // Search for SQL-related content in the channel
      const sqlVideos = await this.searchChannelVideos('SQL OR database OR DBMS OR query', 50)
      
      // Additional filtering based on title and description
      return sqlVideos.filter(video => {
        const content = `${video.title} ${video.description}`.toLowerCase()
        return content.includes('sql') || 
               content.includes('database') || 
               content.includes('dbms') ||
               content.includes('query') ||
               content.includes('mysql') ||
               content.includes('postgresql')
      })
    } catch (error) {
      console.error('Error fetching SQL videos:', error)
      throw error
    }
  },

  // Get videos by category/search term
  async getVideosByCategory(category, maxResults = 25) {
    try {
      if (!category || category === 'all') {
        return await this.getAllVideos(maxResults)
      }
      
      return await this.searchChannelVideos(category, maxResults)
    } catch (error) {
      console.error('Error fetching videos by category:', error)
      throw error
    }
  },

  // Get channel statistics
  async getChannelStats() {
    try {
      const channelData = await this.fetchFromAPI('channels', {
        part: 'statistics,snippet',
        id: CHANNEL_ID
      })

      if (!channelData.items || channelData.items.length === 0) {
        throw new Error('Channel not found')
      }

      const stats = channelData.items[0].statistics
      const snippet = channelData.items[0].snippet

      return {
        subscriberCount: parseInt(stats.subscriberCount || 0),
        videoCount: parseInt(stats.videoCount || 0),
        viewCount: parseInt(stats.viewCount || 0),
        channelTitle: snippet.title,
        channelDescription: snippet.description,
        channelUrl: `https://www.youtube.com/channel/${CHANNEL_ID}`,
        thumbnails: snippet.thumbnails
      }
    } catch (error) {
      console.error('Error fetching channel stats:', error)
      throw error
    }
  },

  // Get popular videos (sorted by view count)
  async getPopularVideos(maxResults = 10) {
    try {
      const allVideos = await this.getAllVideos(50)
      
      // Sort by view count in descending order
      const sortedVideos = allVideos.sort((a, b) => b.viewCount - a.viewCount)
      
      return sortedVideos.slice(0, maxResults)
    } catch (error) {
      console.error('Error fetching popular videos:', error)
      throw error
    }
  },

  // Get recent videos (from last 30 days)
  async getRecentVideos(maxResults = 10) {
    try {
      const searchData = await this.fetchFromAPI('search', {
        part: 'snippet',
        channelId: CHANNEL_ID,
        type: 'video',
        maxResults: maxResults,
        order: 'date',
        publishedAfter: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      })

      if (!searchData.items || searchData.items.length === 0) {
        return []
      }

      const videoIds = searchData.items.map(item => item.id.videoId).join(',')

      const videosData = await this.fetchFromAPI('videos', {
        part: 'snippet,statistics,contentDetails',
        id: videoIds
      })

      return videosData.items.map(video => this.transformVideoData(video))
    } catch (error) {
      console.error('Error fetching recent videos:', error)
      throw error
    }
  },

  // Transform YouTube API duration to readable format
  parseDuration(duration) {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
    if (!match) return '0:00'
    
    const hours = parseInt(match[1]) || 0
    const minutes = parseInt(match[2]) || 0
    const seconds = parseInt(match[3]) || 0
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  },

  // Transform video data for frontend use
  transformVideoData(video) {
    // Handle both search results and direct video API responses
    const videoId = video.id?.videoId || video.id
    const snippet = video.snippet
    const statistics = video.statistics || {}
    const contentDetails = video.contentDetails || {}

    return {
      id: videoId,
      title: snippet.title,
      description: snippet.description || '',
      thumbnail: snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url,
      thumbnailHigh: snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url,
      publishedAt: snippet.publishedAt,
      channelTitle: snippet.channelTitle,
      tags: snippet.tags || [],
      viewCount: parseInt(statistics.viewCount || 0),
      likeCount: parseInt(statistics.likeCount || 0),
      commentCount: parseInt(statistics.commentCount || 0),
      duration: this.parseDuration(contentDetails.duration || 'PT0S'),
      videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
      publishDate: new Date(snippet.publishedAt).toLocaleDateString()
    }
  },

  // Search videos by query (client-side filtering)
  searchVideos(videos, query) {
    if (!query) return videos
    
    const searchTerm = query.toLowerCase()
    return videos.filter(video =>
      video.title.toLowerCase().includes(searchTerm) ||
      video.description.toLowerCase().includes(searchTerm) ||
      video.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    )
  },

  // Filter videos by tag (client-side filtering)
  filterByTag(videos, tag) {
    if (!tag || tag === 'all') return videos
    
    return videos.filter(video =>
      video.tags.some(videoTag => videoTag.toLowerCase() === tag.toLowerCase())
    )
  },

  // Get unique tags from all videos
  getAllTags(videos) {
    const allTags = videos.flatMap(video => video.tags)
    return [...new Set(allTags)].filter(tag => tag).sort()
  },

  // Format view count for display
  formatViewCount(count) {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  },

  // Get video embed URL
  getEmbedUrl(videoId) {
    return `https://www.youtube.com/embed/${videoId}`
  },

  // Check if API key is configured
  isConfigured() {
    return API_KEY && API_KEY !== 'YOUR_YOUTUBE_API_KEY_HERE'
  }
}

// Get YouTube playlist videos
export const getYouTubePlaylistVideos = async (playlistId, maxResults = 50) => {
  try {
    const playlistData = await youtubeApi.fetchFromAPI('playlistItems', {
      part: 'snippet',
      playlistId: playlistId,
      maxResults: maxResults
    })

    if (!playlistData.items || playlistData.items.length === 0) {
      return []
    }

    const videoIds = playlistData.items.map(item => item.snippet.resourceId.videoId).join(',')

    const videosData = await youtubeApi.fetchFromAPI('videos', {
      part: 'snippet,statistics,contentDetails',
      id: videoIds
    })

    return videosData.items.map(video => youtubeApi.transformVideoData(video))
  } catch (error) {
    console.error('Error fetching YouTube playlist videos:', error)
    throw error
  }
}

export default youtubeApi