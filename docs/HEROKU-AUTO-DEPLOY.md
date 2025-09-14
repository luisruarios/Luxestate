# Automatic Heroku Deployment Setup

## Overview
Configure your Heroku apps to automatically deploy when you push code to the `main` branch on GitHub.

## Setup Instructions

### Step 1: Connect GitHub Repository

#### For Frontend App (luxestate-web):
1. Open [Heroku Dashboard](https://dashboard.heroku.com/)
2. Click on `luxestate-web` app
3. Go to the **Deploy** tab
4. In **Deployment method** section, click **GitHub**
5. Click **Connect to GitHub** and authorize if needed
6. Search for repository: `luisruarios/Luxestate`
7. Click **Connect**

#### For Backend App (luxestate-api):
1. Click on `luxestate-api` app
2. Go to the **Deploy** tab  
3. In **Deployment method** section, click **GitHub**
4. Search for repository: `luisruarios/Luxestate`
5. Click **Connect**

### Step 2: Configure Automatic Deployment

#### Frontend App:
1. In **Automatic deploys** section:
   - Choose branch: `main`
   - Check "Wait for CI to pass before deploy" (optional)
   - Click **Enable Automatic Deploys**

#### Backend App:
1. In **Automatic deploys** section:
   - Choose branch: `main`  
   - Check "Wait for CI to pass before deploy" (optional)
   - Click **Enable Automatic Deploys**

### Step 3: Configure Subdirectory Deployment

Since our apps are in subdirectories, we need to configure proper deployment:

#### Frontend (in subdirectory `frontend/real-estate-web/`):
1. Go to **Settings** tab
2. In **Config Vars** section, add:
   ```
   PROJECT_PATH = frontend/real-estate-web
   ```

#### Backend (in subdirectory `backend/RealEstate.Api/`):
1. Go to **Settings** tab
2. In **Config Vars** section, add:
   ```
   PROJECT_PATH = backend/RealEstate.Api
   ```

### Step 4: Add Buildpack Configuration

#### Frontend:
- Buildpack is already set to `heroku/nodejs`
- Heroku automatically detects `package.json` in the subdirectory

#### Backend:
- Buildpack is already set to `heroku/dotnet`
- Heroku automatically detects `.csproj` file

### Step 5: Test Automatic Deployment

1. Make a small change to your code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "test: trigger automatic deployment"
   git push origin main
   ```
3. Watch the **Activity** tab in Heroku Dashboard to see deployments

## Current Status

✅ **GitHub Repository Connected**: `luisruarios/Luxestate`
✅ **Environment Variables**: Set for both apps
✅ **Git Remotes**: Configured for manual deployment fallback
✅ **Buildpacks**: Properly configured

## Manual Deployment Fallback

If automatic deployment fails, you can still deploy manually:

```bash
# Frontend
git subtree push --prefix=frontend/real-estate-web frontend main

# Backend  
git subtree push --prefix=backend/RealEstate.Api backend main
```

## Monitoring Deployments

- **Heroku Dashboard**: Check Activity tab for deployment logs
- **GitHub**: Check Actions tab for any CI/CD workflows
- **Status Check**: Run `node scripts/check-production.js`

## Troubleshooting

### Common Issues:
1. **Subdirectory not detected**: Ensure `PROJECT_PATH` config var is set
2. **Build fails**: Check build logs in Heroku Dashboard Activity tab
3. **Environment variables**: Verify all required config vars are set
4. **Node/npm version**: Ensure compatible versions in `package.json` engines

### Support:
- [Heroku GitHub Integration Docs](https://devcenter.heroku.com/articles/github-integration)
- [Heroku Node.js Buildpack](https://devcenter.heroku.com/articles/nodejs-support)
- [Heroku .NET Buildpack](https://devcenter.heroku.com/articles/buildpacks#officially-supported-buildpacks)