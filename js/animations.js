/**
 * Animations and Scroll Effects for Landlord Landing Page
 * Handles intersection observers, scroll animations, and visual effects
 */

class AnimationController {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupSmoothScrolling();
        this.setupParallaxEffects();
        this.animateOnLoad();
    }

    // Intersection Observer for fade-in animations
    setupIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '-100px 0px -100px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        const fadeElements = document.querySelectorAll('.fade-in-element, .dashboard-card, .feature-item');
        fadeElements.forEach(el => observer.observe(el));

        // Special observer for dashboard cards with staggered animation
        this.setupStaggeredAnimations();
    }

    // Staggered animations for dashboard cards
    setupStaggeredAnimations() {
        const dashboardSections = document.querySelectorAll('.dashboard-section');
        
        dashboardSections.forEach((section, index) => {
            const card = section.querySelector('.dashboard-card');
            const text = section.querySelector('.section-text');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            card.classList.add('visible');
                            setTimeout(() => {
                                text.style.animation = 'fadeInUp 0.8s ease-out forwards';
                            }, 300);
                        }, 200 * index);
                    }
                });
            }, {
                threshold: 0.2
            });
            
            observer.observe(section);
        });
    }

    // Smooth scrolling for internal links
    setupSmoothScrolling() {
        const scrollLinks = document.querySelectorAll('a[href^="#"]');
        
        scrollLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add scroll indicator click handler
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const nextSection = document.querySelector('#dashboard-1');
                if (nextSection) {
                    nextSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    }

    // Parallax effects for background elements
    setupParallaxEffects() {
        let ticking = false;

        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            // Parallax for hero background
            const heroBackground = document.querySelector('.hero-background');
            if (heroBackground) {
                heroBackground.style.transform = `translateY(${rate}px)`;
            }

            // Parallax for final section background
            const finalBackground = document.querySelector('.final-background');
            if (finalBackground) {
                finalBackground.style.transform = `translateY(${rate * 0.3}px)`;
            }

            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick);
    }

    // Initial animations on page load
    animateOnLoad() {
        window.addEventListener('load', () => {
            // Animate hero content
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.opacity = '0';
                heroContent.style.transform = 'translateY(50px)';
                
                setTimeout(() => {
                    heroContent.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    heroContent.style.opacity = '1';
                    heroContent.style.transform = 'translateY(0)';
                }, 300);
            }

            // Animate scroll indicator
            const scrollIndicator = document.querySelector('.scroll-indicator');
            if (scrollIndicator) {
                setTimeout(() => {
                    scrollIndicator.style.opacity = '1';
                    scrollIndicator.style.animation = 'bounce 2s infinite';
                }, 1500);
            }
        });
    }

    // Chart animation for income/expense bars
    animateChartBars() {
        const chartBars = document.querySelectorAll('.bar-fill');
        
        const animateBar = (bar, delay = 0) => {
            setTimeout(() => {
                const targetWidth = bar.style.width || bar.getAttribute('data-width');
                bar.style.width = '0%';
                bar.style.transition = 'width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 100);
            }, delay);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bars = entry.target.querySelectorAll('.bar-fill');
                    bars.forEach((bar, index) => {
                        animateBar(bar, index * 300);
                    });
                }
            });
        }, {
            threshold: 0.5
        });

        const chartContainer = document.querySelector('.income-expense-chart');
        if (chartContainer) {
            observer.observe(chartContainer);
        }
    }

    // Typing effect for text elements
    createTypingEffect(element, text, speed = 50) {
        element.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        };
        
        typeWriter();
    }

    // Floating animation for dashboard cards
    addFloatingAnimation() {
        const cards = document.querySelectorAll('.dashboard-card');
        
        cards.forEach((card, index) => {
            card.style.animation = `float 6s ease-in-out infinite`;
            card.style.animationDelay = `${index * 0.5}s`;
        });

        // Add CSS animation keyframes dynamically
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px) scale(1); }
                50% { transform: translateY(-10px) scale(1.02); }
            }
        `;
        document.head.appendChild(style);
    }

    // Progressive reveal for form elements
    setupFormAnimations() {
        const formGroups = document.querySelectorAll('.form-group');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const formElements = entry.target.querySelectorAll('.form-group');
                    formElements.forEach((group, index) => {
                        setTimeout(() => {
                            group.style.animation = 'slideInFromLeft 0.6s ease-out forwards';
                            group.style.opacity = '1';
                        }, index * 100);
                    });
                }
            });
        });

        const formContainer = document.querySelector('.form-container');
        if (formContainer) {
            observer.observe(formContainer);
        }

        // Add animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInFromLeft {
                0% { transform: translateX(-30px); opacity: 0; }
                100% { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    // Hover effects for interactive elements
    setupHoverEffects() {
        const cards = document.querySelectorAll('.dashboard-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px) scale(1.02)';
                card.style.boxShadow = '0 25px 50px rgba(0, 212, 255, 0.2)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
            });
        });

        // Feature items hover effect
        const featureItems = document.querySelectorAll('.feature-item');
        featureItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const icon = item.querySelector('.feature-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotateY(10deg)';
                    icon.style.boxShadow = '0 10px 25px rgba(0, 212, 255, 0.3)';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                const icon = item.querySelector('.feature-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotateY(0deg)';
                    icon.style.boxShadow = 'none';
                }
            });
        });
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const animationController = new AnimationController();
    
    // Set up chart animations
    setTimeout(() => {
        animationController.animateChartBars();
    }, 1000);
    
    // Set up form animations
    animationController.setupFormAnimations();
    
    // Set up hover effects
    animationController.setupHoverEffects();
    
    // Add floating animation after initial load
    setTimeout(() => {
        animationController.addFloatingAnimation();
    }, 2000);
});

// Export for use in other modules
window.AnimationController = AnimationController;