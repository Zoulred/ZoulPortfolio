document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.perspective-slider');
    if (!slider) return;
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    const indicatorsContainer = document.querySelector('.slider-indicators');
    
    // Create indicators
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === 0) indicator.classList.add('active');
        indicatorsContainer.appendChild(indicator);
    });
    
    const indicators = document.querySelectorAll('.indicator');
    
    let currentIndex = 0;
    
    // Update slider positions
    function updateSlider() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev', 'next', 'prev2', 'next2', 'hidden');
            
            const position = index - currentIndex;
            
            if (position === 0) {
                slide.classList.add('active');
            } else if (position === -1) {
                slide.classList.add('prev');
            } else if (position === 1) {
                slide.classList.add('next');
            } else if (position === -2) {
                slide.classList.add('prev2');
            } else if (position === 2) {
                slide.classList.add('next2');
            } else {
                slide.classList.add('hidden');
            }
        });
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Navigation functions
    function goToPrev() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    }
    
    function goToNext() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }
    
    // Event listeners
    prevBtn.addEventListener('click', goToPrev);
    nextBtn.addEventListener('click', goToNext);
    
    // Slide click event - Updated to handle links
    slides.forEach((slide, index) => {
        slide.addEventListener('click', function(e) {
            // If the slide is active, open the link
            if (slide.classList.contains('active')) {
                const link = slide.dataset.link;
                if (link) {
                    window.open(link, '_blank');
                }
            } else {
                // Otherwise, bring it to center
                goToSlide(index);
            }
        });
    });
    
    // Indicator click event
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToPrev();
        } else if (e.key === 'ArrowRight') {
            goToNext();
        }
    });
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            goToNext();
        }
        if (touchEndX > touchStartX + 50) {
            goToPrev();
        }
    }
    
    // Initialize
    updateSlider();
});