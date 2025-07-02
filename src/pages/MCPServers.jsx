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
  Cpu,
  Mail,
  ArrowLeft,
  Play,
  Copy,
  CheckCircle,
  Terminal,
  Settings,
  Key,
  Send
} from 'lucide-react'

const MCPServerPlatform = () => {
  const [currentPage, setCurrentPage] = useState('servers')
  const [selectedServer, setSelectedServer] = useState(null)
  const [copiedCode, setCopiedCode] = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')

  const mcpServers = [
    {
      id: 1,
      name: 'Gmail Automation MCP',
      description: 'Complete Gmail automation server with email sending, reading, searching, and management capabilities. Supports OAuth2 authentication and advanced filtering.',
      category: 'automation',
      technologies: ['Python', 'Gmail API', 'OAuth2', 'FastAPI'],
      features: ['Send Emails', 'Read Inbox', 'Search & Filter', 'Auto-Reply', 'Attachment Handling'],
      githubUrl: 'https://github.com/Keshavraj52/gmail-automation-mcp',
      downloadUrl: '/downloads/gmail-automation-mcp.zip',
      documentation: 'gmail-automation',
      status: 'stable',
      version: 'v1.2.0',
      downloads: 2340,
      stars: 78,
      setupComplexity: 'Medium',
      requirements: ['Python 3.8+', 'Gmail API Access', 'OAuth2 Credentials']
    },
    {
      id: 2,
      name: 'Database Analytics MCP',
      description: 'A powerful MCP server for database analytics and query optimization. Supports multiple database engines including MySQL, PostgreSQL, and SQLite.',
      category: 'database',
      technologies: ['Python', 'SQL', 'FastAPI', 'SQLAlchemy'],
      features: ['Query Optimization', 'Performance Monitoring', 'Schema Analysis', 'Data Profiling'],
      githubUrl: 'https://github.com/Keshavraj52/database-analytics-mcp',
      downloadUrl: '/downloads/database-analytics-mcp.zip',
      documentation: 'database-analytics',
      status: 'stable',
      version: 'v2.1.0',
      downloads: 1250,
      stars: 45,
      setupComplexity: 'Easy',
      requirements: ['Python 3.7+', 'Database Connection']
    },
    {
      id: 3,
      name: 'Slack Bot MCP',
      description: 'Integrate with Slack for automated messaging, channel management, and workflow automation. Perfect for team productivity.',
      category: 'automation',
      technologies: ['Node.js', 'Slack API', 'WebSocket', 'Express'],
      features: ['Message Automation', 'Channel Management', 'User Analytics', 'Custom Commands'],
      githubUrl: 'https://github.com/Keshavraj52/slack-bot-mcp',
      downloadUrl: '/downloads/slack-bot-mcp.zip',
      documentation: 'slack-bot',
      status: 'stable',
      version: 'v1.5.2',
      downloads: 890,
      stars: 52,
      setupComplexity: 'Medium',
      requirements: ['Node.js 16+', 'Slack App Token']
    },
    {
      id: 4,
      name: 'API Gateway MCP',
      description: 'Lightweight API gateway with authentication, rate limiting, and monitoring capabilities. Perfect for microservices architecture.',
      category: 'api',
      technologies: ['Node.js', 'Express', 'Redis', 'JWT'],
      features: ['Rate Limiting', 'Authentication', 'Load Balancing', 'Monitoring'],
      githubUrl: 'https://github.com/Keshavraj52/api-gateway-mcp',
      downloadUrl: '/downloads/api-gateway-mcp.zip',
      documentation: 'api-gateway',
      status: 'beta',
      version: 'v0.9.2',
      downloads: 567,
      stars: 28,
      setupComplexity: 'Hard',
      requirements: ['Node.js 16+', 'Redis Server', 'SSL Certificate']
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
      documentation: 'security-audit',
      status: 'stable',
      version: 'v1.3.7',
      downloads: 678,
      stars: 41,
      setupComplexity: 'Hard',
      requirements: ['Python 3.8+', 'Docker', 'Network Access']
    }
  ]

  const categories = [
    { id: 'all', label: 'All Servers', icon: Server },
    { id: 'automation', label: 'Automation', icon: Zap },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'api', label: 'API Gateway', icon: Globe },
    { id: 'security', label: 'Security', icon: Shield }
  ]

  const gmailSetupSteps = [
    {
      title: "Prerequisites Setup",
      content: `Before starting, ensure you have:
• Python 3.8 or higher installed
• A Google Cloud Console account
• Gmail account with API access enabled`,
      code: `# Check Python version
python --version

# Install required packages
pip install google-auth google-auth-oauthlib google-auth-httplib2 gmail-api-python-client fastapi uvicorn`
    },
    {
      title: "Google Cloud Console Setup",
      content: `1. Go to Google Cloud Console (console.cloud.google.com)
2. Create a new project or select existing one
3. Enable Gmail API in the API Library
4. Create OAuth2 credentials (Desktop Application)
5. Download the credentials.json file`,
      code: `# Directory structure
gmail-mcp/
├── credentials.json          # OAuth2 credentials
├── token.json               # Auto-generated after auth
├── main.py                  # MCP Server code
├── gmail_client.py          # Gmail API wrapper
└── requirements.txt         # Dependencies`
    },
    {
      title: "Gmail Client Implementation",
      content: `Create the Gmail API client wrapper with authentication:`,
      code: `# gmail_client.py
import os.path
import pickle
from google.auth.transport.requests import Request
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import base64
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

class GmailClient:
    SCOPES = ['https://www.googleapis.com/auth/gmail.modify']
    
    def __init__(self):
        self.service = self._authenticate()
    
    def _authenticate(self):
        creds = None
        if os.path.exists('token.json'):
            creds = pickle.load(open('token.json', 'rb'))
        
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(
                    'credentials.json', self.SCOPES)
                creds = flow.run_local_server(port=0)
            
            with open('token.json', 'wb') as token:
                pickle.dump(creds, token)
        
        return build('gmail', 'v1', credentials=creds)
    
    def send_email(self, to, subject, body, html_body=None):
        try:
            message = MIMEMultipart('alternative')
            message['to'] = to
            message['subject'] = subject
            
            # Add plain text part
            text_part = MIMEText(body, 'plain')
            message.attach(text_part)
            
            # Add HTML part if provided
            if html_body:
                html_part = MIMEText(html_body, 'html')
                message.attach(html_part)
            
            raw_message = base64.urlsafe_b64encode(
                message.as_bytes()).decode()
            
            send_message = self.service.users().messages().send(
                userId="me", body={'raw': raw_message}).execute()
            
            return {"success": True, "message_id": send_message['id']}
        except HttpError as error:
            return {"success": False, "error": str(error)}
    
    def get_messages(self, query="", max_results=10):
        try:
            results = self.service.users().messages().list(
                userId='me', q=query, maxResults=max_results).execute()
            messages = results.get('messages', [])
            
            message_list = []
            for msg in messages:
                message = self.service.users().messages().get(
                    userId='me', id=msg['id']).execute()
                message_list.append(self._parse_message(message))
            
            return {"success": True, "messages": message_list}
        except HttpError as error:
            return {"success": False, "error": str(error)}
    
    def _parse_message(self, message):
        headers = message['payload'].get('headers', [])
        subject = next((h['value'] for h in headers if h['name'] == 'Subject'), 'No Subject')
        sender = next((h['value'] for h in headers if h['name'] == 'From'), 'Unknown')
        date = next((h['value'] for h in headers if h['name'] == 'Date'), 'Unknown')
        
        return {
            'id': message['id'],
            'subject': subject,
            'sender': sender,
            'date': date,
            'snippet': message['snippet']
        }`
    },
    {
      title: "MCP Server Implementation",
      content: `Create the main MCP server with FastAPI:`,
      code: `# main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from gmail_client import GmailClient
import uvicorn
from typing import Optional, List

app = FastAPI(title="Gmail Automation MCP Server", version="1.2.0")
gmail_client = GmailClient()

class EmailRequest(BaseModel):
    to: str
    subject: str
    body: str
    html_body: Optional[str] = None

class SearchRequest(BaseModel):
    query: Optional[str] = ""
    max_results: Optional[int] = 10

@app.get("/")
async def root():
    return {"message": "Gmail Automation MCP Server", "version": "1.2.0"}

@app.post("/send-email")
async def send_email(email_request: EmailRequest):
    result = gmail_client.send_email(
        to=email_request.to,
        subject=email_request.subject,
        body=email_request.body,
        html_body=email_request.html_body
    )
    
    if result["success"]:
        return {"message": "Email sent successfully", "message_id": result["message_id"]}
    else:
        raise HTTPException(status_code=400, detail=result["error"])

@app.post("/get-messages")
async def get_messages(search_request: SearchRequest):
    result = gmail_client.get_messages(
        query=search_request.query,
        max_results=search_request.max_results
    )
    
    if result["success"]:
        return {"messages": result["messages"]}
    else:
        raise HTTPException(status_code=400, detail=result["error"])

@app.get("/inbox")
async def get_inbox():
    result = gmail_client.get_messages(query="in:inbox", max_results=20)
    if result["success"]:
        return {"inbox": result["messages"]}
    else:
        raise HTTPException(status_code=400, detail=result["error"])

@app.get("/sent")
async def get_sent():
    result = gmail_client.get_messages(query="in:sent", max_results=20)
    if result["success"]:
        return {"sent": result["messages"]}
    else:
        raise HTTPException(status_code=400, detail=result["error"])

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)`
    },
    {
      title: "Running the Server",
      content: `Start your Gmail MCP server and test the endpoints:`,
      code: `# Start the server
python main.py

# Server will be available at http://localhost:8000

# Test endpoints using curl or your preferred HTTP client

# Send an email
curl -X POST "http://localhost:8000/send-email" \\
     -H "Content-Type: application/json" \\
     -d '{
       "to": "recipient@example.com",
       "subject": "Test Email from MCP Server",
       "body": "This is a test email sent from Gmail MCP Server!"
     }'

# Get inbox messages
curl -X GET "http://localhost:8000/inbox"

# Search messages
curl -X POST "http://localhost:8000/get-messages" \\
     -H "Content-Type: application/json" \\
     -d '{
       "query": "from:important@example.com",
       "max_results": 5
     }'`
    },
    {
      title: "Advanced Features",
      content: `Add more sophisticated features like auto-reply and scheduling:`,
      code: `# Advanced features in gmail_client.py

def mark_as_read(self, message_id):
    try:
        self.service.users().messages().modify(
            userId='me',
            id=message_id,
            body={'removeLabelIds': ['UNREAD']}
        ).execute()
        return {"success": True}
    except HttpError as error:
        return {"success": False, "error": str(error)}

def auto_reply(self, message_id, reply_body):
    try:
        # Get original message
        original = self.service.users().messages().get(
            userId='me', id=message_id).execute()
        
        # Extract sender and subject
        headers = original['payload']['headers']
        sender = next(h['value'] for h in headers if h['name'] == 'From')
        subject = next(h['value'] for h in headers if h['name'] == 'Subject')
        
        # Send reply
        reply_subject = f"Re: {subject}" if not subject.startswith('Re:') else subject
        return self.send_email(sender, reply_subject, reply_body)
        
    except HttpError as error:
        return {"success": False, "error": str(error)}

def schedule_email(self, to, subject, body, send_time):
    # This would require additional scheduling logic
    # You could use APScheduler or Celery
    pass`
    },
    {
      title: "Error Handling & Security",
      content: `Implement proper error handling and security measures:`,
      code: `# Add to main.py for better error handling

from fastapi import HTTPException, Depends, Security
from fastapi.security import HTTPBearer
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

security = HTTPBearer()

@app.middleware("http")
async def log_requests(request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    logger.info(f"{request.method} {request.url} - {response.status_code} - {process_time:.2f}s")
    return response

@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    logger.error(f"Unhandled exception: {exc}")
    return JSONResponse(
        status_code=500,
        content={"message": "Internal server error"}
    )

# Rate limiting (basic implementation)
from collections import defaultdict
import time

request_counts = defaultdict(list)

def rate_limit_check(client_ip: str, max_requests: int = 100, window: int = 3600):
    now = time.time()
    # Clean old requests
    request_counts[client_ip] = [req_time for req_time in request_counts[client_ip] if now - req_time < window]
    
    if len(request_counts[client_ip]) >= max_requests:
        raise HTTPException(status_code=429, detail="Rate limit exceeded")
    
    request_counts[client_ip].append(now)`
    }
  ]

  const copyToClipboard = (text, stepIndex) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(stepIndex)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const filteredServers = activeCategory === 'all' 
    ? mcpServers 
    : mcpServers.filter(server => server.category === activeCategory)

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'stable': return 'default'
      case 'beta': return 'secondary'
      case 'alpha': return 'destructive'
      default: return 'outline'
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'automation': return Zap
      case 'database': return Database
      case 'api': return Globe
      case 'security': return Shield
      default: return Server
    }
  }

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case 'Easy': return 'text-green-600'
      case 'Medium': return 'text-yellow-600'
      case 'Hard': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  // Servers List Page
  const ServersPage = () => (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <Server className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold">MCP Servers</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Open-source Model Context Protocol servers for various automation and integration needs. 
            Production-ready solutions with comprehensive documentation.
          </p>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            🚀 {mcpServers.length} Servers • 📦 {mcpServers.reduce((sum, s) => sum + s.downloads, 0).toLocaleString()} Downloads
          </Badge>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

                  {/* Setup Complexity */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Setup Complexity:</span>
                    <span className={`text-sm font-bold ${getComplexityColor(server.setupComplexity)}`}>
                      {server.setupComplexity}
                    </span>
                  </div>

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
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => {
                        setSelectedServer(server)
                        setCurrentPage('documentation')
                      }}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Documentation
                    </Button>
                    {/* <Button variant="outline" size="sm">
                      <Github className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button> */}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )

  // Documentation Page
  const DocumentationPage = () => {
    const server = selectedServer || mcpServers[0] // Default to Gmail server
    
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Button 
              variant="outline" 
              onClick={() => setCurrentPage('servers')}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Servers
            </Button>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{server.name}</h1>
                <p className="text-muted-foreground">Complete implementation guide with examples</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant={getStatusBadgeVariant(server.status)}>
                {server.status} {server.version}
              </Badge>
              <Badge variant="outline">
                Setup: {server.setupComplexity}
              </Badge>
            </div>
          </div>

          {/* Requirements Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Requirements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">System Requirements:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {server.requirements.map((req, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {server.technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Implementation Steps */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Step-by-Step Implementation</h2>
            
            {gmailSetupSteps.map((step, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <span>{step.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="prose prose-sm max-w-none mb-4">
                    <p className="whitespace-pre-line text-muted-foreground">
                      {step.content}
                    </p>
                  </div>
                  
                  {step.code && (
                    <div className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Terminal className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Code</span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(step.code, index)}
                          className="h-8"
                        >
                          {copiedCode === index ? (
                            <CheckCircle className="h-3 w-3" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto" style={{color:'#b833ff'}}>
                        <code>{step.code}</code>
                      </pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Testing Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Testing Your Implementation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Once your server is running, test these key endpoints to ensure everything works correctly:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Health Check</h4>
                    <Badge variant="outline" className="font-mono text-xs">
                      GET http://localhost:8000/
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Send Test Email</h4>
                    <Badge variant="outline" className="font-mono text-xs">
                      POST http://localhost:8000/send-email
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Check Inbox</h4>
                    <Badge variant="outline" className="font-mono text-xs">
                      GET http://localhost:8000/inbox
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Search Messages</h4>
                    <Badge variant="outline" className="font-mono text-xs">
                      POST http://localhost:8000/get-messages
                    </Badge>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button className="mr-4">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open API Docs
                  </Button>
                  <Button variant="outline">
                    <Send className="h-4 w-4 mr-2" />
                    Test in Postman
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support Section
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <Github className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                  <h4 className="font-semibold mb-2">GitHub Issues</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Report bugs or request features
                  </p>
                  <Button size="sm" variant="outline">
                    Open Issue
                  </Button>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h4 className="font-semibold mb-2">Documentation</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Detailed API reference
                  </p>
                  <Button size="sm" variant="outline">
                    View Docs
                  </Button>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <Mail className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <h4 className="font-semibold mb-2">Email Support</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Get help from maintainers
                  </p>
                  <Button size="sm" variant="outline">
                    Contact Us
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card> */}
        </div>
      </div>
    )
  }

  // Main render logic
  return (
    <div className="bg-background">
      {currentPage === 'servers' && <ServersPage />}
      {currentPage === 'documentation' && <DocumentationPage />}
    </div>
  )
}

export default MCPServerPlatform