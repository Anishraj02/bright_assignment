document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');

            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            if (!isOpen) {
                item.classList.add('active');
            }
        });
    });

    const testimonials = [
        { text: "Bright helped me pay off my credit cards faster than I expected!", author: "Sarah M.", rating: 5 },
        { text: "The automated payments make it so easy to stay on track.", author: "John D.", rating: 5 },
        { text: "I've saved thousands in interest payments using Bright.", author: "Michael R.", rating: 5 },
        { text: "The AI-powered system really understands my financial situation.", author: "Emma L.", rating: 4 },
        { text: "Best decision I made for my financial health!", author: "David K.", rating: 5 }
    ];

    const testimonialsContainer = document.querySelector('.testimonials-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let autoScrollInterval;

    testimonials.forEach(testimonial => {
        const testimonialElement = createTestimonial(testimonial);
        testimonialsContainer.appendChild(testimonialElement);
    });

    function scroll(direction) {
        const scrollAmount = direction * (300 + 30); 
        testimonialsContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        checkCarouselBounds();
    }

    function checkCarouselBounds() {
        const atStart = testimonialsContainer.scrollLeft === 0;
        const atEnd = testimonialsContainer.scrollLeft >= testimonialsContainer.scrollWidth - testimonialsContainer.clientWidth;

        prevBtn.disabled = atStart;
        nextBtn.disabled = atEnd;
    }

    prevBtn.addEventListener('click', () => scroll(-1));
    nextBtn.addEventListener('click', () => scroll(1));
    testimonialsContainer.addEventListener('scroll', checkCarouselBounds);
    checkCarouselBounds(); 

    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            const isAtEnd = testimonialsContainer.scrollLeft >= testimonialsContainer.scrollWidth - testimonialsContainer.clientWidth;
            if (isAtEnd) {
                testimonialsContainer.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                scroll(1);
            }
        }, 5000); 
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    
    startAutoScroll();
    testimonialsContainer.addEventListener('mouseenter', stopAutoScroll);
    testimonialsContainer.addEventListener('mouseleave', startAutoScroll);

    
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.scrollY;

        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.classList.add('hide');
        } else if (currentScroll <= 100) {
            navbar.classList.remove('hide');
        } else {
            navbar.classList.remove('hide');
        }

        lastScroll = currentScroll;
    });

    
    function handleImageLoad() {
        const images = document.querySelectorAll('img');

        images.forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                });
            }
        });
    }

    handleImageLoad();

    function createStars(rating) {
        const starsDiv = document.createElement('div');
        starsDiv.className = 'stars';

        for (let i = 0; i < 5; i++) {
            const star = document.createElement('i');
            star.className = 'fas fa-star'; 
            starsDiv.appendChild(star);
        }

        return starsDiv;
    }

    function createTestimonial(testimonial) {
        const testimonialDiv = document.createElement('div');
        testimonialDiv.className = 'testimonial';

        testimonialDiv.appendChild(createStars(testimonial.rating));

        const text = document.createElement('p');
        text.className = 'testimonial-text';
        text.textContent = testimonial.text;

        const author = document.createElement('p');
        author.className = 'testimonial-author';
        author.textContent = testimonial.author;

        testimonialDiv.appendChild(text);
        testimonialDiv.appendChild(author);

        return testimonialDiv;
    }
});
