// API Configuration
const GNEWS_API_BASE_URL = 'https://gnews.io/api/v4';
const GNEWS_API_KEY = 'dd2d5dd6dbd3c56b95e6badfceadf324';

// Error handling for API requests
async function handleApiError(response) {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch news');
    }
    return response;
}

// Fetch news with better error handling and rate limit consideration
async function fetchNews(category = '', lang = currentLang) {
    try {
        const endpoint = `${GNEWS_API_BASE_URL}/top-headlines?${new URLSearchParams({
            category: category || 'general',
            lang: lang,
            apikey: GNEWS_API_KEY,
            max: 10 // Limit articles to conserve API calls
        })}`;

        const response = await fetch(endpoint);
        await handleApiError(response);
        const data = await response.json();
        
        if (!data.articles || !Array.isArray(data.articles)) {
            throw new Error('Invalid response format');
        }

        return data.articles;
    } catch (error) {
        console.error('Error fetching news:', error);
        showErrorMessage(translations[currentLang].error);
        return [];
    }
}

// Show error message to user
function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    document.querySelector('main').prepend(errorDiv);
    
    // Remove error message after 5 seconds
    setTimeout(() => errorDiv.remove(), 5000);
}

// User Authentication State
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Theme and Reading Mode
let currentTheme = localStorage.getItem('theme') || 'light-mode';
let isReadMode = localStorage.getItem('readMode') === 'true';

// Language Support
const translations = {
    en: {
        home: 'Home',
        politics: 'Politics',
        technology: 'Technology',
        sports: 'Sports',
        entertainment: 'Entertainment',
        login: 'Login',
        signup: 'Sign Up',
        or: 'or',
        readMore: 'Read More',
        comments: 'Comments',
        post: 'Post',
        share: 'Share',
        loading: 'Loading...',
        error: 'Error loading news',
        featured: 'Featured News',
        latest: 'Latest News',
        email: 'Email',
        password: 'Password',
        fullname: 'Full Name',
        confirmPassword: 'Confirm Password',
        aboutUs: 'About Us',
        aboutDesc: 'Your trusted source for the latest news and updates.',
        quickLinks: 'Quick Links',
        categories: 'Categories',
        contact: 'Contact',
        followUs: 'Follow Us',
        rights: 'All rights reserved.'
    },
    es: {
        home: 'Inicio',
        politics: 'Política',
        technology: 'Tecnología',
        sports: 'Deportes',
        entertainment: 'Entretenimiento',
        login: 'Iniciar Sesión',
        signup: 'Registrarse',
        or: 'o',
        readMore: 'Leer Más',
        comments: 'Comentarios',
        post: 'Publicar',
        share: 'Compartir',
        loading: 'Cargando...',
        error: 'Error al cargar noticias',
        featured: 'Noticias Destacadas',
        latest: 'Últimas Noticias',
        email: 'Correo',
        password: 'Contraseña',
        fullname: 'Nombre Completo',
        confirmPassword: 'Confirmar Contraseña',
        aboutUs: 'Sobre Nosotros',
        aboutDesc: 'Tu fuente confiable de noticias y actualizaciones.',
        quickLinks: 'Enlaces Rápidos',
        categories: 'Categorías',
        contact: 'Contacto',
        followUs: 'Síguenos',
        rights: 'Todos los derechos reservados.'
    },
    fr: {
        home: 'Accueil',
        politics: 'Politique',
        technology: 'Technologie',
        sports: 'Sports',
        entertainment: 'Divertissement',
        login: 'Connexion',
        signup: "S'inscrire",
        or: 'ou',
        readMore: 'Lire Plus',
        comments: 'Commentaires',
        post: 'Publier',
        share: 'Partager',
        loading: 'Chargement...',
        error: 'Erreur de chargement des actualités',
        featured: 'À la Une',
        latest: 'Dernières Nouvelles',
        email: 'Email',
        password: 'Mot de passe',
        fullname: 'Nom complet',
        confirmPassword: 'Confirmer le mot de passe',
        aboutUs: 'À Propos',
        aboutDesc: 'Votre source d\'information fiable.',
        quickLinks: 'Liens Rapides',
        categories: 'Catégories',
        contact: 'Contact',
        followUs: 'Suivez-nous',
        rights: 'Tous droits réservés.'
    },
    hi: {
        home: 'होम',
        politics: 'राजनीति',
        technology: 'तकनीक',
        sports: 'खेल',
        entertainment: 'मनोरंजन',
        login: 'लॉग इन',
        signup: 'साइन अप',
        or: 'या',
        readMore: 'और पढ़ें',
        comments: 'टिप्पणियाँ',
        post: 'पोस्ट',
        share: 'साझा करें',
        loading: 'लोड हो रहा है...',
        error: 'समाचार लोड होने में त्रुटि',
        featured: 'विशेष समाचार',
        latest: 'ताज़ा खबरें',
        email: 'ईमेल',
        password: 'पासवर्ड',
        fullname: 'पूरा नाम',
        confirmPassword: 'पासवर्ड की पुष्टि करें',
        aboutUs: 'हमारे बारे में',
        aboutDesc: 'समाचार और अपडेट के लिए आपका विश्वसनीय स्रोत।',
        quickLinks: 'त्वरित लिंक',
        categories: 'श्रेणियाँ',
        contact: 'संपर्क करें',
        followUs: 'हमें फॉलो करें',
        rights: 'सर्वाधिकार सुरक्षित।'
    },
    zh: {
        home: '首页',
        politics: '政治',
        technology: '科技',
        sports: '体育',
        entertainment: '娱乐',
        login: '登录',
        signup: '注册',
        or: '或',
        readMore: '阅读更多',
        comments: '评论',
        post: '发表',
        share: '分享',
        loading: '加载中...',
        error: '加载新闻失败',
        featured: '精选新闻',
        latest: '最新新闻',
        email: '邮箱',
        password: '密码',
        fullname: '全名',
        confirmPassword: '确认密码',
        aboutUs: '关于我们',
        aboutDesc: '您值得信赖的新闻和更新来源。',
        quickLinks: '快速链接',
        categories: '类别',
        contact: '联系我们',
        followUs: '关注我们',
        rights: '版权所有。'
    }
};

// Set initial language from localStorage or browser preference
let currentLang = localStorage.getItem('language') || navigator.language.split('-')[0] || 'en';
if (!translations[currentLang]) currentLang = 'en';

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    changeLanguage(currentLang);
    document.getElementById('languageSelect').value = currentLang;
});

function changeLanguage(lang) {
    if (!translations[lang]) return;
    
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    // Update all elements with data-lang attribute
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[lang][key]) {
            if (element.tagName === 'INPUT') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Update news content language if using GNews API
    fetchNews(currentCategory, lang);
}

// Update UI based on authentication state
function updateAuthUI() {
    const authButtons = document.querySelector('.auth-buttons');
    if (currentUser) {
        const profilePic = currentUser.picture || '';
        authButtons.innerHTML = `
            <div class="user-profile">
                ${profilePic ? `<img src="${profilePic}" alt="${currentUser.name}">` : ''}
                <span>Welcome, ${currentUser.name}</span>
                <button onclick="logout()">Logout</button>
            </div>
        `;
    } else {
        authButtons.innerHTML = `
            <button onclick="openModal('login')" data-lang="login">Login</button>
            <button onclick="openModal('signup')" data-lang="signup">Sign Up</button>
        `;
    }
    updateLanguage();
}

// Logout function
function logout() {
    if (currentUser?.provider === 'google') {
        google.accounts.id.disableAutoSelect();
    }
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI();
    alert('Logged out successfully!');
}

// Authentication functions
function openModal(type) {
    document.getElementById(`${type}Modal`).style.display = 'block';
}

function closeModal(type) {
    document.getElementById(`${type}Modal`).style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Form submission handlers
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;
    
    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        updateAuthUI();
        alert('Login successful!');
        closeModal('login');
    } else {
        alert('Invalid credentials!');
    }
});

document.getElementById('signupForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;
    const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    // Store user in localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.some(user => user.email === email)) {
        alert('Email already registered!');
        return;
    }
    
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    updateAuthUI();
    
    alert('Registration successful!');
    closeModal('signup');
});

// Function to create news cards
function createNewsCard(article) {
    const articleId = btoa(article.url); // Create unique ID from URL
    initializeArticle(articleId);
    const interactions = newsInteractions[articleId];

    return `
        <div class="news-card">
            <img src="${article.image || 'https://via.placeholder.com/300x200'}" alt="${article.title}">
            <div class="news-content">
                <span class="category">${article.source.name}</span>
                <h3>${article.title}</h3>
                <p>${article.description || ''}</p>
                <div class="news-footer">
                    <span class="date">${new Date(article.publishedAt).toLocaleDateString()}</span>
                    <a href="${article.url}" target="_blank" class="read-more">Read Full Article</a>
                </div>
                <div class="interaction-buttons">
                    <button class="interaction-btn like-btn ${interactions.liked ? 'liked' : ''}" 
                            data-like-id="${articleId}" 
                            onclick="toggleLike('${articleId}')">
                        <i class="fas fa-heart"></i>
                        <span class="like-count">${interactions.likes}</span>
                    </button>
                    <button class="interaction-btn comment-btn" 
                            onclick="toggleComments('${articleId}')">
                        <i class="fas fa-comment"></i>
                        <span class="comment-count">${interactions.comments.length}</span>
                    </button>
                    <button class="interaction-btn share-btn" 
                            onclick="shareArticle('${article.title.replace(/'/g, "\\'")}', '${article.url}')">
                        <i class="fas fa-share"></i>
                    </button>
                </div>
                <div class="comments-section" id="comments-${articleId}" style="display: none;">
                    <div class="comments-list">
                        ${interactions.comments.map(comment => `
                            <div class="comment">
                                <strong>${comment.user}</strong>
                                <span class="comment-date">${new Date(comment.timestamp).toLocaleDateString()}</span>
                                <p>${comment.text}</p>
                            </div>
                        `).join('')}
                    </div>
                    <div class="comment-form">
                        <textarea placeholder="Write a comment..." class="comment-input"></textarea>
                        <button onclick="submitComment('${articleId}', this.previousElementSibling)">Post</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Toggle comments section
function toggleComments(articleId) {
    const commentsSection = document.getElementById(`comments-${articleId}`);
    commentsSection.style.display = commentsSection.style.display === 'none' ? 'block' : 'none';
}

// Submit comment
function submitComment(articleId, textarea) {
    const commentText = textarea.value.trim();
    if (!commentText) return;
    
    const comment = addComment(articleId, commentText);
    if (comment) {
        const commentsList = document.querySelector(`#comments-${articleId} .comments-list`);
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `
            <strong>${comment.user}</strong>
            <span class="comment-date">${new Date(comment.timestamp).toLocaleDateString()}</span>
            <p>${comment.text}</p>
        `;
        commentsList.appendChild(commentElement);
        textarea.value = '';
        
        // Update comment count
        const commentBtn = document.querySelector(`[data-like-id="${articleId}"]`)
            .parentElement.querySelector('.comment-btn .comment-count');
        commentBtn.textContent = newsInteractions[articleId].comments.length;
    }
}

// Share article
function shareArticle(title, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        }).catch(console.error);
    } else {
        // Fallback for browsers that don't support Web Share API
        const dummy = document.createElement('input');
        document.body.appendChild(dummy);
        dummy.value = url;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        alert('Link copied to clipboard!');
    }
}

// Theme Management
function toggleTheme() {
    currentTheme = currentTheme === 'light-mode' ? 'dark-mode' : 'light-mode';
    document.body.className = currentTheme + (isReadMode ? ' read-mode' : '');
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
}

function toggleReadMode() {
    isReadMode = !isReadMode;
    document.body.className = currentTheme + (isReadMode ? ' read-mode' : '');
    localStorage.setItem('readMode', isReadMode);
    updateReadModeIcon();
}

function updateThemeIcon() {
    const themeIcon = document.querySelector('#themeToggle i');
    themeIcon.className = currentTheme === 'light-mode' ? 'fas fa-moon' : 'fas fa-sun';
}

function updateReadModeIcon() {
    const readModeIcon = document.querySelector('#readModeToggle i');
    readModeIcon.className = isReadMode ? 'fas fa-book' : 'fas fa-book-reader';
}

// Category navigation
const categoryMap = {
    'home': '',
    'general': 'general',
    'technology': 'technology',
    'sports': 'sports',
    'entertainment': 'entertainment',
    'business': 'business',
    'science': 'science',
    'health': 'health'
};

document.querySelectorAll('.nav-items a').forEach(link => {
    link.addEventListener('click', async (e) => {
        e.preventDefault();
        const category = e.target.textContent.toLowerCase();
        const mappedCategory = categoryMap[category] || '';
        
        // Show loading state
        const newsGrid = document.querySelector('.news-grid');
        newsGrid.innerHTML = '<div class="loading">Loading news...</div>';
        
        try {
            const articles = await fetchNews(mappedCategory);
            newsGrid.innerHTML = articles
                .slice(0, 6)
                .map(createNewsCard)
                .join('');
        } catch (error) {
            console.error('Error:', error);
            newsGrid.innerHTML = '<div class="error">Failed to load news</div>';
        }
    });
});

// Function to populate news with loading states and error handling
async function populateNews() {
    const featuredNews = document.querySelector('.news-grid');
    const latestNews = document.querySelector('.news-list');
    
    featuredNews.innerHTML = `<div class="loading">${translations[currentLang].loading}</div>`;
    latestNews.innerHTML = `<div class="loading">${translations[currentLang].loading}</div>`;
    
    try {
        // Fetch featured news (technology category)
        const featuredArticles = await fetchNews('technology');
        if (featuredArticles.length > 0) {
            featuredNews.innerHTML = featuredArticles
                .slice(0, 3)
                .map(createNewsCard)
                .join('');
        } else {
            featuredNews.innerHTML = `<div class="error">${translations[currentLang].error}</div>`;
        }
        
        // Fetch latest news (general category)
        const latestArticles = await fetchNews('general');
        if (latestArticles.length > 0) {
            latestNews.innerHTML = latestArticles
                .slice(0, 5)
                .map(createNewsItem)
                .join('');
        } else {
            latestNews.innerHTML = `<div class="error">${translations[currentLang].error}</div>`;
        }
    } catch (error) {
        console.error('Error:', error);
        featuredNews.innerHTML = `<div class="error">${translations[currentLang].error}</div>`;
        latestNews.innerHTML = `<div class="error">${translations[currentLang].error}</div>`;
    }
}

// Create news item HTML
function createNewsItem(article) {
    return `
        <div class="news-item">
            <h4>${article.title}</h4>
            <p>${article.description || ''}</p>
            <div class="news-footer">
                <span class="date">${new Date(article.publishedAt).toLocaleDateString(currentLang)}</span>
                <a href="${article.url}" target="_blank">${translations[currentLang].readMore}</a>
            </div>
        </div>
    `;
}

// Store likes and comments in localStorage
const newsInteractions = JSON.parse(localStorage.getItem('newsInteractions')) || {};

// Function to save interactions
function saveInteractions() {
    localStorage.setItem('newsInteractions', JSON.stringify(newsInteractions));
}

// Initialize news article interactions
function initializeArticle(articleId) {
    if (!newsInteractions[articleId]) {
        newsInteractions[articleId] = {
            likes: 0,
            liked: false,
            comments: []
        };
        saveInteractions();
    }
}

// Handle like action
function toggleLike(articleId) {
    if (!currentUser) {
        alert('Please login to like articles');
        return;
    }
    
    initializeArticle(articleId);
    const article = newsInteractions[articleId];
    article.liked = !article.liked;
    article.likes += article.liked ? 1 : -1;
    
    const likeBtn = document.querySelector(`[data-like-id="${articleId}"]`);
    likeBtn.classList.toggle('liked');
    likeBtn.querySelector('.like-count').textContent = article.likes;
    
    saveInteractions();
}

// Handle comment submission
function addComment(articleId, commentText) {
    if (!currentUser) {
        alert('Please login to comment');
        return;
    }
    
    initializeArticle(articleId);
    const comment = {
        id: Date.now(),
        user: currentUser.name,
        text: commentText,
        timestamp: new Date().toISOString()
    };
    
    newsInteractions[articleId].comments.push(comment);
    saveInteractions();
    
    return comment;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    updateAuthUI();
    populateNews();
    applyTheme();
    applyReadMode();
    updateLanguage();
});

function applyTheme() {
    document.body.className = currentTheme + (isReadMode ? ' read-mode' : '');
}

function applyReadMode() {
    document.body.classList.toggle('read-mode', isReadMode);
}

function updateLanguage() {
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[currentLang]?.[key]) {
            if (element.tagName === 'INPUT') {
                element.placeholder = translations[currentLang][key];
            } else {
                element.textContent = translations[currentLang][key];
            }
        }
    });
}
