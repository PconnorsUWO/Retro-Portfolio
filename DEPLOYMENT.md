# GitHub Pages Deployment Guide

## Setup Instructions

### 1. Install Dependencies
```bash
# First install to update package-lock.json
npm install

# Then you can use npm ci for faster installs
npm ci
```

### 2. Manual Deployment
```bash
npm run deploy
```

### 3. GitHub Repository Settings
1. Go to your GitHub repository: `https://github.com/PconnorsUWO/Retro-Portfolio`
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Choose **gh-pages** branch
5. Select **/ (root)** folder
6. Click **Save**

### 4. First Time Setup
```bash
# Install dependencies (this will add gh-pages to package-lock.json)
npm install

# Build and deploy
npm run deploy
```

## Node.js Version Requirements
- **Current Issue**: You're using Node.js v18.20.8
- **Vite Requirement**: Node.js ^20.19.0 || >=22.12.0
- **Recommendation**: Update Node.js to version 20 or 22 for better compatibility

### Update Node.js:
1. Download from: https://nodejs.org/
2. Install Node.js 20 LTS or 22 LTS
3. Restart your terminal
4. Run: `node --version` to verify

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run predeploy` - Automatically runs before deploy (builds the project)
- `npm run deploy` - Deploy to GitHub Pages

## Deployment URL
Your site will be available at: https://PconnorsUWO.github.io/Retro-Portfolio

## Troubleshooting

### Common Issues:
1. **"gh-pages not recognized"**: Run `npm install` first to install dependencies
2. **Package lock sync error**: Always run `npm install` before `npm ci`
3. **Node.js version warning**: Update to Node.js 20+ for best compatibility
4. **404 Error**: Make sure the `base` in `vite.config.ts` matches your repository name
5. **Build Errors**: Run `npm run build` first to check for any build issues
6. **Permission Errors**: Ensure you have push access to the repository

### Manual Steps if Automated Deployment Fails:
1. Run `npm install` to ensure all dependencies are installed
2. Run `npm run build` to create the dist folder
3. Navigate to the dist folder
4. Initialize git: `git init`
5. Add remote: `git remote add origin https://github.com/PconnorsUWO/Retro-Portfolio.git`
6. Add files: `git add .`
7. Commit: `git commit -m "Deploy to GitHub Pages"`
8. Push to gh-pages: `git push origin main:gh-pages --force`
