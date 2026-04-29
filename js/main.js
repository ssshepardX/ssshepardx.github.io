document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksAnchors = document.querySelectorAll('.nav-links a');

    // Prevent double-tap zoom on interactive elements
    document.addEventListener('touchend', function(e) {
        if (e.target.closest('a, button, .btn')) {
            e.preventDefault();
        }
    }, false);

    // Toggle menu when hamburger icon is clicked
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            // Prevent scroll when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });

        // Improve touch responsiveness
        menuToggle.addEventListener('touchstart', function(e) {
            this.style.opacity = '0.7';
        });
        
        menuToggle.addEventListener('touchend', function(e) {
            this.style.opacity = '1';
        });
    }

    // Close menu when a link is clicked
    if (navLinksAnchors) {
        navLinksAnchors.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // Close menu when clicking outside (but not on menu items)
    document.addEventListener('click', function(e) {
        if (menuToggle && navLinks) {
            const isClickInsideMenu = navLinks.contains(e.target);
            const isClickOnToggle = menuToggle.contains(e.target);
            
            if (!isClickInsideMenu && !isClickOnToggle && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // CV Modal Functionality
    const cvBtn = document.getElementById('cvBtn');
    const cvModal = document.getElementById('cvModal');
    const cvModalClose = document.querySelector('.cv-modal-close');
    const cvDownloadBtn = document.getElementById('cvDownloadBtn');
    const cvCloseBtn = document.getElementById('cvCloseBtn');

    if (cvBtn && cvModal) {
        // Open CV modal
        cvBtn.addEventListener('click', function(e) {
            e.preventDefault();
            cvModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });

        // Close CV modal
        function closeCVModal() {
            cvModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        // Close button click
        if (cvModalClose) {
            cvModalClose.addEventListener('click', closeCVModal);
        }

        // Close button text click
        if (cvCloseBtn) {
            cvCloseBtn.addEventListener('click', closeCVModal);
        }

        // Download button
        if (cvDownloadBtn) {
            cvDownloadBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const link = document.createElement('a');
                link.href = 'assets/LatestCV_FurkanCoban.pdf';
                link.download = 'Furkan_Coban_CV.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
        }

        // Close modal when clicking outside the modal content
        window.addEventListener('click', function(e) {
            if (e.target === cvModal) {
                closeCVModal();
            }
        });

        // Close modal on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && cvModal.style.display === 'block') {
                closeCVModal();
            }
        });
    }

    // Optimize images for mobile
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });

    // Add passive event listeners for better scroll performance
    let touchStartX = 0;
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    document.addEventListener('touchmove', function(e) {
        // Only prevent default for specific elements
        if (e.target.closest('nav') || e.target.closest('.cv-modal')) {
            // Allow normal scrolling behavior
        }
    }, { passive: true });
});