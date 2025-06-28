// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
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

// Header Background Change on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(44, 24, 16, 0.98)';
    } else {
        header.style.background = 'rgba(44, 24, 16, 0.95)';
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.product-card, .offer-card, .about-content, .contact-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Product Card Hover Effects
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Offer Card Hover Effects
document.querySelectorAll('.offer-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
        showNotification('يرجى ملء جميع الحقول', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً من فريق رُواء', 'success');
    contactForm.reset();
});

// Notification System
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        font-size: 14px;
        line-height: 1.4;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// CTA Button Click Handler
document.querySelector('.cta-button').addEventListener('click', () => {
    document.querySelector('#products').scrollIntoView({
        behavior: 'smooth'
    });
});

// Product Button Click Handlers
document.querySelectorAll('.product-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const productCard = btn.closest('.product-card');
        const productTitle = productCard.querySelector('.product-title').textContent;
        showNotification(`تم عرض تفاصيل ${productTitle} من رُواء`, 'success');
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Loading Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add floating animation to product cards
function addFloatingAnimation() {
    document.querySelectorAll('.product-card').forEach((card, index) => {
        card.style.animation = `float 3s ease-in-out infinite`;
        card.style.animationDelay = `${index * 0.2}s`;
    });
}

// CSS for floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
    }
    
    .product-card:hover {
        animation-play-state: paused;
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
    
    .offer-card.popular {
        animation: pulse 2s ease-in-out infinite;
    }
`;
document.head.appendChild(style);

// Initialize floating animation
setTimeout(addFloatingAnimation, 1000);

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.textContent;
    setTimeout(() => {
        typeWriter(heroTitle, originalText, 80);
    }, 500);
});

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #D4AF37, #F4D03F);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

createScrollProgress();

// Special offer countdown timer (optional feature)
function createCountdownTimer() {
    const countdownElement = document.createElement('div');
    countdownElement.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(45deg, #D4AF37, #F4D03F);
        color: #2C1810;
        padding: 15px 20px;
        border-radius: 10px;
        font-weight: bold;
        box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
        z-index: 1000;
        font-size: 14px;
        text-align: center;
        min-width: 200px;
    `;
    
    // Set countdown to 4 days from now
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 32);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = endDate.getTime() - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            
            countdownElement.innerHTML = `
                <div>العروض تنتهي خلال:</div>
                <div style="font-size: 16px; margin-top: 5px;">
                    ${days} يوم ${hours} ساعة ${minutes} دقيقة
                </div>
            `;
        } else {
            countdownElement.innerHTML = '<div>انتهت العروض الخاصة!</div>';
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 60000); // Update every minute
    
    document.body.appendChild(countdownElement);
    
    // Add close button
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 5px;
        right: 10px;
        cursor: pointer;
        font-size: 18px;
        font-weight: bold;
    `;
    closeBtn.onclick = () => countdownElement.remove();
    countdownElement.appendChild(closeBtn);
}

// Initialize countdown timer after 3 seconds
setTimeout(createCountdownTimer, 3000);

