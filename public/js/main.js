// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

mobileMenuBtn?.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('overflow-hidden');
});

mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.classList.remove('overflow-hidden');
    });
});

// Back to Top Button
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scroll for Anchor Links
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

// Form Validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Basic form validation
        const requiredFields = contactForm.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('border-red-500');
            } else {
                field.classList.remove('border-red-500');
            }
        });

        if (isValid) {
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<div class="loading-spinner"></div>';

            try {
                const formData = new FormData(contactForm);
                const response = await fetch('/contact', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.success) {
                    // Show success message
                    alert(data.message);
                    contactForm.reset();
                } else {
                    // Show error message
                    alert(data.message || 'An error occurred. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        }
    });
}

// Pricing Toggle
const pricingToggle = document.querySelector('.pricing-toggle');
const monthlyPrices = document.querySelectorAll('.price-monthly');
const yearlyPrices = document.querySelectorAll('.price-yearly');

pricingToggle?.addEventListener('click', (e) => {
    if (e.target.classList.contains('toggle-btn')) {
        const isYearly = e.target.dataset.period === 'yearly';
        
        // Update toggle button styles
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.classList.remove('bg-white', 'text-gray-900');
            btn.classList.add('text-gray-600');
        });
        e.target.classList.remove('text-gray-600');
        e.target.classList.add('bg-white', 'text-gray-900');

        // Update prices
        monthlyPrices.forEach(price => {
            price.style.display = isYearly ? 'none' : 'block';
        });
        yearlyPrices.forEach(price => {
            price.style.display = isYearly ? 'block' : 'none';
        });
    }
});

// Testimonial Slider
const testimonialSlider = document.querySelector('.testimonial-slider');
if (testimonialSlider) {
    let currentSlide = 0;
    const slides = testimonialSlider.querySelectorAll('.testimonial-slide');
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.transform = `translateX(${100 * (i - index)}%)`;
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);

    // Add navigation buttons if they exist
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');

    prevBtn?.addEventListener('click', prevSlide);
    nextBtn?.addEventListener('click', nextSlide);
}

// Portfolio Filter
const portfolioFilters = document.querySelectorAll('.portfolio-filter');
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioFilters.forEach(filter => {
    filter.addEventListener('click', (e) => {
        e.preventDefault();
        const category = e.target.dataset.category;

        // Update active filter
        portfolioFilters.forEach(f => f.classList.remove('active'));
        e.target.classList.add('active');

        // Filter items
        portfolioItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
                setTimeout(() => item.classList.add('show'), 10);
            } else {
                item.classList.remove('show');
                setTimeout(() => item.style.display = 'none', 300);
            }
        });
    });
});

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    
    // Show loading state
    const submitBtn = newsletterForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<div class="loading-spinner"></div>';

    // Simulate form submission (replace with actual form submission)
    setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        newsletterForm.reset();
        alert('Thank you for subscribing to our newsletter!');
    }, 1500);
}); 