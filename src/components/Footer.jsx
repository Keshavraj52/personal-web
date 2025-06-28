import { Github, Youtube, Linkedin, Mail, Heart } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/50 border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">KP</span>
              </div>
              <span className="font-bold text-xl">Keshavraj Pore</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Data Enthusiast | Problem Solver. Passionate about Data Analytics, Databases, and Optimization. 
              Teaching complex topics on YouTube and always learning, always sharing!
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Keshavraj52"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.youtube.com/@Keshavrajpore"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Youtube size={20} />
              </a>
              <a
                href="mailto:keshavraj_pore@example.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">Projects</a></li>
              <li><a href="/achievements" className="text-muted-foreground hover:text-foreground transition-colors">Achievements</a></li>
              <li><a href="/youtube" className="text-muted-foreground hover:text-foreground transition-colors">YouTube</a></li>
              <li><a href="/sql-learning" className="text-muted-foreground hover:text-foreground transition-colors">SQL Learning</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/mcp-servers" className="text-muted-foreground hover:text-foreground transition-colors">MCP Servers</a></li>
              <li><a href="https://keshavrajpore.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">Portfolio</a></li>
              <li><a href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Keshavraj Pore. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center mt-2 sm:mt-0">
            Made with <Heart size={16} className="mx-1 text-red-500" /> and React
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

