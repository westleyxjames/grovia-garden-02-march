// Cookie Consent Management
const COOKIE_CONSENT_NAME = 'growvia_cookie_consent';
const COOKIE_CONSENT_DURATION = 365; // days

// Check if user has already given consent
function getCookieConsent() {
  const consent = localStorage.getItem(COOKIE_CONSENT_NAME);
  return consent ? JSON.parse(consent) : null;
}

// Save cookie consent
function setCookieConsent(accepted) {
  const consent = {
    accepted: accepted,
    timestamp: new Date().toISOString(),
    expires: new Date(Date.now() + COOKIE_CONSENT_DURATION * 24 * 60 * 60 * 1000).toISOString()
  };
  localStorage.setItem(COOKIE_CONSENT_NAME, JSON.stringify(consent));
}

// Show cookie consent banner
function showCookieBanner() {
  const banner = document.getElementById('cookie-consent-banner');
  if (banner) {
    setTimeout(() => {
      banner.classList.add('show');
    }, 1000); // Show after 1 second
  }
}

// Hide cookie consent banner
function hideCookieBanner() {
  const banner = document.getElementById('cookie-consent-banner');
  if (banner) {
    banner.classList.remove('show');
  }
}

// Initialize cookie consent
function initCookieConsent() {
  const consent = getCookieConsent();
  
  // Check if consent has expired
  if (consent && consent.expires) {
    const expiryDate = new Date(consent.expires);
    if (expiryDate < new Date()) {
      localStorage.removeItem(COOKIE_CONSENT_NAME);
      showCookieBanner();
      return;
    }
  }
  
  // If no consent or expired, show banner
  if (!consent) {
    showCookieBanner();
  }
}

// Handle accept cookies
function acceptCookies() {
  setCookieConsent(true);
  hideCookieBanner();
  // Here you can initialize analytics or other tracking scripts
  console.log('Cookies accepted');
}

// Handle decline cookies
function declineCookies() {
  setCookieConsent(false);
  hideCookieBanner();
  console.log('Cookies declined');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Create and inject cookie banner if it doesn't exist
  if (!document.getElementById('cookie-consent-banner')) {
    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.className = 'cookie-consent-banner';
    banner.innerHTML = `
      <div class="cookie-consent-content">
        <div class="cookie-consent-text">
          <h3>
            <span class="cookie-icon">🍪</span>
            We Use Cookies
          </h3>
          <p>We use cookies to enhance your browsing experience, provide personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.</p>
          <p><a href="cookies.html">Learn more about cookies</a> | <a href="privacy.html">Privacy Policy</a></p>
        </div>
        <div class="cookie-consent-actions">
          <button class="cookie-btn cookie-btn-accept" onclick="acceptCookies()">Accept All</button>
          <button class="cookie-btn cookie-btn-decline" onclick="declineCookies()">Decline</button>
        </div>
      </div>
    `;
    document.body.appendChild(banner);
  }
  
  // Initialize cookie consent
  initCookieConsent();
  
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      const icon = this.querySelector('svg use');
      if (mobileMenu.classList.contains('active')) {
        icon.setAttribute('href', '#icon-x');
      } else {
        icon.setAttribute('href', '#icon-menu');
      }
    });
  }
  
  // Close mobile menu when clicking a link
  const mobileLinks = mobileMenu?.querySelectorAll('.nav-link');
  mobileLinks?.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
    });
  });
});

// Home Page Form Submission
const homeForm = document.getElementById('home-consultation-form');
if (homeForm) {
  homeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Hide form and show success message
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('success-message').style.display = 'block';
    
    // Reset form after 5 seconds
    setTimeout(function() {
      homeForm.reset();
      document.getElementById('form-container').style.display = 'block';
      document.getElementById('success-message').style.display = 'none';
    }, 5000);
  });
}

// Contact Page Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Hide form and show success message
    document.getElementById('contact-form-container').style.display = 'none';
    document.getElementById('contact-success-message').style.display = 'block';
    
    // Reset form after 3 seconds
    setTimeout(function() {
      contactForm.reset();
      document.getElementById('contact-form-container').style.display = 'block';
      document.getElementById('contact-success-message').style.display = 'none';
    }, 3000);
  });
}

// Set active navigation link
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

setActiveNav();
