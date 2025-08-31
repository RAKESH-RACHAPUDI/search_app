# 🚀 Deployment Guide for GitHub Repository Search App

This guide provides comprehensive instructions for deploying your full-stack GitHub Repository Search application to production.

## 📋 Prerequisites

Before deploying, ensure you have:
- ✅ MongoDB Atlas account and cluster set up
- ✅ GitHub account (for repository hosting)
- ✅ Environment variables configured
- ✅ Application tested locally

## 🏗️ Build Process

### 1. Frontend Build
```bash
cd Frontend
npm run build
```
This creates a `dist` folder with optimized production files.

### 2. Backend Preparation
```bash
cd Backend
# Ensure all dependencies are installed
npm install
```

## 🌐 Deployment Options

### Option 1: Vercel (Recommended for Frontend) + Railway (Backend)

#### Frontend Deployment (Vercel)
1. **Connect Repository:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure project settings:
     - **Framework Preset:** Vite
     - **Root Directory:** `Frontend`
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`

2. **Environment Variables:**
   ```
   VITE_API_BASE_URL=https://your-backend-url.vercel.app
   ```

3. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically build and deploy your frontend

#### Backend Deployment (Railway)
1. **Connect Repository:**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Connect your GitHub repository
   - Select "Backend" folder

2. **Environment Variables:**
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   PORT=5000
   NODE_ENV=production
   ```

3. **Deploy:**
   - Railway will automatically detect Node.js and deploy
   - Your backend will be available at `https://your-project-name.up.railway.app`

### Option 2: Netlify (Frontend) + Heroku (Backend)

#### Frontend Deployment (Netlify)
1. **Connect Repository:**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Configure build settings:
     - **Base directory:** `Frontend`
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`

2. **Environment Variables:**
   ```
   VITE_API_BASE_URL=https://your-heroku-app.herokuapp.com
   ```

3. **Deploy:**
   - Click "Deploy site"
   - Netlify will build and deploy automatically

#### Backend Deployment (Heroku)
1. **Prepare Heroku:**
   ```bash
   # Install Heroku CLI
   npm install -g heroku

   # Login to Heroku
   heroku login

   # Create new app
   heroku create your-app-name
   ```

2. **Configure Environment:**
   ```bash
   # Set environment variables
   heroku config:set MONGODB_URI="your_mongodb_atlas_connection_string"
   heroku config:set NODE_ENV="production"
   ```

3. **Deploy:**
   ```bash
   # Add Heroku remote
   git remote add heroku https://git.heroku.com/your-app-name.git

   # Deploy
   git push heroku main
   ```

### Option 3: DigitalOcean App Platform (Full-Stack)

1. **Connect Repository:**
   - Go to [digitalocean.com](https://digitalocean.com)
   - Navigate to App Platform
   - Click "Create App"
   - Connect your GitHub repository

2. **Configure Components:**
   - **Frontend Service:**
     - Source: `Frontend/`
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - **Backend Service:**
     - Source: `Backend/`
     - Build Command: `npm install`
     - Run Command: `npm start`

3. **Environment Variables:**
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   NODE_ENV=production
   ```

4. **Deploy:**
   - Click "Create Resources"
   - DigitalOcean will build and deploy both services

### Option 4: Render (Simple Backend Deployment)

#### Backend Deployment (Render)
1. **Connect Repository:**
   - Go to [render.com](https://render.com)
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - **Root Directory:** Leave empty (uses render.yaml)
   - **Runtime:** Node

2. **Configuration:**
   - Render will automatically use the `render.yaml` file
   - Build Command: `cd Backend && npm install`
   - Start Command: `cd Backend && npm start`

3. **Environment Variables:**
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   NODE_ENV=production
   PORT=10000
   ```

4. **Deploy:**
   - Click "Create Web Service"
   - Render will build and deploy your backend
   - Your API will be available at `https://your-service-name.onrender.com`

### Option 5: AWS (Advanced)

#### Using AWS Amplify (Frontend) + EC2/Elastic Beanstalk (Backend)

**Frontend (AWS Amplify):**
1. Go to AWS Amplify Console
2. Connect your GitHub repository
3. Configure build settings:
   - **Frontend build command:** `npm run build`
   - **Frontend artifacts:** `dist`
4. Add environment variables
5. Deploy

**Backend (AWS Elastic Beanstalk):**
1. Install EB CLI: `pip install awsebcli`
2. Initialize: `eb init`
3. Create environment: `eb create production-env`
4. Deploy: `eb deploy`

## 🔧 Environment Configuration

### Production Environment Variables

Create these environment variables in your hosting platform:

```env
# Backend
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/github_search_prod
PORT=5000
NODE_ENV=production

# Frontend (if needed)
VITE_API_BASE_URL=https://your-backend-domain.com
```

### MongoDB Atlas Production Setup

1. **Create Production Database:**
   - Go to MongoDB Atlas
   - Create a new cluster or use existing
   - Create a new database user with read/write permissions
   - Whitelist your deployment IP addresses (0.0.0.0/0 for most platforms)

2. **Connection String:**
   ```
   mongodb+srv://prod-user:prod-password@cluster0.xxxxx.mongodb.net/github_search_prod?retryWrites=true&w=majority
   ```

## 🔒 Security Considerations

### 1. Environment Variables
- Never commit sensitive data to version control
- Use platform-specific environment variable management
- Rotate credentials regularly

### 2. CORS Configuration
Update your backend CORS settings for production:
```javascript
const corsOptions = {
  origin: ['https://your-frontend-domain.com', 'https://www.your-frontend-domain.com'],
  credentials: true,
  optionsSuccessStatus: 200
};
```

### 3. Rate Limiting
Consider implementing rate limiting for API endpoints:
```javascript
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);
```

## 📊 Monitoring & Analytics

### 1. Error Tracking
- **Sentry:** Add error tracking and monitoring
- **LogRocket:** Session replay and error monitoring

### 2. Performance Monitoring
- **Google Analytics:** User behavior tracking
- **Lighthouse:** Performance auditing

### 3. Uptime Monitoring
- **UptimeRobot:** Website monitoring
- **Pingdom:** Performance and uptime monitoring

## 🔄 CI/CD Pipeline

### GitHub Actions Example
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'

      - name: Install dependencies
        run: |
          cd Backend && npm ci
          cd ../Frontend && npm ci

      - name: Build frontend
        run: cd Frontend && npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 🧪 Testing Deployment

### 1. Pre-deployment Checklist
- [ ] Environment variables configured
- [ ] Database connection tested
- [ ] Build process successful
- [ ] CORS settings updated
- [ ] HTTPS enabled

### 2. Post-deployment Testing
- [ ] Frontend loads correctly
- [ ] API endpoints respond
- [ ] Database connections work
- [ ] Search functionality works
- [ ] Dashboard displays data
- [ ] Mobile responsiveness

### 3. Performance Testing
- [ ] Page load times
- [ ] API response times
- [ ] Database query performance
- [ ] Memory usage

## 🐛 Troubleshooting

### Common Issues

**1. Build Failures:**
- Check Node.js version compatibility
- Verify all dependencies are listed in package.json
- Ensure build scripts are correct

**2. Database Connection Issues:**
- Verify MongoDB Atlas IP whitelist
- Check connection string format
- Ensure database user has correct permissions

**3. CORS Errors:**
- Update allowed origins in backend
- Check if frontend domain is correct
- Verify HTTPS setup

**4. Environment Variables:**
- Ensure all required variables are set
- Check variable names match code expectations
- Verify values are correct

## 📞 Support

If you encounter issues during deployment:

1. Check the deployment logs in your hosting platform
2. Verify all prerequisites are met
3. Test locally with production environment variables
4. Check MongoDB Atlas network access
5. Review CORS and security settings

## 🎉 Success Metrics

After successful deployment, monitor:

- **Uptime:** Target 99.9% uptime
- **Response Time:** API responses under 500ms
- **Error Rate:** Less than 1% error rate
- **User Satisfaction:** Positive user feedback

---

**Happy Deploying! 🚀**

Your GitHub Repository Search App is now ready for production deployment. Choose the hosting platform that best fits your needs and follow the corresponding deployment guide above.
