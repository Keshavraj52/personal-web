import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Award, Code, Briefcase, Sparkles, ChevronDown } from 'lucide-react';

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      title: "University Automation",
      subtitle: "MCP-Based Integration for Educational Institutions",
      tech: ["Python", "Claude AI API", "MCP", "LLMs", "ETL Pipelines"],
      description: "AI-powered, privacy-preserving university automation framework using Model Context Protocol to securely process academic data offline. Features ETL pipelines for placement coordination, test paper generation, and assignment workflows.",
      achievement: "40% reduction in manual effort",
      copyright: "Certificate No. LD-20250175552, Government of India, 2025",
      isCopyrighted: true,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Personal Portfolio",
      subtitle: "SEO-Optimized Smart Showcase",
      tech: ["React", "JavaScript", "HTML/CSS", "GitHub API", "YouTube API", "Gemini API"],
      description: "Strategically optimized personal website ranking #1 on Google and Safari for 'Keshavraj Pore'. Features YouTube channel integration, GitHub projects, ChatBot, and gamified SQL tools.",
      achievement: "#1 Google Ranking",
      link: "https://keshavrajpore.netlify.app/",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Voice Based Billing System",
      subtitle: "Accessibility-Centric Retail Solution",
      tech: ["Python", "Streamlit", "SpeechRecognition", "Pandas", "NumPy"],
      description: "Voice-activated billing interface enabling hands-free item entry with dynamic total calculation and receipt generation. Designed for accessibility-centric retail environments.",
      achievement: "60% faster item entry",
      link: "https://github.com/Keshavraj52/voice-based-billing-system",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Star Finance Platform",
      subtitle: "Virtusa Technology Orientation Project",
      tech: ["Angular", "HTML", "CSS", "JSON"],
      description: "Responsive website for Star Finance's digital platform focused on gold and silver loan services. Completed during 2nd year with official project certification.",
      achievement: "Official Certification",
      link: "https://financegold.netlify.app/",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      title: "Disease Prediction & Cure",
      subtitle: "ML-Powered Diagnostic Tool",
      tech: ["Flask", "Scikit-learn", "Pandas", "NumPy", "Pickle"],
      description: "Machine learning diagnostic tool that predicts diseases based on user symptoms using SVC classification and serialized models for real-time inference.",
      achievement: "87% Accuracy",
      gradient: "from-red-500 to-pink-500"
    },
    {
      title: "Business Analytics Dashboard",
      subtitle: "Power BI Performance Insights",
      tech: ["Power BI", "SQL", "Advanced Analytics"],
      description: "Integrated and analyzed Shop Data and UK Bank Data, transforming complex datasets into clear, actionable insights with interactive visualizations.",
      achievement: "Multi-source Integration",
      link: "https://www.linkedin.com/feed/update/urn:li:activity:7152706955533312000/",
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl top-1/3 -right-48 animate-pulse delay-1000"></div>
        <div className="absolute w-96 h-96 bg-pink-500/10 rounded-full blur-3xl bottom-0 left-1/3 animate-pulse delay-2000"></div>
      </div>

      

     

      {/* Projects Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-24" style={{marginTop:"70px"}}>
        <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Featured Projects
        </h2>

        <div className="grid gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-300 hover:transform hover:scale-[1.02]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {project.isCopyrighted && (
                <div className="absolute -top-3 -right-3">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg">
                    <Sparkles className="w-4 h-4" />
                    COPYRIGHTED
                  </div>
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className={`text-3xl font-bold mb-2 bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-lg">{project.subtitle}</p>
                </div>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer"
                     className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-800/80 text-gray-300 rounded-full text-sm border border-gray-700">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${project.gradient} bg-opacity-10 rounded-lg border border-current`}>
                  <Code className="w-4 h-4" />
                  <span className="font-semibold text-sm">{project.achievement}</span>
                </div>
                {project.copyright && (
                  <span className="text-xs text-gray-500 font-mono">{project.copyright}</span>
                )}
              </div>
            </div>
          ))}
        </div>
         {/* Copyright Banner */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 mb-16" style={{marginTop:"64px"}}>
        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50 rounded-2xl p-8 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <Award className="w-12 h-12 text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text mb-2">
                Copyrighted Innovation
              </h3>
              <p className="text-gray-300 text-lg mb-3">
                <strong>University Automation: A MCP-Based Integration for Educational Institutions</strong>
              </p>
              <p className="text-gray-400 mb-2">
                Certificate No. <span className="text-purple-400 font-mono">LD-20250175552</span>, Government of India, 2025
              </p>
              <p className="text-sm text-gray-500">
                Recognized for AI-driven innovation in privacy-aware AI, model orchestration, and data-centric automation
              </p>
            </div>
          </div>
        </div>
      </div>
      </section>


      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-delay-1 {
          animation: fade-in 1s ease-out 0.3s both;
        }
        
        .animate-fade-in-delay-2 {
          animation: fade-in 1s ease-out 0.6s both;
        }
        
        .animate-fade-in-delay-3 {
          animation: fade-in 1s ease-out 0.9s both;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
        
        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}