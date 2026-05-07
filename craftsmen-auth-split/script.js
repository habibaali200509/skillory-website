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

document.getElementById("client-login").addEventListener("submit", function(e){
  e.preventDefault(); // prevent reload

  // if the validation is correct entry
  window.location.href = "../category.html";
});

document.getElementById("client-register").addEventListener("submit", function(e){
  e.preventDefault(); // prevent reload

  // if the validation is correct entry
  window.location.href = "../category.html";
});
function goDashboard(){
  window.location.href = "../artisan-dashboard.html";
}
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
