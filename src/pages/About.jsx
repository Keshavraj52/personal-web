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
  { 
    icon: Database, 
    label: 'Data Analytics', 
    description: 'I love uncovering patterns and insights hidden in data to make smarter decisions.' 
  },
  { 
    icon: Code, 
    label: 'Software Development', 
    description: 'I enjoy building clean, scalable, and meaningful applications that solve real problems.' 
  },
  { 
    icon: Brain, 
    label: 'Machine Learning', 
    description: 'I’m fascinated by how machines can learn from data and help predict the future.' 
  },
  { 
    icon: Youtube, 
    label: 'Content Creation', 
    description: 'I create educational videos in Marathi to make technology and data easier to understand.' 
  },
  { 
    icon: Coffee, 
    label: 'Problem Solving', 
    description: 'I find joy in breaking down tough challenges and finding creative ways to solve them.' 
  },
  { 
    icon: Heart, 
    label: 'Open Source', 
    description: 'I believe in collaboration and love contributing to open-source projects that make a difference.' 
  }
];


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
                  <img src="/images/profile photo.jpg" alt="Profile Photo" srcset="" style={{
  width: '180px',
  height: '140px',
  objectFit: 'cover',
  borderRadius: '50%',
  border: '4px solid #2bc0daff',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  transition: 'transform 0.3s ease'
}} />
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
                    <span>poreg79@gmail.com</span>
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
               <div className="max-w-3xl mx-auto text-justify sm:text-left px-4">
  <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-[Inter] tracking-wide mb-4">
    Hi, I'm <span className="font-semibold text-gray-800">Keshavraj Pore</span> a data and AI enthusiast from Pune, India. 
    I enjoy solving real-world problems using data, automation, and intelligent systems. 
    My interest in this field grew during my studies in Artificial Intelligence and Data Science at 
    Savitribai Phule Pune University.
  </p>

  <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-[Inter] tracking-wide mb-4">
    I love transforming raw data into meaningful insights that help make better decisions. 
    My goal is to grow as a data analyst and build smart, efficient solutions that create real impact.
  </p>

  <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-[Inter] tracking-wide mb-4">
    I also enjoy teaching and sharing what I learn. On my YouTube channel, I explain data analytics and 
    programming concepts in Marathi — making technology more accessible to everyone.
  </p>

  <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-[Inter] tracking-wide">
    When I’m not coding or creating content, you’ll find me exploring new tools, contributing to open-source projects, 
    or solving challenges on LeetCode and HackerRank. I’m always curious and eager to keep learning.
  </p>
</div>

              </CardContent>
            </Card>

            {/* Current Focus */}
            <Card>
              <CardHeader>
                <CardTitle>What I'm Working On</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mt-8 font-[Inter]">
 {/* Currently Working On */}
<div className="space-y-3 relative">
  <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
    <h4 className="text-xl font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent flex items-center gap-2">
      <span className="animate-bounce">🔭</span> Currently Working On
    </h4>
    <ul className="text-base text-gray-700 dark:text-gray-300 leading-relaxed space-y-3 mt-4">
      {[
        { icon: "📊", text: "Designing clear and interactive data visualizations and dashboards" },
        { icon: "🧠", text: "Practicing SQL and Data Structure problems on LeetCode" },
        { icon: "🎥", text: "Creating new YouTube videos focused on data and analytics" },
        { icon: "🛠️", text: "Developing open-source MCP servers for real-world applications" }
      ].map((item, index) => (
        <li key={index} className="flex items-start gap-3 group">
          <span className="group-hover:scale-125 transition-transform">{item.icon}</span>
          <span className="group-hover:text-green-600 dark:group-hover:text-emerald-400 transition-colors">
            {item.text}
          </span>
        </li>
      ))}
    </ul>
  </div>
</div>

  {/* Currently Learning */}
  <div className="space-y-3 relative">
    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
      <h4 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
        <span className="animate-bounce">🌱</span> Currently Learning
      </h4>
      <ul className="text-base text-gray-700 dark:text-gray-300 leading-relaxed space-y-3 mt-4">
        {[
          { icon: "🤖", text: "Machine Learning techniques for data-driven analysis" },
          { icon: "📈", text: "Time Series Forecasting and Predictive Analytics" },
          { icon: "📊", text: "Data Storytelling and visualization using BI tools" },
          { icon: "☁️", text: "Advanced Cloud Computing and DevOps fundamentals" }
        ].map((item, index) => (
          <li key={index} className="flex items-start gap-3 group">
            <span className="group-hover:scale-125 transition-transform">{item.icon}</span>
            <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  </div>
  </div>

                </CardContent>
              </Card>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <a href="mailto:poreg79@gmail.com">
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

