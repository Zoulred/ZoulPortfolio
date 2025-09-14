function createStars() {
    const starsContainer = document.getElementById('starsContainer');
    const starCount = 600; 
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random star size
        const sizeType = Math.random();
        if (sizeType < 0.3) {
            star.classList.add('small');
        } else if (sizeType < 0.9) {
            star.classList.add('medium');
        } else {
            star.classList.add('large');
        }
        
        // Random position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Random animation path
        const pathType = Math.random();
        if (pathType < 0.33) {
            star.style.animationName = 'float-left';
        } else if (pathType < 0.66) {
            star.style.animationName = 'float-right';
        } else {
            star.style.animationName = 'float-straight';
        }
        
        // Random twinkling
        if (Math.random() > 1.7) {
            star.classList.add('twinkling');
        }
        
        // Random animation delay
        star.style.animationDelay = `${Math.random() * 10}s`;
        
        starsContainer.appendChild(star);
    }
}

// Initialize stars on page load
window.addEventListener('load', createStars);

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Fade in animation on scroll
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOnScroll = () => {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
};

// Run once on page load
fadeInOnScroll();

// Run on scroll
window.addEventListener('scroll', fadeInOnScroll);