/**
 * BHABHA GLOBAL TAX AND ADVISORY
 * Interactive JavaScript Behaviors
 */

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar-site');
  const backToTopBtn = document.getElementById('backToTop');
  const navLinks = document.querySelectorAll('.nav-link-custom');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  // Handle Navbar styling on scroll
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
      backToTopBtn?.classList.add('visible');
    } else {
      navbar?.classList.remove('scrolled');
      backToTopBtn?.classList.remove('visible');
    }

    // ScrollSpy active link detection
    const sections = document.querySelectorAll('section[id], header[id]');
    let currentId = '';

    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Smooth scroll and collapse mobile menu
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const navOffset = navbar ? navbar.offsetHeight : 70;
          const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navOffset;
          window.scrollTo({
            top: targetPos,
            behavior: 'smooth'
          });
        }

        // Close Bootstrap collapse on mobile if open
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) {
            bsCollapse.hide();
          }
        }
      }
    });
  });

  // Back to Top button
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Contact form submission handling
  const contactForm = document.getElementById('contactForm');
  const contactAlert = document.getElementById('contactFormAlert');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.innerHTML = '<i class="bi bi-check2-circle me-2"></i> Message Sent!';
          if (contactAlert) {
            contactAlert.classList.remove('d-none');
            contactAlert.innerHTML = 'Thank you! Your message has been received. Our advisory team will get in touch shortly.';
          }
          contactForm.reset();

          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
          }, 3500);
        }, 1200);
      }
    });
  }
});
