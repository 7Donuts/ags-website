/* AGS Managed IT Services — Main JS */

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // Close nav on outside click
  document.addEventListener('click', e => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    }
  });
}

// Active nav link based on current page
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// Scroll-triggered fade-in
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// Navbar scroll shadow
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.style.boxShadow = '0 2px 20px rgba(7,24,41,0.6)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });
}

// Contact form — Formspree submission with feedback
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const formNote  = document.getElementById('formNote');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(contactForm);
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        contactForm.reset();
        if (formNote) {
          formNote.textContent = 'Thank you! We will be in touch within one business day.';
          formNote.style.color = '#09C2E9';
        }
        submitBtn.textContent = 'Message Sent';
      } else {
        throw new Error('Server error');
      }
    } catch {
      if (formNote) {
        formNote.textContent = 'Something went wrong. Please email us directly at info@agsmanagedit.com.';
        formNote.style.color = '#f87171';
      }
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });
}
