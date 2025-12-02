# StreamFlix - Netflix Clone Streaming Platform

A full-featured Netflix-like streaming platform with user authentication, profiles, video player, and content management.

## 🎬 Features

- **User Authentication** - Secure sign up and login
- **Multiple Profiles** - Up to 5 profiles per account
- **Video Streaming** - HTML5 video player with controls
- **Content Browsing** - Browse by categories and genres
- **Search Functionality** - Find content quickly
- **My List** - Save content to watch later
- **Continue Watching** - Resume from where you left off
- **Responsive Design** - Works on all devices

## 🚀 Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## 📦 Installation

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/devamshah241007-beep/netflix-clone-streaming-app.git
cd netflix-clone-streaming-app
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB URI and JWT secret:
```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

5. Start the server:
```bash
npm start
```

6. Open browser and navigate to `http://localhost:3000`

## 🌐 Deployment

### Railway Deployment

1. Install Railway CLI:
```bash
npm install -g @railway/cli
```

2. Login to Railway:
```bash
railway login
```

3. Initialize project:
```bash
railway init
```

4. Add MongoDB database:
```bash
railway add
```

5. Deploy:
```bash
railway up
```

### Vercel Deployment (Frontend Only)

```bash
vercel --prod
```

## 📝 Environment Variables

- `PORT` - Server port (default: 3000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)

## 🎥 Sample Content

The app includes free, legal content from:
- Blender Foundation (Big Buck Bunny, Sintel, Elephants Dream, Tears of Steel)
- Google sample videos
- All content is either public domain or Creative Commons licensed

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Content
- `GET /api/content` - Get all content
- `GET /api/content/trending` - Get trending content
- `GET /api/content/featured` - Get featured content
- `GET /api/content/:id` - Get content by ID
- `GET /api/content/genre/:genre` - Get content by genre

### Profiles
- `GET /api/profiles` - Get all profiles
- `POST /api/profiles` - Create new profile
- `PUT /api/profiles/:id` - Update profile
- `DELETE /api/profiles/:id` - Delete profile

### Watchlist
- `GET /api/watchlist` - Get watchlist
- `POST /api/watchlist/add` - Add to watchlist
- `POST /api/watchlist/remove` - Remove from watchlist
- `POST /api/watchlist/continue` - Update continue watching

## 🎨 Customization

### Adding Your Own Content

Edit `public/app.js` and add your content to the `sampleContent` array:

```javascript
{
    title: "Your Movie Title",
    description: "Movie description",
    type: "movie", // or "series"
    genre: ["Action", "Drama"],
    releaseYear: 2024,
    rating: "PG-13",
    duration: "2h 15min",
    videoUrl: "your_video_url.mp4",
    thumbnailUrl: "your_thumbnail_url.jpg",
    trending: true,
    featured: false
}
```

### Styling

Modify `public/styles.css` to customize colors, fonts, and layout.

## 📱 Screenshots

- Login/Signup screen
- Profile selection
- Home page with featured content
- Content browsing by genre
- Video player
- Content details modal

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Credits

- Sample videos from Blender Foundation
- Inspired by Netflix UI/UX
- Built with ❤️ by Devam Shah

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

**Note**: This is a demo/educational project. All sample content is legally sourced from public domain and Creative Commons sources.