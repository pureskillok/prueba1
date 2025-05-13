/**
 * PureSkill League F1 - Animations JavaScript
 * Enhances the site with interactive animations and visual effects
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initializeParallaxEffect();
    initializeSpeedLines();
    createTrackingLines();
    initializeHoverEffects();
    initializeTypingEffect();
    initializeScrollReveal();
});

/**
 * Create a parallax effect on elements
 */
function initializeParallaxEffect() {
    // Elements that will have parallax effect
    const parallaxElements = document.querySelectorAll('.hero, .page-banner, .circuit-lines');
    
    window.addEventListener('mousemove', function(e) {
        // Get mouse position as a percentage of the window
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Apply transform to parallax elements based on mouse position
        parallaxElements.forEach(element => {
            // Different elements can have different intensities
            const intensity = element.classList.contains('hero') ? 30 : 15;
            
            // Calculate transform based on mouse position and intensity
            const translateX = (mouseX - 0.5) * intensity;
            const translateY = (mouseY - 0.5) * intensity;
            
            // Apply transform
            element.style.transform = `translate(${translateX}px, ${translateY}px)`;
        });
    });
    
    // Reset transforms when mouse leaves the window
    document.addEventListener('mouseleave', function() {
        parallaxElements.forEach(element => {
            element.style.transform = 'translate(0, 0)';
        });
    });
}

/**
 * Create dynamic speed lines to enhance the racing feel
 */
function initializeSpeedLines() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Create speed lines container if it doesn't exist
    let speedLinesContainer = document.querySelector('.dynamic-speed-lines');
    if (!speedLinesContainer) {
        speedLinesContainer = document.createElement('div');
        speedLinesContainer.className = 'dynamic-speed-lines';
        speedLinesContainer.style.position = 'absolute';
        speedLinesContainer.style.top = '0';
        speedLinesContainer.style.left = '0';
        speedLinesContainer.style.width = '100%';
        speedLinesContainer.style.height = '100%';
        speedLinesContainer.style.overflow = 'hidden';
        speedLinesContainer.style.pointerEvents = 'none';
        speedLinesContainer.style.zIndex = '1';
        hero.appendChild(speedLinesContainer);
    }
    
    // Create a number of speed lines
    const numLines = 15;
    for (let i = 0; i < numLines; i++) {
        createSpeedLine(speedLinesContainer);
    }
}

/**
 * Create a single speed line element
 * @param {HTMLElement} container - Container to append speed line to
 */
function createSpeedLine(container) {
    // Create speed line element
    const line = document.createElement('div');
    line.className = 'speed-line';
    
    // Randomize properties
    const height = Math.random() * 1 + 1; // 1-2px
    const width = Math.random() * 100 + 100; // 100-200px
    const top = Math.random() * 100; // 0-100%
    const delay = Math.random() * 2; // 0-2s
    const duration = Math.random() * 2 + 1; // 1-3s
    const color = Math.random() > 0.7 ? 'rgba(255, 0, 255, 0.1)' : 'rgba(0, 255, 255, 0.1)';
    
    // Set style properties
    line.style.position = 'absolute';
    line.style.height = `${height}px`;
    line.style.width = `${width}px`;
    line.style.top = `${top}%`;
    line.style.right = '-100px';
    line.style.backgroundColor = color;
    line.style.transform = 'skewX(-30deg)';
    line.style.animationDelay = `${delay}s`;
    line.style.animation = `speedLine ${duration}s linear infinite`;
    
    // Add keyframes if not already defined
    if (!document.querySelector('#speed-line-keyframes')) {
        const style = document.createElement('style');
        style.id = 'speed-line-keyframes';
        style.innerHTML = `
            @keyframes speedLine {
                0% {
                    transform: translateX(0) skewX(-30deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateX(-${window.innerWidth + 100}px) skewX(-30deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to container
    container.appendChild(line);
    
    // Replace the speed line when animation completes
    setTimeout(() => {
        container.removeChild(line);
        createSpeedLine(container);
    }, duration * 1000);
}

/**
 * Create animated tracking lines for racing aesthetic
 */
function createTrackingLines() {
    const sections = document.querySelectorAll('.hero, .page-banner, .next-race-section, .features-section');
    
    sections.forEach((section, index) => {
        // Create multiple tracking lines for each section
        for (let i = 0; i < 3; i++) {
            const trackingLine = document.createElement('div');
            trackingLine.className = 'tracking-line';
            
            // Randomize position and delay
            const top = 20 + (i * 30); // Distribute at 20%, 50%, 80%
            const delay = i * 0.5 + (index * 0.2); // Stagger delays
            
            trackingLine.style.top = `${top}%`;
            trackingLine.style.animationDelay = `${delay}s`;
            
            section.appendChild(trackingLine);
        }
    });
}

/**
 * Initialize hover effects for interactive elements
 */
function initializeHoverEffects() {
    // Elements that will have glow effect on hover
    const glowElements = document.querySelectorAll('.btn, .team-card, .feature-card, .race-card');
    
    glowElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            // Create glow effect
            element.style.transition = 'all 0.3s ease';
            
            if (element.classList.contains('btn')) {
                element.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.6), 0 0 30px rgba(0, 255, 255, 0.3)';
            } else {
                element.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 255, 255, 0.3)';
                element.style.transform = 'translateY(-5px)';
                
                // Add border glow
                element.style.borderColor = 'var(--primary)';
            }
        });
        
        element.addEventListener('mouseleave', function() {
            // Remove glow effect
            if (element.classList.contains('btn')) {
                element.style.boxShadow = '';
            } else {
                element.style.boxShadow = '';
                element.style.transform = '';
                element.style.borderColor = '';
            }
        });
    });
    
    // Card flip effect for team cards
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
            this.style.transform = 'scale(1.02) translateY(-5px)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
            this.style.transform = '';
        });
    });
}

/**
 * Initialize typing effect for elements
 */
function initializeTypingEffect() {
    const typingElements = document.querySelectorAll('.hero-subtitle, .banner-content p');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        // Create a wrapper with typing animation
        const wrapper = document.createElement('div');
        wrapper.className = 'typing-wrapper';
        wrapper.style.display = 'inline-block';
        wrapper.style.overflow = 'hidden';
        wrapper.style.borderRight = '0.15em solid var(--primary)';
        wrapper.style.whiteSpace = 'nowrap';
        wrapper.style.margin = '0 auto';
        wrapper.style.animation = 'typing 3.5s steps(40, end), blink-caret .75s step-end infinite';
        
        wrapper.textContent = text;
        element.appendChild(wrapper);
        
        // Remove the typing animation after it completes
        setTimeout(() => {
            wrapper.style.animation = '';
            wrapper.style.borderRight = 'none';
        }, 3500);
    });
}

/**
 * Initialize scroll reveal animations
 */
function initializeScrollReveal() {
    const elements = document.querySelectorAll(
        '.news-card, .feature-card, .race-card, .team-card, ' +
        '.format-card, .regulation-card, .info-card, ' +
        '.contact-card, .social-platform, .accordion-item'
    );
    
    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-view');
                
                // Add sequential animation for child elements if needed
                const children = entry.target.querySelectorAll('h3, p, .btn, .info-icon, .feature-icon');
                children.forEach((child, index) => {
                    child.style.opacity = '0';
                    child.style.animation = `fadeIn 0.5s forwards ${index * 0.1}s`;
                });
                
                // Unobserve after animation is applied
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe each element
    elements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Enhance page transitions when navigating between pages
 */
document.addEventListener('click', function(e) {
    // Only handle clicks on links to other pages in the site
    const link = e.target.closest('a');
    if (link && 
        link.href && 
        link.hostname === window.location.hostname &&
        !link.hasAttribute('target') &&
        !e.ctrlKey && !e.metaKey) {
        
        e.preventDefault();
        
        // Fade out current page
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        
        // Navigate to new page after animation
        setTimeout(() => {
            window.location.href = link.href;
        }, 300);
    }
});

// Add fade-in effect when page loads
window.addEventListener('pageshow', function(e) {
    if (e.persisted) {
        // If page is loaded from cache (back button)
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 10);
    } else {
        // Normal page load
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.3s ease';
    }
});
