import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AIAssistant from './components/AIAssistant'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Achievements from './pages/Achievements'
import YouTube from './pages/YouTube'
import SQLLearning from './pages/SQLLearning'
import MCPServers from './pages/MCPServers'
import About from './pages/About'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/youtube" element={<YouTube />} />
              <Route path="/sql-learning" element={<SQLLearning />} />
              <Route path="/mcp-servers" element={<MCPServers />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <Footer />
          <AIAssistant />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App

