import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Github, 
  ExternalLink, 
  Search, 
  Filter,
  Calendar,
  Star,
  GitFork,
  Loader2,
  AlertCircle,
  Rocket,
  Play
} from 'lucide-react'
import { githubApi } from '../services/githubApi'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTech, setSelectedTech] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [stats, setStats] = useState(null)
  const projectsPerPage = 9

  // Featured live demos - Add your live projects here
  const liveDemos = [
    {
      id: 'demo-1',
      title: 'Voice Based Billing App',
      description: 'Engineered a voice-activated billing interface enabling hands-free item entry by reducing 60% time for item entry, dynamic total calculation, and receipt generation. Designed for accessibility-centric retail environments, the system lays groundwork for future UPI integration , real-time transaction processing and and generate detailed billing reports for enhanced business insights.',
      demoUrl: '',
      githubUrl: 'https://github.com/Keshavraj52/voice-based-billing-system',
      image: '../../public/images/voice billing.png',
      technologies: ['StreamLit', 'Python', 'SpeechRecognition', 'TTS', 'PDF Generation']
    },
    {
      id: 'demo-2',
      title: 'Task Management App',
      description: 'A feature-rich task management application with drag-and-drop functionality, team collaboration, and deadline tracking.',
      demoUrl: 'https://your-demo-2.vercel.app',
      githubUrl: 'https://github.com/Keshavraj52/task-manager',
      image: 'https://via.placeholder.com/400x200/8b5cf6/ffffff?text=Task+Manager',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express']
    },
    {
      id: 'demo-3',
      title: 'Weather Forecast App',
      description: 'Real-time weather forecasting application with interactive maps, 7-day predictions, and location-based weather alerts.',
      demoUrl: 'https://your-demo-3.vercel.app',
      githubUrl: 'https://github.com/Keshavraj52/weather-app',
      image: 'https://via.placeholder.com/400x200/ec4899/ffffff?text=Weather+App',
      technologies: ['React', 'OpenWeather API', 'Mapbox', 'CSS3']
    }
  ]

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const [repos, repoStats] = await Promise.all([
          githubApi.getAllRepositories(),
          githubApi.getRepositoryStats()
        ])
        
        const transformedRepos = repos
          .filter(repo => !repo.private)
          .map(repo => githubApi.transformRepositoryData(repo))
        
        setProjects(transformedRepos)
        setFilteredProjects(transformedRepos)
        setStats(repoStats)
      } catch (err) {
        console.error('Error fetching projects:', err)
        setError('Failed to load projects. Please try again later.')
        
        const mockProjects = [
          {
            id: 1,
            name: 'git-test-repo-mcp',
            description: 'A test repository for MCP (Model Context Protocol) integration and testing.',
            htmlUrl: 'https://github.com/Keshavraj52/git-test-repo-mcp',
            homepage: null,
            language: 'JavaScript',
            stargazersCount: 0,
            forksCount: 0,
            updatedAt: '2025-06-21T00:00:00Z',
            topics: ['mcp', 'testing', 'git']
          },
          {
            id: 2,
            name: 'MCP-SERVERS',
            description: 'Collection of Model Context Protocol servers for various integrations.',
            htmlUrl: 'https://github.com/Keshavraj52/MCP-SERVERS',
            homepage: null,
            language: 'TypeScript',
            stargazersCount: 2,
            forksCount: 1,
            updatedAt: '2025-06-19T00:00:00Z',
            topics: ['mcp', 'servers', 'protocol']
          },
          {
            id: 3,
            name: 'Health-Care-Project',
            description: 'A comprehensive healthcare management system with data analytics.',
            htmlUrl: 'https://github.com/Keshavraj52/Health-Care-Project',
            homepage: null,
            language: 'Python',
            stargazersCount: 5,
            forksCount: 2,
            updatedAt: '2025-05-21T00:00:00Z',
            topics: ['healthcare', 'python', 'analytics', 'machine-learning']
          }
        ]
        setProjects(mockProjects)
        setFilteredProjects(mockProjects)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  useEffect(() => {
    let filtered = projects

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.topics?.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (selectedTech !== 'all') {
      filtered = filtered.filter(project =>
        project.language?.toLowerCase() === selectedTech.toLowerCase() ||
        project.topics?.some(topic => topic.toLowerCase() === selectedTech.toLowerCase())
      )
    }

    setFilteredProjects(filtered)
    setCurrentPage(1)
  }, [searchTerm, selectedTech, projects])

  const technologies = ['all', ...new Set(projects.flatMap(project => 
    [project.language, ...(project.topics || [])].filter(Boolean)
  ))]

  const indexOfLastProject = currentPage * projectsPerPage
  const indexOfFirstProject = indexOfLastProject - projectsPerPage
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject)
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: 'bg-yellow-500',
      TypeScript: 'bg-blue-500',
      Python: 'bg-green-500',
      'Jupyter Notebook': 'bg-orange-500',
      CSS: 'bg-purple-500',
      HTML: 'bg-red-500',
      'C++': 'bg-blue-600',
      Java: 'bg-orange-600',
      Go: 'bg-cyan-500',
      Rust: 'bg-orange-700',
      PHP: 'bg-indigo-500'
    }
    return colors[language] || 'bg-gray-500'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading projects from GitHub...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            My Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore my GitHub repositories showcasing diverse technologies and innovative solutions
          </p>
          {error && (
            <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg max-w-md mx-auto">
              <div className="flex items-center space-x-2 text-destructive">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            </div>
          )}
        </div>

        {/* Live Demos Section */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <Rocket className="h-6 w-6 mr-2 text-primary" />
            <h2 className="text-3xl font-bold">Featured Live Demos</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {liveDemos.map((demo) => (
              <Card key={demo.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img 
                    src={demo.image} 
                    alt={demo.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <Button asChild size="sm" className="bg-white text-black hover:bg-gray-100">
                      <a href={demo.demoUrl} target="_blank" rel="noopener noreferrer">
                        <Play className="h-4 w-4 mr-2" />
                        View Demo
                      </a>
                    </Button>
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl">{demo.title}</CardTitle>
                    <div className="flex space-x-1">
                      <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                        <a href={demo.demoUrl} target="_blank" rel="noopener noreferrer" title="Live Demo">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                        <a href={demo.githubUrl} target="_blank" rel="noopener noreferrer" title="View Code">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    {demo.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {demo.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button asChild className="w-full" variant="outline">
                    <a href={demo.demoUrl} target="_blank" rel="noopener noreferrer">
                      <Play className="h-4 w-4 mr-2" />
                      Launch Demo
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-12"></div>

        {/* All Projects Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">All GitHub Repositories</h2>
          <p className="text-muted-foreground">Browse through all my open-source projects</p>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <Github className="h-8 w-8 mx-auto mb-2 text-gray-500" />
                <div className="text-2xl font-bold">{stats.totalRepos}</div>
                <div className="text-sm text-muted-foreground">Repositories</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                <div className="text-2xl font-bold">{stats.totalStars}</div>
                <div className="text-sm text-muted-foreground">Total Stars</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <GitFork className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold">{stats.totalForks}</div>
                <div className="text-sm text-muted-foreground">Total Forks</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold">{Object.keys(stats.languages).length}</div>
                <div className="text-sm text-muted-foreground">Languages</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                {technologies.map(tech => (
                  <option key={tech} value={tech}>
                    {tech === 'all' ? 'All Technologies' : tech}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentProjects.map((project) => (
            <Card key={project.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {project.name}
                  </CardTitle>
                  <div className="flex space-x-1">
                    <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                      <a href={project.htmlUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                    {project.homepage && (
                      <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                        <a href={project.homepage} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {project.description || 'No description available'}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    {project.language && (
                      <div className="flex items-center space-x-1">
                        <div className={`w-3 h-3 rounded-full ${getLanguageColor(project.language)}`}></div>
                        <span className="text-muted-foreground">{project.language}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-3 text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3" />
                      <span>{project.stargazersCount}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <GitFork className="h-3 w-3" />
                      <span>{project.forksCount}</span>
                    </div>
                  </div>
                </div>

                {project.topics && project.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {project.topics.slice(0, 3).map((topic) => (
                      <Badge key={topic} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                    {project.topics.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.topics.length - 3}
                      </Badge>
                    )}
                  </div>
                )}

                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  Updated {formatDate(project.updatedAt)}
                </div>
              </CardContent>
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
        {filteredProjects.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Projects