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
    { label: "Skills", query: "skills", icon: "💻" },
    { label: "Projects", query: "projects", icon: "🚀" },
    { label: "Experience", query: "experience", icon: "💼" },
    { label: "Contact", query: "contact", icon: "📧" },
    { label: "Intro", query: "intro", icon: "👋" }
  ]

  const responses = {
    skills: {
      text: `🐍 Python (a.k.a. My Spirit Animal)
Whether it's building AI apps, web automation using Selenium, wrangling data like a cowboy with Pandas, or painting pretty graphs with Matplotlib — Python and I go together like chai and coding nights.
Bonus: DSA and OOP? I don't just learn them — I debug them in my dreams.

🌐 Web Technologies – The Internet Runs on My Stack
HTML & CSS: Built with more care than a Diwali rangoli.
Angular & TypeScript: For when I want my front end spicy and structured.
Node.js & Express.js: Because backend APIs shouldn't behave like Indian government websites.

TL;DR: I speak MEAN fluently — MongoDB to Angular and everything in between.

🛢️ MySQL – The SQLon of my Database Empire
I don't just query — I optimize, normalize, and sometimes dramatize (with cool joins and subqueries).
Fun Fact: I created an entire free SQL course on YouTube, because why not teach while you learn?

🤖 AI Tools – Automation, Meet Ambition
ChatGPT & Claude AI: My co-pilots in coding, writing emails, or just surviving semester project deadlines.

AI Studio: Because building AI stuff feels cooler when the UI looks futuristic.

GitHub Copilot: It writes, I supervise. We're a good team.

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
What It Does: Imagine a university where forms don't get lost, approvals don't take a semester, and AI politely bosses everyone around — that's this project. It uses LLMs like Claude to automate the academic workflow while your professors wonder if you're the next Elon of EduTech.
Fun Bit: MCP here doesn't mean "My College Problem," but solves quite a few of them!

🌐 Portfolio Website (But Make It Smart)
What's Inside: YouTube bot, GitHub repos, AI Quiz Bot, SQL gamified zone, and a museum of your future automation tools (yes, future — because why limit yourself?).
Tech Stack: HTML, CSS, creativity, and a sprinkle of ambition.
Link: keshavrajpore.netlify.app
Tagline: "Not just a portfolio — it's a coding carnival!"

🎙️ Voice-Based Billing System (Because Typing is Overrated)
Tech Stack: Python, Streamlit
What It Does: Speak your items out loud — this app hears you, tallies up your groceries like your local kirana uncle, and spits out a bill PDF — no arguments, no spelling errors.
Bonus: Integrated UPI payment! Just say "bhaiya, total kitna?" and boom — it's paid.

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
Overview: A fully functional CRUD app — because real developers don't just "read-only."
What You Proved: That you're MEAN — in a full-stack, not grumpy, way.

🏆 And the Trophy Shelf Says...
🥇 Winner @ Vertexo 4.0

🥈 Runner-Up @ PCCOE's Spectrum 2023

🥉 3rd Prize @ DYPIEMR's Model Demonstration
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
Hello! I'm Keshavraj Pore, an enthusiastic and growth-driven final-year B.E. student specializing in Artificial Intelligence and Data Science. I'm passionate about building smart, scalable, and user-friendly solutions using technologies like Python, Angular, and the MEAN stack.

From leading teams in the Smart India Hackathon to crafting voice-controlled billing apps and AI-powered automation systems, I enjoy turning complex problems into elegant code — and occasionally into YouTube tutorials too!

With hands-on experience through internships and personal projects, I'm always curious about learning new tools (especially AI ones!) and contributing meaningfully to tech communities. Whether it's solving LeetCode challenges, deploying apps, or mentoring others through my free SQL course, I strive to balance learning, leading, and creating.

I'm currently seeking opportunities where I can apply my skills, learn from real-world challenges, and grow as a well-rounded software professional.
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
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="relative rounded-full w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 transform hover:scale-110 group"
        >
          <Bot className="h-6 w-6 sm:h-7 sm:w-7 text-white group-hover:rotate-12 transition-transform duration-300" />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
            <Sparkles className="h-3 w-3 text-white" />
          </div>
          <div className="absolute inset-0 rounded-full bg-emerald-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-2 right-2 sm:bottom-4 sm:right-4 z-50 w-[calc(100vw-1rem)] sm:w-auto">
      <Card className={`transition-all duration-500 ease-in-out ${
        isMinimized ? 'h-16 w-full sm:w-80' : 'h-[calc(100vh-1rem)] sm:h-[600px] w-full sm:w-96'
      } shadow-2xl border-2 border-emerald-200/50 dark:border-emerald-800/50 rounded-3xl bg-white/98 dark:bg-slate-900/98 backdrop-blur-2xl overflow-hidden`}>
        
        {/* Header */}
        <CardHeader className="p-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 text-white relative overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="relative flex items-center justify-between p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/30 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-lg border-2 border-white/50 transform hover:rotate-12 transition-transform duration-300">
                  <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full border-2 border-white animate-pulse shadow-lg"></div>
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base sm:text-lg font-bold truncate">AI Assistant</CardTitle>
                <p className="text-xs sm:text-sm opacity-90 truncate">Ask me about Keshavraj</p>
              </div>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/30 transition-all rounded-xl hover:scale-110"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/30 transition-all rounded-xl hover:scale-110"
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
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
                >
                  <div className={`flex items-start gap-2 max-w-[90%] sm:max-w-[85%] ${
                    message.type === 'user' ? 'flex-row-reverse' : ''
                  }`}>
                    {/* Avatar */}
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-br from-cyan-500 to-blue-500' 
                        : 'bg-gradient-to-br from-emerald-500 to-teal-500'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                      ) : (
                        <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                      )}
                    </div>
                    
                    {/* Message Bubble */}
                    <div className={`rounded-2xl p-2.5 sm:p-3 shadow-md ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-br from-cyan-500 to-blue-500 text-white rounded-br-md' 
                        : 'bg-white dark:bg-slate-800 border-2 border-emerald-100 dark:border-emerald-900 rounded-bl-md'
                    }`}>
                      
                      {/* Meme Image (only for bot messages) */}
                      {message.type === 'bot' && message.meme && (
                        <div className="mb-2 sm:mb-3 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-700 shadow-inner">
                          <img 
                            src={message.meme} 
                            alt={message.memeAlt || "Meme"}
                            className="w-full h-auto max-h-40 sm:max-h-48 object-contain"
                            onError={(e) => {
                              e.target.style.display = 'none'
                            }}
                          />
                        </div>
                      )}
                      
                      <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line break-words">
                        {message.content}
                      </p>
                      <p className={`text-[10px] sm:text-xs mt-1.5 sm:mt-2 ${
                        message.type === 'user' ? 'text-cyan-100' : 'text-slate-500 dark:text-slate-400'
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
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                      <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    </div>
                    <div className="bg-white dark:bg-slate-800 border-2 border-emerald-100 dark:border-emerald-900 rounded-2xl rounded-bl-md p-3 shadow-md">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t-2 border-emerald-100 dark:border-emerald-900">
              {/* Quick Actions */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                {quickActions.map((action, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 dark:from-emerald-950 dark:to-teal-950 dark:hover:from-emerald-900 dark:hover:to-teal-900 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all duration-200 text-[10px] sm:text-xs px-2 py-1 hover:scale-105 hover:shadow-md"
                    onClick={() => handleQuickAction(action.query)}
                  >
                    <span className="mr-1">{action.icon}</span>
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
                  className="flex-1 border-2 border-emerald-200 dark:border-emerald-800 rounded-xl shadow-sm focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-700 focus:border-emerald-400 dark:focus:border-emerald-600 transition-all text-sm bg-slate-50 dark:bg-slate-800"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  size="icon"
                  className="bg-gradient-to-br from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-emerald-500/50 rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed h-9 w-9 sm:h-10 sm:w-10"
                >
                  <Send className="h-4 w-4" />
                </Button>
                <Button
                  onClick={clearChat}
                  variant="ghost"
                  size="icon"
                  className="text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950 rounded-xl transition-all duration-200 hover:scale-105 h-9 w-9 sm:h-10 sm:w-10"
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