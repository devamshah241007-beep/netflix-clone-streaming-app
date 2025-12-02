# StreamFlix Customization Guide

## 🎨 Design Customization

### Change Colors

Edit `public/styles.css` and modify the CSS variables:

```css
:root {
    --primary-color: #e50914;  /* Change to your brand color */
    --bg-color: #141414;       /* Background color */
    --text-color: #ffffff;     /* Text color */
    --secondary-bg: #2f2f2f;   /* Secondary background */
}
```

**Popular Color Schemes:**
- **Netflix**: `#e50914` (red)
- **Disney+**: `#0063e5` (blue)
- **Hulu**: `#1ce783` (green)
- **HBO Max**: `#7b2cbf` (purple)
- **Amazon Prime**: `#00a8e1` (cyan)

### Change Logo

Replace "StreamFlix" in `public/index.html`:

```html
<h1 class="logo">YourBrandName</h1>
```

### Add Custom Fonts

Add to `public/index.html` in `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
```

Update CSS:
```css
body {
    font-family: 'Poppins', sans-serif;
}
```

---

## 🎬 Content Customization

### Add Your Own Videos

Edit `public/app.js` and add to `sampleContent` array:

```javascript
{
    title: "Your Movie Title",
    description: "Detailed description of your content",
    type: "movie", // or "series"
    genre: ["Action", "Drama", "Comedy"],
    releaseYear: 2024,
    rating: "PG-13", // G, PG, PG-13, R, NC-17
    duration: "2h 15min",
    videoUrl: "https://your-cdn.com/video.mp4",
    thumbnailUrl: "https://your-cdn.com/thumbnail.jpg",
    trailerUrl: "https://your-cdn.com/trailer.mp4",
    cast: ["Actor 1", "Actor 2", "Actor 3"],
    director: "Director Name",
    trending: true,
    featured: false,
    views: 0
}
```

### Add TV Series with Episodes

```javascript
{
    title: "Your Series",
    type: "series",
    seasons: [
        {
            seasonNumber: 1,
            episodes: [
                {
                    episodeNumber: 1,
                    title: "Pilot",
                    description: "First episode",
                    duration: "45 min",
                    videoUrl: "https://cdn.com/s1e1.mp4",
                    thumbnailUrl: "https://cdn.com/s1e1-thumb.jpg"
                },
                {
                    episodeNumber: 2,
                    title: "Episode 2",
                    description: "Second episode",
                    duration: "45 min",
                    videoUrl: "https://cdn.com/s1e2.mp4",
                    thumbnailUrl: "https://cdn.com/s1e2-thumb.jpg"
                }
            ]
        }
    ]
}
```

### Video Hosting Options

**Free Options:**
- **Cloudinary** - 25GB free storage
- **Vimeo** - 500MB/week free
- **YouTube** - Unlimited (embed videos)

**Paid Options:**
- **AWS S3 + CloudFront** - $0.023/GB
- **Bunny CDN** - $0.01/GB
- **Mux** - Video streaming platform

---

## 🔧 Feature Customization

### Enable/Disable Features

Edit `public/app.js`:

```javascript
const CONFIG = {
    enableProfiles: true,
    enableWatchlist: true,
    enableContinueWatching: true,
    enableSearch: true,
    maxProfiles: 5,
    enableDownloads: false,
    enableRatings: false
};
```

### Add New Genres

Edit `models/Content.js`:

```javascript
genre: [{
    type: String,
    enum: [
        'Action', 'Comedy', 'Drama', 'Horror', 
        'Sci-Fi', 'Romance', 'Thriller', 'Documentary', 
        'Animation', 'Fantasy',
        // Add your custom genres:
        'Bollywood', 'K-Drama', 'Anime', 'Stand-up'
    ]
}]
```

### Customize Video Player

Edit `public/styles.css` for player styling:

```css
#videoPlayer {
    width: 100%;
    max-height: 80vh;
    background-color: #000;
    border-radius: 8px;
}

/* Custom controls */
video::-webkit-media-controls-panel {
    background-color: rgba(0,0,0,0.8);
}
```

---

## 🌐 Localization

### Add Multiple Languages

Create `public/i18n.js`:

```javascript
const translations = {
    en: {
        signIn: "Sign In",
        signUp: "Sign Up",
        browse: "Browse",
        myList: "My List"
    },
    es: {
        signIn: "Iniciar Sesión",
        signUp: "Registrarse",
        browse: "Explorar",
        myList: "Mi Lista"
    },
    fr: {
        signIn: "Se Connecter",
        signUp: "S'inscrire",
        browse: "Parcourir",
        myList: "Ma Liste"
    }
};
```

---

## 📱 Mobile Customization

### Improve Mobile Experience

Add to `public/styles.css`:

```css
@media (max-width: 768px) {
    .featured-title {
        font-size: 28px;
    }
    
    .content-card {
        min-width: 120px;
        height: 70px;
    }
    
    .nav-menu {
        display: none; /* Hide on mobile */
    }
    
    /* Add hamburger menu */
    .mobile-menu-btn {
        display: block;
    }
}
```

---

## 🔐 Security Customization

### Strengthen Authentication

Edit `.env`:

```
JWT_SECRET=use_a_very_long_random_string_here_min_32_chars
JWT_EXPIRY=7d
BCRYPT_ROUNDS=12
```

### Add Rate Limiting

Install: `npm install express-rate-limit`

Add to `server.js`:

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

---

## 💳 Payment Integration

### Add Stripe Subscription

1. Install: `npm install stripe`
2. Create `routes/payments.js`
3. Add subscription plans
4. Integrate checkout

### Subscription Tiers

```javascript
const plans = {
    basic: {
        price: 8.99,
        features: ['SD Quality', '1 Screen', 'Mobile Only']
    },
    standard: {
        price: 13.99,
        features: ['HD Quality', '2 Screens', 'All Devices']
    },
    premium: {
        price: 17.99,
        features: ['4K Quality', '4 Screens', 'Downloads']
    }
};
```

---

## 📊 Analytics Integration

### Add Google Analytics

Add to `public/index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-GA-ID');
</script>
```

---

## 🎯 SEO Optimization

### Add Meta Tags

Edit `public/index.html`:

```html
<meta name="description" content="Stream unlimited movies and TV shows">
<meta name="keywords" content="streaming, movies, tv shows, netflix">
<meta property="og:title" content="StreamFlix - Watch Movies Online">
<meta property="og:image" content="https://yoursite.com/og-image.jpg">
<meta name="twitter:card" content="summary_large_image">
```

---

**Need help implementing any of these? Just ask!**