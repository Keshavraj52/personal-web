#!/bin/bash

# Keshavraj Portfolio - Deployment Script
# This script helps deploy the portfolio website to various platforms

set -e

echo "🚀 Keshavraj Portfolio Deployment Script"
echo "========================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if pnpm is installed, fallback to npm
if command -v pnpm &> /dev/null; then
    PKG_MANAGER="pnpm"
else
    PKG_MANAGER="npm"
    echo "⚠️  pnpm not found, using npm instead"
fi

echo "📦 Using package manager: $PKG_MANAGER"

# Function to install dependencies
install_deps() {
    echo "📥 Installing dependencies..."
    $PKG_MANAGER install
    echo "✅ Dependencies installed successfully"
}

# Function to build the project
build_project() {
    echo "🔨 Building the project..."
    $PKG_MANAGER run build
    echo "✅ Project built successfully"
}

# Function to preview the build
preview_build() {
    echo "👀 Starting preview server..."
    echo "🌐 Open http://localhost:4173 in your browser"
    $PKG_MANAGER run preview
}

# Function to deploy to Netlify
deploy_netlify() {
    echo "🌐 Deploying to Netlify..."
    
    if ! command -v netlify &> /dev/null; then
        echo "📦 Installing Netlify CLI..."
        npm install -g netlify-cli
    fi
    
    build_project
    
    echo "🚀 Deploying to Netlify..."
    netlify deploy --prod --dir=dist
    echo "✅ Deployed to Netlify successfully!"
}

# Function to deploy to Vercel
deploy_vercel() {
    echo "▲ Deploying to Vercel..."
    
    if ! command -v vercel &> /dev/null; then
        echo "📦 Installing Vercel CLI..."
        npm install -g vercel
    fi
    
    echo "🚀 Deploying to Vercel..."
    vercel --prod
    echo "✅ Deployed to Vercel successfully!"
}

# Function to prepare for GitHub Pages
prepare_github_pages() {
    echo "📄 Preparing for GitHub Pages deployment..."
    
    build_project
    
    # Create a simple deploy script for GitHub Pages
    cat > deploy-gh-pages.sh << 'EOF'
#!/bin/bash
# GitHub Pages deployment script
# Run this script to deploy to GitHub Pages

set -e

echo "🚀 Deploying to GitHub Pages..."

# Build the project
npm run build

# Create gh-pages branch if it doesn't exist
git checkout -b gh-pages 2>/dev/null || git checkout gh-pages

# Copy built files
cp -r dist/* .

# Add and commit
git add .
git commit -m "Deploy to GitHub Pages"

# Push to gh-pages branch
git push origin gh-pages

echo "✅ Deployed to GitHub Pages successfully!"
echo "🌐 Your site will be available at: https://yourusername.github.io/repository-name"

# Switch back to main branch
git checkout main
EOF
    
    chmod +x deploy-gh-pages.sh
    echo "✅ GitHub Pages deployment script created: deploy-gh-pages.sh"
    echo "📝 Edit the script to update your GitHub username and repository name"
}

# Function to create a simple static server
serve_static() {
    echo "🌐 Starting static file server..."
    
    if ! command -v python3 &> /dev/null; then
        echo "❌ Python 3 is required for static server"
        exit 1
    fi
    
    build_project
    cd dist
    echo "🌐 Server running at http://localhost:8000"
    echo "Press Ctrl+C to stop the server"
    python3 -m http.server 8000
}

# Main menu
show_menu() {
    echo ""
    echo "Choose a deployment option:"
    echo "1) Install dependencies only"
    echo "2) Build project"
    echo "3) Preview build locally"
    echo "4) Deploy to Netlify"
    echo "5) Deploy to Vercel"
    echo "6) Prepare for GitHub Pages"
    echo "7) Serve with static server"
    echo "8) Exit"
    echo ""
}

# Main script logic
main() {
    while true; do
        show_menu
        read -p "Enter your choice (1-8): " choice
        
        case $choice in
            1)
                install_deps
                ;;
            2)
                install_deps
                build_project
                ;;
            3)
                install_deps
                build_project
                preview_build
                ;;
            4)
                install_deps
                deploy_netlify
                ;;
            5)
                install_deps
                deploy_vercel
                ;;
            6)
                install_deps
                prepare_github_pages
                ;;
            7)
                serve_static
                ;;
            8)
                echo "👋 Goodbye!"
                exit 0
                ;;
            *)
                echo "❌ Invalid option. Please choose 1-8."
                ;;
        esac
        
        echo ""
        read -p "Press Enter to continue..."
    done
}

# Run the main function
main

