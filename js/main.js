/**
 * Main JavaScript file for Landlord Landing Page
 * Handles general functionality, performance optimization, and coordination
 */

class LandlordLandingPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupPerformanceMonitoring();
        this.setupUtilityFunctions();
        this.handleMobileOptimizations();
        this.setupAccessibility();
        this.initializeComponents();
    }

    setupPerformanceMonitoring() {
        // Performance monitoring
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
            
            // Track Core Web Vitals
            this.trackWebVitals();
        });

        // Image lazy loading for future images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });

            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }

    trackWebVitals() {
        // Largest Contentful Paint
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);
        }).observe({entryTypes: ['largest-contentful-paint']});

        // First Input Delay
        new PerformanceObserver((entryList) => {
            const firstInput = entryList.getEntries()[0];
            console.log('FID:', firstInput.processingStart - firstInput.startTime);
        }).observe({entryTypes: ['first-input']});

        // Cumulative Layout Shift
        let clsValue = 0;
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            }
            console.log('CLS:', clsValue);
        }).observe({entryTypes: ['layout-shift']});
    }

    setupUtilityFunctions() {
        // Debounce function for scroll events
        window.debounce = (func, wait, immediate) => {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    timeout = null;
                    if (!immediate) func.apply(this, args);
                };
                const callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(this, args);
            };
        };

        // Throttle function for high-frequency events
        window.throttle = (func, limit) => {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        };

        // Check if element is in viewport
        window.isInViewport = (element) => {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        };
    }

    handleMobileOptimizations() {
        // Mobile-specific optimizations
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            document.body.classList.add('mobile');
            
            // Disable parallax on mobile for better performance
            const parallaxElements = document.querySelectorAll('[data-parallax]');
            parallaxElements.forEach(el => {
                el.style.transform = 'none';
            });

            // Optimize touch interactions
            this.optimizeTouchInteractions();
        }

        // Handle orientation changes
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.recalculateLayout();
            }, 100);
        });

        // Handle resize events
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.recalculateLayout();
            }, 250);
        });
    }

    optimizeTouchInteractions() {
        // Add touch-friendly hover states
        const interactiveElements = document.querySelectorAll('.dashboard-card, .feature-item, .cta-button');
        
        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.classList.add('touched');
            }, {passive: true});
            
            element.addEventListener('touchend', () => {
                setTimeout(() => {
                    element.classList.remove('touched');
                }, 300);
            }, {passive: true});
        });

        // Prevent zoom on double tap for specific elements
        const preventZoomElements = document.querySelectorAll('input, select, textarea');
        preventZoomElements.forEach(element => {
            element.addEventListener('touchstart', (e) => {
                if (e.touches.length > 1) {
                    e.preventDefault();
                }
            }, {passive: false});
        });
    }

    recalculateLayout() {
        // Recalculate any dynamic layouts or animations
        const event = new CustomEvent('layoutRecalculated');
        window.dispatchEvent(event);
    }

    setupAccessibility() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            // Skip to main content
            if (e.key === 'Tab' && e.shiftKey === false && document.activeElement === document.body) {
                const firstFocusable = document.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                if (firstFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }

            // Escape key to close modals (if any)
            if (e.key === 'Escape') {
                const openModals = document.querySelectorAll('.modal.open');
                openModals.forEach(modal => {
                    modal.classList.remove('open');
                });
            }
        });

        // Focus management
        const focusableElements = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.classList.add('keyboard-focus');
            });
            
            element.addEventListener('blur', () => {
                element.classList.remove('keyboard-focus');
            });

            element.addEventListener('mousedown', () => {
                element.classList.remove('keyboard-focus');
            });
        });

        // ARIA live region for dynamic content
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        document.body.appendChild(liveRegion);

        window.announceToScreenReader = (message) => {
            liveRegion.textContent = message;
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        };

        // Add screen reader only styles
        const style = document.createElement('style');
        style.textContent = `
            .sr-only {
                position: absolute;
                width: 1px;
                height: 1px;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip: rect(0, 0, 0, 0);
                white-space: nowrap;
                border: 0;
            }
            
            .keyboard-focus {
                outline: 2px solid #00d4ff !important;
                outline-offset: 2px !important;
            }
            
            .touched {
                transform: scale(0.98);
                transition: transform 0.1s ease;
            }
        `;
        document.head.appendChild(style);
    }

    initializeComponents() {
        // Initialize all components when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.startComponents();
            });
        } else {
            this.startComponents();
        }
    }

    startComponents() {
        // Dashboard component animations
        this.initializeDashboardComponents();
        
        // Smooth scroll for navigation
        this.setupNavigationScrolling();
        
        // Progressive enhancement features
        this.addProgressiveEnhancements();
        
        // Performance optimizations
        this.optimizeAnimations();
    }

    initializeDashboardComponents() {
        // Add interactive hover effects to dashboard cards
        const dashboardCards = document.querySelectorAll('.dashboard-card');
        
        dashboardCards.forEach((card, index) => {
            // Add data attributes for animation timing
            card.dataset.animationDelay = index * 200;
            
            // Add intersection observer for performance
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '50px'
            });
            
            observer.observe(card);
        });
    }

    setupNavigationScrolling() {
        // Create a virtual navigation for smooth scrolling between sections
        const sections = document.querySelectorAll('.section');
        let currentSection = 0;

        // Keyboard navigation between sections
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                    e.preventDefault();
                    currentSection = Math.min(currentSection + 1, sections.length - 1);
                    sections[currentSection].scrollIntoView({ behavior: 'smooth' });
                } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                    e.preventDefault();
                    currentSection = Math.max(currentSection - 1, 0);
                    sections[currentSection].scrollIntoView({ behavior: 'smooth' });
                }
            }
        });

        // Update current section based on scroll position
        const updateCurrentSection = throttle(() => {
            const scrollPosition = window.pageYOffset;
            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                    currentSection = index;
                }
            });
        }, 100);

        window.addEventListener('scroll', updateCurrentSection);
    }

    addProgressiveEnhancements() {
        // Add advanced features for modern browsers
        if ('IntersectionObserver' in window) {
            this.addAdvancedAnimations();
        }

        // Add Service Worker for caching (if supported)
        if ('serviceWorker' in navigator) {
            this.registerServiceWorker();
        }

        // Add advanced form features
        if ('FormData' in window) {
            this.enhanceFormFeatures();
        }
    }

    addAdvancedAnimations() {
        // Advanced scroll-based animations
        const animatedElements = document.querySelectorAll('.fade-in-element');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                } else {
                    entry.target.style.animationPlayState = 'paused';
                }
            });
        }, {
            threshold: [0, 0.25, 0.5, 0.75, 1]
        });

        animatedElements.forEach(el => {
            animationObserver.observe(el);
        });
    }

    registerServiceWorker() {
        // Register service worker for offline functionality
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    }

    enhanceFormFeatures() {
        // Add advanced form validation and UX improvements
        const form = document.getElementById('landlord-signup-form');
        
        if (form) {
            // Add real-time character count for textareas
            const textareas = form.querySelectorAll('textarea');
            textareas.forEach(textarea => {
                const maxLength = textarea.getAttribute('maxlength');
                if (maxLength) {
                    const counter = document.createElement('div');
                    counter.className = 'character-counter';
                    counter.textContent = `0/${maxLength}`;
                    textarea.parentNode.appendChild(counter);

                    textarea.addEventListener('input', () => {
                        const current = textarea.value.length;
                        counter.textContent = `${current}/${maxLength}`;
                        counter.style.color = current > maxLength * 0.9 ? '#ff6b6b' : '#a0a0a0';
                    });
                }
            });
        }
    }

    optimizeAnimations() {
        // Reduce animations for users who prefer reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            document.body.classList.add('reduced-motion');
            
            const style = document.createElement('style');
            style.textContent = `
                .reduced-motion * {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(style);
        }

        // Listen for changes in motion preference
        prefersReducedMotion.addEventListener('change', (e) => {
            if (e.matches) {
                document.body.classList.add('reduced-motion');
            } else {
                document.body.classList.remove('reduced-motion');
            }
        });
    }

    // Error handling and reporting
    handleErrors() {
        window.addEventListener('error', (e) => {
            console.error('JavaScript error:', e.error);
            // Here you could send error reports to your analytics service
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            // Handle promise rejections
        });
    }

    // Analytics and tracking (placeholder)
    trackUserInteraction(action, category = 'engagement', label = null) {
        console.log(`Track: ${category} - ${action}`, label ? `(${label})` : '');
        
        // Example integration with Google Analytics
        // gtag('event', action, {
        //     'event_category': category,
        //     'event_label': label
        // });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const app = new LandlordLandingPage();
    
    // Make app globally available for debugging
    window.landlordApp = app;
    
    // Track page view
    app.trackUserInteraction('page_view', 'navigation');
});

// Export for testing and external use
window.LandlordLandingPage = LandlordLandingPage;