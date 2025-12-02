// Database Seeding Script
// Run this to populate your database with sample content

const mongoose = require('mongoose');
require('dotenv').config();

const Content = require('../models/Content');

const sampleContent = [
    {
        title: "Big Buck Bunny",
        description: "A large and lovable rabbit deals with three tiny bullies, led by a flying squirrel, who are determined to squelch his happiness.",
        type: "movie",
        genre: ["Animation", "Comedy"],
        releaseYear: 2008,
        rating: "G",
        duration: "10 min",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnailUrl: "https://peach.blender.org/wp-content/uploads/title_anouncement.jpg",
        cast: ["Frank", "Rinky", "Gamera"],
        director: "Sacha Goedegebure",
        trending: true,
        featured: true
    },
    {
        title: "Elephants Dream",
        description: "The story of two strange characters exploring a capricious and seemingly infinite machine.",
        type: "movie",
        genre: ["Animation", "Sci-Fi"],
        releaseYear: 2006,
        rating: "PG",
        duration: "11 min",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        thumbnailUrl: "https://orange.blender.org/wp-content/themes/orange/images/media/splash.jpg",
        cast: ["Proog", "Emo"],
        director: "Bassam Kurdali",
        trending: true
    },
    {
        title: "Sintel",
        description: "A lonely young woman, Sintel, helps and befriends a dragon, whom she calls Scales. But when he is kidnapped by an adult dragon, Sintel decides to embark on a dangerous quest to find her lost friend.",
        type: "movie",
        genre: ["Animation", "Fantasy", "Action"],
        releaseYear: 2010,
        rating: "PG",
        duration: "15 min",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        thumbnailUrl: "https://durian.blender.org/wp-content/uploads/2010/06/sintel-1.jpg",
        cast: ["Sintel", "Scales"],
        director: "Colin Levy",
        trending: true
    },
    {
        title: "Tears of Steel",
        description: "In an apocalyptic future, a group of soldiers and scientists takes refuge in Amsterdam to try to stop an army of robots.",
        type: "movie",
        genre: ["Sci-Fi", "Action"],
        releaseYear: 2012,
        rating: "PG-13",
        duration: "12 min",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        thumbnailUrl: "https://mango.blender.org/wp-content/uploads/2012/09/01_thom_celia_bridge.jpg",
        cast: ["Thom", "Celia", "Barley"],
        director: "Ian Hubert",
        trending: false
    }
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/netflix-clone', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('✅ Connected to MongoDB');

        // Clear existing content
        await Content.deleteMany({});
        console.log('🗑️  Cleared existing content');

        // Insert sample content
        await Content.insertMany(sampleContent);
        console.log(`✅ Inserted ${sampleContent.length} content items`);

        console.log('🎉 Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();