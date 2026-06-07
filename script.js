// 1. SCROLL PROGRESS BAR
window.addEventListener('scroll', () => {
    const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPosition = document.documentElement.scrollTop;
    const scrollPercentage = (scrollPosition / scrollTotal) * 100;
    document.getElementById('scroll-progress').style.width = scrollPercentage + '%';
});

// 2. NAVBAR SCROLL EFEKTİ
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 3. FARE NEON PARLAMASI
const cursorGlow = document.querySelector('.cursor-glow');
window.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// 4. HACKER YAZI EFEKTİ
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const hackerTexts = document.querySelectorAll('.hacker-text');

hackerTexts.forEach(text => {
    text.onmouseover = event => {
        let iterations = 0;
        const interval = setInterval(() => {
            event.target.innerText = event.target.innerText.split("")
                .map((letter, index) => {
                    if(index < iterations) {
                        return event.target.dataset.value[index];
                    }
                    return letters[Math.floor(Math.random() * 26)];
                })
                .join("");
            
            if(iterations >= event.target.dataset.value.length) {
                clearInterval(interval);
            }
            iterations += 1 / 3;
        }, 30);
    }
});

// 5. PARALLAX EFEKTİ (Hikayemiz)
const parallaxBox = document.querySelector('.parallax-box');
if (parallaxBox) {
    window.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth - e.pageX * 2) / 90;
        const y = (window.innerHeight - e.pageY * 2) / 90;
        parallaxBox.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
}

// 6. 3D TILT EFEKTİ
const tiltCards = document.querySelectorAll('.tilt-card');
tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -12;
        const rotateY = ((x - centerX) / centerX) * 12;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        card.style.transition = "transform 0.5s ease";
    });
    
    card.addEventListener('mouseenter', () => {
        card.style.transition = "none";
    });
});

// 7. SCROLL REVEAL
const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

reveals.forEach(reveal => observer.observe(reveal));

// 8. SİBER ÜRÜN ARAMA MOTORU LOGİĞİ
const searchInput = document.getElementById('productSearch');
const productCards = document.querySelectorAll('.product-card');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        productCards.forEach(card => {
            const id = card.getAttribute('data-id').toLowerCase();
            const name = card.getAttribute('data-name').toLowerCase();
            
            if (id.includes(searchTerm) || name.includes(searchTerm)) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
}

// 9. KIYAFET OK SLIDER LOGİĞİ
productCards.forEach(card => {
    const nextBtn = card.querySelector('.next-btn');
    const prevBtn = card.querySelector('.prev-btn');
    const images = card.querySelectorAll('.slider-images img');
    let currentIndex = 0;

    if (nextBtn && prevBtn && images.length > 0) {
        const changeImage = (index) => {
            images[currentIndex].classList.remove('active');
            currentIndex = (index + images.length) % images.length;
            images[currentIndex].classList.add('active');
        };

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            changeImage(currentIndex + 1);
        });

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            changeImage(currentIndex - 1);
        });
    }
});

// 10. İLETİŞİM FORMU ANİMASYONU
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

if(contactForm && submitBtn) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const originalText = submitBtn.innerText;
        submitBtn.innerText = "SİSTEME İŞLENİYOR...";
        
        setTimeout(() => {
            submitBtn.innerText = "MESAJ İLETİLDİ ✔";
            submitBtn.style.background = "#ff003c";
            
            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.style.background = "transparent";
            }, 3000);
        }, 1500);
    });
}

// 11. SMART THEME TOGGLE (TEMA DEĞİŞTİRİCİ)
const themeToggleBtn = document.getElementById('theme-toggle');
const toggleIcon = document.querySelector('.toggle-icon');

// Sayfa yüklendiğinde kullanıcının eski tercihini kontrol et
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
    if (toggleIcon) toggleIcon.innerText = "☀️";
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        // Duruma göre ikon ve yerel hafızayı güncelle
        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            if (toggleIcon) toggleIcon.innerText = "☀️";
        } else {
            localStorage.setItem('theme', 'dark');
            if (toggleIcon) toggleIcon.innerText = "🌙";
        }
    });
}

// --- ÜRÜN GÖRSEL SLIDER (OKLAR VE 15 SANİYE OTOMATİK GEÇİŞ) ---

// Sayfadaki tüm ürün slider'larını bul
const productSliders = document.querySelectorAll('.product-slider');

productSliders.forEach(slider => {
    const images = slider.querySelectorAll('.slider-images img');
    const prevBtn = slider.querySelector('.prev-btn');
    const nextBtn = slider.querySelector('.next-btn');
    
    let currentIndex = 0;
    let autoSlideTimer; // Otomatik geçiş sayacı

    // Belirli bir index'teki resmi gösterme fonksiyonu
    function showImage(index) {
        // Tüm resimlerden 'active' sınıfını kaldır
        images.forEach(img => img.classList.remove('active'));
        
        // Sona geldiyse başa dön, baştaysa sona git
        if (index >= images.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = images.length - 1;
        } else {
            currentIndex = index;
        }
        
        // Yeni resme 'active' sınıfını ekle
        images[currentIndex].classList.add('active');
    }

    // Sonraki resme geçme fonksiyonu
    function nextImage() {
        showImage(currentIndex + 1);
    }

    // Önceki resme geçme fonksiyonu
    function prevImage() {
        showImage(currentIndex - 1);
    }

    // Zamanlayıcıyı başlatma fonksiyonu (15 saniye = 15000 milisaniye)
    function startAutoSlide() {
        autoSlideTimer = setInterval(nextImage, 15000);
    }

    // Kullanıcı oklara basarsa zamanlayıcıyı sıfırla ki çakışma olmasın
    function resetAutoSlide() {
        clearInterval(autoSlideTimer);
        startAutoSlide();
    }

    // Ok Butonlarına Tıklama Olayları
    nextBtn.addEventListener('click', () => {
        nextImage();
        resetAutoSlide(); // Oku tıklayınca 15 saniye sayacını baştan başlat
    });

    prevBtn.addEventListener('click', () => {
        prevImage();
        resetAutoSlide(); // Oku tıklayınca 15 saniye sayacını baştan başlat
    });

    // Sayfa yüklendiğinde otomatik geçişi başlat
    startAutoSlide();
});