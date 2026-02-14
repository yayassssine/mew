/**
 * Forever Valentine — Confetti & Fireworks System
 * Triggers beautiful confetti when the answer is YES!
 */

function launchConfetti(canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiPieces = [];
    const colors = [
        '#e91e63', '#f06292', '#f8bbd0', '#c2185b',  // Pinks
        '#d4af37', '#f0d68a', '#d4a574',              // Golds
        '#ffffff', '#fff5f5',                           // Whites
        '#ff6b6b', '#ee5a24', '#f39c12',              // Warm accents
    ];

    const shapes = ['circle', 'rect', 'heart'];

    class ConfettiPiece {
        constructor() {
            this.reset();
            this.y = Math.random() * -canvas.height;
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -20;
            this.size = Math.random() * 8 + 4;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.shape = shapes[Math.floor(Math.random() * shapes.length)];
            this.speedY = Math.random() * 3 + 2;
            this.speedX = Math.random() * 4 - 2;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
            this.opacity = Math.random() * 0.6 + 0.4;
            this.wobble = Math.random() * 10;
            this.wobbleSpeed = Math.random() * 0.1 + 0.02;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX + Math.sin(this.wobble) * 2;
            this.wobble += this.wobbleSpeed;
            this.rotation += this.rotationSpeed;
            this.opacity -= 0.002;

            if (this.y > canvas.height + 20 || this.opacity <= 0) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;

            if (this.shape === 'circle') {
                ctx.beginPath();
                ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
                ctx.fill();
            } else if (this.shape === 'rect') {
                ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2);
            } else if (this.shape === 'heart') {
                drawHeart(ctx, 0, 0, this.size);
            }

            ctx.restore();
        }
    }

    function drawHeart(ctx, x, y, size) {
        const s = size / 4;
        ctx.beginPath();
        ctx.moveTo(x, y + s);
        ctx.bezierCurveTo(x, y - s, x - 2 * s, y - s, x - 2 * s, y);
        ctx.bezierCurveTo(x - 2 * s, y + s, x, y + 2 * s, x, y + 3 * s);
        ctx.bezierCurveTo(x, y + 2 * s, x + 2 * s, y + s, x + 2 * s, y);
        ctx.bezierCurveTo(x + 2 * s, y - s, x, y - s, x, y + s);
        ctx.fill();
    }

    // Create confetti pieces
    const PIECE_COUNT = 200;
    for (let i = 0; i < PIECE_COUNT; i++) {
        confettiPieces.push(new ConfettiPiece());
    }

    // Initial burst effect
    function createBurst(x, y, count) {
        for (let i = 0; i < count; i++) {
            const piece = new ConfettiPiece();
            piece.x = x;
            piece.y = y;
            piece.speedX = (Math.random() - 0.5) * 15;
            piece.speedY = -(Math.random() * 8 + 4);
            piece.opacity = 1;
            confettiPieces.push(piece);
        }
    }

    // Create multiple bursts
    createBurst(canvas.width * 0.25, canvas.height * 0.5, 40);
    createBurst(canvas.width * 0.5, canvas.height * 0.3, 50);
    createBurst(canvas.width * 0.75, canvas.height * 0.5, 40);

    // Animation loop
    let animationFrame;
    let frameCount = 0;
    const MAX_FRAMES = 600; // ~10 seconds at 60fps

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confettiPieces.forEach(piece => {
            piece.update();
            piece.draw();
        });

        frameCount++;

        if (frameCount < MAX_FRAMES) {
            animationFrame = requestAnimationFrame(animate);
        } else {
            // Fade out remaining confetti
            fadeOut();
        }
    }

    function fadeOut() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let remaining = 0;
        confettiPieces.forEach(piece => {
            piece.opacity -= 0.02;
            if (piece.opacity > 0) {
                piece.update();
                piece.draw();
                remaining++;
            }
        });

        if (remaining > 0) {
            requestAnimationFrame(fadeOut);
        } else {
            canvas.style.display = 'none';
        }
    }

    // Handle resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Start animation
    animate();
}
