# Keshavraj Pore - Personal Portfolio Website

A production-quality personal portfolio website built with React, featuring modern design, responsive layout, and AI-powered interactions.

## 🌟 Features

### Core Pages
- **Home**: Hero section with dynamic stats, introduction, and quick navigation
- **Projects**: Automatically fetches and displays GitHub repositories with filtering
- **Achievements**: Categorized achievements with verification links
- **YouTube**: All videos from the channel with search and filtering
- **SQL Learning**: Progress tracking system with localStorage persistence
- **MCP Servers**: Showcase of open-source Model Context Protocol servers
- **About**: Detailed personal and professional information

### Advanced Features
- **AI Assistant**: Interactive chatbot with contextual responses about skills, projects, and experience
- **Dark/Light Theme**: Persistent theme toggle with smooth transitions
- **Responsive Design**: Mobile-first design that works on all devices
- **GitHub API Integration**: Real-time repository data fetching
- **YouTube API Integration**: Video content management and display
- **Progress Tracking**: Local storage for learning progress
- **Search & Filtering**: Advanced filtering across projects and videos
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support

## 🛠 Tech Stack

- **Frontend**: React 19, Vite, TailwindCSS v4
- **UI Components**: Radix UI, Lucide Icons
- **Styling**: Custom CSS with animations and responsive design
- **APIs**: GitHub REST API, YouTube Data API (mock implementation)
- **State Management**: React Hooks, Context API
- **Build Tool**: Vite with hot reload
- **Package Manager**: pnpm

## 📁 Project Structure

```
keshavraj-portfolio/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable components
│   │   ├── ui/           # UI component library
│   │   ├── Navbar.jsx    # Navigation component
│   │   ├── Footer.jsx    # Footer component
│   │   └── AIAssistant.jsx # AI chatbot component
│   ├── contexts/         # React contexts
│   │   └── ThemeContext.jsx # Theme management
│   ├── pages/            # Page components
│   │   ├── Home.jsx      # Landing page
│   │   ├── Projects.jsx  # GitHub projects
│   │   ├── Achievements.jsx # Achievements showcase
│   │   ├── YouTube.jsx   # Video content
│   │   ├── SQLLearning.jsx # Learning platform
│   │   ├── MCPServers.jsx # MCP servers showcase
│   │   └── About.jsx     # About page
│   ├── services/         # API services
│   │   ├── githubApi.js  # GitHub API integration
│   │   └── youtubeApi.js # YouTube API integration
│   ├── lib/              # Utility functions
│   │   └── utils.js      # Helper functions
│   ├── App.jsx           # Main app component
│   ├── App.css           # Global styles
│   └── main.jsx          # Entry point
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
└── README.md            # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd keshavraj-portfolio
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
pnpm build
# or
npm run build
```

The built files will be in the `dist/` directory.

## 🔧 Configuration

### GitHub API
The website automatically fetches repositories from the GitHub username `Keshavraj52`. To change this:

1. Edit `src/services/githubApi.js`
2. Update the `GITHUB_USERNAME` constant

### YouTube Integration
Currently uses mock data. To integrate with real YouTube API:

1. Get a YouTube Data API key from Google Cloud Console
2. Update `src/services/youtubeApi.js` with real API calls
3. Replace mock data with actual API responses

### Customization
- **Colors**: Update TailwindCSS classes in components
- **Content**: Modify data in individual page components
- **Styling**: Edit `src/App.css` for global styles
- **Theme**: Customize theme colors in `src/contexts/ThemeContext.jsx`

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Reduced motion preferences
- Focus indicators

## 🎨 Design Features

- **Modern UI**: Clean, professional design with smooth animations
- **Dark/Light Theme**: Automatic theme persistence with smooth transitions
- **Micro-interactions**: Hover effects, loading states, and transitions
- **Typography**: Responsive typography with proper hierarchy
- **Color Scheme**: Carefully chosen color palette for accessibility

## 🤖 AI Assistant Features

The AI assistant provides contextual information about:
- Skills and technologies
- Project details and recommendations
- Experience and achievements
- Contact information
- Quick introductions for networking

## 📊 Performance Optimizations

- **Code Splitting**: Automatic route-based code splitting
- **Lazy Loading**: Images and components loaded on demand
- **Caching**: API responses cached for better performance
- **Minification**: CSS and JS minified in production
- **Tree Shaking**: Unused code eliminated

## 🔒 Security Considerations

- **API Keys**: No sensitive keys exposed in frontend
- **CORS**: Proper CORS handling for API requests
- **XSS Protection**: Input sanitization and validation
- **Content Security**: Secure content loading policies

## 🚀 Deployment Options

### Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Set build command: `pnpm build`
3. Set publish directory: `dist`
4. Deploy automatically on push

### Vercel
1. Import project from GitHub
2. Framework preset: Vite
3. Build command: `pnpm build`
4. Output directory: `dist`

### GitHub Pages
1. Build the project: `pnpm build`
2. Deploy the `dist` folder to `gh-pages` branch
3. Enable GitHub Pages in repository settings

### Custom Server
1. Build the project: `pnpm build`
2. Serve the `dist` folder with any static file server
3. Configure server for SPA routing

## 🐛 Troubleshooting

### Common Issues

**Build Errors**
- Ensure Node.js version is 18+
- Clear node_modules and reinstall dependencies
- Check for TypeScript errors in console

**API Issues**
- Verify GitHub username in `githubApi.js`
- Check network connectivity
- Review browser console for API errors

**Styling Issues**
- Clear browser cache
- Check TailwindCSS configuration
- Verify CSS imports

**Performance Issues**
- Enable production build optimizations
- Check for memory leaks in React components
- Optimize images and assets

## 📈 Analytics & Monitoring

To add analytics:
1. Install Google Analytics or Plausible
2. Add tracking code to `index.html`
3. Set up conversion tracking for contact forms

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

For questions or support:
- Email: keshavraj_pore@example.com
- GitHub: [@Keshavraj52](https://github.com/Keshavraj52)
- YouTube: [@Keshavrajpore](https://youtube.com/@Keshavrajpore)

## 🙏 Acknowledgments

- React team for the amazing framework
- TailwindCSS for the utility-first CSS framework
- Radix UI for accessible component primitives
- Lucide for beautiful icons
- All open source contributors

---

**Built with ❤️ by Keshavraj Pore**

