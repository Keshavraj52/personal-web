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
  MessageCircle,
  X,
  Filter,
  TrendingUp,
  Star,
  Share2
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
        // Fallback to empty arrays
        setVideos([])
        setFilteredVideos([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    let filtered = videos

    // Filter by search term
    if (searchTerm && youtubeApi.searchVideos) {
      filtered = youtubeApi.searchVideos(filtered, searchTerm)
    } else if (searchTerm) {
      // Fallback search if API method doesn't exist
      filtered = videos.filter(video => 
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by tag
    if (selectedTag !== 'all' && youtubeApi.filterByTag) {
      filtered = youtubeApi.filterByTag(filtered, selectedTag)
    } else if (selectedTag !== 'all') {
      // Fallback filter if API method doesn't exist
      filtered = filtered.filter(video => 
        Array.isArray(video.tags) && video.tags.includes(selectedTag)
      )
    }

    setFilteredVideos(filtered)
    setCurrentPage(1)
  }, [searchTerm, selectedTag, videos])

  // Get unique tags
  const allTags = ['all', ...(youtubeApi.getAllTags ? youtubeApi.getAllTags(videos) : [])]

  // Pagination
  const indexOfLastVideo = currentPage * videosPerPage
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage
  const currentVideos = filteredVideos.slice(indexOfFirstVideo, indexOfLastVideo)
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage)

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatViewCount = (count) => {
    if (!count) return '0'
    if (youtubeApi.formatViewCount) {
      return youtubeApi.formatViewCount(count)
    }
    // Fallback formatting
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
    return count.toString()
  }

  const openVideoModal = (video) => {
    setSelectedVideo(video)
    document.body.style.overflow = 'hidden'
  }

  const closeVideoModal = () => {
    setSelectedVideo(null)
    document.body.style.overflow = 'unset'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center animate-pulse">
              <Youtube className="h-10 w-10 text-white" />
            </div>
            <Loader2 className="h-8 w-8 animate-spin absolute -top-2 -right-2 text-red-500" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Loading YouTube Channel</h2>
            <p className="text-muted-foreground">Fetching latest videos and channel data...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 via-red-600 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <Youtube className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-red-600 to-orange-500 rounded-2xl blur opacity-25"></div>
            </div>
            <div className="text-left">
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                YouTube
              </h1>
              <p className="text-lg text-muted-foreground mt-2">Channel Hub</p>
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Educational content on data analytics, SQL, programming, and technology in Marathi. 
            Learn, grow, and master new skills with our comprehensive video tutorials.
          </p>
          {channelStats?.channelUrl && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <a href={channelStats.channelUrl} target="_blank" rel="noopener noreferrer">
                  <Youtube className="mr-2 h-5 w-5" />
                  Subscribe to Channel
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>Join our growing community of learners</span>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Channel Stats */}
        {channelStats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent"></div>
              <CardContent className="p-8 relative">
                <div className="flex items-center justify-between mb-4">
                  <Users className="h-10 w-10 text-red-500" />
                  <TrendingUp className="h-5 w-5 text-red-400 opacity-60" />
                </div>
                <div className="text-3xl font-bold text-red-600 mb-1">{channelStats.subscriberCount || '0'}</div>
                <div className="text-sm font-medium text-red-600/80">Subscribers</div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent"></div>
              <CardContent className="p-8 relative">
                <div className="flex items-center justify-between mb-4">
                  <Video className="h-10 w-10 text-blue-500" />
                  <Play className="h-5 w-5 text-blue-400 opacity-60" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-1">{channelStats.videoCount || videos.length}</div>
                <div className="text-sm font-medium text-blue-600/80">Videos</div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent"></div>
              <CardContent className="p-8 relative">
                <div className="flex items-center justify-between mb-4">
                  <Eye className="h-10 w-10 text-green-500" />
                  <Star className="h-5 w-5 text-green-400 opacity-60" />
                </div>
                <div className="text-3xl font-bold text-green-600 mb-1">{formatViewCount(channelStats.viewCount)}</div>
                <div className="text-sm font-medium text-green-600/80">Total Views</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Enhanced Filters */}
        <Card className="mb-12 border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Filter className="h-4 w-4 text-white" />
              </div>
              <span>Find Your Perfect Video</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search for videos, topics, or concepts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 text-lg border-2 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Tag Filter */}
              <div className="flex items-center space-x-3">
                <label className="text-sm font-medium whitespace-nowrap">Filter by topic:</label>
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="px-4 py-3 border-2 border-border rounded-lg bg-background text-foreground min-w-[160px] focus:border-blue-500 transition-colors"
                >
                  {allTags.map(tag => (
                    <option key={tag} value={tag}>
                      {tag === 'all' ? 'All Topics' : tag}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-blue-600">{filteredVideos.length}</span> of <span className="font-semibold">{videos.length}</span> videos
              </p>
              {searchTerm && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSearchTerm('')}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Clear search
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {currentVideos.map((video) => (
            <Card key={video.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm overflow-hidden">
              <div onClick={() => openVideoModal(video)}>
                <div className="relative overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600/90 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 shadow-2xl">
                      <Play className="h-8 w-8 text-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/90 text-white text-sm px-3 py-1 rounded-full font-medium">
                    {video.duration}
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-red-600 hover:bg-red-700 text-white border-0">
                      <Video className="h-3 w-3 mr-1" />
                      HD
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-bold text-lg line-clamp-2 group-hover:text-red-600 transition-colors duration-200 leading-tight">
                    {video.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span className="font-medium">{formatViewCount(video.viewCount)} views</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(video.publishedAt)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-4 text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <ThumbsUp className="h-4 w-4 text-green-500" />
                        <span className="font-medium">{video.likeCount || '0'}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">{video.commentCount || '0'}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Share2 className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {Array.isArray(video.tags) && video.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs px-2 py-1 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors cursor-pointer">
                        {tag}
                      </Badge>
                    ))}
                    {Array.isArray(video.tags) && video.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs px-2 py-1">
                        +{video.tags.length - 2} more
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages} • {filteredVideos.length} videos total
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="hover:bg-blue-50 hover:border-blue-300"
                  >
                    Previous
                  </Button>
                  
                  <div className="flex items-center space-x-1">
                    {[...Array(Math.min(totalPages, 5))].map((_, index) => {
                      const pageNum = currentPage <= 3 ? index + 1 : currentPage - 2 + index
                      if (pageNum > totalPages) return null
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-10 h-10 ${currentPage === pageNum ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-blue-50 hover:border-blue-300'}`}
                        >
                          {pageNum}
                        </Button>
                      )
                    })}
                  </div>
                  
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="hover:bg-blue-50 hover:border-blue-300"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced No Results */}
        {filteredVideos.length === 0 && !loading && (
          <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">No videos found</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                We couldn't find any videos matching your search criteria. Try adjusting your filters or search terms.
              </p>
              <div className="space-x-4">
                <Button onClick={() => setSearchTerm('')} variant="outline">
                  Clear Search
                </Button>
                <Button onClick={() => setSelectedTag('all')}>
                  Show All Videos
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Enhanced Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeVideoModal}
        >
          <div 
            className="bg-white dark:bg-slate-900 rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 p-6 rounded-t-2xl">
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-4">
                  <h2 className="text-2xl font-bold mb-3">{selectedVideo.title}</h2>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span className="font-medium">{formatViewCount(selectedVideo.viewCount)} views</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(selectedVideo.publishedAt)}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium">{selectedVideo.duration}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <ThumbsUp className="h-4 w-4 text-green-500" />
                      <span className="font-medium">{selectedVideo.likeCount || '0'} likes</span>
                    </span>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={closeVideoModal}
                  className="w-12 h-12 rounded-full hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950 flex-shrink-0"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </div>
            
            {/* Video Player Area */}
            <div className="p-6">
              <div className="aspect-video rounded-xl overflow-hidden shadow-2xl mb-6 bg-gradient-to-br from-slate-900 to-slate-800">
                {selectedVideo.id ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&rel=0&modestbranding=1`}
                    title={selectedVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-center text-white">
                    <div className="space-y-4">
                      <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto">
                        <Play className="h-10 w-10 text-white ml-1" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">Ready to Watch?</h3>
                        <p className="text-slate-300 mb-4">Click below to open this video on YouTube</p>
                        <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
                          <a 
                            href={selectedVideo.videoUrl}
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <Youtube className="mr-2 h-5 w-5" />
                            Watch on YouTube
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Video Details */}
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                        <ThumbsUp className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="font-medium">{selectedVideo.likeCount || '0'} likes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <MessageCircle className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="font-medium">{selectedVideo.commentCount || '0'} comments</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild className="flex items-center space-x-2">
                    <a href={selectedVideo.videoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      <span>Open in YouTube</span>
                    </a>
                  </Button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center space-x-2">
                      <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <MessageCircle className="h-3 w-3 text-blue-600" />
                      </div>
                      <span>Description</span>
                    </h3>
                    <p className="text-muted-foreground leading-relaxed pl-8">
                      {selectedVideo.description || 'No description available for this video.'}
                    </p>
                  </div>
                  
                  {Array.isArray(selectedVideo.tags) && selectedVideo.tags.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-lg mb-3 flex items-center space-x-2">
                        <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                          <Star className="h-3 w-3 text-purple-600" />
                        </div>
                        <span>Topics Covered</span>
                      </h3>
                      <div className="flex flex-wrap gap-3 pl-8">
                        {selectedVideo.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="px-4 py-2 text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors cursor-pointer">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
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