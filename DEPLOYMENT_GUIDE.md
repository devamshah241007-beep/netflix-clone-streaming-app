# Complete Deployment Guide

## 🚀 Quick Deploy Options

### Option 1: Render.com (Recommended - Free Tier)

**Step 1: Create Account**
1. Go to https://render.com
2. Sign up with GitHub

**Step 2: Deploy Web Service**
1. Click **"New +"** → **"Web Service"**
2. Connect GitHub repository: `devamshah241007-beep/netflix-clone-streaming-app`
3. Configure:
   - **Name**: `streamflix-netflix-clone`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: **Free**

**Step 3: Add Environment Variables**
```
NODE_ENV=production
JWT_SECRET=your_super_secret_jwt_key_min_32_characters
PORT=3000
```

**Step 4: Add MongoDB (Optional)**
1. Click **"New +"** → **"PostgreSQL"** or use MongoDB Atlas
2. For MongoDB Atlas:
   - Go to https://www.mongodb.com/cloud/atlas
   - Create free cluster
   - Get connection string
   - Add to Render: `MONGODB_URI=mongodb+srv://...`

**Step 5: Deploy**
- Click **"Create Web Service"**
- Wait 5-10 minutes for deployment
- Your app will be live at: `https://streamflix-netflix-clone.onrender.com`

---

### Option 2: Railway.app (Easiest)

**Step 1: Install Railway CLI**
```bash
npm install -g @railway/cli
```

**Step 2: Login**
```bash
railway login
```

**Step 3: Initialize Project**
```bash
cd netflix-clone-streaming-app
railway init
```

**Step 4: Add MongoDB**
```bash
railway add
# Select MongoDB from the list
```

**Step 5: Deploy**
```bash
railway up
```

**Step 6: Set Environment Variables**
```bash
railway variables set JWT_SECRET=your_secret_key
railway variables set NODE_ENV=production
```

**Your app is live!** Railway will provide a URL.

---

### Option 3: Vercel (Frontend) + MongoDB Atlas (Backend)

**Step 1: Install Vercel CLI**
```bash
npm install -g vercel
```

**Step 2: Deploy**
```bash
cd netflix-clone-streaming-app
vercel --prod
```

**Step 3: Setup MongoDB Atlas**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster (M0 Free tier)
4. Create database user
5. Whitelist IP: `0.0.0.0/0` (allow all)
6. Get connection string

**Step 4: Add Environment Variables in Vercel**
```bash
vercel env add MONGODB_URI
# Paste your MongoDB connection string

vercel env add JWT_SECRET
# Enter your secret key

vercel env add NODE_ENV
# Enter: production
```

**Step 5: Redeploy**
```bash
vercel --prod
```

---

### Option 4: Heroku

**Step 1: Install Heroku CLI**
```bash
npm install -g heroku
```

**Step 2: Login**
```bash
heroku login
```

**Step 3: Create App**
```bash
cd netflix-clone-streaming-app
heroku create streamflix-netflix-clone
```

**Step 4: Add MongoDB**
```bash
heroku addons:create mongolab:sandbox
```

**Step 5: Set Environment Variables**
```bash
heroku config:set JWT_SECRET=your_secret_key
heroku config:set NODE_ENV=production
```

**Step 6: Deploy**
```bash
git push heroku main
```

**Step 7: Open App**
```bash
heroku open
```

---

## 🗄️ Database Setup

### MongoDB Atlas (Free Cloud Database)

**Step 1: Create Account**
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free

**Step 2: Create Cluster**
1. Click **"Build a Database"**
2. Choose **"M0 Free"** tier
3. Select region closest to you
4. Click **"Create Cluster"**

**Step 3: Create Database User**
1. Go to **"Database Access"**
2. Click **"Add New Database User"**
3. Username: `streamflix`
4. Password: Generate strong password
5. User Privileges: **"Read and write to any database"**
6. Click **"Add User"**

**Step 4: Whitelist IP**
1. Go to **"Network Access"**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

**Step 5: Get Connection String**
1. Go to **"Database"** → **"Connect"**
2. Choose **"Connect your application"**
3. Copy connection string
4. Replace `<password>` with your password
5. Replace `<dbname>` with `netflix-clone`

Example:
```
mongodb+srv://streamflix:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/netflix-clone?retryWrites=true&w=majority
```

---

## 🔧 Post-Deployment Setup

### Seed Database with Content

**Option 1: Run Seed Script**
```bash
# If deployed on Render/Railway
railway run npm run seed

# Or connect to your deployed database
MONGODB_URI=your_connection_string node scripts/seed-database.js
```

**Option 2: Manual API Calls**
Use Postman or curl to add content via API.

---

## 🌐 Custom Domain Setup

### Render.com
1. Go to your service settings
2. Click **"Custom Domain"**
3. Add your domain: `streamflix.yourdomain.com`
4. Update DNS records as instructed

### Vercel
```bash
vercel domains add streamflix.yourdomain.com
```

### Railway
1. Go to project settings
2. Click **"Domains"**
3. Add custom domain
4. Update DNS CNAME record

---

## 📊 Monitoring & Logs

### View Logs

**Render:**
- Dashboard → Your Service → **"Logs"** tab

**Railway:**
```bash
railway logs
```

**Vercel:**
```bash
vercel logs
```

**Heroku:**
```bash
heroku logs --tail
```

---

## 🔒 Security Checklist

- [ ] Change JWT_SECRET to strong random string
- [ ] Enable HTTPS (automatic on most platforms)
- [ ] Set up CORS properly
- [ ] Add rate limiting
- [ ] Enable MongoDB authentication
- [ ] Whitelist only necessary IPs
- [ ] Use environment variables for secrets
- [ ] Enable security headers
- [ ] Set up backup strategy

---

## 🚨 Troubleshooting

### App Won't Start
- Check logs for errors
- Verify environment variables are set
- Ensure MongoDB connection string is correct
- Check Node.js version (18+ required)

### Database Connection Failed
- Verify MongoDB URI format
- Check IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions
- Test connection string locally first

### Videos Not Playing
- Check video URLs are accessible
- Verify CORS headers
- Test video URLs in browser
- Check video format compatibility

---

## 📈 Scaling Tips

### Free Tier Limits
- **Render**: 750 hours/month, sleeps after 15min inactivity
- **Railway**: $5 free credit/month
- **Vercel**: 100GB bandwidth/month
- **MongoDB Atlas**: 512MB storage

### Upgrade When Needed
- More concurrent users → Upgrade instance
- More storage → Upgrade database
- Better performance → Add CDN
- Global reach → Multi-region deployment

---

## 🎉 Your App is Live!

**Test Your Deployment:**
1. Visit your app URL
2. Sign up for an account
3. Create a profile
4. Browse and watch content
5. Test all features

**Share Your App:**
- Share URL with friends
- Post on social media
- Add to your portfolio
- Submit to showcases

---

**Need help? Check the logs or open an issue on GitHub!**