// Organiza Eliza — Site JavaScript

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Mobile nav toggle ---- */
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('navMenu');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.textContent = nav.classList.contains('open') ? '✕' : '☰';
    });
    nav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.textContent = '☰';
      });
    });
  }

  /* ---- Scroll reveal ---- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.card, .bio-card, .info-block, .gallery-item, .stat, .embed-section')
    .forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });

  /* ---- Gallery filtering ---- */
  const filters = document.getElementById('galleryFilters');
  if (filters) {
    const buttons = filters.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('#galleryGrid .gallery-item');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        items.forEach(item => {
          const show = filter === 'all' || item.dataset.category === filter;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ---- Lightbox ---- */
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lbImg = document.getElementById('lightboxImg');
    const lbClose = document.getElementById('lightboxClose');
    document.querySelectorAll('.gallery-item img').forEach(img => {
      img.addEventListener('click', (e) => {
        // Only open if the image actually loaded (not a placeholder)
        if (img.style.display === 'none' || !img.naturalWidth) return;
        e.stopPropagation();
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lightbox.classList.add('open');
      });
    });
    const close = () => lightbox.classList.remove('open');
    lightbox.addEventListener('click', close);
    if (lbClose) lbClose.addEventListener('click', close);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  }

  /* ---- Booking form (front-end only) ---- */
  const form = document.getElementById('bookingForm');
  if (form) {
    form.addEventListener('submit', () => {
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const note = document.getElementById('formNote');
      if (!name.value.trim() || !email.value.trim()) {
        note.style.display = 'block';
        note.style.color = '#b4552f';
        note.textContent = 'Please add your name and email so I can reach you.';
        return;
      }
      // NOTE: This is a static site, so the form doesn't send email on its own yet.
      // To receive submissions, connect a free service like Formspree:
      // set the <form> action to your Formspree URL and method="POST", then remove onsubmit.
      note.style.display = 'block';
      note.style.color = 'var(--accent-deep)';
      note.textContent = 'Thanks, ' + name.value.trim().split(' ')[0] + '! Your request is ready — connect Formspree to start receiving these by email.';
      form.reset();
    });
  }

});
