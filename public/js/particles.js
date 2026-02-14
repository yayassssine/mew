/**
 * Forever Valentine — Floating Particles System
 * Elegant glowing particles that float in the background
 */

(function() {
    'use strict';

    const container = document.getElementById('particles-container');
    if (!container) return;

    const PARTICLE_COUNT = 35;
    const colors = [
        'rgba(233, 30, 99, 0.15)',   // Pink
        'rgba(240, 98, 146, 0.12)',   // Light pink
        'rgba(248, 187, 208, 0.18)',  // Soft pink
        'rgba(212, 165, 116, 0.12)',  // Champagne
        'rgba(212, 175, 55, 0.08)',   // Gold
        'rgba(255, 255, 255, 0.2)',   // White glow
    ];

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 8 + 3;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 10;
        const left = Math.random() * 100;

        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = left + '%';
        particle.style.background = color;
        particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';

        container.appendChild(particle);
    }

    // Create initial particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        createParticle();
    }

    // Create floating heart particles occasionally
    function createHeartParticle() {
        const heart = document.createElement('div');
        heart.innerHTML = '♥';
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 12 + 8) + 'px';
        heart.style.color = colors[Math.floor(Math.random() * 3)];
        heart.style.pointerEvents = 'none';
        heart.style.opacity = '0';
        heart.style.animation = `floatParticle ${Math.random() * 20 + 15}s linear ${Math.random() * 5}s infinite`;

        container.appendChild(heart);
    }

    // Add a few floating hearts
    for (let i = 0; i < 8; i++) {
        createHeartParticle();
    }
})();
