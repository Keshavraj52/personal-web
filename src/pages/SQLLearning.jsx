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
  Loader2,
  X,
  ExternalLink,
  Users,
  Calendar,
  TrendingUp,
  AlertTriangle,
  Star,
  Award,
  Brain,
  Code
} from 'lucide-react'
import { youtubeApi } from '../services/youtubeApi'

const SQLLearning = () => {
  const [sqlVideos, setSqlVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [watchedVideos, setWatchedVideos] = useState(new Set())
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [error, setError] = useState(null)

  // Storage utility functions (for use in your own environment with localStorage)
  const STORAGE_KEY = 'sql_learning_progress'

  const saveProgressToStorage = (watchedSet) => {
    try {
      // In your environment, uncomment this line:
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...watchedSet]))
      
      // For Claude.ai artifacts, we'll use a memory-only approach
      console.log('Progress saved to memory:', [...watchedSet])
    } catch (error) {
      console.error('Failed to save progress:', error)
    }
  }

  const loadProgressFromStorage = () => {
    try {
      // In your environment, uncomment these lines:
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? new Set(JSON.parse(saved)) : new Set()
      
      // For Claude.ai artifacts, return empty set
      return new Set()
    } catch (error) {
      console.error('Failed to load progress:', error)
      return new Set()
    }
  }

  useEffect(() => {
    const initializeComponent = async () => {
      try {
        setLoading(true)
        setError(null)

        // Load saved progress from storage
        const savedProgress = loadProgressFromStorage()
        setWatchedVideos(savedProgress)

        // Fetch SQL videos from YouTube API
        const sqlRelatedVideos = await youtubeApi.getSQLVideos()
        
        if (!sqlRelatedVideos || sqlRelatedVideos.length === 0) {
          setError('No SQL videos found. Please check your API configuration.')
          return
        }

        setSqlVideos(sqlRelatedVideos)
      } catch (error) {
        console.error('Error initializing SQL Learning component:', error)
        setError('Failed to load SQL videos. Please refresh the page or check your connection.')
      } finally {
        setLoading(false)
      }
    }

    initializeComponent()
  }, [])

  const toggleWatched = (videoId) => {
    const newWatchedVideos = new Set(watchedVideos)
    
    if (newWatchedVideos.has(videoId)) {
      newWatchedVideos.delete(videoId)
    } else {
      newWatchedVideos.add(videoId)
    }
    
    setWatchedVideos(newWatchedVideos)
    saveProgressToStorage(newWatchedVideos)
    
    // Show success feedback
    const action = newWatchedVideos.has(videoId) ? 'marked as completed' : 'unmarked'
    console.log(`Video ${action} successfully`)
  }

  const openVideoModal = (video) => {
    setSelectedVideo(video)
    document.body.style.overflow = 'hidden'
  }

  const closeVideoModal = () => {
    setSelectedVideo(null)
    document.body.style.overflow = 'unset'
  }

  const formatViewCount = (count) => {
    if (!count) return '0'
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
    return count.toString()
  }

  const formatDuration = (duration) => {
    if (!duration) return '0:00'
    return duration
  }

  const progressPercentage = sqlVideos.length > 0 ? (watchedVideos.size / sqlVideos.length) * 100 : 0
  
  const totalDuration = Array.isArray(sqlVideos) 
    ? sqlVideos.reduce((total, video) => {
        if (!video.duration) return total
        const parts = video.duration.split(':')
        let minutes = 0
        if (parts.length === 3) {
          minutes = parseInt(parts[0]) * 60 + parseInt(parts[1]) + parseInt(parts[2]) / 60
        } else if (parts.length === 2) {
          minutes = parseInt(parts[0]) + parseInt(parts[1]) / 60
        }
        return total + minutes
      }, 0)
    : 0

  const formatTotalDuration = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = Math.floor(minutes % 60)
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const getSkillLevel = () => {
    const percentage = progressPercentage
    if (percentage === 100) return { level: 'Expert', icon: Award, color: 'text-yellow-600' }
    if (percentage >= 75) return { level: 'Advanced', icon: Star, color: 'text-purple-600' }
    if (percentage >= 50) return { level: 'Intermediate', icon: Brain, color: 'text-blue-600' }
    if (percentage >= 25) return { level: 'Beginner+', icon: Code, color: 'text-green-600' }
    return { level: 'Beginner', icon: BookOpen, color: 'text-slate-600' }
  }

  const skillInfo = getSkillLevel()

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950 flex items-center justify-center">
        <div className="text-center space-y-8 max-w-md mx-auto px-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl flex items-center justify-center animate-pulse shadow-2xl">
              <Database className="h-12 w-12 text-white" />
            </div>
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl blur opacity-20 animate-pulse"></div>
            <Loader2 className="h-10 w-10 animate-spin absolute -top-3 -right-3 text-blue-600" />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Initializing SQL Learning Hub
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Loading your personalized learning experience and progress data...
            </p>
            <div className="w-64 h-2 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50 dark:from-slate-950 dark:to-red-950 flex items-center justify-center">
        <div className="text-center space-y-8 max-w-lg mx-auto px-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl flex items-center justify-center shadow-2xl">
              <AlertTriangle className="h-12 w-12 text-white" />
            </div>
            <div className="absolute -inset-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl blur opacity-20"></div>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-red-600">Unable to Load Content</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg"
            >
              Retry Loading
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Professional Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center space-x-6 mb-8">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl">
                <Database className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl blur opacity-25"></div>
            </div>
            <div className="text-left">
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
                SQL Mastery Hub
              </h1>
              <div className="flex items-center space-x-4 mt-3">
                <p className="text-xl text-muted-foreground">Professional Learning Platform</p>
                <Badge variant="secondary" className="px-4 py-2 text-sm font-semibold">
                  <skillInfo.icon className="h-4 w-4 mr-2" />
                  {skillInfo.level}
                </Badge>
              </div>
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Advance your database expertise with our comprehensive SQL video series in Marathi. 
            Track your learning journey, master complex queries, and build production-ready database skills 
            that accelerate your career growth.
          </p>
        </div>

        {/* Advanced Analytics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <CardContent className="p-8 relative">
              <div className="flex items-center justify-between mb-6">
                <BookOpen className="h-12 w-12 text-blue-600" />
                <TrendingUp className="h-6 w-6 text-blue-400 opacity-60" />
              </div>
              <div className="text-4xl font-bold text-blue-700 mb-2">{sqlVideos.length}</div>
              <div className="text-sm font-semibold text-blue-600/80 uppercase tracking-wide">Total Lessons</div>
              <div className="mt-4 text-xs text-blue-600/60">
                Comprehensive curriculum designed by experts
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-950 dark:to-green-900">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <CardContent className="p-8 relative">
              <div className="flex items-center justify-between mb-6">
                <CheckCircle className="h-12 w-12 text-emerald-600" />
                <Trophy className="h-6 w-6 text-emerald-400 opacity-60" />
              </div>
              <div className="text-4xl font-bold text-emerald-700 mb-2">{watchedVideos.size}</div>
              <div className="text-sm font-semibold text-emerald-600/80 uppercase tracking-wide">Completed</div>
              <div className="mt-4 text-xs text-emerald-600/60">
                {watchedVideos.size === sqlVideos.length ? '🎉 Perfect score!' : 'Keep up the momentum!'}
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-950 dark:to-orange-900">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <CardContent className="p-8 relative">
              <div className="flex items-center justify-between mb-6">
                <Clock className="h-12 w-12 text-amber-600" />
                <Calendar className="h-6 w-6 text-amber-400 opacity-60" />
              </div>
              <div className="text-4xl font-bold text-amber-700 mb-2">{formatTotalDuration(totalDuration)}</div>
              <div className="text-sm font-semibold text-amber-600/80 uppercase tracking-wide">Total Duration</div>
              <div className="mt-4 text-xs text-amber-600/60">
                Structured learning path
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-950 dark:to-violet-900">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <CardContent className="p-8 relative">
              <div className="flex items-center justify-between mb-6">
                <Target className="h-12 w-12 text-purple-600" />
                <BarChart3 className="h-6 w-6 text-purple-400 opacity-60" />
              </div>
              <div className="text-4xl font-bold text-purple-700 mb-2">{Math.round(progressPercentage)}%</div>
              <div className="text-sm font-semibold text-purple-600/80 uppercase tracking-wide">Progress</div>
              <div className="mt-4 text-xs text-purple-600/60">
                <skillInfo.icon className="h-3 w-3 inline mr-1" />
                {skillInfo.level} Level
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Progress Tracking */}
        <Card className="mb-20 border-0 shadow-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl">
          <CardHeader className="pb-8">
            <CardTitle className="flex items-center justify-between text-3xl">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <span>Learning Journey Analytics</span>
              </div>
              <Badge variant="outline" className="px-4 py-2 text-sm font-semibold">
                <skillInfo.icon className={`h-4 w-4 mr-2 ${skillInfo.color}`} />
                {skillInfo.level} Level
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">
                      {watchedVideos.size} of {sqlVideos.length} lessons completed
                    </div>
                    <div className="text-muted-foreground">
                      {watchedVideos.size === sqlVideos.length 
                        ? "🏆 Outstanding! You've mastered the complete SQL curriculum!" 
                        : `${sqlVideos.length - watchedVideos.size} lessons remaining to achieve mastery`
                      }
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {Math.round(progressPercentage)}%
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">Complete</div>
                  </div>
                </div>
                <div className="relative">
                  <Progress value={progressPercentage} className="h-6 bg-slate-200 dark:bg-slate-700" />
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full opacity-30 transition-all duration-1000"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-6 rounded-2xl">
                  <div className="text-3xl font-bold text-green-600 mb-1">{watchedVideos.size}</div>
                  <div className="text-sm font-medium text-green-600/80">Videos Watched</div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 p-6 rounded-2xl">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{sqlVideos.length - watchedVideos.size}</div>
                  <div className="text-sm font-medium text-blue-600/80">Remaining</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Video Catalog */}
        <div className="space-y-10">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold">Professional SQL Video Catalog</h2>
              <p className="text-muted-foreground text-lg">Curated content for database professionals</p>
            </div>
            <Badge variant="secondary" className="px-6 py-3 text-base font-semibold">
              <Users className="h-5 w-5 mr-2" />
              {sqlVideos.length} Expert Lessons
            </Badge>
          </div>

          {sqlVideos.map((video, index) => {
            const isWatched = watchedVideos.has(video.id)
            return (
              <Card key={video.id} className={`group transition-all duration-700 hover:shadow-2xl border-0 ${
                isWatched 
                  ? 'bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950/40 dark:via-green-950/40 dark:to-teal-950/40 ring-2 ring-emerald-200/50 dark:ring-emerald-800/50' 
                  : 'bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800'
              } backdrop-blur-xl`}>
                <CardContent className="p-10">
                  <div className="flex items-start space-x-8">
                    {/* Professional Lesson Indicator */}
                    <div className="relative flex-shrink-0">
                      <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-white font-bold text-xl shadow-2xl transition-all duration-500 ${
                        isWatched 
                          ? 'bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 scale-110' 
                          : 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 group-hover:scale-110'
                      }`}>
                        {isWatched ? <CheckCircle className="h-10 w-10" /> : (
                          <div className="text-center">
                            <div className="text-sm font-semibold">#{index + 1}</div>
                          </div>
                        )}
                      </div>
                      {isWatched && (
                        <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 rounded-3xl blur opacity-30"></div>
                      )}
                    </div>

                    {/* Premium Video Thumbnail */}
                    <div
                      className="relative cursor-pointer flex-shrink-0 group/thumbnail"
                      onClick={() => openVideoModal(video)}
                    >
                      <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-64 h-36 object-cover transition-all duration-500 group-hover/thumbnail:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                        <div className="absolute inset-0 bg-black/0 group-hover/thumbnail:bg-black/30 transition-all duration-500 flex items-center justify-center">
                          <div className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center transform scale-0 group-hover/thumbnail:scale-100 transition-all duration-500 shadow-2xl">
                            <Play className="h-8 w-8 text-red-600 ml-1" />
                          </div>
                        </div>
                        <div className="absolute bottom-4 right-4 bg-black/90 text-white text-sm px-4 py-2 rounded-full font-bold">
                          {formatDuration(video.duration)}
                        </div>
                        {isWatched && (
                          <div className="absolute top-4 left-4 bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-bold flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Enhanced Video Information */}
                    <div className="flex-1 space-y-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 pr-6">
                          <h3
                            className="font-bold text-2xl mb-3 line-clamp-2 cursor-pointer hover:text-blue-600 transition-colors duration-300 leading-tight"
                            onClick={() => openVideoModal(video)}
                          >
                            {video.title}
                          </h3>
                          <p className="text-muted-foreground line-clamp-3 leading-relaxed text-lg">
                            {video.description}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-4 ml-6 flex-shrink-0">
                          <div className="text-right text-base">
                            <div className={`font-semibold ${isWatched ? 'text-emerald-600' : 'text-muted-foreground'}`}>
                              {isWatched ? '✓ Completed' : 'Mark Complete'}
                            </div>
                          </div>
                          <Checkbox
                            checked={isWatched}
                            onCheckedChange={() => toggleWatched(video.id)}
                            className="w-8 h-8 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500 transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-8 text-base text-muted-foreground">
                        <div className="flex items-center space-x-3">
                          <Clock className="h-5 w-5" />
                          <span className="font-semibold">{formatDuration(video.duration)}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Youtube className="h-5 w-5 text-red-500" />
                          <span>{formatViewCount(video.viewCount)} views</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Trophy className="h-5 w-5 text-amber-500" />
                          <span>Professional Level</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {Array.isArray(video.tags) && video.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="px-4 py-2 text-sm font-semibold hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors cursor-pointer">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Professional Learning Resources */}
        <Card className="mt-20 border-0 bg-gradient-to-r from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-4 text-3xl">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span>Professional Development Resources</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-bold text-xl">Learning Strategy</h4>
                </div>
                <ul className="text-muted-foreground space-y-3 ml-14 text-base">
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-500 mt-2 text-xs">●</span>
                    <span>Follow the sequential curriculum for optimal learning progression</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-500 mt-2 text-xs">●</span>
                    <span>Practice each concept with real database scenarios and projects</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-500 mt-2 text-xs">●</span>
                    <span>Build a portfolio of SQL queries and database solutions</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-bold text-xl">Best Practices</h4>
                </div>
                <ul className="text-muted-foreground space-y-3 ml-14 text-base">
                  <li className="flex items-start space-x-3">
                    <span className="text-emerald-500 mt-2 text-xs">●</span>
                    <span>Use professional SQL development tools and IDEs</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-emerald-500 mt-2 text-xs">●</span>
                    <span>Join our professional community for networking and mentorship</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-emerald-500 mt-2 text-xs">●</span>
                    <span>Review and refactor completed lessons for deeper understanding</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-bold text-xl">Career Growth</h4>
                </div>
                <ul className="text-muted-foreground space-y-3 ml-14 text-base">
                  <li className="flex items-start space-x-3">
                    <span className="text-purple-500 mt-2 text-xs">●</span>
                    <span>Set weekly learning milestones and track your achievements</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-purple-500 mt-2 text-xs">●</span>
                    <span>Apply SQL expertise to real-world business challenges</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-purple-500 mt-2 text-xs">●</span>
                    <span>Build your professional network within the database community</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Storage Notice for Developers */}
            <div className="mt-10 p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50 rounded-2xl border border-amber-200 dark:border-amber-800">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Code className="h-5 w-5 text-white" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-lg text-amber-700 dark:text-amber-300">Developer Note: Storage Implementation</h4>
                  <p className="text-amber-600 dark:text-amber-400 text-sm leading-relaxed">
                    <strong>For localStorage support:</strong> When using this component in your own environment, 
                    uncomment the localStorage lines in the <code>saveProgressToStorage</code> and <code>loadProgressFromStorage</code> functions 
                    to enable persistent progress tracking across browser sessions.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Professional Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-6"
          onClick={closeVideoModal}
        >
          <div 
            className="bg-white dark:bg-slate-900 rounded-3xl max-w-7xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Professional Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 p-8 rounded-t-3xl z-10">
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Badge variant="secondary" className="px-3 py-1 text-sm font-semibold">
                      Professional Level
                    </Badge>
                    <Badge variant={watchedVideos.has(selectedVideo.id) ? "default" : "outline"} className="px-3 py-1 text-sm">
                      {watchedVideos.has(selectedVideo.id) ? "Completed" : "In Progress"}
                    </Badge>
                  </div>
                  <h2 className="text-3xl font-bold mb-4 leading-tight">{selectedVideo.title}</h2>
                  <div className="flex items-center space-x-6 text-muted-foreground">
                    <span className="flex items-center space-x-2">
                      <Clock className="h-5 w-5" />
                      <span className="font-semibold">{formatDuration(selectedVideo.duration)}</span>
                    </span>
                    <span className="flex items-center space-x-2">
                      <Youtube className="h-5 w-5 text-red-500" />
                      <span>{formatViewCount(selectedVideo.viewCount)} views</span>
                    </span>
                    <span className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>Expert Level</span>
                    </span>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={closeVideoModal}
                  className="w-12 h-12 rounded-2xl hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950 flex-shrink-0 transition-all duration-300"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </div>
            
            {/* Professional Video Player */}
            <div className="p-8">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl mb-8 bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              
              {/* Professional Video Controls & Info */}
              <div className="space-y-8">
                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-950 rounded-2xl">
                  <div className="flex items-center space-x-4">
                    <Checkbox
                      checked={watchedVideos.has(selectedVideo.id)}
                      onCheckedChange={() => toggleWatched(selectedVideo.id)}
                      className="w-6 h-6 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                    />
                    <span className="font-semibold text-lg">
                      {watchedVideos.has(selectedVideo.id) ? '✓ Lesson Completed' : 'Mark as Completed'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" size="sm" className="flex items-center space-x-2 hover:bg-blue-50 dark:hover:bg-blue-950">
                      <ExternalLink className="h-4 w-4" />
                      <span>Open in YouTube</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center space-x-2 hover:bg-purple-50 dark:hover:bg-purple-950">
                      <Trophy className="h-4 w-4" />
                      <span>Add to Favorites</span>
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-2xl mb-4 flex items-center space-x-3">
                        <BookOpen className="h-6 w-6 text-blue-600" />
                        <span>Lesson Overview</span>
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-lg">{selectedVideo.description}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-2xl mb-4 flex items-center space-x-3">
                        <Target className="h-6 w-6 text-purple-600" />
                        <span>Key Topics</span>
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {Array.isArray(selectedVideo.tags) && selectedVideo.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="px-4 py-2 text-sm font-semibold">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-2xl">
                      <h4 className="font-bold text-lg mb-4 flex items-center space-x-2">
                        <Brain className="h-5 w-5 text-blue-600" />
                        <span>Learning Objectives</span>
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start space-x-2">
                          <span className="text-blue-500 mt-1">•</span>
                          <span>Master the concepts demonstrated in this lesson</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-blue-500 mt-1">•</span>
                          <span>Apply learned techniques to real-world scenarios</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-blue-500 mt-1">•</span>
                          <span>Build confidence in professional SQL development</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="p-6 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950 dark:to-green-950 rounded-2xl">
                      <h4 className="font-bold text-lg mb-4 flex items-center space-x-2">
                        <Trophy className="h-5 w-5 text-emerald-600" />
                        <span>Next Steps</span>
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start space-x-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>Practice the demonstrated queries in your own environment</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>Proceed to the next lesson in the curriculum</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>Share your progress with the learning community</span>
                        </li>
                      </ul>
                    </div>
                  </div>
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