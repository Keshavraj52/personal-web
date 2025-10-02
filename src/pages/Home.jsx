import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { githubApi } from '../services/githubApi'
import { youtubeApi } from '../services/youtubeApi'

import { 
  Github, 
  Youtube, 
  Database, 
  Code, 
  Trophy, 
  Server, 
  ArrowRight,
  Play,
  Users,
  BookOpen,
  Star,
  Brain,
  Notebook,
  VideoIcon
} from 'lucide-react'
import { color } from 'framer-motion'

const Home = () => {
const [stats, setStats] = useState({
  youtubeSubscribers: 0,
  youtubeVideos: 0,
  githubRepos: 0,
  githubStars: 0
})

useEffect(() => {
  const fetchStats = async () => {
    try {
      const ytStats = await youtubeApi.getChannelStats()
      const ghStats = await githubApi.getRepositoryStats()

      setStats({
        youtubeSubscribers: ytStats.subscriberCount,
        youtubeVideos: ytStats.videoCount,
        githubRepos: ghStats.totalRepos,
        githubStars: ghStats.totalStars
      })
    } catch (err) {
      console.error('Error loading stats:', err)
    }
  }

  fetchStats()
}, [])

  const features = [
    {
      icon: Code,
      title: 'Projects',
      description: 'Explore my GitHub repositories with diverse tech stacks',
      link: '/projects',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Trophy,
      title: 'Achievements',
      description: 'Certifications, hackathons, and professional milestones',
      link: '/achievements',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Youtube,
      title: 'YouTube Channel',
      description: 'Educational content on data analytics and programming',
      link: '/youtube',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Database,
      title: 'SQL Learning',
      description: 'Comprehensive SQL tutorial series with progress tracking',
      link: '/sql-learning',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Server,
      title: 'MCP Servers',
      description: 'Open-source MCP servers and data visualization projects',
      link: '/mcp-servers',
      color: 'from-purple-500 to-violet-500'
    },
       {
      icon: Brain,
      title: 'Quiz Generator',
      description: 'generate quizzes based on your learning needs',
      link: '/quiz-generator',
      color: 'from-pink-500 to-fuchsia-500'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover opacity-85 z-0"
  >
    <source src="/3Dcolor.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            
            <div className="space-y-8">
              <div className="space-y-4">
                {/* <Badge variant="secondary" className="w-fit">
                  <span className="animate-pulse mr-2">🚀</span>
                  Data Enthusiast & Problem Solver
                </Badge> */}
                <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent" >
                  <span style={{ color: '#2CEAA3' }}>Hi 👋, I'm{' '}</span>
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                    Keshavraj Pore
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Passionate about Data Analytics, Databases, and Optimization. 
                  Teaching complex topics on YouTube, exploring Hacker Rank, LeetCode challenges 
                  and turning data into insights, one query at a time! ✨
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-red-500">{stats.youtubeSubscribers}</div>
                  <div className="text-sm text-muted-foreground">YouTube Subscribers</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-red-500">{stats.youtubeVideos}</div>
                  <div className="text-sm text-muted-foreground">Videos</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-blue-500">{stats.githubRepos}</div>
                  <div className="text-sm text-muted-foreground">GitHub Repos</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-yellow-500">Free</div>
                  <div className="text-sm text-muted-foreground">SQL Course</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="group">
                  <Link to="/projects">
                    <Code className="mr-2 h-4 w-4" />
                    View Projects
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="group">
                  <a href="https://www.youtube.com/@Keshavrajpore" target="_blank" rel="noopener noreferrer">
                    <Youtube className="mr-2 h-4 w-4" />
                    Watch Videos
                    <Play className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Profile Image/Animation */}
            <div className="relative">
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-muted to-background rounded-2xl p-8 border border-border">
                  <div className="text-center space-y-6">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                      KP
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Currently Working On</h3>
                      <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                        <li>📊 Data visualizations and dashboards</li>
                        <li>🧩 LeetCode SQL & Data Structures</li>
                        <li>🎥 YouTube educational content</li>
                        <li>🤖 Machine Learning projects</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Explore My Work
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover my projects, achievements, educational content, and open-source contributions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground mb-4">{feature.description}</p>
                        <Button asChild variant="ghost" className="group/btn p-0 h-auto">
                          <Link to={feature.link}>
                            Learn more
                            <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Special Promotion Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 border-blue-200 dark:border-blue-800">
            <CardContent className="p-8 text-center">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    🎓 Free Course
                  </Badge>
                  <h3 className="text-2xl lg:text-3xl font-bold">
                    Complete SQL Course in Marathi
                  </h3>
                  <p className="text-muted-foreground">
                    Learn SQL from basics to advanced concepts with real-world examples. 
                    Perfect for beginners and those looking to strengthen their database skills.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                    <Link to="/sql-learning">
                      <VideoIcon className="mr-2 h-4 w-4" />
                      Start Learning SQL
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <a href="/sqlnotes" target="_blank" rel="noopener noreferrer">
                      <BookOpen className="mr-2 h-4 w-4" />
                      SQL Notes
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

export default Home

