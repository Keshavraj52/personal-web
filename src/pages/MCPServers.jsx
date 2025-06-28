import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Server, 
  Download, 
  Github, 
  ExternalLink, 
  Database, 
  BarChart3,
  Code,
  Globe,
  FileText,
  Zap,
  Shield,
  Cpu
} from 'lucide-react'

const MCPServers = () => {
  const [activeCategory, setActiveCategory] = useState('all')

  const mcpServers = [
    {
      id: 1,
      name: 'Database Analytics MCP',
      description: 'A powerful MCP server for database analytics and query optimization. Supports multiple database engines including MySQL, PostgreSQL, and SQLite.',
      category: 'database',
      technologies: ['Python', 'SQL', 'FastAPI', 'SQLAlchemy'],
      features: ['Query Optimization', 'Performance Monitoring', 'Schema Analysis', 'Data Profiling'],
      githubUrl: 'https://github.com/Keshavraj52/database-analytics-mcp',
      downloadUrl: '/downloads/database-analytics-mcp.zip',
      documentation: '/docs/database-analytics-mcp',
      status: 'stable',
      version: 'v2.1.0',
      downloads: 1250,
      stars: 45
    },
    {
      id: 2,
      name: 'Data Visualization MCP',
      description: 'Create stunning data visualizations and interactive dashboards. Supports various chart types and real-time data updates.',
      category: 'visualization',
      technologies: ['JavaScript', 'D3.js', 'React', 'WebSocket'],
      features: ['Interactive Charts', 'Real-time Updates', 'Custom Themes', 'Export Options'],
      githubUrl: 'https://github.com/Keshavraj52/data-viz-mcp',
      downloadUrl: '/downloads/data-viz-mcp.zip',
      documentation: '/docs/data-viz-mcp',
      status: 'stable',
      version: 'v1.8.3',
      downloads: 890,
      stars: 32
    },
    {
      id: 3,
      name: 'API Gateway MCP',
      description: 'Lightweight API gateway with authentication, rate limiting, and monitoring capabilities. Perfect for microservices architecture.',
      category: 'api',
      technologies: ['Node.js', 'Express', 'Redis', 'JWT'],
      features: ['Rate Limiting', 'Authentication', 'Load Balancing', 'Monitoring'],
      githubUrl: 'https://github.com/Keshavraj52/api-gateway-mcp',
      downloadUrl: '/downloads/api-gateway-mcp.zip',
      documentation: '/docs/api-gateway-mcp',
      status: 'beta',
      version: 'v0.9.2',
      downloads: 567,
      stars: 28
    },
    {
      id: 4,
      name: 'ML Pipeline MCP',
      description: 'End-to-end machine learning pipeline server with model training, validation, and deployment capabilities.',
      category: 'ml',
      technologies: ['Python', 'TensorFlow', 'Scikit-learn', 'MLflow'],
      features: ['Model Training', 'Auto-validation', 'Model Serving', 'Experiment Tracking'],
      githubUrl: 'https://github.com/Keshavraj52/ml-pipeline-mcp',
      downloadUrl: '/downloads/ml-pipeline-mcp.zip',
      documentation: '/docs/ml-pipeline-mcp',
      status: 'alpha',
      version: 'v0.5.1',
      downloads: 234,
      stars: 19
    },
    {
      id: 5,
      name: 'Security Audit MCP',
      description: 'Comprehensive security auditing server for web applications. Includes vulnerability scanning and compliance checking.',
      category: 'security',
      technologies: ['Python', 'OWASP', 'Nmap', 'SQLMap'],
      features: ['Vulnerability Scanning', 'Compliance Check', 'Report Generation', 'Automated Testing'],
      githubUrl: 'https://github.com/Keshavraj52/security-audit-mcp',
      downloadUrl: '/downloads/security-audit-mcp.zip',
      documentation: '/docs/security-audit-mcp',
      status: 'stable',
      version: 'v1.3.7',
      downloads: 678,
      stars: 41
    },
    {
      id: 6,
      name: 'Performance Monitor MCP',
      description: 'Real-time application performance monitoring with alerting and analytics. Track metrics, logs, and traces.',
      category: 'monitoring',
      technologies: ['Go', 'Prometheus', 'Grafana', 'InfluxDB'],
      features: ['Real-time Monitoring', 'Custom Alerts', 'Performance Analytics', 'Log Aggregation'],
      githubUrl: 'https://github.com/Keshavraj52/performance-monitor-mcp',
      downloadUrl: '/downloads/performance-monitor-mcp.zip',
      documentation: '/docs/performance-monitor-mcp',
      status: 'stable',
      version: 'v2.0.4',
      downloads: 1456,
      stars: 67
    }
  ]

  const categories = [
    { id: 'all', label: 'All Servers', icon: Server },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'visualization', label: 'Visualization', icon: BarChart3 },
    { id: 'api', label: 'API Gateway', icon: Globe },
    { id: 'ml', label: 'Machine Learning', icon: Cpu },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'monitoring', label: 'Monitoring', icon: Zap }
  ]

  const filteredServers = activeCategory === 'all' 
    ? mcpServers 
    : mcpServers.filter(server => server.category === activeCategory)

  const getStatusColor = (status) => {
    switch (status) {
      case 'stable':
        return 'bg-green-500'
      case 'beta':
        return 'bg-yellow-500'
      case 'alpha':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'stable':
        return 'default'
      case 'beta':
        return 'secondary'
      case 'alpha':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'database':
        return Database
      case 'visualization':
        return BarChart3
      case 'api':
        return Globe
      case 'ml':
        return Cpu
      case 'security':
        return Shield
      case 'monitoring':
        return Zap
      default:
        return Server
    }
  }

  const totalDownloads = mcpServers.reduce((sum, server) => sum + server.downloads, 0)
  const totalStars = mcpServers.reduce((sum, server) => sum + server.stars, 0)

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <Server className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold">
              MCP Servers
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Open-source Model Context Protocol servers for various use cases. 
            Download, customize, and deploy these production-ready solutions.
          </p>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            🚀 {mcpServers.length} Servers • 📦 {totalDownloads.toLocaleString()} Downloads • ⭐ {totalStars} Stars
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <Server className="h-8 w-8 mx-auto mb-2 text-purple-500" />
              <div className="text-2xl font-bold">{mcpServers.length}</div>
              <div className="text-sm text-muted-foreground">Total Servers</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Download className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">{totalDownloads.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Downloads</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Github className="h-8 w-8 mx-auto mb-2 text-gray-500" />
              <div className="text-2xl font-bold">{totalStars}</div>
              <div className="text-sm text-muted-foreground">GitHub Stars</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Code className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm text-muted-foreground">Open Source</div>
            </CardContent>
          </Card>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className="flex items-center space-x-2"
              >
                <Icon className="h-4 w-4" />
                <span>{category.label}</span>
              </Button>
            )
          })}
        </div>

        {/* Servers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredServers.map((server) => {
            const CategoryIcon = getCategoryIcon(server.category)
            return (
              <Card key={server.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <CategoryIcon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{server.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant={getStatusBadgeVariant(server.status)} className="text-xs">
                            {server.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{server.version}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {server.description}
                  </p>

                  {/* Technologies */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Technologies:</div>
                    <div className="flex flex-wrap gap-1">
                      {server.technologies.map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Key Features:</div>
                    <div className="flex flex-wrap gap-1">
                      {server.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {server.features.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{server.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Download className="h-3 w-3" />
                        <span>{server.downloads.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Github className="h-3 w-3" />
                        <span>{server.stars}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button asChild size="sm" className="flex-1">
                      <a href={server.downloadUrl} download>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <a href={server.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <a href={server.documentation} target="_blank" rel="noopener noreferrer">
                        <FileText className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* No results */}
        {filteredServers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No servers found in this category.</p>
          </div>
        )}

        {/* Sample Datasets Section */}
        <div className="mt-20">
          <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-6 w-6 text-green-500" />
                <span>Sample Datasets & Visualization Projects</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Explore our collection of sample datasets and visualization projects. 
                Perfect for learning, testing, and demonstrating data analysis capabilities.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="p-4">
                  <h4 className="font-semibold mb-2">E-commerce Dataset</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Complete e-commerce data with customers, orders, and products
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Dataset
                    </Button>
                    <Button size="sm" variant="outline">
                      <Code className="h-4 w-4 mr-2" />
                      Code
                    </Button>
                  </div>
                </Card>

                <Card className="p-4">
                  <h4 className="font-semibold mb-2">Healthcare Analytics</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Patient data with medical records and treatment outcomes
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Dataset
                    </Button>
                    <Button size="sm" variant="outline">
                      <Code className="h-4 w-4 mr-2" />
                      Code
                    </Button>
                  </div>
                </Card>

                <Card className="p-4">
                  <h4 className="font-semibold mb-2">Financial Markets</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Stock prices, trading volumes, and market indicators
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Dataset
                    </Button>
                    <Button size="sm" variant="outline">
                      <Code className="h-4 w-4 mr-2" />
                      Code
                    </Button>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-200 dark:border-purple-800">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Contribute to Open Source
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                All MCP servers are open source and welcome contributions. 
                Help improve existing servers or create new ones for the community!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <a href="https://github.com/Keshavraj52" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View on GitHub
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="mailto:keshavraj_pore@example.com">
                    Suggest New Server
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default MCPServers

