import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { githubApi } from '../services/githubApi'
import { youtubeApi } from '../services/youtubeApi'
import { CardHeader, CardTitle } from '@/components/ui/card'
import { Download, Mail } from 'lucide-react'

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
  Video
} from 'lucide-react'

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
      description: 'Take a look at my GitHub projects where I experiment with different technologies and build real-world solutions.',
      link: '/projects',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Trophy,
      title: 'Achievements',
      description: 'From hackathons to certifications. here is a glimpse of the milestones that shaped my learning journey.',
      link: '/achievements',
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: Youtube,
      title: 'YouTube Channel',
      description: 'I create simple, practical tutorials on data analytics and programming. helping others learn what I love doing.',
      link: '/youtube',
      color: 'from-rose-500 to-pink-500'
    },
    {
      icon: Database,
      title: 'SQL Learning',
      description: 'A complete SQL learning series I built to help students and beginners master databases step by step.',
      link: '/sql-learning',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Brain,
      title: 'DSA Videos',
      description: 'Explore my Data Structures and Algorithms video series on YouTube to enhance your problem-solving skills.',
      link: '/DSA',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Server,
      title: 'MCP Servers',
      description: 'Explore my open-source MCP server projects and interactive dashboards for data visualization.',
      link: '/mcp-servers',
      color: 'from-indigo-500 to-purple-500'
    }

  ]
  const skills = [
    {
      category: "Programming",
      items: ["Python", "JavaScript", "SQL", "C++"]
    },
    {
      category: "Data & AI",
      items: ["Machine Learning", "Data Analytics", "Pandas", "NumPy"]
    },
    {
      category: "Web",
      items: ["React", "Node.js", "Tailwind", "MySQL"]
    }
  ]
  const interests = [
    {
      icon: Code,
      label: "Coding",
      description: "Building real-world software solutions"
    },
    {
      icon: Brain,
      label: "AI & ML",
      description: "Exploring intelligent systems and data-driven models"
    },
    {
      icon: Youtube,
      label: "Teaching",
      description: "Creating educational content on YouTube"
    }
  ]


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-700 via-slate-900 to-slate-700" style={{marginTop:"0",height: "125vh"}}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20 z-0"
        >
          <source src="/12682205_3840_2160_30fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32" >

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}

            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-center sm:text-left">
                  <span className="text-emerald-200">Hi, I'm{' '}</span>
                  <span className="bg-gradient-to-r from-emerald-300 to-cyan-600 bg-clip-text text-transparent">
                    Keshavraj Pore
                  </span>
                </h1>
                <Button asChild size="lg" className="group bg-emerald-600 hover:bg-emerald-700 text-white">
                  <Link to="/Keshavraj-Pore_--7378564044.pdf" target="_blank" rel="noopener noreferrer" download>
                    <Download className="mr-2 h-4 w-4" />
                    download resume
                  </Link>
                </Button>
                <div className="max-w-2xl mx-auto text-justify  sm:text-left px-4">
                  <p className="text-lg text-slate-300 leading-relaxed ">
                    Final-year Artificial Intelligence & Data Science undergraduate with strong problem-solving skills and hands-on experience in building automation-driven, data-backed systems.
                    I specialize in Python, Data Analytics, SQL, Machine Learning, and full-stack development, with projects spanning MCP-based university automation, voice-enabled billing systems, and analytics dashboards.
                    I actively share technical knowledge on YouTube, solve DSA & SQL problems on LeetCode, and build open-source solutions focused on scalability, privacy, and real-world impact.

                  </p>
                </div>

              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" style={{marginTop:"0"}}>
                <div className="text-center p-4 rounded-lg bg-slate-800/80 backdrop-blur-sm border border-slate-700">
                  <div className="text-2xl font-bold text-rose-400">{stats.youtubeSubscribers}</div>
                  <div className="text-sm text-slate-400">YouTube Subscribers</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-slate-800/80 backdrop-blur-sm border border-slate-700">
                  <div className="text-2xl font-bold text-rose-400">{stats.youtubeVideos}</div>
                  <div className="text-sm text-slate-400">Videos</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-slate-800/80 backdrop-blur-sm border border-slate-700">
                  <div className="text-2xl font-bold text-emerald-400">{stats.githubRepos}</div>
                  <div className="text-sm text-slate-400">GitHub Repos</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-slate-800/80 backdrop-blur-sm border border-slate-700">
                  <div className="text-2xl font-bold text-amber-400">Free</div>
                  <div className="text-sm text-slate-400">SQL Course</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4" >
                <Button asChild size="lg" className="group bg-emerald-600 hover:bg-emerald-700 text-white">
                  <Link to="/projects">
                    <Code className="mr-2 h-4 w-4" />
                    View Projects
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="group border-slate-600 text-slate-200 hover:bg-slate-800">
                  <a href="https://www.youtube.com/@Keshavrajpore" target="_blank" rel="noopener noreferrer">
                    <Youtube className="mr-2 h-4 w-4" />
                    Watch Videos
                    <Play className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Profile Image/Animation */}
            <div className="relative flex justify-center items-center py-12 bg-transparent">
              <div className="relative w-full max-w-lg mx-auto">
                {/* Soft Glow Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>

                {/* Profile Image Wrapper */}
                <div className="relative flex justify-center items-center">
                  <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 mx-auto">
                    {/* Glowing Gradient Border */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 p-[6px]">
                      <div className="w-full h-full rounded-full bg-transparent"></div>
                    </div>

                    {/* Profile Image */}
                    <img
                      src="/images/profile photo.jpg"
                      alt="Profile"
                      className="relative w-full h-full object-cover rounded-full border-4 border-transparent shadow-2xl transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>









      {/* Features Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900 dark:text-slate-100">
              Explore My Work
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Discover my projects, achievements, educational content, and open-source contributions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">{feature.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">{feature.description}</p>
                        <Button asChild variant="ghost" className="group/btn p-0 h-auto text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300">
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





      {/* Skills Section */}
      <div className="mb-16" style={{ marginTop: "3vh" }} >
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Skills & Technologies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ marginLeft: "5vw", marginRight: "5vw" }}>
          {skills.map((skillGroup, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-600/10">
                <CardTitle className="text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {skillGroup.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <Badge
                      key={skillIndex}
                      variant="secondary"
                      className="animate-fadeIn hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white transition-all duration-300"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Interests Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Interests & Passions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interests.map((interest, index) => {
            const Icon = interest.icon
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1" style={{ marginLeft: "5vw", marginRight: "5vw" }}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{interest.label}</h3>
                  <p className="text-sm text-muted-foreground">{interest.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Special Promotion Section */}
      <section className="py-20 bg-white dark:bg-slate-950  border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-8 text-center">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                    🎓 Free Course
                  </Badge>
                  <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-100">
                    Complete SQL Course in Marathi
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Learn SQL from basics to advanced concepts with real-world examples.
                    Perfect for beginners and those looking to strengthen their database skills.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Link to="/sql-learning">
                      <Video className="mr-2 h-4 w-4" />
                      Start Learning SQL
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-950">
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