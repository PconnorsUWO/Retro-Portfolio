# GitHub Pages Deployment Guide

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
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
# Install gh-pages if not already installed
npm install --save-dev gh-pages

# Build and deploy
npm run deploy
```

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
1. **404 Error**: Make sure the `base` in `vite.config.ts` matches your repository name
2. **Build Errors**: Run `npm run build` first to check for any build issues
3. **Permission Errors**: Ensure you have push access to the repository

### Manual Steps if Automated Deployment Fails:
1. Run `npm run build` to create the dist folder
2. Navigate to the dist folder
3. Initialize git: `git init`
4. Add remote: `git remote add origin https://github.com/PconnorsUWO/Retro-Portfolio.git`
5. Add files: `git add .`
6. Commit: `git commit -m "Deploy to GitHub Pages"`
7. Push to gh-pages: `git push origin main:gh-pages --force`
