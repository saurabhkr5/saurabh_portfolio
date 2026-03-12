import { useEffect } from 'react';

const SYMBOLS = ['{ }', '< >', '( )', '</>', '[ ]', '=>'];
const COLORS = ['text-cyan-400', 'text-purple-400'];

export default function CursorEffect() {
  useEffect(() => {
    // Disable on mobile/touch devices for performance
    if (window.innerWidth < 768 || 'ontouchstart' in window) return;

    let particles = [];
    let lastSpawnTime = 0;
    
    // Create cursor glow element
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);

    // To use requestAnimationFrame for the glow to make it ultra smooth
    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;
    let animationFrameId;

    const animateGlow = () => {
      // Smooth interpolation for the glow (lag effect)
      glowX += (mouseX - glowX) * 0.15;
      glowY += (mouseY - glowY) * 0.15;
      
      cursorGlow.style.transform = `translate(${glowX - 150}px, ${glowY - 150}px)`; // 150px is half of width/height
      animationFrameId = requestAnimationFrame(animateGlow);
    };
    animateGlow();

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const now = Date.now();
      // Throttle spawning to limit DOM nodes (max 8-10 particles on screen)
      if (now - lastSpawnTime > 80) {
        spawnParticle(e.clientX, e.clientY);
        lastSpawnTime = now;
      }
    };

    const spawnParticle = (x, y) => {
      if (particles.length >= 10) return;
      
      const particle = document.createElement('div');
      const colorClass = COLORS[Math.floor(Math.random() * COLORS.length)];
      particle.className = `cursor-particle ${colorClass}`;
      particle.innerText = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      
      // Random rotation and offset
      const angle = Math.random() * 360;
      particle.style.setProperty('--target-y', `${-30 - Math.random() * 40}px`);
      particle.style.setProperty('--target-x', `${(Math.random() - 0.5) * 50}px`);
      particle.style.setProperty('--initial-rot', `${angle}deg`);
      particle.style.setProperty('--target-rot', `${angle + (Math.random() - 0.5) * 120}deg`);
      
      // Initial position
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      
      document.body.appendChild(particle);
      particles.push(particle);
      
      // Remove after animation (matches CSS duration 800ms)
      setTimeout(() => {
        if (document.body.contains(particle)) {
          particle.remove();
        }
        particles = particles.filter(p => p !== particle);
      }, 800);
    };

    const isMagnetic = (target) => {
      if (!target || !target.closest) return null;
      return target.closest('button, a.btn-glow, a.glass-hover');
    };

    const mouseMoveHandler = (e) => {
      onMouseMove(e);

      // Magnetic pull logic
      const btn = isMagnetic(e.target);
      if (btn) {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      }
    };

    const mouseOutHandler = (e) => {
      const btn = isMagnetic(e.target);
      if (btn && !btn.contains(e.relatedTarget)) {
        btn.style.transform = '';
      }
    };

    window.addEventListener('mousemove', mouseMoveHandler, { passive: true });
    window.addEventListener('mouseout', mouseOutHandler, { passive: true });

    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('mouseout', mouseOutHandler);
      cancelAnimationFrame(animationFrameId);
      if (document.body.contains(cursorGlow)) {
        cursorGlow.remove();
      }
      particles.forEach(p => {
        if (document.body.contains(p)) p.remove();
      });
      // Safety reset transforms
      document.querySelectorAll('button, a.btn-glow, a.glass-hover').forEach(btn => {
        btn.style.transform = '';
      });
    };
  }, []);

  return null;
}
