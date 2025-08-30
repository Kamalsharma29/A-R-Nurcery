// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Change hamburger to X when open
            if (navMenu.classList.contains('active')) {
                mobileMenuBtn.innerHTML = '✕';
            } else {
                mobileMenuBtn.innerHTML = '☰';
            }
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '☰';
            });
        });
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to header
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.plant-card, .catalog-card, .blog-card, .video-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Video play button functionality
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        card.addEventListener('click', function() {
            // In a real implementation, you would open a video modal or redirect to YouTube
            alert('Video functionality would be implemented here!');
        });
    });

    // Language toggle functionality
    const langBtn = document.querySelector('.lang-btn');
    if (langBtn) {
        langBtn.addEventListener('click', function() {
            // Toggle between English and Hindi
            const hindiElements = document.querySelectorAll('.hindi');
            hindiElements.forEach(el => {
                el.style.display = el.style.display === 'none' ? 'block' : 'none';
            });
        });
    }

    // Add loading states to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.href && this.href.includes('wa.me')) {
                return; // Let WhatsApp links work normally
            }
            
            e.preventDefault();
            const originalText = this.innerHTML;
            this.innerHTML = 'Loading...';
            this.classList.add('loading');
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.classList.remove('loading');
            }, 1000);
        });
    });
});

// Utility function to format phone numbers
function formatPhoneNumber(phone) {
    return phone.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
}

// Utility function to validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add to cart functionality (placeholder)
function addToCart(plantName, price) {
    console.log(`Added ${plantName} (₹${price}) to cart`);
    
    // Show success message
    const message = document.createElement('div');
    message.className = 'success-message';
    message.innerHTML = `✅ ${plantName} added to cart!`;
    message.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-green);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Search functionality (placeholder)
function searchPlants(query) {
    console.log(`Searching for: ${query}`);
    // Implementation would filter the plant catalog
}

// Newsletter subscription (placeholder)
function subscribeNewsletter(email) {
    if (validateEmail(email)) {
        console.log(`Subscribed email: ${email}`);
        return true;
    }
    return false;
}