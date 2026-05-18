
// Year
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Reveal on scroll
const revealEls = document.querySelectorAll('.service-card, .section-title, .section-sub');
revealEls.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// Auto-close mobile nav on link click
document.querySelectorAll('#mainNav .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const nav = document.getElementById('mainNav');
    if (nav.classList.contains('show')) {
      new bootstrap.Collapse(nav).hide();
    }
  });
});

// Subtle navbar shadow on scroll
const navbar = document.querySelector('.navbar-craftsmen');
window.addEventListener('scroll', () => {
  if (window.scrollY > 8) navbar.classList.add('shadow');
  else navbar.classList.remove('shadow');
});


// ==============================
// Login & Register Toggle
// ==============================

// Tabs (login/register switching)
document.querySelectorAll('.tabs').forEach(group => {
  const tabs = group.querySelectorAll('.tab');
  const card = group.closest('.auth-card') || document;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.target;
      card.querySelectorAll('.form').forEach(f => {
        f.classList.toggle('active', f.id === target);
      });
    });
  });
});

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setError(id, msg){
  const el = document.getElementById(id);
  if(el) el.textContent = msg || '';
}

function clearErrors(form){
  form.querySelectorAll('.error-msg').forEach(e => e.textContent = '');
}

// Login forms
document.querySelectorAll('form.login-form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors(form);
    const email = form.querySelector('[name=email]').value.trim();
    const pwd = form.querySelector('[name=password]').value;
    let ok = true;
    if(!emailRe.test(email)){ setError(form.dataset.errEmail,'Enter a valid email'); ok=false; }
    if(pwd.length < 6){ setError(form.dataset.errPwd,'Password must be at least 6 characters'); ok=false; }
    if(!ok) return;
    window.location.href = 'category.html';
  });
});

// Register forms
document.querySelectorAll('form.register-form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors(form);
    const name = form.querySelector('[name=fullname]').value.trim();
    const email = form.querySelector('[name=email]').value.trim();
    const pwd = form.querySelector('[name=password]').value;
    const cpwd = form.querySelector('[name=confirm]').value;
    const skill = form.querySelector('[name=skill]');
    let ok = true;
    if(name.length < 2){ setError(form.dataset.errName,'Please enter your full name'); ok=false; }
    if(!emailRe.test(email)){ setError(form.dataset.errEmail,'Enter a valid email'); ok=false; }
    if(pwd.length < 8){ setError(form.dataset.errPwd,'Password must be at least 8 characters'); ok=false; }
    if(pwd !== cpwd){ setError(form.dataset.errConfirm,'Passwords do not match'); ok=false; }
    if(skill && !skill.value){ setError(form.dataset.errSkill,'Please select your profession'); ok=false; }
    if(!ok) return;
    window.location.href = 'category.html';
  });
});


// ====================================
//  login & Register  toggle end 
// =============================

// ===== Helpers =====
const showError = (input, show) => {
  const msg = document.querySelector(`.error-text[data-for="${input.id}"]`);
  if (show) {
    input.classList.add('is-invalid');
    if (msg) msg.style.display = 'block';
  } else {
    input.classList.remove('is-invalid');
    if (msg) msg.style.display = 'none';
  }
};

const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// Live clear errors as user types
document.querySelectorAll('.form-control, .form-select').forEach(el => {
  el.addEventListener('input', () => showError(el, false));
});

// ===== Login form =====
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    let ok = true;
    if (!isEmail(email.value.trim())) { showError(email, true); ok = false; }
    if (password.value.length < 6) { showError(password, true); ok = false; }
    if (!ok) return;

    const role = document.getElementById('loginRole').value;
    alert(`Welcome back! Logging in as ${role}.`);
    // TODO: integrate with your backend
  });
}

// ===== Register form =====
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', e => {
    e.preventDefault();
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('rEmail');
    const password = document.getElementById('rPassword');
    const confirm = document.getElementById('rConfirm');
    const skill = document.getElementById('skill');
    const role = document.getElementById('registerRole').value;
    let ok = true;

    if (!fullName.value.trim()) { showError(fullName, true); ok = false; }
    if (!isEmail(email.value.trim())) { showError(email, true); ok = false; }
    if (password.value.length < 8) { showError(password, true); ok = false; }
    if (confirm.value !== password.value || !confirm.value) { showError(confirm, true); ok = false; }
    if (role === 'artisan' && !skill.value) { showError(skill, true); ok = false; }

    if (!ok) return;
    alert(`Account created successfully as ${role}!`);
    // TODO: integrate with your backend
  });
}
// ============================
// ===========================
//  category section 
// ================================
// ==============================
const CATS = [
  { icon: "bi-tree", title: "Woodworking", desc: "Custom furniture, cabinetry & wood crafts." },
  { icon: "bi-cup", title: "Ceramics", desc: "Pottery, sculpture & ceramic art." },
  { icon: "bi-hammer", title: "Metalwork", desc: "Blacksmithing, welding & metal fabrication." },
  { icon: "bi-bag", title: "Leathercraft", desc: "Bags, belts, shoes & leather goods." },
  { icon: "bi-droplet-half", title: "Glassblowing", desc: "Art glass, vessels & decorative pieces." },
  { icon: "bi-scissors", title: "Textile Arts", desc: "Weaving, embroidery & fabric design." },
  { icon: "bi-gem", title: "Jewelry Making", desc: "Custom rings, necklaces & accessories." },
  { icon: "bi-house-door", title: "Furniture Making", desc: "Upholstery, restoration & custom pieces." },
];

const grid = document.getElementById("catGrid");
if (grid) {
  grid.innerHTML = CATS.map(c => `
    <div class="col-lg-3 col-md-6 reveal">
      <div class="cat-card">
        <div class="icon"><i class="bi ${c.icon}"></i></div>
        <h3>${c.title}</h3>
        <p>${c.desc}</p>
        <a href="#" class="browse">BROWSE <i class="bi bi-arrow-right"></i></a>
      </div>
    </div>
  `).join("");
}

const obs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => obs.observe(el));

const nav = document.querySelector(".navbar-craft");
window.addEventListener("scroll", () => {
  if (!nav) return;
  nav.style.boxShadow = window.scrollY > 20
    ? "0 4px 20px rgba(0,0,0,.15)"
    : "0 2px 12px rgba(0,0,0,.08)";
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (id.length > 1) {
      const el = document.querySelector(id);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth" }); }
    }
  });
});
// ====================================
// =====================================
// ===================================
// =====================================
// ===================================
// =====================================
// concatenate two files 
// this second file 
// =================================
// =================================
// ============================


const clientLogin = document.getElementById("client-login");
if(clientLogin) clientLogin.addEventListener("submit", function(e){
  e.preventDefault(); // prevent reload

  // if the validation is correct entry
  window.location.href = "category.html";
});

const clientRegister = document.getElementById("client-register");
if(clientRegister) clientRegister.addEventListener("submit", function(e){
  e.preventDefault(); // prevent reload

  // if the validation is correct entry
  window.location.href = "category.html";
});

  // removed broken redirect

function setupPassword(inputId, barId, textId, prefix){
  const input = document.getElementById(inputId);
  if(!input) return;

  const bar = document.getElementById(barId);
  const text = document.getElementById(textId);

  const lengthRule = document.getElementById(prefix+"-length");
  const upperRule = document.getElementById(prefix+"-upper");
  const lowerRule = document.getElementById(prefix+"-lower");
  const numberRule = document.getElementById(prefix+"-number");
  const specialRule = document.getElementById(prefix+"-special");

  input.addEventListener("input", () => {
    let val = input.value;
    let strength = 0;

    if(val.length >= 8){ lengthRule.classList.add("valid"); strength++; }
    else lengthRule.classList.remove("valid");

    if(/[A-Z]/.test(val)){ upperRule.classList.add("valid"); strength++; }
    else upperRule.classList.remove("valid");

    if(/[a-z]/.test(val)){ lowerRule.classList.add("valid"); strength++; }
    else lowerRule.classList.remove("valid");

    if(/[0-9]/.test(val)){ numberRule.classList.add("valid"); strength++; }
    else numberRule.classList.remove("valid");

    if(/[^A-Za-z0-9]/.test(val)){ specialRule.classList.add("valid"); strength++; }
    else specialRule.classList.remove("valid");

   bar.classList.remove("weak","medium","strong");

    if(strength <= 2){
      bar.classList.add("weak");
      text.innerText = "Weak";
    } else if(strength <= 4){
      bar.classList.add("medium");
      text.innerText = "Medium";
    } else {
      bar.classList.add("strong");
      text.innerText = "Strong";
    }
  });
}

// apply on both
setupPassword("clientPassword","client-strength-bar","client-strength-text","c");
setupPassword("artisanPassword","artisan-strength-bar","artisan-strength-text","a");
