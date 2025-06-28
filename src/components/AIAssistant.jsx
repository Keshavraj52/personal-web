import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Bot, 
  Send, 
  User, 
  Sparkles, 
  MessageCircle,
  X,
  Minimize2,
  Maximize2,
  RefreshCw
} from 'lucide-react'

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm Keshavraj's AI assistant. I can help you learn more about his skills, projects, and experience. What would you like to know?",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const quickActions = [
    { label: "Skills", query: "skills" },
    { label: "Projects", query: "projects" },
    { label: "Experience", query: "experience" },
    { label: "Contact", query: "contact" },
    { label: "Intro", query: "intro" }
  ]

  const responses = {
    skills: `🧠 Keshavraj's Skill-o-meter is off the charts!

💻 Code Whisperer: Python 🐍, JavaScript ☕, TypeScript 🤓, SQL 🔥
📊 Data Detective: Pandas (not the zoo ones 🐼), NumPy, Matplotlib (art with data!), Power BI & Tableau — turning numbers into WOWs
🗄️ DB Ninja: MySQL, PostgreSQL, MongoDB — speaks fluent table-ese
🌍 Web Chef: Bakes React and Node.js into delicious full-stack recipes 🍰
🧠 ML Tinkerer: TensorFlow, Scikit-learn — teaching machines to think harder than your ex ever did
🔧 Toolbox Jedi: Git, Docker, AWS, Linux — may or may not fix your life too

Special Attack: SQL + Data Analytics — catch his Marathi tech sorcery on YouTube! 🎥🔥`,

    projects: `🚀 Keshavraj's Project Zoo (No animals harmed, just codes unleashed):

🏥 Healthcare Predictor 9000 — Saves lives (almost like a doctor, minus the stethoscope)
🧠 MCP Servers — Robots talking to robots, and somehow it works
📈 Real-Time Dashboard — Because boring charts are so 2005
🎓 SQL Learning App — Teaches SQL in Marathi, because SELECT * FROM Education WHERE language = 'fun'

👨‍💻 P.S. All these wonders live on his GitHub — auto-updated, no reboots required!`,

    experience: `🎯 Keshavraj's XP Bar (a.k.a. resume with flavor):

🎓 Degree Mode: B.E in A.I. & Data Science — leveled up with a 7.8 CGPA
🏆 Quest Rewards: Smart India Hackathon loot x2, IEEE Boss Fight Winner
🧾 Certifications Unlocked: SQL Wizard 🧙‍♂️, Data Science Explorer, HackerRank Star Collector ⭐⭐🌟🌠
🎥 Side Quest: Runs a Marathi EdTech Channel (600+ subscribers and growing like a well-watered cactus)
💼 Current Mission: Data Analytics Specialist — doing Machine Learning and Business Intelligence like a tech-sorcerer

Secret Power: Explaining hard things in simple (and often funny) ways.`,

    contact: `📬 Want to summon Keshavraj?

📧 Owl Mail: keshavraj_pore@example.com
📱 Bat-Signal: +91 7378564044
🐙 Code Lair: github.com/Keshavraj52
🎥 YouTube Spells: @Keshavrajpore
💼 LinkedIn Realm: linkedin.com/in/keshavrajpore
📍 Basecamp: Pune, Maharashtra (India's data dojo 🇮🇳)

DMs open for data chats, collabs, or discussing why pie charts are overrated.`,

    intro: `⏱️ 30-Second Elevator Pitch (in case you're stuck with him in a lift):

"Hey there! I'm Keshavraj Pore — part human, part data-nerd, and full-time knowledge ninja from Pune.
I study Artificial Intelligence and Data Science (and yes, I do talk to machines daily).
Specializing in SQL (the love of my life), Data Analytics, and the MEAN Stack (not as angry as it sounds).
I've been to internal hackathons, survived Smart India Hackathon twice (2023 & 2024), and training to slay 2025 like a pro.
Also, I teach in Marathi on YouTube because tech gyaan should be desi too!
Let's decode the universe — one dataset at a time!"

(Also available in serious mode on request 😄)`
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const query = inputValue.toLowerCase()
      let response = "I'd be happy to help! You can explore different sections of this website to learn more about Keshavraj's background, or try asking about his skills, projects, experience, or contact information."

      // Simple keyword matching for responses
      for (const [key, value] of Object.entries(responses)) {
        if (query.includes(key) || query.includes(key.slice(0, -1))) {
          response = value
          break
        }
      }

      // Additional keyword matching
      if (query.includes('sql') || query.includes('database')) {
        response = responses.skills + "\n\n💾 SQL Superpowers Alert!: Keshavraj doesn't just write SQL — he *whispers* to databases and they give him the data willingly. Also, he teaches SQL in Marathi on YouTube — because even databases deserve regional love. 💙📊"
      } else if (query.includes('youtube') || query.includes('video') || query.includes('marathi')) {
        response = "🎬 Welcome to the Marathi Nerd Network™! Keshavraj runs a growing YouTube channel with 600+ amazing humans where he drops knowledge bombs on SQL, data analytics, and code stuff — all in Marathi! It's like watching Netflix... but instead of drama, you get data. 🔥"
      } else if (query.includes('hackathon') || query.includes('competition')) {
        response = "🥇 Keshavraj is basically a professional hackathon warrior (think coder + gladiator 🥷💻):\n\n• Smart India Hackathon 2023 – Cracked internal healthcare with code. First Place! 🏥💡\n• TechFest Mumbai – Built web magic, bagged Runner Up! 🧙‍♂️🌐\n• Final year project? More like final boss fight – and i Will Do My Best! 🏆⚔️\n\nHe loves turning Red Bulls into real-world solutions!"
      }

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickAction = (query) => {
    setInputValue(query)
    setTimeout(() => {
      handleSendMessage()
    }, 100)
  }

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: "Hi! I'm Keshavraj's AI assistant. I can help you learn more about his skills, projects, and experience. What would you like to know?",
        timestamp: new Date()
      }
    ])
  }

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  // Floating action button when chat is closed
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="relative rounded-full w-16 h-16 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 hover:from-purple-600 hover:via-indigo-600 hover:to-blue-600 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-pulse"
        >
          <Bot className="h-7 w-7 text-white" />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
            <Sparkles className="h-3 w-3 text-white" />
          </div>
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className={`transition-all duration-500 ease-in-out ${
        isMinimized ? 'h-16 w-80' : 'h-[600px] w-96'
      } max-w-[calc(100vw-2rem)] shadow-2xl border-0 rounded-2xl bg-white/95 backdrop-blur-xl overflow-hidden`}>
        
        {/* Header */}
        <CardHeader className="p-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Bot className="h-5 w-5" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg font-bold">AI Assistant</CardTitle>
                <p className="text-sm opacity-90">Ask me about Keshavraj</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20 transition-colors"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Chat Content */}
        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-[calc(100%-80px)]">
            
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
                >
                  <div className={`flex items-start gap-2 max-w-[85%] ${
                    message.type === 'user' ? 'flex-row-reverse' : ''
                  }`}>
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500' 
                        : 'bg-gradient-to-r from-purple-500 to-indigo-500'
                    } shadow-md`}>
                      {message.type === 'user' ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>
                    
                    {/* Message Bubble */}
                    <div className={`rounded-2xl p-3 shadow-sm ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-br-md' 
                        : 'bg-white border border-gray-200 rounded-bl-md'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-line break-words">
                        {message.content}
                      </p>
                      <p className={`text-xs mt-2 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start animate-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center shadow-md">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md p-3 shadow-sm">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2 mb-3">
                {quickActions.map((action, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 text-purple-700 border-purple-200 hover:border-purple-300 transition-all duration-200 text-xs px-2 py-1"
                    onClick={() => handleQuickAction(action.query)}
                  >
                    {action.label}
                  </Badge>
                ))}
              </div>
              
              {/* Input Row */}
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-200 focus:border-purple-300 transition-all"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  size="icon"
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white shadow-md rounded-xl transition-all duration-200"
                >
                  <Send className="h-4 w-4" />
                </Button>
                <Button
                  onClick={clearChat}
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}

export default AIAssistant