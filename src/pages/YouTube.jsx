import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Youtube, 
  Play, 
  Search, 
  Calendar, 
  Eye, 
  Clock,
  ExternalLink,
  Loader2,
  Users,
  Video,
  ThumbsUp,
  MessageCircle
} from 'lucide-react'
import { youtubeApi } from '../services/youtubeApi'

const YouTube = () => {
  const [videos, setVideos] = useState([])
  const [filteredVideos, setFilteredVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('all')
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [channelStats, setChannelStats] = useState(null)
  const videosPerPage = 12

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        const [videosData, statsData] = await Promise.all([
          youtubeApi.getAllVideos(),
          youtubeApi.getChannelStats()
        ])
        
        setVideos(videosData)
        setFilteredVideos(videosData)
        setChannelStats(statsData)
      } catch (error) {
        console.error('Error fetching YouTube data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    let filtered = videos

    // Filter by search term
    if (searchTerm) {
      filtered = youtubeApi.searchVideos(filtered, searchTerm)
    }

    // Filter by tag
    if (selectedTag !== 'all') {
      filtered = youtubeApi.filterByTag(filtered, selectedTag)
    }

    setFilteredVideos(filtered)
    setCurrentPage(1)
  }, [searchTerm, selectedTag, videos])

  // Get unique tags
  const allTags = ['all', ...youtubeApi.getAllTags(videos)]

  // Pagination
  const indexOfLastVideo = currentPage * videosPerPage
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage
  const currentVideos = filteredVideos.slice(indexOfFirstVideo, indexOfLastVideo)
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const openVideoModal = (video) => {
    setSelectedVideo(video)
  }

  const closeVideoModal = () => {
    setSelectedVideo(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading videos from YouTube...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
              <Youtube className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold">
              YouTube Channel
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Educational content on data analytics, SQL, programming, and technology in Marathi
          </p>
          <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
            <a href={channelStats?.channelUrl} target="_blank" rel="noopener noreferrer">
              <Youtube className="mr-2 h-4 w-4" />
              Subscribe to Channel
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        {/* Channel Stats */}
        {channelStats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="h-8 w-8 mx-auto mb-2 text-red-500" />
                <div className="text-2xl font-bold">{channelStats.subscriberCount}</div>
                <div className="text-sm text-muted-foreground">Subscribers</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Video className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold">{channelStats.videoCount}</div>
                <div className="text-sm text-muted-foreground">Videos</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Eye className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold">{youtubeApi.formatViewCount(channelStats.viewCount)}</div>
                <div className="text-sm text-muted-foreground">Total Views</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Tag Filter */}
            <div className="flex items-center space-x-2">
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                {allTags.map(tag => (
                  <option key={tag} value={tag}>
                    {tag === 'all' ? 'All Topics' : tag}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Showing {filteredVideos.length} of {videos.length} videos
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {currentVideos.map((video) => (
            <Card key={video.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <div onClick={() => openVideoModal(video)}>
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-t-lg flex items-center justify-center">
                    <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                    {video.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{youtubeApi.formatViewCount(video.viewCount)} views</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(video.publishedAt)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <ThumbsUp className="h-3 w-3" />
                        <span>{video.likeCount}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-3 w-3" />
                        <span>{video.commentCount}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {video.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {video.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{video.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center space-x-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            
            {[...Array(totalPages)].map((_, index) => (
              <Button
                key={index}
                variant={currentPage === index + 1 ? "default" : "outline"}
                onClick={() => setCurrentPage(index + 1)}
                className="w-10"
              >
                {index + 1}
              </Button>
            ))}
            
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}

        {/* No results */}
        {filteredVideos.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No videos found matching your search.</p>
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold pr-4">{selectedVideo.title}</h2>
                <Button variant="ghost" size="icon" onClick={closeVideoModal}>
                  ×
                </Button>
              </div>
              
              <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center">
                  <Play className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">Video player would be embedded here</p>
                  <Button asChild>
                    <a 
                      href={selectedVideo.videoUrl}
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Youtube className="mr-2 h-4 w-4" />
                      Watch on YouTube
                    </a>
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{youtubeApi.formatViewCount(selectedVideo.viewCount)} views</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(selectedVideo.publishedAt)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{selectedVideo.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{selectedVideo.likeCount} likes</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground">{selectedVideo.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {selectedVideo.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default YouTube

