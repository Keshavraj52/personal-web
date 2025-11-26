import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useTheme } from '../contexts/ThemeContext'
import { Moon, Sun, Menu, X, Code, Database, Youtube, Trophy, Server, User } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
 
  const navItems = [
    { path: '/', label: 'Home', icon: User },
    { path: '/projects', label: 'Projects', icon: Code },
    { path: '/achievements', label: 'Achievements', icon: Trophy },
    { path: '/youtube', label: 'YouTube', icon: Youtube },
    { path: '/DSA', label: 'DSA', icon: Code },
    {path: '/voicebillingapp', label: 'Voice Billing', icon: Server },
    { path: '/about', label: 'About', icon: User }
    
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
                <Link to="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary hover:scale-110 transition-transform duration-300">
                  <img 
                  src="/images/profile photo.jpg" 
                  alt="Profile Photo" 
                  className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-bold text-xl">Keshavraj Pore</span>
                </Link>

                {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                    isActive(item.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            {/* <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="w-9 h-9"
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </Button> */}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden w-9 h-9"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={16} /> : <Menu size={16} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center space-x-2 ${
                      isActive(item.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar

