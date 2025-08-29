document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navbar = document.querySelector('.navbar');
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 6;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        }
    });
});

function revealSections() {
    document.querySelectorAll('.section').forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
            section.classList.add('visible');
            const title = section.querySelector('.section-title');
            if (title && !title.classList.contains('animated-title')) {
                title.classList.add('animated-title');
            }
        }
    });
}
window.addEventListener('scroll', revealSections);
window.addEventListener('DOMContentLoaded', revealSections);

function setActiveNav() {
    const sections = document.querySelectorAll('.section');
    let currentId = '';
    const scrollY = window.scrollY + (document.querySelector('.navbar')?.offsetHeight || 0) + 10;
    sections.forEach(section => {
        if (section.offsetTop <= scrollY) {
            currentId = section.id;
        }
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentId) {
            link.classList.add('active');
        }
    });
}
window.addEventListener('scroll', setActiveNav);
window.addEventListener('DOMContentLoaded', setActiveNav);

window.addEventListener('DOMContentLoaded', function() {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const navbar = document.querySelector('.navbar');
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const top = aboutSection.getBoundingClientRect().top + window.pageYOffset - navHeight - 6;
        window.scrollTo({ top, behavior: 'auto' });
    }
    revealSections();
    setActiveNav();
});

setTimeout(() => {
    revealSections();
    setActiveNav();
}, 300);

// Carousel Logic for Projects
const projectList = document.getElementById('projectCarousel');
const projectCards = projectList.querySelectorAll('.project-card-simple');
let currentIndex = 0;

function updateCarousel() {
    projectCards.forEach((card, index) => {
        card.classList.remove('active', 'prev', 'next');
        if (index === currentIndex) {
            card.classList.add('active');
        } else if (index === (currentIndex - 1 + projectCards.length) % projectCards.length) {
            card.classList.add('prev');
        } else if (index === (currentIndex + 1) % projectCards.length) {
            card.classList.add('next');
        }
        card.style.zIndex = index === currentIndex ? 1 : 0;
    });
}

document.getElementById('prevBtn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + projectCards.length) % projectCards.length;
    updateCarousel();
});

document.getElementById('nextBtn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % projectCards.length;
    updateCarousel();
});

// Initialize carousel
updateCarousel();