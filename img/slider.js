document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.perspective-slider');
    if (!slider) return;
    
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    const indicatorsContainer = document.querySelector('.slider-indicators');

    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === 0) indicator.classList.add('active');
        indicatorsContainer.appendChild(indicator);
    });

    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;

    function updateSlider() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev', 'next', 'prev2', 'next2', 'hidden');
            const pos = index - currentIndex;
            if (pos === 0) slide.classList.add('active');
            else if (pos === -1) slide.classList.add('prev');
            else if (pos === 1) slide.classList.add('next');
            else if (pos === -2) slide.classList.add('prev2');
            else if (pos === 2) slide.classList.add('next2');
            else slide.classList.add('hidden');
        });
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    function goToPrev() { currentIndex = (currentIndex - 1 + slides.length) % slides.length; updateSlider(); }
    function goToNext() { currentIndex = (currentIndex + 1) % slides.length; updateSlider(); }
    function goToSlide(index) { currentIndex = index; updateSlider(); }

    prevBtn.addEventListener('click', goToPrev);
    nextBtn.addEventListener('click', goToNext);
    indicators.forEach((ind, i) => ind.addEventListener('click', () => goToSlide(i)));

    slides.forEach((slide, i) => {
        slide.addEventListener('click', () => {
            if (slide.classList.contains('active')) {
                const link = slide.dataset.link;
                if (link) window.open(link, '_blank');
            } else goToSlide(i);
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') goToPrev();
        else if (e.key === 'ArrowRight') goToNext();
    });

    let touchStartX = 0, touchEndX = 0;
    slider.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX);
    slider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX - 50) goToNext();
        if (touchEndX > touchStartX + 50) goToPrev();
    });

    updateSlider();
});
