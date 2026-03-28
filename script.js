const translations = {
    en: {
        page_title: "Nhywyll - VTuber Streamer & Content Creator",
        page_title_social: "Social Links | Nhywyll",
        page_title_contact: "Contact | Nhywyll",
        nav_home: "Home",
        nav_streams: "Socials",
        nav_contact: "Contact",
        imprint_link: "Imprint",
        social_title: "Social Channels",
        social_subtitle: "Follow Nhywyll across platforms for live streams, updates, art drops and community events.",
        twitch_title: "🎮 Twitch",
        twitch_desc: "Live gaming streams, viewer events, and community night.",
        twitch_link: "Open Twitch",
        youtube_title: "📺 YouTube",
        youtube_desc: "VODs, highlights, and special creative shorts on video.",
        youtube_link: "Open YouTube",
        twitter_title: "𝕏 (Twitter)",
        twitter_desc: "Quick community updates, art notifications, and stream alerts.",
        twitter_link: "Open X",
        discord_title: "💬 Discord",
        discord_desc: "Join the squad for voice chat, collabs and exclusive server events.",
        discord_link: "Join Discord",
        instagram_title: "📸 Instagram",
        instagram_desc: "Art process clips, behind-the-scenes, and story posts.",
        instagram_link: "Open Instagram",
        imprint_title: "Info & Legal Imprint",
        imprint_section: "Imprint",
        imprint_company: "Company: Nhywyll Creations",
        imprint_address: "Address: [Street Name], [City], [Country]",
        imprint_contact: "Contact: nhywyll@outlook.com",
        privacy_section: "Privacy",
        privacy_text: "Personal data is processed only to handle community interaction and business requests. Streaming platforms (Twitch, YouTube, Twitter etc.) have separate privacy policies."
    },
    de: {
        page_title: "Nhywyll - VTuber Streamer & Content Creator",
        page_title_social: "Soziale Links | Nhywyll",
        page_title_contact: "Kontakt | Nhywyll",
        nav_home: "Startseite",
        nav_streams: "Socials",
        nav_contact: "Kontakt",
        imprint_link: "Impressum",
        social_title: "Soziale Kanäle",
        social_subtitle: "Folge Nhywyll auf verschiedenen Plattformen für Live-Streams, Updates, Kunst-Drops und Community-Events.",
        twitch_title: "🎮 Twitch",
        twitch_desc: "Live-Gaming-Streams, Zuschauer-Events und Community-Nächte.",
        twitch_link: "Twitch öffnen",
        youtube_title: "📺 YouTube",
        youtube_desc: "VODs, Highlights und spezielle kreative Shorts auf Video.",
        youtube_link: "YouTube öffnen",
        twitter_title: "𝕏 (Twitter)",
        twitter_desc: "Schnelle Community-Updates, Kunst-Benachrichtigungen und Stream-Alerts.",
        twitter_link: "X öffnen",
        discord_title: "💬 Discord",
        discord_desc: "Trete der Truppe bei für Voice-Chat, Collabs und exklusive Server-Events.",
        discord_link: "Discord beitreten",
        instagram_title: "📸 Instagram",
        instagram_desc: "Kunst-Prozess-Clips, Hinter-den-Kulissen und Story-Posts.",
        instagram_link: "Instagram öffnen",
        imprint_title: "Info & Rechtliches Impressum",
        imprint_section: "Impressum",
        imprint_company: "Firma: Nhywyll Creations",
        imprint_address: "Adresse: [Straßenname], [Stadt], [Land]",
        imprint_contact: "Kontakt: nhywyll@outlook.com",
        privacy_section: "Datenschutz",
        privacy_text: "Persönliche Daten werden nur zur Abwicklung von Community-Interaktionen und Geschäftsanfragen verarbeitet. Streaming-Plattformen (Twitch, YouTube, Twitter usw.) haben separate Datenschutzrichtlinien."
    }
};

let currentLanguage = localStorage.getItem('language') || 'en';

// Check URL parameter
const urlParams = new URLSearchParams(window.location.search);
const langFromUrl = urlParams.get('lang');
if (langFromUrl && (langFromUrl === 'en' || langFromUrl === 'de')) {
    currentLanguage = langFromUrl;
    localStorage.setItem('language', currentLanguage);
}

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;

    // Set page title based on page
    const pageKey = window.location.pathname.includes('social.html') ? 'page_title_social' :
                    window.location.pathname.includes('contact.html') ? 'page_title_contact' :
                    window.location.pathname.includes('imprint.html') ? 'page_title' : 'page_title';
    document.title = translations[lang][pageKey];

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });

    // Update URL
    const url = new URL(window.location);
    url.searchParams.set('lang', lang);
    history.replaceState(null, '', url.toString());

    // Update nav links
    updateLinks();
}

function updateLinks() {
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
        if (link.href.includes('index.html') || link.href.includes('contact.html') || link.href.includes('social.html') || link.href.includes('imprint.html')) {
            const url = new URL(link.href);
            url.searchParams.set('lang', currentLanguage);
            link.href = url.toString();
        }
    });
}

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        setLanguage(btn.getAttribute('data-lang'));
    });
});

setLanguage(currentLanguage);

// Contact form handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        const subject = `Message from ${name} via Nhywyll Website`;
        const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        
        const mailtoLink = `mailto:nhywyll@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        window.location.href = mailtoLink;
    });
}

// Theme toggle functionality
let currentTheme = localStorage.getItem('theme') || 'dark';

function setTheme(theme) {
    currentTheme = theme;
    localStorage.setItem('theme', theme);
    
    if (theme === 'light') {
        document.body.classList.add('light-theme');
        document.getElementById('theme-toggle').textContent = '☀️';
        document.getElementById('theme-toggle').setAttribute('aria-label', 'Switch to dark theme');
    } else {
        document.body.classList.remove('light-theme');
        document.getElementById('theme-toggle').textContent = '🌙';
        document.getElementById('theme-toggle').setAttribute('aria-label', 'Switch to light theme');
    }
}

const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
}

setTheme(currentTheme);

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});