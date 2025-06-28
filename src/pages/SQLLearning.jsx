import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Database, 
  Play, 
  CheckCircle, 
  Clock, 
  Youtube,
  BookOpen,
  Trophy,
  Target,
  BarChart3,
  Loader2
} from 'lucide-react'
import { youtubeApi } from '../services/youtubeApi'

const SQLLearning = () => {
  const [sqlVideos, setSqlVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [watchedVideos, setWatchedVideos] = useState(new Set())
  const [selectedVideo, setSelectedVideo] = useState(null)

  useEffect(() => {
    const fetchSQLVideos = async () => {
      try {
        setLoading(true)
        const sqlRelatedVideos = await youtubeApi.getSQLVideos()
        setSqlVideos(sqlRelatedVideos)
        
        // Load watched videos from localStorage
        const saved = localStorage.getItem('sql-learning-progress')
        if (saved) {
          setWatchedVideos(new Set(JSON.parse(saved)))
        }
      } catch (error) {
        console.error('Error fetching SQL videos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSQLVideos()
  }, [])

  const toggleWatched = (videoId) => {
    const newWatchedVideos = new Set(watchedVideos)
    if (newWatchedVideos.has(videoId)) {
      newWatchedVideos.delete(videoId)
    } else {
      newWatchedVideos.add(videoId)
    }
    setWatchedVideos(newWatchedVideos)
    
    // Save to localStorage
    localStorage.setItem('sql-learning-progress', JSON.stringify([...newWatchedVideos]))
  }

  const openVideoModal = (video) => {
    setSelectedVideo(video)
  }

  const closeVideoModal = () => {
    setSelectedVideo(null)
  }

  const progressPercentage = sqlVideos.length > 0 ? (watchedVideos.size / sqlVideos.length) * 100 : 0
const totalDuration = Array.isArray(sqlVideos)
  ? sqlVideos.reduce((total, video) => {
      const parts = video.duration.split(':')
      let minutes = 0
      if (parts.length === 3) {
        minutes = parseInt(parts[0]) * 60 + parseInt(parts[1]) + parseInt(parts[2]) / 60
      } else if (parts.length === 2) {
        minutes = parseInt(parts[0]) + parseInt(parts[1]) / 60
      }
      return total + minutes
    }, 0)
    :0

  const formatTotalDuration = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = Math.floor(minutes % 60)
    return `${hours}h ${mins}m`
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading SQL learning content...</p>
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
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <Database className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold">
              SQL Learning Path
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master SQL with our comprehensive video series in Marathi. Track your progress and build your database skills step by step.
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">{sqlVideos.length}</div>
              <div className="text-sm text-muted-foreground">Total Lessons</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">{watchedVideos.size}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Clock className="h-8 w-8 mx-auto mb-2 text-orange-500" />
              <div className="text-2xl font-bold">{formatTotalDuration(totalDuration)}</div>
              <div className="text-sm text-muted-foreground">Total Duration</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold">{Math.round(progressPercentage)}%</div>
              <div className="text-sm text-muted-foreground">Progress</div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Learning Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Completed: {watchedVideos.size} of {sqlVideos.length} videos</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
              <div className="text-sm text-muted-foreground">
                {watchedVideos.size === sqlVideos.length 
                  ? "🎉 Congratulations! You've completed the SQL learning path!" 
                  : `${sqlVideos.length - watchedVideos.size} videos remaining`
                }
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Video List */}
<div className="space-y-6">
  <h2 className="text-2xl font-bold mb-6">SQL Video Lessons</h2>

  {Array.isArray(sqlVideos) && sqlVideos.length > 0 ? (
    sqlVideos.map((video, index) => {
      const isWatched = watchedVideos.has(video.id)
      return (
        <Card key={video.id || index} className={`transition-all duration-300 ${isWatched ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' : 'hover:shadow-lg'}`}>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              {/* Lesson Number */}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${isWatched ? 'bg-green-500' : 'bg-blue-500'}`}>
                {isWatched ? <CheckCircle className="h-6 w-6" /> : index + 1}
              </div>

              {/* Video Thumbnail */}
              <div
                className="relative cursor-pointer"
                onClick={() => openVideoModal(video)}
                role="button"
                tabIndex="0"
                onKeyDown={(e) => e.key === 'Enter' && openVideoModal(video)}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-32 h-20 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-colors rounded-lg flex items-center justify-center">
                  <Play className="h-6 w-6 text-white" />
                </div>
                <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                  {video.duration}
                </div>
              </div>

              {/* Video Info */}
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <h3
                    className="font-semibold text-lg line-clamp-2 cursor-pointer hover:text-primary transition-colors"
                    onClick={() => openVideoModal(video)}
                  >
                    {video.title}
                  </h3>
                  <div className="flex items-center space-x-2 ml-4">
                    <Checkbox
                      checked={isWatched}
                      onCheckedChange={() => toggleWatched(video.id)}
                      className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {isWatched ? 'Completed' : 'Mark as watched'}
                    </span>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm line-clamp-2">
                  {video.description}
                </p>

                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{video.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Youtube className="h-4 w-4" />
                    <span>{youtubeApi.formatViewCount(video.viewCount)} views</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {Array.isArray(video.tags) && video.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    })
  ) : (
    <div className="text-center text-muted-foreground text-sm">
      No SQL videos found.
    </div>
  )}
</div>


        {/* Learning Tips */}
        <Card className="mt-12 bg-gradient-to-r from-blue-500/10 to-purple-600/10 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Learning Tips</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">📚 Study Approach</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Watch videos in sequence for best understanding</li>
                  <li>• Practice each concept with real examples</li>
                  <li>• Take notes and create your own SQL queries</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">💡 Pro Tips</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Use a SQL playground to practice</li>
                  <li>• Join our community for discussions</li>
                  <li>• Review completed videos periodically</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
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
              
            <div className="aspect-video rounded-lg overflow-hidden mb-4">
  <iframe
    src={`https://www.youtube.com/embed/${selectedVideo.id}`}
    title={selectedVideo.title}
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    className="w-full h-full"
  ></iframe>
</div>

              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{selectedVideo.duration}</span>
                    <span>{youtubeApi.formatViewCount(selectedVideo.viewCount)} views</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={watchedVideos.has(selectedVideo.id)}
                      onCheckedChange={() => toggleWatched(selectedVideo.id)}
                      className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <span className="text-sm">Mark as watched</span>
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

export default SQLLearning

