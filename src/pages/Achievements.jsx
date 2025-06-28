import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Trophy, 
  Medal, 
  Award, 
  Calendar, 
  ExternalLink,
  GraduationCap,
  Code,
  Database,
  Users,
  Target,
  Star,
  Zap,
  BookOpen,
  Cpu,
  Globe
} from 'lucide-react'

const Achievements = () => {
  const [activeCategory, setActiveCategory] = useState('all')

  const achievements = [
  {
    "id": 9,
    "title": "Vertexo 4.0 Pitching Winner",
    "organization": "ED CELL EVENT",
    "date": "2023-10-01",
    "category": "award",
    "type": "trophy",
    "description": "1st prize in the Vertexo 4.0 Idea Pitching Competition.",
    "image": "/images/vertexo4.01.jpeg",
    "skills": ["Pitching", "Innovation"],
  },
  {
    "id": 10,
    "title": "Model Demonstration – 2nd Prize",
    "organization": "SPECTRUM EVENT",
    "date": "2023-09-15",
    "category": "award",
    "type": "medal",
    "description": "2nd prize at PCCOE's model demonstration for showcasing innovative projects.",
    "image": "/images/project based learning.jpeg",
    "skills": ["Model Design", "Innovation"],
  },
  {
    "id": 11,
    "title": "Model Demonstration – 3rd Prize",
    "organization": "DYPIEMR EVENT",
    "date": "2023-08-28",
    "category": "award",
    "type": "medal",
    "description": "3rd prize for demonstrating an academic support platform for SPPU students.",
    "image": "/images/modeld.jpg",
    "skills": ["EdTech", "Platform Building"],
  },
  {
    "id": 12,
    "title": "Internal Hackathon - Smart India Hackathon",
    "organization": "Techcombat 2.0",
    "date": "2023-07-10",
    "category": "hackathon",
    "type": "trophy",
    "description": "Successfully completed internal round of Smart India Hackathon with innovative problem-solving.",
    "image": "/images/sih.jpeg",
    "skills": ["Problem Solving", "Teamwork"],
  },
  {
    "id": 13,
    "title": "Accenture Innovation Challenge",
    "organization": "Accenture",
    "date": "2023-06-20",
    "category": "hackathon",
    "type": "trophy",
    "description": "Participated in solving real-world challenges as part of the Accenture Innovation Challenge.",
    "image": "/images/accenture.png",
    "skills": ["Innovation", "Problem Solving"],
  },
  {
    "id": 14,
    "title": "IIC Regional Meet 2023 - Yukti Innovation",
    "organization": "DPU",
    "date": "2023-05-30",
    "category": "achievement",
    "type": "award",
    "description": "Presented a startup idea at the MoE's Innovation Cell event during Yukti Innovation Challenge.",
    "image": "/images/iic.jpeg",
    "skills": ["Startup", "Pitching", "Innovation"],
  },
  {
    "id": 15,
    "title": "IIC Regional Meet 2023 (Certificate)",
    "organization": "ED CELL",
    "date": "2023-05-30",
    "category": "achievement",
    "type": "certificate",
    "description": "Received recognition for startup idea at Yukti Innovation Challenge.",
    "image": "/images/iic cer.jpeg",
    "skills": ["Innovation", "Entrepreneurship"],
  },
  {
    "id": 16,
    "title": "Novus Neurons",
    "organization": "Novus Neurons",
    "date": "2023-11-05",
    "category": "achievement",
    "type": "badge",
    "description": "Contributed as Joint Web Advisor supporting collaborative innovation.",
    "image": "/images/nn.jpeg",
    "skills": ["Collaboration", "Strategic Guidance"],
  },
  {
    "id": 17,
    "title": "Learning Japanese on Duolingo",
    "organization": "Duolingo",
    "date": "2023-12-01",
    "category": "achievement",
    "type": "badge",
    "description": "Spent over 1000 minutes in 2023 learning Japanese, committed to expanding language skills.",
    "image": "/images/duolingo.jpeg",
    "skills": ["Japanese", "Language Learning"],
  },
  {
    "id": 18,
    "title": "Power BI - Shop Analysis",
    "organization": "Independent",
    "date": "2023-10-10",
    "category": "achievement",
    "type": "certificate",
    "description": "Used Power BI to analyze retail shop data, delivering insights through dashboards.",
    "image": "/images/power bi.jpeg",
    "skills": ["Power BI", "Dashboard", "Analytics"],
  },
  {
    "id": 19,
    "title": "Introduction to Data Science",
    "organization": "Cisco",
    "date": "2023-07-01",
    "category": "certification",
    "type": "certificate",
    "description": "Completed Cisco's Introduction to Data Science course, building skills in data analysis.",
    "image": "/images/cisco.jpeg",
    "skills": ["Data Science", "Cisco", "Analytics"],
  }
  ]

  const categories = [
    { id: 'all', label: 'All Achievements', icon: Trophy },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'certification', label: 'Certifications', icon: Award },
    { id: 'hackathon', label: 'Hackathons', icon: Code },
    { id: 'award', label: 'Awards', icon: Medal },
    { id: 'achievement', label: 'Achievements', icon: Star }
  ]

  const filteredAchievements = activeCategory === 'all' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === activeCategory)

  const getTypeIcon = (type) => {
    switch (type) {
      case 'trophy':
        return Trophy
      case 'medal':
        return Medal
      case 'certificate':
        return Award
      case 'badge':
        return Star
      case 'award':
        return Target
      default:
        return Trophy
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'trophy':
        return 'from-yellow-400 to-yellow-600'
      case 'medal':
        return 'from-gray-400 to-gray-600'
      case 'certificate':
        return 'from-blue-400 to-blue-600'
      case 'badge':
        return 'from-green-400 to-green-600'
      case 'award':
        return 'from-purple-400 to-purple-600'
      default:
        return 'from-yellow-400 to-yellow-600'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const totalAchievements = achievements.length
  const certifications = achievements.filter(a => a.category === 'certification').length
  const hackathonWins = achievements.filter(a => a.category === 'hackathon').length
  const awards = achievements.filter(a => a.category === 'award' || a.category === 'achievement').length

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold">
              Achievements
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A collection of my academic achievements, certifications, hackathon wins, and professional recognitions
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold">{totalAchievements}</div>
              <div className="text-sm text-muted-foreground">Total Achievements</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Award className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">{certifications}</div>
              <div className="text-sm text-muted-foreground">Certifications</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Code className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">{hackathonWins}</div>
              <div className="text-sm text-muted-foreground">Hackathon Wins</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Medal className="h-8 w-8 mx-auto mb-2 text-purple-500" />
              <div className="text-2xl font-bold">{awards}</div>
              <div className="text-sm text-muted-foreground">Awards & Honors</div>
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

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredAchievements.map((achievement) => {
            const TypeIcon = getTypeIcon(achievement.type)
            return (
              <Card key={achievement.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="relative">
                  <img
                    src={achievement.image}
                    alt={achievement.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className={`absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-r ${getTypeColor(achievement.type)} flex items-center justify-center shadow-lg`}>
                    <TypeIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="font-bold text-lg line-clamp-2 mb-2">
                      {achievement.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                      <span className="font-medium text-primary">{achievement.organization}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(achievement.date)}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {achievement.description}
                  </p>

                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium mb-2">Skills & Technologies:</div>
                      <div className="flex flex-wrap gap-1">
                        {achievement.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {achievement.verification && (
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <a href={achievement.verification} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Verify Achievement
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* No results */}
        {filteredAchievements.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No achievements found in this category.</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-200 dark:border-yellow-800">
            <CardContent className="p-8">
              <Trophy className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
              <h3 className="text-2xl font-bold mb-4">
                Continuous Learning & Growth
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                These achievements represent my journey of continuous learning and growth in technology. 
                I'm always looking for new challenges and opportunities to expand my skills and contribute to the tech community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <a href="/projects">
                    <Code className="mr-2 h-4 w-4" />
                    View My Projects
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="/about">
                    <Users className="mr-2 h-4 w-4" />
                    Learn More About Me
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

export default Achievements

