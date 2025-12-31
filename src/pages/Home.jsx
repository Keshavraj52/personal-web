// ============================================
// PART 1: IMPORTS AND STATE SETUP
// ============================================

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { githubApi } from '../services/githubApi'
import { youtubeApi } from '../services/youtubeApi'
import { CardHeader, CardTitle } from '@/components/ui/card'

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
  Video,
  Download,
  Mail,
  Linkedin,
  ExternalLink,
  Sparkles
} from 'lucide-react'

const Home = () => {
  // Mouse position state for parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Visibility state for animations
  const [isVisible, setIsVisible] = useState(false)

  // Stats from API
  const [stats, setStats] = useState({
    youtubeSubscribers: 0,
    youtubeVideos: 0,
    githubRepos: 0,
    githubStars: 0
  })

  // Fetch stats and setup mouse tracking
  useEffect(() => {
    setIsVisible(true)

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

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

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Data arrays
  const features = [
    {
      icon: Code,
      title: 'Github Projects',
      description: 'Take a look at my GitHub projects where I experiment with different technologies and build real-world solutions.',
      link: '/Githubprojects',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Trophy,
      title: 'Achievements',
      description: 'From hackathons to certifications, here is a glimpse of the milestones that shaped my learning journey.',
      link: '/achievements',
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: Youtube,
      title: 'YouTube Channel',
      description: 'I create simple, practical tutorials on data analytics and programming, helping others learn what I love doing.',
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
      {/* HERO SECTION */}
      <section className="relative min-h-screen overflow-hidden bg-slate-950">

        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient Orbs */}
          <div
            className="absolute top-1/4 -left-48 w-96 h-96 bg-emerald-500/30 rounded-full blur-3xl animate-pulse"
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
            }}
          />
          <div
            className="absolute bottom-1/4 -right-48 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse"
            style={{
              transform: `translate(${-mousePosition.x * 0.02}px, ${-mousePosition.y * 0.02}px)`,
              animationDelay: '1s'
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '2s' }}
          />

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:72px_72px]" />

          {/* Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-emerald-400/40 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 10}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100vh-6rem)]">

            {/* Left Content */}
            <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>

              {/* Available Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-emerald-300 font-medium">Available for opportunities</span>
              </div>

              {/* Main Title */}
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="block text-slate-200">Hi, I'm</span>
                  <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                    Keshavraj Pore
                  </span>
                </h1>

                {/* Role Tags */}
                <div className="flex flex-wrap gap-2">
                  {['Data Analyst', 'AI/ML Engineer', 'Data Scientist', 'Full-Stack Dev'].map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-medium text-slate-300 bg-slate-800/50 border border-slate-700/50 rounded-full backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
                  Final-year AI & Data Science student crafting intelligent solutions through
                  <span className="text-emerald-400 font-medium"> machine learning</span>,
                  <span className="text-cyan-400 font-medium"> data analytics</span>, and
                  <span className="text-purple-400 font-medium"> full-stack development</span>.
                  Building automation systems and sharing knowledge with 1K+ developers on YouTube.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/projectsreal"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105"
                >
                  <Code className="w-5 h-5" />
                  View Projects
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/Keshavraj-Pore_--7378564044.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-slate-800/50 text-slate-200 font-medium rounded-lg border border-slate-700/50 hover:bg-slate-800 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                >
                  <Download className="w-5 h-5" />
                  Download Resume
                </Link>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {[
                  { icon: Github, href: 'https://github.com/yourusername', color: 'hover:text-slate-300' },
                  { icon: Linkedin, href: 'https://linkedin.com/in/yourusername', color: 'hover:text-blue-400' },
                  { icon: Youtube, href: 'https://www.youtube.com/@Keshavrajpore', color: 'hover:text-red-500' },
                  { icon: Mail, href: '/about', color: 'hover:text-emerald-400' }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 flex items-center justify-center rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-400 ${social.color} backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-slate-600`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
            {/* Right Content - Profile & Stats */}
            <div className={`flex flex-col items-center gap-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>

              {/* Profile Image */}
              <div className="relative group">
                {/* Animated Ring */}
                <div className="absolute inset-0 -m-8">
                  <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="48"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="0.5"
                      strokeDasharray="4 4"
                      opacity="0.5"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="50%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />

                {/* Image Container */}
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full p-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500">
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-4 border-slate-900">
                    <img
                      src="/images/profile photo.jpg"
                      alt="Keshavraj Pore"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-slate-900 border border-emerald-500/50 rounded-full shadow-lg backdrop-blur-sm">
                  <span className="text-emerald-400 font-medium text-sm">⚡ Open to Work</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                {[
                  {
                    label: 'YouTube Subs',
                    value: stats.youtubeSubscribers || '1K+',
                    color: 'from-red-500 to-rose-500',
                    icon: Youtube
                  },
                  {
                    label: 'GitHub Repos',
                    value: stats.githubRepos || '25+',
                    color: 'from-emerald-500 to-cyan-500',
                    icon: Github
                  }
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="relative group p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 hover:border-slate-600/50 transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Quick Links */}
              <div className="flex gap-3 w-full max-w-md">
                <a
                  href="https://www.youtube.com/@Keshavrajpore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20 transition-all duration-300 backdrop-blur-sm group"
                >
                  <Youtube className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Watch Videos</span>
                </a>
                <a
                  href="#contact"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-all duration-300 backdrop-blur-sm group"
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Get in Touch</span>
                </a>
              </div>
            </div>        </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center p-2">
            <div className="w-1.5 h-3 bg-emerald-400 rounded-full animate-scroll" />
          </div>
        </div>

      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900 dark:text-slate-100">
              Explore My Work
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Discover my projects, achievements, educational content, and open-source contributions
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>

                      {/* Content */}
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">
                          {feature.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                          {feature.description}
                        </p>

                        {/* Learn More Link */}
                        <Button
                          asChild
                          variant="ghost"
                          className="group/btn p-0 h-auto text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                        >
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
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Title */}
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skillGroup, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
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
      </section>

      {/* Interests Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Title */}
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-slate-100">
            Interests & Passions
          </h2>

          {/* Interests Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interests.map((interest, index) => {
              const Icon = interest.icon
              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                >
                  <CardContent className="p-6 text-center">
                    {/* Icon */}
                    <div className="w-12 h-12 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">
                      {interest.label}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {interest.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>


      {/* Special Promotion Section */}
      <section className="py-20 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-8 text-center">
              <div className="space-y-6">

                {/* Header */}
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

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Link to="/sql-learning">
                      <Video className="mr-2 h-4 w-4" />
                      Start Learning SQL
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-950"
                  >
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

      {/* ADD STYLES HERE - Line 437 */}
      <style jsx>{`
  @keyframes gradient {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient 3s ease infinite;
  }
  
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .animate-spin-slow {
    animation: spin-slow 20s linear infinite;
  }
  
  @keyframes float {
    0%, 100% { 
      transform: translateY(0px); 
      opacity: 0; 
    }
    50% { 
      opacity: 0.5; 
    }
  }
  
  .animate-float {
    animation: float linear infinite;
  }
  
  @keyframes scroll {
    0% { 
      transform: translateY(0); 
      opacity: 0; 
    }
    50% { 
      opacity: 1; 
    }
    100% { 
      transform: translateY(12px); 
      opacity: 0; 
    }
  }
  
  .animate-scroll {
    animation: scroll 2s ease-in-out infinite;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out;
  }
`}</style>



    </div>





  )

}
export default Home