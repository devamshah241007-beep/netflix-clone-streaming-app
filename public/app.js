// API Configuration
const API_URL = window.location.origin;
let currentUser = null;
let currentProfile = null;
let authToken = localStorage.getItem('authToken');

// Sample Content Data (Public Domain & Creative Commons)
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
        trending: false
    },
    {
        title: "For Bigger Blazes",
        description: "Experience the thrill of adventure in this action-packed journey.",
        type: "movie",
        genre: ["Action", "Drama"],
        releaseYear: 2015,
        rating: "PG-13",
        duration: "15 sec",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnailUrl: "https://via.placeholder.com/400x225/FF6B6B/FFFFFF?text=For+Bigger+Blazes"
    },
    {
        title: "For Bigger Escape",
        description: "A thrilling escape story that will keep you on the edge of your seat.",
        type: "movie",
        genre: ["Thriller", "Action"],
        releaseYear: 2016,
        rating: "PG-13",
        duration: "15 sec",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        thumbnailUrl: "https://via.placeholder.com/400x225/4ECDC4/FFFFFF?text=For+Bigger+Escape"
    },
    {
        title: "For Bigger Fun",
        description: "Join the adventure for bigger fun and excitement!",
        type: "movie",
        genre: ["Comedy", "Action"],
        releaseYear: 2017,
        rating: "PG",
        duration: "15 sec",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        thumbnailUrl: "https://via.placeholder.com/400x225/FFE66D/000000?text=For+Bigger+Fun"
    },
    {
        title: "For Bigger Joyrides",
        description: "Experience the ultimate joyride adventure.",
        type: "movie",
        genre: ["Action", "Comedy"],
        releaseYear: 2018,
        rating: "PG",
        duration: "15 sec",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        thumbnailUrl: "https://via.placeholder.com/400x225/A8E6CF/000000?text=For+Bigger+Joyrides"
    },
    {
        title: "For Bigger Meltdowns",
        description: "When everything falls apart, heroes rise.",
        type: "movie",
        genre: ["Drama", "Action"],
        releaseYear: 2019,
        rating: "PG-13",
        duration: "15 sec",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        thumbnailUrl: "https://via.placeholder.com/400x225/FF8B94/FFFFFF?text=For+Bigger+Meltdowns"
    },
    {
        title: "Subaru Outback",
        description: "Adventure awaits in every journey.",
        type: "movie",
        genre: ["Documentary"],
        releaseYear: 2020,
        rating: "G",
        duration: "30 sec",
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
        thumbnailUrl: "https://via.placeholder.com/400x225/3D5A80/FFFFFF?text=Subaru+Outback"
    }
];

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
});

function initializeApp() {
    if (authToken) {
        showProfileScreen();
    } else {
        showAuthScreen();
    }
}

function setupEventListeners() {
    // Auth
    document.getElementById('authForm').addEventListener('submit', handleAuth);
    document.getElementById('authToggleLink').addEventListener('click', toggleAuthMode);
    
    // Navigation
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    // Search
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    
    // Profile
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    document.getElementById('addProfileBtn').addEventListener('click', handleAddProfile);
    
    // Player
    document.getElementById('closePlayer').addEventListener('click', closePlayer);
    document.getElementById('closeDetails').addEventListener('click', closeDetails);
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Auth Functions
async function handleAuth(e) {
    e.preventDefault();
    const email = document.getElementById('authEmail').value;
    const password = document.getElementById('authPassword').value;
    const isLogin = document.getElementById('authTitle').textContent === 'Sign In';
    
    try {
        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            authToken = data.token;
            currentUser = data.user;
            localStorage.setItem('authToken', authToken);
            showProfileScreen();
        } else {
            alert(data.message || 'Authentication failed');
        }
    } catch (error) {
        console.error('Auth error:', error);
        // Demo mode - allow login without backend
        authToken = 'demo-token';
        currentUser = { email, profiles: [{ name: 'Demo User', avatar: '👤' }] };
        localStorage.setItem('authToken', authToken);
        showProfileScreen();
    }
}

function toggleAuthMode(e) {
    e.preventDefault();
    const title = document.getElementById('authTitle');
    const toggleText = document.getElementById('authToggleText');
    const toggleLink = document.getElementById('authToggleLink');
    const submitBtn = document.getElementById('authSubmit');
    
    if (title.textContent === 'Sign In') {
        title.textContent = 'Sign Up';
        toggleText.textContent = 'Already have an account?';
        toggleLink.textContent = 'Sign in now';
        submitBtn.textContent = 'Sign Up';
    } else {
        title.textContent = 'Sign In';
        toggleText.textContent = 'New to StreamFlix?';
        toggleLink.textContent = 'Sign up now';
        submitBtn.textContent = 'Sign In';
    }
}

function handleLogout() {
    authToken = null;
    currentUser = null;
    currentProfile = null;
    localStorage.removeItem('authToken');
    showAuthScreen();
}

// Screen Management
function showAuthScreen() {
    document.getElementById('authScreen').classList.remove('hidden');
    document.getElementById('profileScreen').classList.add('hidden');
    document.getElementById('mainContent').classList.add('hidden');
}

function showProfileScreen() {
    document.getElementById('authScreen').classList.add('hidden');
    document.getElementById('profileScreen').classList.remove('hidden');
    document.getElementById('mainContent').classList.add('hidden');
    renderProfiles();
}

function showMainContent() {
    document.getElementById('authScreen').classList.add('hidden');
    document.getElementById('profileScreen').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');
    loadContent();
}

// Profile Functions
function renderProfiles() {
    const grid = document.getElementById('profilesGrid');
    const profiles = currentUser?.profiles || [{ name: 'Demo User', avatar: '👤' }];
    
    grid.innerHTML = profiles.map((profile, index) => `
        <div class="profile-card" onclick="selectProfile(${index})">
            <img src="https://via.placeholder.com/150/FF6B6B/FFFFFF?text=${profile.avatar}" alt="${profile.name}">
            <p>${profile.name}</p>
        </div>
    `).join('');
}

function selectProfile(index) {
    const profiles = currentUser?.profiles || [{ name: 'Demo User', avatar: '👤' }];
    currentProfile = profiles[index];
    showMainContent();
}

function handleAddProfile() {
    const name = prompt('Enter profile name:');
    if (name) {
        if (!currentUser.profiles) currentUser.profiles = [];
        currentUser.profiles.push({ name, avatar: '👤', isKids: false });
        renderProfiles();
    }
}

// Content Functions
function loadContent() {
    loadFeaturedContent();
    loadTrendingContent();
    loadContentByGenre('Action', 'actionRow');
    loadContentByGenre('Comedy', 'comedyRow');
    loadContentByGenre('Drama', 'dramaRow');
    loadContentByGenre('Documentary', 'documentaryRow');
}

function loadFeaturedContent() {
    const featured = sampleContent.find(c => c.featured) || sampleContent[0];
    const featuredEl = document.getElementById('featured');
    
    featuredEl.style.backgroundImage = `linear-gradient(to right, rgba(0,0,0,0.8), transparent), url('${featured.thumbnailUrl}')`;
    document.getElementById('featuredTitle').textContent = featured.title;
    document.getElementById('featuredDescription').textContent = featured.description;
    
    document.getElementById('featuredPlay').onclick = () => playContent(featured);
    document.getElementById('featuredInfo').onclick = () => showDetails(featured);
}

function loadTrendingContent() {
    const trending = sampleContent.filter(c => c.trending);
    renderContentRow('trendingRow', trending);
}

function loadContentByGenre(genre, rowId) {
    const content = sampleContent.filter(c => c.genre.includes(genre));
    renderContentRow(rowId, content);
}

function renderContentRow(rowId, content) {
    const row = document.getElementById(rowId);
    if (!row) return;
    
    row.innerHTML = content.map(item => `
        <div class="content-card" style="background-image: url('${item.thumbnailUrl}')" 
             onclick='showDetails(${JSON.stringify(item).replace(/'/g, "&apos;")})'>
            <div class="content-card-title">${item.title}</div>
        </div>
    `).join('');
}

// Navigation
function handleNavigation(e) {
    e.preventDefault();
    const page = e.target.dataset.page;
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
    });
    e.target.classList.add('active');
    
    switch(page) {
        case 'home':
            loadContent();
            break;
        case 'movies':
            filterContent('movie');
            break;
        case 'series':
            filterContent('series');
            break;
        case 'mylist':
            loadMyList();
            break;
    }
}

function filterContent(type) {
    const filtered = sampleContent.filter(c => c.type === type);
    document.getElementById('trendingRow').innerHTML = '';
    renderContentRow('actionRow', filtered);
    document.getElementById('comedyRow').innerHTML = '';
    document.getElementById('dramaRow').innerHTML = '';
    document.getElementById('documentaryRow').innerHTML = '';
}

function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    if (query.length < 2) {
        loadContent();
        return;
    }
    
    const results = sampleContent.filter(c => 
        c.title.toLowerCase().includes(query) || 
        c.description.toLowerCase().includes(query)
    );
    
    renderContentRow('trendingRow', results);
    document.getElementById('actionRow').innerHTML = '';
    document.getElementById('comedyRow').innerHTML = '';
    document.getElementById('dramaRow').innerHTML = '';
    document.getElementById('documentaryRow').innerHTML = '';
}

function loadMyList() {
    // Demo: Show all content as "My List"
    renderContentRow('trendingRow', sampleContent);
    document.getElementById('actionRow').innerHTML = '';
    document.getElementById('comedyRow').innerHTML = '';
    document.getElementById('dramaRow').innerHTML = '';
    document.getElementById('documentaryRow').innerHTML = '';
}

// Player Functions
function playContent(content) {
    const modal = document.getElementById('playerModal');
    const video = document.getElementById('videoPlayer');
    const source = video.querySelector('source');
    
    source.src = content.videoUrl;
    video.load();
    video.play();
    
    document.getElementById('playerTitle').textContent = content.title;
    document.getElementById('playerDescription').textContent = content.description;
    
    modal.classList.remove('hidden');
}

function closePlayer() {
    const modal = document.getElementById('playerModal');
    const video = document.getElementById('videoPlayer');
    video.pause();
    modal.classList.add('hidden');
}

function showDetails(content) {
    const modal = document.getElementById('detailsModal');
    
    document.getElementById('detailsThumbnail').src = content.thumbnailUrl;
    document.getElementById('detailsTitle').textContent = content.title;
    document.getElementById('detailsYear').textContent = content.releaseYear;
    document.getElementById('detailsRating').textContent = content.rating;
    document.getElementById('detailsDuration').textContent = content.duration;
    document.getElementById('detailsDescription').textContent = content.description;
    document.getElementById('detailsCast').textContent = content.cast?.join(', ') || 'N/A';
    document.getElementById('detailsGenres').textContent = content.genre.join(', ');
    
    document.getElementById('detailsPlay').onclick = () => {
        closeDetails();
        playContent(content);
    };
    
    document.getElementById('detailsAddList').onclick = () => {
        alert('Added to My List!');
    };
    
    modal.classList.remove('hidden');
}

function closeDetails() {
    document.getElementById('detailsModal').classList.add('hidden');
}

// Make functions globally accessible
window.selectProfile = selectProfile;
window.showDetails = showDetails;