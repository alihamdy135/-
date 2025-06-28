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

// Product Modal Functionality
const modal = document.getElementById('product-modal');
const modalTitle = document.getElementById('modal-product-title');
const modalDescription = document.getElementById('modal-product-description');
const modalImage = document.getElementById('modal-product-image');
const modalDetails = document.getElementById('modal-product-details');
const modalOriginalPrice = document.getElementById('modal-original-price');
const modalSalePrice = document.getElementById('modal-sale-price');
const modalOffersInfo = document.getElementById('modal-offers-info');
const closeModal = document.querySelector('.close-modal');

// Product Data
const products = {
    khamrah: {
        title: 'Khamrah',
        description: 'عطر شرقي سبايسي للجنسين مع مزيج فريد من الروائح الشرقية والخشبية',
        image: 'images/khamrah.jpg',
        details: [
            'النوع: شرقي سبايسي للجنسين',
            'المقدمة: قرفة - جوزة الطيب - برغموت',
            'القلب: تمر - براالين - مسك - زهور - توباكو',
            'القاعدة: فانيليا - عنبر - تونكا - مر - باتشولي',
            'الرائحة: حلوة شرقية - دافئة',
            'الثبات: ممتاز جدًا (8–10 ساعات)'
        ],
        originalPrice: '350 جنيه',
        salePrice: '249 جنيه',
        offers: [
            'عرض خاص: خصم 30% على الزجاجة الأولى',
            'عرض التوصيل المجاني لجميع المحافظات',
            'عرض الهدية مع كل طلب فوق 500 جنيه'
        ]
    },
    bianco_latte: {
        title: 'Bianco Latte',
        description: 'عطر غورماند كريمي للجنسين مع نفحات من الفانيليا والكراميل',
        image: 'images/bianco_latte.jpg',
        details: [
            'النوع: غورماند كريمي للجنسين',
            'المكونات: كراميل - عسل - فانيليا - مسك أبيض - كومارين',
            'الرائحة: حليب كراميل غني',
            'الثبات: ممتاز جدًا - يدوم ليوم كامل'
        ],
        originalPrice: '350 جنيه',
        salePrice: '249 جنيه',
        offers: [
            'عرض خاص: خصم 30% على الزجاجة الأولى',
            'عرض التوصيل المجاني لجميع المحافظات'
        ]
    },
    acqua_di_gio: {
        title: 'Acqua di Giò',
        description: 'عطر أكواتيك أروماتيك رجالي منعش وأنيق',
        image: 'images/acqua_di_gio.jpg',
        details: [
            'النوع: أكواتيك أروماتيك رجالي',
            'المقدمة: ليمون - ماندرين - نيرولي',
            'القلب: روزماري - سالفيا - ياسمين',
            'القاعدة: باتشولي - مسك - أخشاب دافئة',
            'الرائحة: منعشة، صيفية، أنيقة',
            'الثبات: متوسط إلى جيد (5–7 ساعات)'
        ],
        originalPrice: '350 جنيه',
        salePrice: '249 جنيه',
        offers: [
            'عرض خاص: خصم 30% على الزجاجة الأولى',
            'عرض التوصيل المجاني لجميع المحافظات'
        ]
    },
    baccarat_rouge: {
        title: 'Baccarat Rouge 540',
        description: 'عطر عنبري خشبي زهري للجنسين مع لمسة من الفخامة',
        image: 'images/baccarat_rouge.jpg',
        details: [
            'النوع: عنبري خشبي زهري للجنسين',
            'المقدمة: زعفران - ياسمين',
            'القلب: عنبر رمادي - خشب الأرز',
            'القاعدة: راتنجات - مسك',
            'الرائحة: حلوة عنبرية - مميزة جدًا',
            'الثبات: قوي جدًا وفوّاح (10+ ساعات)'
        ],
        originalPrice: '350 جنيه',
        salePrice: '249 جنيه',
        offers: [
            'عرض خاص: خصم 30% على الزجاجة الأولى',
            'عرض التوصيل المجاني لجميع المحافظات'
        ]
    },
    le_beau: {
        title: 'Le Beau Le Parfum',
        description: 'عطر خشبي فانيليا أروماتيك رجالي مع لمسة أنيقة',
        image: 'images/le_beau.jpg',
        details: [
            'النوع: خشبي فانيليا أروماتيك رجالي',
            'المقدمة: أناناس - إبرة الراعي - زنجبيل',
            'القلب: جوز الهند - أخشاب - العنبر',
            'القاعدة: فانيليا - خشب الصندل - التونكا',
            'الرائحة: فاكهية ناعمة مع لمسة فاخرة',
            'الثبات: ممتاز'
        ],
        originalPrice: '350 جنيه',
        salePrice: '249 جنيه',
        offers: [
            'عرض خاص: خصم 30% على الزجاجة الأولى',
            'عرض التوصيل المجاني لجميع المحافظات'
        ]
    },
    althair: {
        title: 'Althair',
        description: 'عطر شرقي فانيليا رجالي مع لمسة دافئة وجذابة',
        image: 'images/althair.jpg',
        details: [
            'النوع: شرقي فانيليا رجالي',
            'المقدمة: فانيليا - برغموت - قرفة',
            'القلب: مسك - الباتشولي - الخشب',
            'القاعدة: فانيليا غنية - عنبر - تونكا',
            'الرائحة: فانيليا فاخرة رجولية',
            'الثبات: ممتاز وفاخر'
        ],
        originalPrice: '350 جنيه',
        salePrice: '249 جنيه',
        offers: [
            'عرض خاص: خصم 30% على الزجاجة الأولى',
            'عرض التوصيل المجاني لجميع المحافظات'
        ]
    },
    black_xs: {
        title: 'Black XS',
        description: 'عطر خشبي أروماتيك رجالي مع لمسة داكنة وجذابة',
        image: 'images/black_xs.jpg',
        details: [
            'النوع: خشبي أروماتيك رجالي',
            'المقدمة: ليمون - القرفة',
            'القلب: التوليب الأسود - البخور - البراالين',
            'القاعدة: أخشاب داكنة - العنبر',
            'الرائحة: حلوة داكنة - شبابية',
            'الثبات: جيد جدًا'
        ],
        originalPrice: '350 جنيه',
        salePrice: '249 جنيه',
        offers: [
            'عرض خاص: خصم 30% على الزجاجة الأولى',
            'عرض التوصيل المجاني لجميع المحافظات'
        ]
    },
    sauvage: {
        title: 'Sauvage',
        description: 'عطر أروماتيك فريش رجالي مع لمسة منعشة وقوية',
        image: 'images/sauvage.jpg',
        details: [
            'النوع: أروماتيك فريش رجالي',
            'المقدمة: البرغموت',
            'القلب: فلفل - لافندر',
            'القاعدة: أمبروكسان - باتشولي - أخشاب',
            'الرائحة: قوية، ذكورية، منعشة',
            'الثبات: ممتاز جدًا'
        ],
        originalPrice: '350 جنيه',
        salePrice: '249 جنيه',
        offers: [
            'عرض خاص: خصم 30% على الزجاجة الأولى',
            'عرض التوصيل المجاني لجميع المحافظات'
        ]
    },
    one_million: {
        title: 'One Million',
        description: 'عطر أروماتيك سبايسي حلو رجالي مع لمسة جذابة',
        image: 'images/one_million.jpg',
        details: [
            'النوع: أروماتيك سبايسي حلو رجالي',
            'المقدمة: ماندارين - نعناع',
            'القلب: القرفة - الورد',
            'القاعدة: عنبر - جلد - أخشاب',
            'الرائحة: حلوة جذابة',
            'الثبات: قوي جدًا'
        ],
        originalPrice: '350 جنيه',
        salePrice: '249 جنيه',
        offers: [
            'عرض خاص: خصم 30% على الزجاجة الأولى',
            'عرض التوصيل المجاني لجميع المحافظات'
        ]
    },
    ultra_male: {
        title: 'Ultra Male',
        description: 'عطر فواكه أروماتيك رجالي مع لمسة شبابية',
        image: 'images/ultra_male.jpg',
        details: [
            'النوع: فواكه أروماتيك رجالي',
            'المقدمة: كمثرى - لافندر - نعناع',
            'القلب: قرفة - كمون',
            'القاعدة: فانيليا - أخشاب - العنبر',
            'الرائحة: جذابة شبابية',
            'الثبات: ممتاز'
        ],
        originalPrice: '350 جنيه',
        salePrice: '249 جنيه',
        offers: [
            'عرض خاص: خصم 30% على الزجاجة الأولى',
            'عرض التوصيل المجاني لجميع المحافظات'
        ]
    },
    good_girl: {
        title: 'Good Girl',
        description: 'عطر شرقي زهري نسائي مع لمسة مثيرة',
        image: 'images/good_girl.jpg',
        details: [
            'النوع: شرقي زهري نسائي',
            'المقدمة: قهوة - لوز - برغموت',
            'القلب: ياسمين - مسك الروم',
            'القاعدة: فانيليا - خشب الصندل - كاكاو',
            'الرائحة: قوية، أنثوية، مثيرة',
            'الثبات: ممتاز جدًا'
        ],
        originalPrice: '350 جنيه',
        salePrice: '249 جنيه',
        offers: [
            'عرض خاص: خصم 30% على الزجاجة الأولى',
            'عرض التوصيل المجاني لجميع المحافظات'
        ]
    },
    burberry_her: {
        title: 'Burberry Her',
        description: 'عطر فاكهي زهري غورماند نسائي مع لمسة جذابة',
        image: 'images/burberry_her.jpg',
        details: [
            'النوع: فاكهي زهري غورماند نسائي',
            'المقدمة: فراولة - توت - كشمش أسود',
            'القلب: البنفسج - الياسمين',
            'القاعدة: مسك - عنبر - فانيليا - أخشاب',
            'الرائحة: فاكهية حلوة جذابة',
            'الثبات: جيد جدًا إلى ممتاز'
        ],
        originalPrice: '350 جنيه',
        salePrice: '249 جنيه',
        offers: [
            'عرض خاص: خصم 30% على الزجاجة الأولى',
            'عرض التوصيل المجاني لجميع المحافظات'
        ]
    },
    musk_al_roman: {
        title: 'Musk Al Roman',
        description: 'عطر فاكهي مسكي للجنسين مع لمسة دافئة',
        image: 'images/musk_al_roman.jpg',
        details: [
            'النوع: فاكهي مسكي للجنسين',
            'المقدمة: رمان - كرز - توت - نعناع',
            'القلب: عنب - ورد - توابل خفيفة',
            'القاعدة: مسك - فانيليا - عسل - باتشولي',
            'الرائحة: فاكهية دافئة',
            'الثبات: جيد جدًا'
        ],
        originalPrice: '350 جنيه',
        salePrice: '249 جنيه',
        offers: [
            'عرض خاص: خصم 30% على الزجاجة الأولى',
            'عرض التوصيل المجاني لجميع المحافظات'
        ]
    },
    yara: {
        title: 'Yara',
        description: 'عطر فاكهي زهري نسائي مع لمسة ناعمة',
        image: 'images/yara.jpg',
        details: [
            'النوع: فاكهي زهري نسائي',
            'المقدمة: أوركيد - ماندرين - زهور',
            'القلب: جوز الهند - مسك',
            'القاعدة: فانيليا - خشب الصندل - مسك',
            'الرائحة: حلوة، ناعمة، أنثوية',
            'الثبات: جيد جدًا'
        ],
        originalPrice: '350 جنيه',
        salePrice: '249 جنيه',
        offers: [
            'عرض خاص: خصم 30% على الزجاجة الأولى',
            'عرض التوصيل المجاني لجميع المحافظات'
        ]
    },
    si: {
        title: 'Si',
        description: 'عطر فواكه زهري نسائي مع لمسة أنيقة',
        image: 'images/si.jpg',
        details: [
            'النوع: فواكه زهري نسائي',
            'المقدمة: الكشمش الأسود',
            'القلب: ورد - فريزيا',
            'القاعدة: فانيليا - باتشولي - أخشاب',
            'الرائحة: ناعمة أنثوية - أنيقة',
            'الثبات: متوسط إلى قوي'
        ],
        originalPrice: '350 جنيه',
        salePrice: '249 جنيه',
        offers: [
            'عرض خاص: خصم 30% على الزجاجة الأولى',
            'عرض التوصيل المجاني لجميع المحافظات'
        ]
    }
};

// Open Modal with Product Data
document.querySelectorAll('.product-btn').forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.getAttribute('data-product');
        const product = products[productId];
        
        modalTitle.textContent = product.title;
        modalDescription.textContent = product.description;
        modalImage.src = product.image;
        modalOriginalPrice.textContent = product.originalPrice;
        modalSalePrice.textContent = product.salePrice;
        
        // Clear previous details
        modalDetails.innerHTML = '';
        modalOffersInfo.innerHTML = '';
        
        // Add product details
        product.details.forEach(detail => {
            const li = document.createElement('li');
            li.textContent = detail;
            modalDetails.appendChild(li);
        });
        
        // Add offers if available
        if (product.offers && product.offers.length > 0) {
            const offersTitle = document.createElement('h4');
            offersTitle.textContent = 'العروض المتاحة:';
            modalOffersInfo.appendChild(offersTitle);
            
            const offersList = document.createElement('ul');
            product.offers.forEach(offer => {
                const li = document.createElement('li');
                li.textContent = offer;
                offersList.appendChild(li);
            });
            modalOffersInfo.appendChild(offersList);
        }
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Close Modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close Modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// CTA Button Click Handler
document.querySelector('.cta-button').addEventListener('click', () => {
    document.querySelector('#products').scrollIntoView({
        behavior: 'smooth'
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
