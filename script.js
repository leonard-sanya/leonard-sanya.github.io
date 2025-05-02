// document.addEventListener('DOMContentLoaded', function() {
//     // Smooth scrolling for navigation
//     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//         anchor.addEventListener('click', function (e) {
//             e.preventDefault();
//             document.querySelector(this.getAttribute('href')).scrollIntoView({
//                 behavior: 'smooth'
//             });
//         });
//     });

//     // Change navbar style on scroll
//     window.addEventListener('scroll', function() {
//         const navbar = document.getElementById('navbar');
//         if (window.scrollY > 100) {
//             navbar.style.backgroundColor = 'rgba(44, 62, 80, 0.9)';
//         } else {
//             navbar.style.backgroundColor = '#2c3e50';
//         }
//     });

//     // Advanced parallax effects for elements within sections
//     const parallaxElements = document.querySelectorAll('.parallax-layer');
    
//     window.addEventListener('scroll', function() {
//         let scrollPosition = window.pageYOffset;
        
//         parallaxElements.forEach(function(element) {
//             let speed = parseFloat(element.getAttribute('data-speed'));
//             element.style.transform = 'translateY(' + scrollPosition * speed + 'px)';
//         });
//     });
// });


document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const navbar = document.getElementById('navbar');
    const parallaxElements = document.querySelectorAll('.parallax-layer');
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    // Check if prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Smooth scrolling for navigation
    if (!prefersReducedMotion) {
        navLinks.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL without page jump
                    if (history.pushState) {
                        history.pushState(null, null, targetId);
                    } else {
                        window.location.hash = targetId;
                    }
                }
            });
        });
    }

    // Throttle scroll events for better performance
    let lastScrollPosition = 0;
    let ticking = false;
    
    function updateOnScroll() {
        // Navbar style change
        const scrollY = window.scrollY || window.pageYOffset;
        
        if (scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(44, 62, 80, 0.9)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        } else {
            navbar.style.backgroundColor = '#2c3e50';
            navbar.style.boxShadow = 'none';
        }
        
        // Parallax effects
        if (!prefersReducedMotion) {
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.getAttribute('data-speed')) || 0.3;
                element.style.transform = `translateY(${scrollY * speed}px)`;
            });
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        lastScrollPosition = window.scrollY || window.pageYOffset;
        
        if (!ticking) {
            window.requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });

    // Initialize navbar state
    updateOnScroll();
    
    // Mobile menu toggle (optional addition)
    const menuToggle = document.createElement('button');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = '☰';
    navbar.appendChild(menuToggle);
    
    menuToggle.addEventListener('click', function() {
        const ul = navbar.querySelector('ul');
        ul.style.display = ul.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Handle window resize
    function handleResize() {
        const ul = navbar.querySelector('ul');
        if (window.innerWidth > 768) {
            ul.style.display = 'flex';
        } else {
            ul.style.display = 'none';
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize
});