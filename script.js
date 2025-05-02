document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Change navbar style on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(44, 62, 80, 0.9)';
        } else {
            navbar.style.backgroundColor = '#2c3e50';
        }
    });

    // Advanced parallax effects for elements within sections
    const parallaxElements = document.querySelectorAll('.parallax-layer');
    
    window.addEventListener('scroll', function() {
        let scrollPosition = window.pageYOffset;
        
        parallaxElements.forEach(function(element) {
            let speed = parseFloat(element.getAttribute('data-speed'));
            element.style.transform = 'translateY(' + scrollPosition * speed + 'px)';
        });
    });
});