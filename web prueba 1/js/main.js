/**
 * PureSkill League F1 - Main JavaScript
 * Core functionality for the site
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initializeCountdown();
    initializeFilters();
    initializeTabs();
    initializeRulesTabs();
    initializeAccordion();
    addScrollEffects();
    
    // Mobile menu functionality
    const navToggle = document.getElementById('nav-toggle');
    if (navToggle) {
        navToggle.addEventListener('change', function() {
            document.body.classList.toggle('menu-open', this.checked);
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const menu = document.querySelector('.nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (menu && navToggle && navToggle.checked) {
            const isClickInside = menu.contains(event.target) || event.target.closest('.nav-toggle-label');
            
            if (!isClickInside) {
                navToggle.checked = false;
                document.body.classList.remove('menu-open');
            }
        }
    });
    
    // Close modal functionality
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal, #close-modal, #contact-close-modal');
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
        });
    });
    
    // Close modals on outside click
    modals.forEach(modal => {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Escape key to close modals
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });
});

/**
 * Initialize countdown timer for next race
 */
function initializeCountdown() {
    const countdownElement = document.getElementById('race-countdown');
    if (!countdownElement) return;
    
    // Set the target date - May 12, 2024 at 20:00 CET
    const targetDate = new Date('2024-05-12T20:00:00+02:00').getTime();
    
    // Update the countdown every second
    const countdownInterval = setInterval(function() {
        // Get current date and time
        const now = new Date().getTime();
        
        // Find the distance between now and the target date
        const distance = targetDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result
        document.querySelector('.countdown-item .days').textContent = days.toString().padStart(2, '0');
        document.querySelector('.countdown-item .hours').textContent = hours.toString().padStart(2, '0');
        document.querySelector('.countdown-item .minutes').textContent = minutes.toString().padStart(2, '0');
        document.querySelector('.countdown-item .seconds').textContent = seconds.toString().padStart(2, '0');
        
        // If the countdown is finished, display a message
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.querySelector('.countdown-item .days').textContent = '00';
            document.querySelector('.countdown-item .hours').textContent = '00';
            document.querySelector('.countdown-item .minutes').textContent = '00';
            document.querySelector('.countdown-item .seconds').textContent = '00';
            
            // Add a "Race in progress" or "Race completed" message if needed
            const countdownTitle = document.querySelector('.countdown-title');
            if (countdownTitle) {
                countdownTitle.textContent = 'Race in progress!';
                countdownTitle.classList.add('neon-flicker');
            }
        }
    }, 1000);
}

/**
 * Initialize filter buttons for calendar
 */
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            
            // Filter race cards
            const raceCards = document.querySelectorAll('.race-card');
            
            raceCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    const status = card.getAttribute('data-status');
                    card.style.display = status === filter ? 'block' : 'none';
                }
            });
            
            // Add animation to visible cards
            setTimeout(() => {
                document.querySelectorAll('.race-card[style="display: block;"]').forEach((card, index) => {
                    card.style.animationDelay = `${index * 0.05}s`;
                    card.style.animation = 'fadeIn 0.5s forwards';
                });
            }, 10);
        });
    });
}

/**
 * Initialize tabs for championships
 */
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    if (tabButtons.length === 0) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get tab target
            const target = this.getAttribute('data-tab');
            
            // Hide all tab panels
            document.querySelectorAll('.tab-panel').forEach(panel => {
                panel.classList.remove('active');
            });
            
            // Show target tab panel
            document.getElementById(`${target}-panel`).classList.add('active');
        });
    });
}

/**
 * Initialize tabs for rules page
 */
function initializeRulesTabs() {
    const rulesNavItems = document.querySelectorAll('.rules-nav-item');
    if (rulesNavItems.length === 0) return;
    
    rulesNavItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            rulesNavItems.forEach(navItem => navItem.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get target panel
            const target = this.getAttribute('data-target');
            
            // Hide all panels
            document.querySelectorAll('.rules-panel').forEach(panel => {
                panel.classList.remove('active');
            });
            
            // Show target panel
            document.getElementById(`${target}-panel`).classList.add('active');
        });
    });
}

/**
 * Initialize accordion for FAQ
 */
function initializeAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    if (accordionItems.length === 0) return;
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', function() {
            // Toggle active class on clicked item
            item.classList.toggle('active');
            
            // Optional: close other accordion items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
}

/**
 * Add scroll effects to elements
 */
function addScrollEffects() {
    // Get all elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.feature-card, .news-card, .race-card, .format-card, .team-card, .regulation-card, .info-card, .contact-card, .social-platform');
    
    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Add animation class when element is in viewport
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                // Unobserve after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // observe relative to viewport
        threshold: 0.1, // trigger when 10% of the element is visible
        rootMargin: '0px' // no margin
    });
    
    // Observe each element
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Generate a random reference number
 * @returns {string} Random reference number
 */
function generateReferenceNumber() {
    const prefix = 'PSL';
    const timestamp = new Date().getTime().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${timestamp}-${random}`;
}
