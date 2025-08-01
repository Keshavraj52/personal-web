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
  RefreshCw,
  Image
} from 'lucide-react'

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm Keshavraj's AI assistant. I can help you learn more about his skills, projects, and experience. What would you like to know?",
      meme: "https://i.imgflip.com/1g8my4.jpg",
      memeAlt: "Drake pointing - Hi there!",
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
    skills: {
      text: `🐍 Python (a.k.a. My Spirit Animal)
Whether it’s building AI apps, web automation using Selenium, wrangling data like a cowboy with Pandas, or painting pretty graphs with Matplotlib — Python and I go together like chai and coding nights.
Bonus: DSA and OOP? I don’t just learn them — I debug them in my dreams.

🌐 Web Technologies – The Internet Runs on My Stack
HTML & CSS: Built with more care than a Diwali rangoli.
Angular & TypeScript: For when I want my front end spicy and structured.
Node.js & Express.js: Because backend APIs shouldn’t behave like Indian government websites.

TL;DR: I speak MEAN fluently — MongoDB to Angular and everything in between.

🛢️ MySQL – The SQLon of my Database Empire
I don’t just query — I optimize, normalize, and sometimes dramatize (with cool joins and subqueries).
Fun Fact: I created an entire free SQL course on YouTube, because why not teach while you learn?

🤖 AI Tools – Automation, Meet Ambition
ChatGPT & Claude AI: My co-pilots in coding, writing emails, or just surviving semester project deadlines.

AI Studio: Because building AI stuff feels cooler when the UI looks futuristic.

GitHub Copilot: It writes, I supervise. We’re a good team.

🔧 Misc. Tools – The Secret Sauce
Streamlit – Making boring dashboards feel like interactive Netflix interfaces.

Flask – For quick web apps, faster than maggi.

Pickle – Not for lunch, but perfect for saving models.

JSON – My go-to gossip format between frontend and backend.

Special Attack: SQL + Data Analytics — catch his Marathi tech sorcery on YouTube! 🎥🔥`,
      meme: "https://i.imgflip.com/8agixy.jpg",
      memeAlt: "Galaxy Brain - My coding skills expanding"
    },

    projects: {
      text: `🏛️ Enterprise-Grade University Workflow Automation (Final Year Project)
Tech Stack: LLMs, Python, Claude AI, MCP (Model Context Protocol)
What It Does: Imagine a university where forms don’t get lost, approvals don’t take a semester, and AI politely bosses everyone around — that’s this project. It uses LLMs like Claude to automate the academic workflow while your professors wonder if you're the next Elon of EduTech.
Fun Bit: MCP here doesn’t mean “My College Problem,” but solves quite a few of them!

🌐 Portfolio Website (But Make It Smart)
What’s Inside: YouTube bot, GitHub repos, AI Quiz Bot, SQL gamified zone, and a museum of your future automation tools (yes, future — because why limit yourself?).
Tech Stack: HTML, CSS, creativity, and a sprinkle of ambition.
Link: keshavrajpore.netlify.app
Tagline: “Not just a portfolio — it’s a coding carnival!”

🎙️ Voice-Based Billing System (Because Typing is Overrated)
Tech Stack: Python, Streamlit
What It Does: Speak your items out loud — this app hears you, tallies up your groceries like your local kirana uncle, and spits out a bill PDF — no arguments, no spelling errors.
Bonus: Integrated UPI payment! Just say “bhaiya, total kitna?” and boom — it’s paid.

🧠 Virtusa Technology Orientation for Faculty (VTOF)
Tech Stack: Angular, HTML, CSS, JSON
Project Story: While others were still figuring out semicolons, you were building a web interface for a financial company. This got you a certificate and a fan club of confused-but-happy professors.
Slogan: Educating the educators — like a boss!

🤒 Disease Prediction & Cure (Your Personal Dr. Python)
Tech Stack: Flask, SVC, Pandas, NumPy, HTML/CSS
Pitch: Feeling under the weather? Just enter your symptoms and let this ML model play House M.D. on your behalf.
Cool Twist: You even pickled the model — not in vinegar, but using Python's pickle module.

📦 MEAN Stack CRUD Application (CRUD = Code Rules Until Deployment)
Tech Stack: MongoDB, Express.js, Angular, Node.js
Overview: A fully functional CRUD app — because real developers don’t just “read-only.”
What You Proved: That you're MEAN — in a full-stack, not grumpy, way.

🏆 And the Trophy Shelf Says...
🥇 Winner @ Vertexo 4.0

🥈 Runner-Up @ PCCOE’s Spectrum 2023

🥉 3rd Prize @ DYPIEMR’s Model Demonstration
`,
      meme: "https://platform.vox.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/8689467/gatsby.gif?quality=90&strip=all&crop=18.78125%2C0%2C62.4375%2C100&w=1080",
      memeAlt: "Success Kid - Finished another project!"
    },

    experience: {
      text: `💼 Professional Experience
Frontend Developer Intern
Microdream Software Consultancy, Pune
Dec 2024 – Feb 2025 | Pune, India

During my internship, I worked on the development and enhancement of web-based interfaces using Angular and Angular Material. I was actively involved in:

Designing responsive and user-friendly web pages using HTML, CSS, and TypeScript.

Contributing to the frontend architecture of enterprise-grade applications using Angular.

Implementing interactive UI components and integrating APIs for dynamic data rendering.

Collaborating with the backend team to optimize MySQL queries and ensure smooth data flow.

This internship not only sharpened my skills in frontend technologies but also gave me practical exposure to full-stack collaboration and real-world development workflows.`,
      meme: "https://resources.workable.com/wp-content/uploads/2023/07/Candidate-Meme.jpeg",
      memeAlt: "Distracted Boyfriend - Me looking at new tech vs my current stack"
    },

    contact: {
      text: `📍 Location: Akurdi, Pune, India

📧 Email: poreg79@gmail.com

📱 Mobile: +91 7378564044

🌐 Portfolio: keshavrajpore.netlify.app

🔗 LinkedIn: linkedin.com/in/keshavraj-pore-b33873257

💻 GitHub: github.com/Keshavraj52

📹 YouTube: @Keshavrajpore

🧠 LeetCode: Keshavraj_52

DMs open for data chats, collabs, or discussing why pie charts are overrated.`,
      meme: "https://i.imgflip.com/1ur9b0.jpg",
      memeAlt: "Leonardo DiCaprio Cheers - Cheers to connecting!"
    },

    intro: {
      text: `👋 Introduction
Hello! I'm Keshavraj Pore, an enthusiastic and growth-driven final-year B.E. student specializing in Artificial Intelligence and Data Science. I’m passionate about building smart, scalable, and user-friendly solutions using technologies like Python, Angular, and the MEAN stack.

From leading teams in the Smart India Hackathon to crafting voice-controlled billing apps and AI-powered automation systems, I enjoy turning complex problems into elegant code — and occasionally into YouTube tutorials too!

With hands-on experience through internships and personal projects, I'm always curious about learning new tools (especially AI ones!) and contributing meaningfully to tech communities. Whether it's solving LeetCode challenges, deploying apps, or mentoring others through my free SQL course, I strive to balance learning, leading, and creating.

I’m currently seeking opportunities where I can apply my skills, learn from real-world challenges, and grow as a well-rounded software professional.
(Also available in serious mode on request 😄)`,
      meme: "https://media.tenor.com/M0895TLTfZkAAAAM/this-is-my-introduction-tank.gif",
      memeAlt: "this is my introduction"
    }
  }

  // Additional meme responses for specific keywords
  const specialMemes = {
    sql: {
      text: "💾 SQL Superpowers Alert!: Keshavraj doesn't just write SQL — he *whispers* to databases and they give him the data willingly. Also, he teaches SQL in Marathi on YouTube — because even databases deserve regional love. 💙📊",
      meme: "https://i.imgflip.com/26am.jpg",
      memeAlt: "Philosoraptor - What if SQL was actually a love language?"
    },
    youtube: {
      text: "🎬 Welcome to the Marathi Nerd Network™! Keshavraj runs a growing YouTube channel with 600+ amazing humans where he drops knowledge bombs on SQL, data analytics, and code stuff — all in Marathi! It's like watching Netflix... but instead of drama, you get data. 🔥",
      meme: "https://i.imgflip.com/1ihzfe.jpg",
      memeAlt: "Surprised Pikachu - When you realize learning can be fun!"
    },
    hackathon: {
      text: "🥇 Keshavraj is basically a professional hackathon warrior (think coder + gladiator 🥷💻):\n\n• Smart India Hackathon 2023 – Cracked internal healthcare with code. First Place! 🏥💡\n• TechFest Mumbai – Built web magic, bagged Runner Up! 🧙‍♂️🌐\n• Final year project? More like final boss fight – and I Will Do My Best! 🏆⚔️\n\nHe loves turning Red Bulls into real-world solutions!",
      meme: "https://i.imgflip.com/1g8my4.jpg",
      memeAlt: "Drake pointing - Hackathons are life!"
    },
    default: {
      text: "I'd be happy to help! You can explore different sections of this website to learn more about Keshavraj's background, or try asking about his skills, projects, experience, or contact information.",
      meme: "https://i.imgflip.com/1otk96.jpg",
      memeAlt: "Distracted Boyfriend - Me trying to help you find the right info"
    }
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
    const query = inputValue.toLowerCase()
    setInputValue('')
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      let response = specialMemes.default

      // Check for main categories first
      for (const [key, value] of Object.entries(responses)) {
        if (query.includes(key) || query.includes(key.slice(0, -1))) {
          response = value
          break
        }
      }

      // Check for special keywords
      if (query.includes('sql') || query.includes('database')) {
        response = specialMemes.sql
      } else if (query.includes('youtube') || query.includes('video') || query.includes('marathi')) {
        response = specialMemes.youtube
      } else if (query.includes('hackathon') || query.includes('competition')) {
        response = specialMemes.hackathon
      }

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response.text,
        meme: response.meme,
        memeAlt: response.memeAlt,
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
        meme: "https://i.imgflip.com/1g8my4.jpg",
        memeAlt: "Drake pointing - Hi there!",
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
                      
                      {/* Meme Image (only for bot messages) */}
                      {message.type === 'bot' && message.meme && (
                        <div className="mb-3 rounded-lg overflow-hidden bg-gray-100">
                          <img 
                            src={message.meme} 
                            alt={message.memeAlt || "Meme"}
                            className="w-full h-auto max-h-48 object-contain"
                            onError={(e) => {
                              e.target.style.display = 'none'
                            }}
                          />
                        </div>
                      )}
                      
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