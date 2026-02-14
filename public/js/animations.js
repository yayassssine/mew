/**
 * Forever Valentine — Scroll Animations & General Interactions
 */

(function() {
    'use strict';

    // ---- Scroll Reveal Observer ----
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay based on data attribute or index
                const delay = entry.target.dataset.delay || (index * 100);
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all scroll-reveal elements
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // ---- Navbar scroll effect ----
    let lastScroll = 0;
    const navbar = document.querySelector('.valentine-nav');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ---- Smooth page transitions ----
    document.querySelectorAll('a[href^="/"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't interfere with special links
            if (this.getAttribute('target') === '_blank') return;

            // Add a subtle fade effect
            document.body.style.opacity = '0.95';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 300);
        });
    });

    // ---- Active nav link highlighting ----
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.style.color = '#e91e63';
            link.style.fontWeight = '600';
        }
    });

    // ---- Parallax effect on hero section ----
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            heroSection.style.backgroundPositionY = rate + 'px';
        });
    }

    // ---- Cursor trail effect (subtle) ----
    let mouseTimeout;
    document.addEventListener('mousemove', (e) => {
        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(() => {
            if (Math.random() > 0.85) { // Only occasionally create trail
                createCursorHeart(e.pageX, e.pageY);
            }
        }, 50);
    });

    function createCursorHeart(x, y) {
        const heart = document.createElement('span');
        heart.innerHTML = '♥';
        heart.style.position = 'absolute';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.fontSize = (Math.random() * 10 + 8) + 'px';
        heart.style.color = ['#f06292', '#f8bbd0', '#e91e63', '#d4a574'][Math.floor(Math.random() * 4)];
        heart.style.zIndex = '9998';
        heart.style.transition = 'all 1.5s ease-out';
        heart.style.opacity = '0.7';

        document.body.appendChild(heart);

        requestAnimationFrame(() => {
            heart.style.transform = `translateY(-${Math.random() * 60 + 30}px) rotate(${Math.random() * 40 - 20}deg)`;
            heart.style.opacity = '0';
        });

        setTimeout(() => heart.remove(), 1500);
    }

})();
