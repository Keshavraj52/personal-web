import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  User, 
  MapPin, 
  Calendar, 
  Mail, 
  Phone, 
  Github, 
  Youtube, 
  Linkedin,
  GraduationCap,
  Briefcase,
  Heart,
  Coffee,
  Code,
  Database,
  Brain,
  Target,
  MessageCircle
} from 'lucide-react'

const About = () => {
  const skills = [
    { category: 'Programming Languages', items: ['Python', 'JavaScript', 'TypeScript', 'SQL'] },
    { category: 'Data & Analytics', items: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Power BI', 'Tableau'] },
    { category: 'Databases', items: ['MySQL', 'MongoDB'] },
    { category: 'Web Technologies', items: ['React', 'Node.js', 'Express', 'HTML/CSS', 'REST APIs'] },
    { category: 'Machine Learning', items: ['TensorFlow', 'Scikit-learn', 'Keras', 'MLflow'] },
    { category: 'Tools & Platforms', items: ['Git', 'AWS',  'Jupyter', 'VS Code'] }
  ]

  const interests = [
    { icon: Database, label: 'Data Analytics', description: 'Turning raw data into actionable insights' },
    { icon: Code, label: 'Software Development', description: 'Building scalable and efficient applications' },
    { icon: Brain, label: 'Machine Learning', description: 'Exploring AI and predictive modeling' },
    { icon: Youtube, label: 'Content Creation', description: 'Teaching and sharing knowledge through videos' },
    { icon: Coffee, label: 'Problem Solving', description: 'Tackling complex challenges with creative solutions' },
    { icon: Heart, label: 'Open Source', description: 'Contributing to the developer community' }
  ]

  const timeline = [
    {
      year: '2024',
      title: 'Data Analytics Specialist',
      organization: 'Tech Solutions Inc.',
      description: 'Leading data analytics projects and developing ML models for business intelligence.',
      type: 'work'
    },
    {
      year: '2023',
      title: 'Computer Science Engineering',
      organization: 'Savitribai Phule Pune University',
      description: 'Graduated with Gold Medal (CGPA: 9.8/10). Specialized in Data Structures and Algorithms.',
      type: 'education'
    },
    {
      year: '2023',
      title: 'YouTube Channel Launch',
      organization: 'Keshavraj Pore Channel',
      description: 'Started creating educational content in Marathi for SQL and data analytics.',
      type: 'achievement'
    },
    {
      year: '2022',
      title: 'Software Development Intern',
      organization: 'DataTech Solutions',
      description: 'Developed web applications and worked on database optimization projects.',
      type: 'work'
    }
  ]

  const getTimelineIcon = (type) => {
    switch (type) {
      case 'work':
        return Briefcase
      case 'education':
        return GraduationCap
      case 'achievement':
        return Target
      default:
        return Calendar
    }
  }

  const getTimelineColor = (type) => {
    switch (type) {
      case 'work':
        return 'from-blue-500 to-cyan-500'
      case 'education':
        return 'from-green-500 to-emerald-500'
      case 'achievement':
        return 'from-yellow-500 to-orange-500'
      default:
        return 'from-purple-500 to-violet-500'
    }
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold">
              About Me
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get to know more about my journey, skills, and passion for data analytics and technology
          </p>
        </div>

        {/* Personal Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6 text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-6">
                  KP
                </div>
                <h2 className="text-2xl font-bold mb-2">Keshavraj Pore</h2>
                <p className="text-muted-foreground mb-4">Data Enthusiast & Problem Solver</p>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>Pune, Maharashtra, India</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>keshavraj_pore@example.com</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>+91 7378564044</span>
                  </div>
                </div>

                <div className="flex justify-center space-x-3 mt-6">
                  <Button asChild variant="outline" size="icon">
                    <a href="https://github.com/Keshavraj52" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="icon">
                    <a href="https://www.youtube.com/@Keshavrajpore" target="_blank" rel="noopener noreferrer">
                      <Youtube className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="icon">
                    <a href="https://www.linkedin.com/in/keshavraj-pore-b33873257/" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                </div>

                <Button asChild className="w-full mt-6">
                  <a href="mailto:poreg79@example.com">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Get in Touch
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            <Card>
              <CardHeader>
                <CardTitle>My Story</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Hi there! I'm Keshavraj Pore, a passionate data enthusiast and problem solver from Pune, India. 
                  My journey in technology began during my artificial intelligence and data Science studies at Savitribai Phule Pune University, 
                  where I discovered my love for data analytics and database optimization.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  What started as curiosity about how data can tell stories has evolved into a career dedicated to 
                  turning raw information into actionable insights. I believe that data is the new oil, and I'm here 
                  to help refine it into valuable knowledge that drives decision-making.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Beyond my professional work, I'm passionate about education and knowledge sharing. Through my YouTube channel, 
                  I create educational content in Marathi, making complex technical concepts accessible to a broader audience. 
                  I believe that language should never be a barrier to learning technology.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  When I'm not coding or creating content, you'll find me exploring new technologies, contributing to open-source projects, 
                  or solving challenging problems on Hacker Rank and LeetCode. I'm always eager to learn, grow, and share my knowledge with the community.
                </p>
              </CardContent>
            </Card>

            {/* Current Focus */}
            <Card>
              <CardHeader>
                <CardTitle>What I'm Working On</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-green-600">🔭 Currently Working On</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Creating insightful data visualizations and dashboards</li>
                      <li>• Solving LeetCode problems related to SQL & Data Structures</li>
                      <li>• Enhancing my YouTube content on data-related topics</li>
                      <li>• Building MCP servers for various use cases</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-blue-600">🌱 Currently Learning</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Machine Learning for Data Analysis</li>
                      <li>• Time Series Forecasting & Predictive Analytics</li>
                      <li>• Data Storytelling & Business Intelligence tools</li>
                      <li>• Advanced cloud technologies and DevOps</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Skills & Technologies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skillGroup, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{skillGroup.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary">
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
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
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

        {/* Timeline Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">My Journey</h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
              
              <div className="space-y-8">
                {timeline.map((item, index) => {
                  const Icon = getTimelineIcon(item.type)
                  return (
                    <div key={index} className="relative flex items-start space-x-6">
                      {/* Timeline dot */}
                      <div className={`relative z-10 w-16 h-16 rounded-full bg-gradient-to-r ${getTimelineColor(item.type)} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      
                      {/* Content */}
                      <Card className="flex-1">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline">{item.year}</Badge>
                            <Badge variant="secondary" className="capitalize">
                              {item.type}
                            </Badge>
                          </div>
                          <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                          <p className="text-sm text-blue-600 mb-2">{item.organization}</p>
                          <p className="text-muted-foreground text-sm">{item.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 border-blue-200 dark:border-blue-800">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Let's Connect and Collaborate!
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                I'm always excited to connect with fellow developers, data enthusiasts, and anyone passionate about technology. 
                Whether you want to collaborate on a project, discuss data analytics, or just have a chat about tech, I'd love to hear from you!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <a href="mailto:keshavraj_pore@example.com">
                    <Mail className="mr-2 h-4 w-4" />
                    Send me an Email
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="https://www.youtube.com/@Keshavrajpore" target="_blank" rel="noopener noreferrer">
                    <Youtube className="mr-2 h-4 w-4" />
                    Subscribe to my Channel
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

export default About

