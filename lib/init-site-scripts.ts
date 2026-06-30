// @ts-nocheck

import {
  BARBER_SERVICE_LABELS,
  SALON_SERVICE_LABELS,
} from '@/lib/bookable-services-catalog';

function assetPath(src: string) {
  if (!src || src.startsWith('http') || src.startsWith('/')) return src;
  return `/${src}`;
}

function hrefToPathname(href: string) {
  const pathPart = href.split('#')[0];
  if (!pathPart || pathPart === 'index.html') return '/';
  const map: Record<string, string> = {
    'services.html': '/services',
    'about.html': '/about',
    'contact.html': '/contact',
    'book.html': '/book',
  };
  if (map[pathPart]) return map[pathPart];
  if (pathPart.startsWith('/')) return pathPart;
  return window.location.pathname;
}

export function initSiteScripts(searchParamsString = ''): () => void {
  const abort = new AbortController();
  const { signal } = abort;
  const observers: IntersectionObserver[] = [];

  function on(
    target: EventTarget | null | undefined,
    type: string,
    handler: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ) {
    if (!target) return;
    target.addEventListener(type, handler, { ...(typeof options === 'object' ? options : {}), signal });
  }

  const WHATSAPP_NUMBER = '260761000376';
const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const nav = document.getElementById('main-nav');
const navLinks = document.querySelectorAll('.navbar__link');
const bookingForm = document.getElementById('booking-form');
const revealElements = document.querySelectorAll('.reveal');
const footerYear = document.getElementById('footer-year');
const heroBg = document.getElementById('hero-bg');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
const lightboxBrandLogo = document.getElementById('lightbox-brand-logo');
const lightboxInspoBadge = document.getElementById('lightbox-inspo-badge');
let galleryItems = document.querySelectorAll('.gallery__item[data-lightbox]');
let lightboxIndex = 0;
let lightboxSources = [];
const counters = document.querySelectorAll('.counter');

/* ============================================
   Page Load Transition
   ============================================ */

  document.body.classList.add('page-loaded');

/* ============================================
   Mobile Navigation
   ============================================ */

function closeMobileNav() {
  nav?.classList.remove('active');
  navToggle?.classList.remove('active');
  navToggle?.setAttribute('aria-expanded', 'false');
}

function toggleMobileNav() {
  const isOpen = nav.classList.toggle('active');
  navToggle.classList.toggle('active', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
}

  on(navToggle, 'click', toggleMobileNav);
  navLinks.forEach((link) => on(link, 'click', closeMobileNav));

/* ============================================
   Navbar Scroll Effect
   ============================================ */

function updateNavbarOnScroll() {
  navbar?.classList.toggle('navbar--scrolled', window.scrollY > 40);
}

  on(window, 'scroll', updateNavbarOnScroll, { passive: true });
  updateNavbarOnScroll();

/* ============================================
   Parallax Hero
   ============================================ */

function updateParallax() {
  if (!heroBg) return;
  heroBg.style.transform = 'none';
}

  on(window, 'scroll', updateParallax, { passive: true });
  if (heroBg) heroBg.style.transform = 'none';

/* ============================================
   Smooth Scroll
   ============================================ */

  document.querySelectorAll('a[href*="#"]').forEach((anchor) => {
    on(anchor, 'click', (event) => {
      const href = anchor.getAttribute('href');
      if (!href || !href.includes('#')) return;

      const hash = href.includes('#') ? href.substring(href.indexOf('#')) : href;
      if (!hash || hash === '#') return;

      const targetPath = hrefToPathname(href);
      if (targetPath !== window.location.pathname) return;

      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      const offset = (navbar?.offsetHeight || 80) + 20;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      closeMobileNav();
    });
  });

/* ============================================
   Scroll Reveal Animations
   ============================================ */

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

  observers.push(revealObserver);
  revealElements.forEach((el, index) => {
    el.style.transitionDelay = `${(index % 5) * 0.07}s`;
    revealObserver.observe(el);
  });

/* ============================================
   Counter Animation
   ============================================ */

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start = performance.now();
  const useK = target >= 1000;

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);

    if (useK) {
      el.textContent = progress === 1 ? `${Math.floor(target / 1000)}k+` : `${Math.floor(current / 1000)}k`;
    } else {
      el.textContent = progress === 1 ? `${target}+` : String(current);
    }

    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

  observers.push(counterObserver);
  counters.forEach((counter) => counterObserver.observe(counter));

/* ============================================
   Gallery Lightbox & Navigation
   ============================================ */

function buildLightboxSources(scopeGallery) {
  const items = scopeGallery
    ? scopeGallery.querySelectorAll('.gallery__item[data-lightbox]')
    : document.querySelectorAll('.service-panel:not([hidden]) .gallery__item[data-lightbox], .gallery__item[data-lightbox]');
  lightboxSources = Array.from(items).map((item) => ({
    src: assetPath(item.dataset.lightbox || ''),
    caption: item.dataset.caption || '',
    badge: item.querySelector('.gallery__brand-logo') ? 'logo' : item.querySelector('.gallery__inspo-badge') ? 'inspo' : null,
  }));
}

function updateLightboxBadge() {
  const current = lightboxSources[lightboxIndex];
  const badge = current?.badge || null;

  if (lightboxBrandLogo) {
    lightboxBrandLogo.hidden = badge !== 'logo';
  }
  if (lightboxInspoBadge) {
    lightboxInspoBadge.hidden = badge !== 'inspo';
  }
}

function showLightboxAt(index) {
  if (!lightboxSources.length) return;
  lightboxIndex = (index + lightboxSources.length) % lightboxSources.length;
  const current = lightboxSources[lightboxIndex];
  openLightbox(current.src, current.caption, false);
  updateLightboxNav();
}

function updateLightboxNav() {
  const hasMultiple = lightboxSources.length > 1;
  if (lightboxPrev) {
    lightboxPrev.disabled = !hasMultiple;
    lightboxPrev.style.visibility = hasMultiple ? 'visible' : 'hidden';
  }
  if (lightboxNext) {
    lightboxNext.disabled = !hasMultiple;
    lightboxNext.style.visibility = hasMultiple ? 'visible' : 'hidden';
  }
}

function openLightbox(src, caption, updateIndex = true, scopeGallery = null) {
  if (!lightbox || !lightboxImg) return;

  if (updateIndex) {
    buildLightboxSources(scopeGallery);
    lightboxIndex = lightboxSources.findIndex((item) => item.src === src);
    if (lightboxIndex < 0) lightboxIndex = 0;
  }

  lightboxImg.src = assetPath(src);
  lightboxImg.alt = caption || 'Gallery image';
  if (lightboxCaption) lightboxCaption.textContent = caption || '';
  updateLightboxBadge();
  lightbox.removeAttribute('hidden');
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
  updateLightboxNav();
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('active');
  lightbox.setAttribute('hidden', '');
  document.body.style.overflow = '';
  if (lightboxImg) lightboxImg.src = '';
  if (lightboxBrandLogo) lightboxBrandLogo.hidden = true;
  if (lightboxInspoBadge) lightboxInspoBadge.hidden = true;
}

function bindGalleryItems() {
  galleryItems = document.querySelectorAll('.gallery__item[data-lightbox]');
  galleryItems.forEach((item) => {
    if (item.dataset.lightboxBound) return;
    item.dataset.lightboxBound = 'true';
    on(item, 'click', () => {
      const scopeGallery = item.closest('.category-gallery');
      openLightbox(item.dataset.lightbox, item.dataset.caption, true, scopeGallery);
    });
  });
}

bindGalleryItems();

  on(lightboxClose, 'click', closeLightbox);

  on(lightboxPrev, 'click', (event) => {
  event.stopPropagation();
  showLightboxAt(lightboxIndex - 1);
});

  on(lightboxNext, 'click', (event) => {
  event.stopPropagation();
  showLightboxAt(lightboxIndex + 1);
});

  on(lightbox, 'click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

  on(document, 'keydown', (event) => {
  if (!lightbox?.classList.contains('active')) {
    if (event.key === 'Escape') closePriceModals();
    return;
  }
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') showLightboxAt(lightboxIndex - 1);
  if (event.key === 'ArrowRight') showLightboxAt(lightboxIndex + 1);
});

/* ============================================
   Specialist Selection & Booking
   ============================================ */

const APPOINTMENTS_STORAGE_KEY = 'grooming_lounge_appointments';
const COUNTRY_CODE = '+260';
const NAME_PATTERN = /^[A-Za-z\s'-]+$/;

const BARBER_SERVICES = BARBER_SERVICE_LABELS.map((label) => ({ value: label, label, category: 'barber' }));
const SALON_SERVICES = SALON_SERVICE_LABELS.map((label) => ({ value: label, label, category: 'hairdresser' }));
const ALL_FALLBACK_SERVICES = [...BARBER_SERVICES, ...SALON_SERVICES];

// Set `photo` to an image path (e.g. 'staff/maxwell-banda.jpg') to replace the placeholder avatar.
const STAFF_MEMBERS = [
  {
    id: 'maxwell-banda',
    category: 'barber',
    name: 'Maxwell Banda',
    title: 'Senior Barber',
    rating: 4.9,
    photo: '',
    specialties: ['Fades', 'Beard Grooming', 'Hot Towel Shave'],
  },
  {
    id: 'james-mwale',
    category: 'barber',
    name: 'James Mwale',
    title: 'Barber',
    rating: 4.8,
    photo: '',
    specialties: ['Haircuts', 'Lining', 'Kids Cuts'],
  },
  {
    id: 'david-phiri',
    category: 'barber',
    name: 'David Phiri',
    title: 'Barber',
    rating: 4.7,
    photo: '',
    specialties: ['Caucasian Cuts', 'Styling', 'Colour'],
  },
  {
    id: 'emmanuel-chanda',
    category: 'barber',
    name: 'Emmanuel Chanda',
    title: 'Barber',
    rating: 4.8,
    photo: '',
    specialties: ['Beard Trim', 'Full Grooming', 'S Curl'],
  },
  {
    id: 'sarah-mutale',
    category: 'hairdresser',
    name: 'Sarah Mutale',
    title: 'Senior Hairdresser',
    rating: 4.9,
    photo: '',
    specialties: ['Braids', 'Knotless', 'Cornrows'],
  },
  {
    id: 'grace-lungu',
    category: 'hairdresser',
    name: 'Grace Lungu',
    title: 'Hairdresser',
    rating: 4.8,
    photo: '',
    specialties: ['Weaves', 'Styling', 'Treatments'],
  },
  {
    id: 'patricia-mwansa',
    category: 'hairdresser',
    name: 'Patricia Mwansa',
    title: 'Hairdresser',
    rating: 4.7,
    photo: '',
    specialties: ['Makeup', 'Lashes', 'Brows'],
  },
  {
    id: 'linda-banda',
    category: 'hairdresser',
    name: 'Linda Banda',
    title: 'Hairdresser',
    rating: 4.8,
    photo: '',
    specialties: ['Nails', 'Manicure', 'Pedicure'],
  },
];

let selectedSpecialist = null;
let allBookableServices = [...ALL_FALLBACK_SERVICES];

function formatPhoneDigits(raw) {
  let digits = raw.replace(/\D/g, '');
  const hadLeadingZero = digits.startsWith('0');
  if (hadLeadingZero) {
    digits = digits.replace(/^0+/, '');
  }
  return { digits: digits.slice(0, 9), hadLeadingZero };
}

function renderStarRating(rating) {
  const starCount = Math.min(5, Math.max(1, Math.round(rating)));
  return `${'★'.repeat(starCount)}${'☆'.repeat(5 - starCount)}`;
}

function renderStaffPhoto(member) {
  const alt = `${member.name}, ${member.title}`;
  const hasPhoto = Boolean(member.photo && member.photo.trim());

  if (hasPhoto) {
    return `
      <div class="staff-card__avatar">
        <img
          class="staff-card__avatar-img"
          src="${assetPath(member.photo.trim())}"
          alt="${alt}"
          loading="lazy"
          decoding="async"
          width="400"
          height="400">
      </div>
    `;
  }

  return `
    <div class="staff-card__avatar staff-card__avatar--placeholder" role="img" aria-label="Profile photo placeholder for ${member.name}">
      <svg class="staff-card__avatar-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
      </svg>
    </div>
  `;
}

function createStaffCard(member) {
  const card = document.createElement('article');
  card.className = 'staff-card reveal reveal--fade-up';
  card.setAttribute('role', 'listitem');
  card.dataset.staffId = member.id;

  const specialtyTags = member.specialties
    .map((item) => `<li>${item}</li>`)
    .join('');

  card.innerHTML = `
    <div class="staff-card__photo${member.photo && member.photo.trim() ? '' : ' staff-card__photo--placeholder'}">
      ${renderStaffPhoto(member)}
    </div>
    <div class="staff-card__body">
      <h4 class="staff-card__name">${member.name}</h4>
      <p class="staff-card__title">${member.title}</p>
      <div class="staff-card__rating" aria-label="${member.rating} out of 5 stars">
        <span class="staff-card__stars" aria-hidden="true">${renderStarRating(member.rating)}</span>
        <span class="staff-card__rating-value">${member.rating.toFixed(1)}</span>
      </div>
      <ul class="staff-card__specialties">${specialtyTags}</ul>
      <button type="button" class="btn btn--outline staff-card__select" data-select-staff="${member.id}">Select</button>
    </div>
  `;

  return card;
}

let dynamicStaffMembers = [...STAFF_MEMBERS];

function renderStaffCardsFromData(members) {
  dynamicStaffMembers = members;
  const barbersGrid = document.getElementById('barbers-grid');
  const hairdressersGrid = document.getElementById('hairdressers-grid');
  if (!barbersGrid || !hairdressersGrid) return;

  barbersGrid.innerHTML = '';
  hairdressersGrid.innerHTML = '';

  members.forEach((member) => {
    const card = createStaffCard(member);
    if (member.category === 'barber') {
      barbersGrid.appendChild(card);
    } else {
      hairdressersGrid.appendChild(card);
    }
  });

  document.querySelectorAll('[data-select-staff]').forEach((btn) => {
    on(btn, 'click', () => selectSpecialist(btn.dataset.selectStaff || ''));
  });

  document.querySelectorAll('#specialists-section .reveal:not(.visible)').forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.06}s`;
    revealObserver.observe(el);
  });
}

function renderStaffCards() {
  renderStaffCardsFromData(STAFF_MEMBERS);
}

async function loadDynamicStaffCards() {
  if (!document.getElementById('specialists-section')) return;
  try {
    const response = await fetch('/api/staff');
    if (!response.ok) throw new Error('Failed to load staff');
    const members = await response.json();
    if (Array.isArray(members) && members.length) {
      renderStaffCardsFromData(
        members.map((member) => ({
          id: member.slug,
          category: member.category,
          name: member.name,
          title: member.title,
          rating: member.rating,
          photo: member.photoUrl || '',
          specialties: member.specialties || [],
        }))
      );
      return;
    }
  } catch {
    /* fallback below */
  }
  renderStaffCards();
}

async function fetchServicesForCategory(category) {
  let services = category === 'barber' ? [...BARBER_SERVICES] : [...SALON_SERVICES];

  try {
    const response = await fetch(`/api/services?category=${category}`);
    if (response.ok) {
      const apiServices = await response.json();
      if (Array.isArray(apiServices) && apiServices.length) {
        services = apiServices.map((service) => ({
          value: service.label,
          label: service.label,
          category: service.category,
        }));
      }
    }
  } catch {
    /* use fallback services */
  }

  return services;
}

async function fetchAllServices() {
  let services = [...ALL_FALLBACK_SERVICES];

  try {
    const response = await fetch('/api/services?category=all');
    if (response.ok) {
      const apiServices = await response.json();
      if (Array.isArray(apiServices) && apiServices.length) {
        services = apiServices.map((service) => ({
          value: service.label,
          label: service.label,
          category: service.category,
        }));
      }
    }
  } catch {
    /* use fallback services */
  }

  return services;
}

function renderServiceOptions(services, placeholder = 'Select a service') {
  const serviceSelect = document.getElementById('service');
  if (!serviceSelect) return;

  const currentValue = serviceSelect.value;
  serviceSelect.innerHTML = `<option value="">${placeholder}</option>`;

  services.forEach((service) => {
    const option = document.createElement('option');
    option.value = service.value;
    option.textContent = service.label;
    serviceSelect.appendChild(option);
  });

  if (currentValue && services.some((service) => service.value === currentValue)) {
    serviceSelect.value = currentValue;
  } else {
    serviceSelect.value = '';
  }
}

async function populateServiceOptions(category) {
  const services = await fetchServicesForCategory(category);
  renderServiceOptions(services, 'Select a service');
  updateBookingSummary();
}

async function populateAllServiceOptions() {
  const services = await fetchAllServices();
  allBookableServices = services;
  renderServiceOptions(services, 'Select a service');
  updateBookingSummary();
}

async function ensureServiceOptionsIfNeeded() {
  const serviceSelect = document.getElementById('service');
  if (!serviceSelect || serviceSelect.options.length > 1) return;

  if (selectedSpecialist) {
    await populateServiceOptions(selectedSpecialist.category);
    return;
  }

  await populateAllServiceOptions();
}

function resetServiceSelect() {
  const serviceSelect = document.getElementById('service');
  if (!serviceSelect) return;
  serviceSelect.innerHTML = '<option value="">Select a specialist below first</option>';
  serviceSelect.value = '';
}

function handleServiceSelectionChange() {
  updateBookingSummary();
}

function setSpecialistError(message) {
  const errorEl = document.getElementById('specialist-error');
  if (!errorEl) return;
  errorEl.textContent = message || '';
}

function updateStaffCardStates() {
  document.querySelectorAll('.staff-card').forEach((card) => {
    const isSelected = selectedSpecialist && card.dataset.staffId === selectedSpecialist.id;
    card.classList.toggle('staff-card--selected', isSelected);

    const btn = card.querySelector('[data-select-staff]');
    if (btn) btn.textContent = isSelected ? 'Selected' : 'Select';
  });
}

function formatBookingDate(dateValue) {
  if (!dateValue) return '';
  const date = new Date(`${dateValue}T00:00:00`);
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatBookingTime(timeValue) {
  if (!timeValue) return '';
  const [hours, minutes] = timeValue.split(':');
  const date = new Date();
  date.setHours(Number(hours), Number(minutes));
  return date.toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function updateBookingSummary() {
  const summaryEl = document.getElementById('booking-summary');
  const specialistEl = document.getElementById('summary-specialist');
  const serviceEl = document.getElementById('summary-service');
  const datetimeEl = document.getElementById('summary-datetime');
  const clientEl = document.getElementById('summary-client');
  if (!summaryEl || !specialistEl || !serviceEl || !datetimeEl || !clientEl) return;

  const name = document.getElementById('name')?.value.trim() || '';
  const phoneDigits = document.getElementById('phone')?.value.trim() || '';
  const phone = phoneDigits ? `${COUNTRY_CODE}${phoneDigits}` : '';
  const service = document.getElementById('service')?.value || '';
  const date = document.getElementById('date')?.value || '';
  const time = document.getElementById('time')?.value || '';

  const hasProgress = Boolean(service || selectedSpecialist || name || phoneDigits || date || time);

  if (selectedSpecialist || hasProgress) {
    summaryEl.removeAttribute('hidden');
  } else {
    summaryEl.setAttribute('hidden', '');
  }

  if (selectedSpecialist) {
    specialistEl.textContent = `${selectedSpecialist.name} (${selectedSpecialist.title})`;
  } else {
    specialistEl.textContent = '—';
  }

  serviceEl.textContent = service || '—';

  if (date && time) {
    datetimeEl.textContent = `${formatBookingDate(date)} at ${formatBookingTime(time)}`;
  } else if (date) {
    datetimeEl.textContent = formatBookingDate(date);
  } else if (time) {
    datetimeEl.textContent = formatBookingTime(time);
  } else {
    datetimeEl.textContent = '—';
  }

  if (name && phone) {
    clientEl.textContent = `${name} · ${phone}`;
  } else if (name) {
    clientEl.textContent = name;
  } else if (phone) {
    clientEl.textContent = phone;
  } else {
    clientEl.textContent = '—';
  }
}

function selectSpecialist(staffId) {
  const member = dynamicStaffMembers.find((item) => item.id === staffId);
  if (!member) return;

  selectedSpecialist = member;
  populateServiceOptions(member.category);
  updateStaffCardStates();
  setSpecialistError('');
  updateBookingSummary();

  const serviceSelect = document.getElementById('service');
  serviceSelect?.focus({ preventScroll: true });
}

function clearSpecialistSelection() {
  selectedSpecialist = null;
  updateStaffCardStates();
  setSpecialistError('');
  resetServiceSelect();
  updateBookingSummary();
}

function saveAppointmentToStorage(appointment) {
  try {
    const stored = JSON.parse(localStorage.getItem(APPOINTMENTS_STORAGE_KEY) || '[]');
    stored.unshift({
      ...appointment,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(stored.slice(0, 50)));
    window.dispatchEvent(new CustomEvent('grooming-appointment-saved'));
  } catch {
    /* storage unavailable */
  }
}

function initSpecialistBooking() {
  if (!document.getElementById('booking-form')) return;

  loadDynamicStaffCards();

  const serviceSelect = document.getElementById('service');
  on(serviceSelect, 'focus', ensureServiceOptionsIfNeeded);
  on(serviceSelect, 'change', handleServiceSelectionChange);

  const nameInput = document.getElementById('name');
  on(nameInput, 'input', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;
    const cleaned = target.value.replace(/[^A-Za-z\s'-]/g, '');
    if (cleaned !== target.value) target.value = cleaned;
    updateBookingSummary();
  });

  const phoneInput = document.getElementById('phone');
  on(phoneInput, 'keydown', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;
    if (event.key === '0' && target.value.length === 0) {
      event.preventDefault();
      setFieldError(
        'phone',
        'Do not include a leading 0. +260 replaces it — enter 9 digits (e.g. 979835855).'
      );
    }
  });

  on(phoneInput, 'input', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;
    const { digits, hadLeadingZero } = formatPhoneDigits(target.value);
    target.value = digits;
    if (hadLeadingZero) {
      setFieldError(
        'phone',
        'Do not include a leading 0. +260 replaces it — enter 9 digits (e.g. 979835855).'
      );
    } else if (validators.phone(digits) === '') {
      setFieldError('phone', '');
    }
    updateBookingSummary();
  });

  on(phoneInput, 'blur', () => {
    const digits = phoneInput?.value.replace(/\D/g, '') || '';
    setFieldError('phone', validators.phone(digits));
  });

  ['name', 'phone', 'service', 'date', 'time'].forEach((fieldId) => {
    const input = document.getElementById(fieldId);
    on(input, 'input', updateBookingSummary);
    on(input, 'change', updateBookingSummary);
  });
}

/* ============================================
   Booking Form Validation & WhatsApp
   ============================================ */

const validators = {
  name: (value) => {
    if (!value.trim()) return 'Please enter your full name.';
    if (value.trim().length < 2) return 'Name must be at least 2 characters.';
    if (!NAME_PATTERN.test(value.trim())) {
      return 'Name may only contain letters, spaces, apostrophes, and hyphens.';
    }
    return '';
  },
  phone: (value) => {
    const digits = value.replace(/\D/g, '');
    if (!digits) return 'Please enter your phone number.';
    if (digits.startsWith('0')) {
      return 'Do not include a leading 0. +260 replaces it — enter 9 digits (e.g. 979835855).';
    }
    if (digits.length !== 9) {
      return 'Please enter exactly 9 digits after +260.';
    }
    return '';
  },
  service: (value) => (!value ? 'Please select a service.' : ''),
  date: (value) => {
    if (!value) return 'Please select a date.';
    const selected = new Date(`${value}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected < today) return 'Date cannot be in the past.';
    return '';
  },
  time: (value) => (!value ? 'Please select a time.' : ''),
};

function getFullPhoneNumber() {
  const { digits } = formatPhoneDigits(document.getElementById('phone')?.value || '');
  return digits ? `${COUNTRY_CODE}${digits}` : '';
}

function setFieldError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const errorEl = document.getElementById(`${fieldId}-error`);
  const group = input?.closest('.form-group');

  if (message) {
    group?.classList.add('form-group--error');
    if (errorEl) errorEl.textContent = message;
    input?.setAttribute('aria-invalid', 'true');
  } else {
    group?.classList.remove('form-group--error');
    if (errorEl) errorEl.textContent = '';
    input?.removeAttribute('aria-invalid');
  }
}

function validateForm() {
  let isValid = true;
  Object.keys(validators).forEach((fieldId) => {
    const input = document.getElementById(fieldId);
    const error = validators[fieldId](input?.value || '');
    setFieldError(fieldId, error);
    if (error) isValid = false;
  });

  setSpecialistError('');

  return isValid;
}

function setMinDate() {
  const dateInput = document.getElementById('date');
  if (!dateInput) return;
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  dateInput.min = `${yyyy}-${mm}-${dd}`;
}

function buildWhatsAppMessage(data) {
  let text = 'New Appointment Request\n\n';
  text += `Name: ${data.name}\n`;
  text += `Phone: ${data.phone}\n`;
  text += `Service: ${data.service}\n`;
  text += `Specialist: ${data.specialist || 'No preference'}\n`;
  text += `Date: ${data.date}\n`;
  text += `Time: ${data.time}\n`;
  if (data.message.trim()) text += `Message: ${data.message.trim()}\n`;
  return text;
}

if (bookingForm) {
  setMinDate();
  initSpecialistBooking();

  Object.keys(validators).forEach((fieldId) => {
    const input = document.getElementById(fieldId);
    on(input, 'input', () => setFieldError(fieldId, validators[fieldId](input?.value || '')));
    on(input, 'blur', () => setFieldError(fieldId, validators[fieldId](input?.value || '')));
  });

  on(bookingForm, 'submit', (event) => {
    event.preventDefault();

    const successEl = document.getElementById('form-success');
    successEl?.setAttribute('hidden', '');

    if (!validateForm()) return;

    const formData = {
      name: document.getElementById('name').value.trim(),
      phone: getFullPhoneNumber(),
      specialist: selectedSpecialist
        ? `${selectedSpecialist.name} (${selectedSpecialist.title})`
        : '',
      specialistId: selectedSpecialist?.id || '',
      specialistCategory: selectedSpecialist?.category || '',
      service: document.getElementById('service').value,
      date: document.getElementById('date').value,
      time: document.getElementById('time').value,
      message: document.getElementById('message').value,
    };

    saveAppointmentToStorage(formData);

    const whatsappUrl = `${WHATSAPP_BASE}?text=${encodeURIComponent(buildWhatsAppMessage(formData))}`;

    successEl.textContent = 'Booking submitted successfully! Redirecting to WhatsApp...';
    successEl.removeAttribute('hidden');

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      bookingForm.reset();
      clearSpecialistSelection();
      setMinDate();
      setTimeout(() => successEl.setAttribute('hidden', ''), 5000);
    }, 2000);
  });
}

/* ============================================
   Footer Year
   ============================================ */

if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

/* ============================================
   Hash Scroll on Page Load
   ============================================ */

  on(window, 'load', () => {
  if (!location.hash) return;

  const target = document.querySelector(location.hash);
  if (!target) return;

  setTimeout(() => {
    const offset = (navbar?.offsetHeight || 80) + 20;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }, 400);
});

/* ============================================
   Services Page — Tab Switching
   ============================================ */

const serviceTabBtns = document.querySelectorAll('[data-service-tab]');
const servicePanels = document.querySelectorAll('[data-service-panel]');

function switchServiceTab(tabName) {
  serviceTabBtns.forEach((btn) => {
    btn.classList.toggle('service-tabs__btn--active', btn.dataset.serviceTab === tabName);
  });

  servicePanels.forEach((panel) => {
    const isActive = panel.dataset.servicePanel === tabName;
    panel.classList.toggle('service-panel--active', isActive);
    if (isActive) {
      panel.removeAttribute('hidden');
      panel.querySelectorAll('.reveal:not(.visible)').forEach((el) => {
        revealObserver.observe(el);
      });
      setTimeout(() => {
        initCategoryCarousels();
        bindGalleryItems();
      }, 50);
    } else {
      panel.setAttribute('hidden', '');
    }
  });

}

serviceTabBtns.forEach((btn) => {
  on(btn, 'click', () => switchServiceTab(btn.dataset.serviceTab || ''));
});

  if (serviceTabBtns.length) {
    const params = new URLSearchParams(searchParamsString || window.location.search);
    const tabParam = params.get('tab');
    if (tabParam === 'salon') {
      switchServiceTab('salon');
    }
  }

/* ============================================
   Price List Modals
   ============================================ */

const priceModals = {
  barber: document.getElementById('barber-price-modal'),
  salon: document.getElementById('salon-price-modal'),
};

function openPriceModal(type) {
  const modal = priceModals[type];
  if (!modal) return;
  modal.removeAttribute('hidden');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePriceModals() {
  Object.values(priceModals).forEach((modal) => {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('hidden', '');
  });
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-price-open]').forEach((btn) => {
  on(btn, 'click', () => openPriceModal(btn.dataset.priceOpen || ''));
});

document.querySelectorAll('[data-price-close]').forEach((el) => {
  on(el, 'click', closePriceModals);
});

/* ============================================
   Category Image Galleries (static grid)
   ============================================ */

function initCategoryCarousels() {
  document.querySelectorAll('.service-category .category-gallery').forEach((gallery) => {
    gallery.classList.add('category-gallery--static');
  });
  bindGalleryItems();
}

initCategoryCarousels();

/* ============================================
   Customer Reviews
   ============================================ */

const reviewForm = document.getElementById('review-form');
const reviewsList = document.getElementById('reviews-list');
const starRating = document.getElementById('star-rating');
const REVIEWS_STORAGE_KEY = 'groomingLoungeReviews';
let selectedRating = 0;

function getStoredReviews() {
  try {
    const stored = localStorage.getItem(REVIEWS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveReview(review) {
  const reviews = getStoredReviews();
  reviews.unshift(review);
  localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews.slice(0, 20)));
}

function renderStars(count) {
  return '★'.repeat(count) + '☆'.repeat(5 - count);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function setupReviewToggle(card) {
  if (card.dataset.reviewInit === 'true') return;
  card.dataset.reviewInit = 'true';

  const textEl = card.querySelector('.review-card__text');
  const toggleBtn = card.querySelector('.review-card__toggle');
  if (!textEl || !toggleBtn) return;

  textEl.classList.add('review-card__text--clamp');

  const checkOverflow = () => {
    if (textEl.classList.contains('is-expanded')) return;
    const isOverflowing = textEl.scrollHeight > textEl.clientHeight + 2;
    toggleBtn.hidden = !isOverflowing;
  };

  requestAnimationFrame(checkOverflow);
  on(window, 'resize', checkOverflow);

  on(toggleBtn, 'click', () => {
    const expanded = textEl.classList.toggle('is-expanded');
    toggleBtn.textContent = expanded ? 'See Less' : '... See More';
    toggleBtn.setAttribute('aria-expanded', String(expanded));
    if (!expanded) {
      requestAnimationFrame(checkOverflow);
    }
  });
}

function createReviewCard(review) {
  const card = document.createElement('article');
  card.className = 'review-card';
  card.innerHTML = `
    <div class="review-card__stars" aria-label="${review.rating} out of 5 stars">${renderStars(review.rating)}</div>
    <div class="review-card__content">
      <p class="review-card__text review-card__text--clamp">"${escapeHtml(review.text)}"</p>
      <button type="button" class="review-card__toggle" hidden aria-expanded="false">... See More</button>
    </div>
    <span class="review-card__author">— ${escapeHtml(review.name)}</span>
  `;
  setupReviewToggle(card);
  return card;
}

function initReviewCards() {
  document.querySelectorAll('.review-card').forEach(setupReviewToggle);
}

function loadStoredReviews() {
  if (!reviewsList) return;
  const stored = getStoredReviews();
  stored.forEach((review) => {
    reviewsList.prepend(createReviewCard(review));
  });
}

if (starRating) {
  const stars = starRating.querySelectorAll('.star-rating__star');

  stars.forEach((star) => {
    on(star, 'click', () => {
      selectedRating = parseInt(star.dataset.value, 10);
      stars.forEach((s) => {
        s.classList.toggle('active', parseInt(s.dataset.value, 10) <= selectedRating);
      });
      const ratingError = document.getElementById('rating-error');
      if (ratingError) ratingError.textContent = '';
    });

    on(star, 'mouseenter', () => {
      const hoverVal = parseInt(star.dataset.value, 10);
      stars.forEach((s) => {
        s.style.color = parseInt(s.dataset.value, 10) <= hoverVal ? '' : '';
        if (parseInt(s.dataset.value, 10) <= hoverVal) {
          s.classList.add('active');
        } else if (parseInt(s.dataset.value, 10) > selectedRating) {
          s.classList.remove('active');
        }
      });
    });
  });

  on(starRating, 'mouseleave', () => {
    stars.forEach((s) => {
      s.classList.toggle('active', parseInt(s.dataset.value, 10) <= selectedRating);
    });
  });
}

if (reviewForm) {
  loadStoredReviews();
  initReviewCards();

  on(reviewForm, 'submit', (event) => {
    event.preventDefault();

    const nameInput = document.getElementById('reviewer-name');
    const textInput = document.getElementById('review-text');
    const nameError = document.getElementById('reviewer-name-error');
    const textError = document.getElementById('review-text-error');
    const ratingError = document.getElementById('rating-error');
    const successEl = document.getElementById('review-success');

    let isValid = true;
    const name = nameInput?.value.trim() || '';
    const text = textInput?.value.trim() || '';

    if (name.length < 2) {
      if (nameError) nameError.textContent = 'Please enter your name.';
      isValid = false;
    } else if (nameError) nameError.textContent = '';

    if (!selectedRating) {
      if (ratingError) ratingError.textContent = 'Please select a star rating.';
      isValid = false;
    } else if (ratingError) ratingError.textContent = '';

    if (text.length < 10) {
      if (textError) textError.textContent = 'Please write a brief review (at least 10 characters).';
      isValid = false;
    } else if (textError) textError.textContent = '';

    if (!isValid) return;

    const review = { name, text, rating: selectedRating, date: new Date().toISOString() };
    saveReview(review);

    if (reviewsList) {
      reviewsList.prepend(createReviewCard(review));
    }

    reviewForm.reset();
    selectedRating = 0;
    starRating?.querySelectorAll('.star-rating__star').forEach((s) => s.classList.remove('active'));

    if (successEl) {
      successEl.textContent = 'Thank you for your review!';
      successEl.removeAttribute('hidden');
      setTimeout(() => successEl.setAttribute('hidden', ''), 4000);
    }
  });
}

  return () => {
    abort.abort();
    observers.forEach((observer) => observer.disconnect());
  };
}
