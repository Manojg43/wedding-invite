/**
 * Romantic Effects Particle System
 * Spawns hearts or petals that float upwards.
 */

export const effects = (() => {
    let container = null;
    let interval = null;

    const createParticle = (type = 'heart') => {
        if (!container) return;

        const particle = document.createElement('div');
        particle.className = `particle particle-${type} sway-${Math.floor(Math.random() * 2) + 1}`;
        
        // Randomize starting position
        particle.style.left = `${Math.random() * 100}vw`;
        
        // Randomize size slightly
        const size = Math.random() * (25 - 10) + 10;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Randomize duration
        const duration = Math.random() * (12 - 6) + 6;
        particle.style.animationDuration = `${duration}s`;
        
        container.appendChild(particle);

        // Remove particle after animation ends to save memory
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    };

    const init = (config = { enabled: true, type: 'heart', density: 1000 }) => {
        if (!config.enabled) {
            stop();
            return;
        }

        // Create container if it doesn't exist
        if (!container) {
            container = document.createElement('div');
            container.className = 'particle-container';
            document.body.appendChild(container);
            
            // Link CSS if not already linked
            if (!document.querySelector('link[href*="effects.css"]')) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = './css/effects.css';
                document.head.appendChild(link);
            }
        }

        // Start spawning
        if (!interval) {
            interval = setInterval(() => createParticle(config.type), config.density || 1000);
        }
    };

    const stop = () => {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
        if (container) {
            container.remove();
            container = null;
        }
    };

    return {
        init,
        stop
    };
})();
