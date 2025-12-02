# 🚀 Quick Start Guide

Get your StreamFlix app running in **5 minutes**!

## ⚡ Fastest Way to Deploy (No Code Required)

### 1. Deploy to Render.com (Free)

**Click this button:**

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

**Or manually:**

1. Go to https://render.com
2. Sign up with GitHub
3. Click **"New +"** → **"Web Service"**
4. Select this repo: `devamshah241007-beep/netflix-clone-streaming-app`
5. Click **"Create Web Service"**
6. **Done!** Your app will be live in 5 minutes

**Your app URL:** `https://streamflix-netflix-clone.onrender.com`

---

## 💻 Run Locally (For Development)

### Prerequisites
- Node.js 18+ installed
- Git installed

### Steps

**1. Clone the repository:**
```bash
git clone https://github.com/devamshah241007-beep/netflix-clone-streaming-app.git
cd netflix-clone-streaming-app
```

**2. Install dependencies:**
```bash
npm install
```

**3. Create `.env` file:**
```bash
cp .env.example .env
```

**4. Start the server:**
```bash
npm start
```

**5. Open browser:**
```
http://localhost:3000
```

**That's it!** The app works without a database (uses demo mode).

---

## 🗄️ Add Database (Optional)

### Quick MongoDB Setup

**1. Create free MongoDB Atlas account:**
- Go to https://www.mongodb.com/cloud/atlas
- Sign up (takes 2 minutes)

**2. Create cluster:**
- Click **"Build a Database"**
- Choose **"M0 Free"**
- Click **"Create"**

**3. Get connection string:**
- Click **"Connect"** → **"Connect your application"**
- Copy the connection string

**4. Update `.env` file:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/netflix-clone
```

**5. Seed database with content:**
```bash
npm run seed
```

**Done!** Now you have a real database with content.

---

## 🎬 Using the App

### 1. Sign Up
- Open the app
- Click **"Sign up now"**
- Enter email and password
- Click **"Sign Up"**

### 2. Create Profile
- Choose or create a profile
- Click on the profile avatar

### 3. Browse Content
- Browse movies by genre
- Use search to find specific content
- Click any thumbnail to watch

### 4. Watch Videos
- Click **"Play"** button
- Video player opens
- Enjoy streaming!

### 5. Add to My List
- Click **"More Info"** on any content
- Click **"+ My List"**
- Access from **"My List"** menu

---

## 🎨 Quick Customization

### Change App Name
Edit `public/index.html`:
```html
<h1 class="logo">YourAppName</h1>
```

### Change Colors
Edit `public/styles.css`:
```css
:root {
    --primary-color: #e50914; /* Your brand color */
}
```

### Add Your Videos
Edit `public/app.js` - add to `sampleContent` array:
```javascript
{
    title: "Your Movie",
    videoUrl: "https://your-video-url.mp4",
    thumbnailUrl: "https://your-thumbnail.jpg"
}
```

---

## 📱 Test on Mobile

### Local Network Testing
1. Find your computer's IP address:
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig`
2. On your phone, open: `http://YOUR_IP:3000`

### Public Testing
Deploy to Render/Vercel and access from anywhere!

---

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Change port in .env
PORT=3001
```

### Videos Not Playing
- Check video URLs are accessible
- Try different video format (MP4 recommended)
- Check browser console for errors

### Can't Connect to Database
- Verify MongoDB connection string
- Check internet connection
- Ensure IP is whitelisted in MongoDB Atlas

---

## 📚 Next Steps

**Explore More:**
- [Full Deployment Guide](DEPLOYMENT_GUIDE.md)
- [Customization Guide](CUSTOMIZATION_GUIDE.md)
- [Features Roadmap](FEATURES_ROADMAP.md)

**Add Features:**
- Ratings & reviews
- Recommendations
- Download for offline
- Payment integration

**Get Help:**
- Open an issue on GitHub
- Check documentation
- Join community discussions

---

## 🎉 You're All Set!

Your Netflix clone is ready to use. Start streaming and enjoy!

**Share your deployment:**
- Tweet about it
- Add to your portfolio
- Show to friends

**Happy Streaming! 🍿**