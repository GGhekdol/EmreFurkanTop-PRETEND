// 1. SCROLL PROGRESS BAR (Üstteki İlerleme Çubuğu)
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

// 4. HACKER YAZI EFEKTİ (Ana Başlık İçin)
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const hackerText = document.querySelector('.hacker-text');

hackerText.onmouseover = event => {
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

// 5. PARALLAX EFEKTİ (Hikayemiz Görseli İçin)
const parallaxBox = document.querySelector('.parallax-box');
window.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth - e.pageX * 2) / 90;
    const y = (window.innerHeight - e.pageY * 2) / 90;
    parallaxBox.style.transform = `translateX(${x}px) translateY(${y}px)`;
});

// 6. 3D TILT EFEKTİ (Özellik Kartları İçin)
const tiltCards = document.querySelectorAll('.tilt-card');
tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        card.style.transition = "transform 0.5s ease";
    });
    
    card.addEventListener('mouseenter', () => {
        card.style.transition = "none";
    });
});

// 7. SCROLL REVEAL (Aşağı Kaydıkça Ekrana Giren Elemanlar)
const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

reveals.forEach(reveal => observer.observe(reveal));

// 8. İLETİŞİM FORMU (Hacker Stili Gönderim Animasyonu)
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Sayfanın yenilenmesini engeller
        
        // Buton animasyonu
        const originalText = submitBtn.innerText;
        submitBtn.innerText = "SİSTEME İŞLENİYOR...";
        submitBtn.style.borderColor = "#fff";
        submitBtn.style.color = "#fff";
        submitBtn.style.boxShadow = "none";
        
        // Sahte bir yükleme süresi (2 saniye)
        setTimeout(() => {
            submitBtn.innerText = "MESAJ İLETİLDİ ✔";
            submitBtn.style.background = "#ff003c";
            submitBtn.style.color = "#fff";
            
            // 3 saniye sonra formu sıfırla
            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.style.background = "transparent";
                submitBtn.style.color = "#ff003c";
                submitBtn.style.borderColor = "#ff003c";
            }, 3000);
            
        }, 1500);
    });
}