const PORTFOLIO = [
  "Walnut Dining Table","Oak Bookshelf","Carved Mantel",
  "Custom Cabinetry","Live-Edge Bench","Heirloom Chest"
];
const REVIEWS = [
  { name:"Sarah Mitchell", rating:5, date:"Mar 2026", text:"Absolutely stunning craftsmanship. The dining table exceeded every expectation — communication was clear and the timeline was respected." },
  { name:"David Park", rating:5, date:"Feb 2026", text:"A true professional. Took the time to understand exactly what I wanted and delivered a heirloom piece our family will treasure." },
  { name:"Linda Okafor", rating:4, date:"Jan 2026", text:"Beautiful work and very fair pricing. Took slightly longer than estimated but the quality made it worth the wait." },
  { name:"Tom Reyes", rating:5, date:"Dec 2025", text:"Highly recommend. Attention to detail is unmatched and the finished bookshelf is a centerpiece in our home." }
];

const id = window.getQueryParam("id");
const found = window.CRAFTSMEN.find(c => c.id === id);
const main = document.getElementById("main");

if (!found) {
  main.innerHTML = `
    <section class="pf-hero">
      <h1 class="pf-name">Craftsman not found</h1>
      <p class="pf-meta justify-content-center">No artisan exists with id "${id || ''}".</p>
    </section>`;
} else {
  const p = found;
  document.title = `${p.name} — Craftsman Profile`;

  const portfolioHTML = PORTFOLIO.map(item => `
    <div class="col-lg-4 col-md-6">
      <div class="pf-portfolio-item">
        <i class="bi bi-image"></i>
        <span class="label">${item}</span>
      </div>
    </div>`).join("");

  const reviewsHTML = REVIEWS.map(r => `
    <article class="pf-review">
      <div class="head">
        <div>
          <div class="who">${r.name}</div>
          <span class="pf-stars">${window.starsHTML(r.rating)}</span>
        </div>
        <span class="date">${r.date}</span>
      </div>
      <p class="text">${r.text}</p>
    </article>`).join("");

  const aboutHTML = `
    <div class="pf-about">
      <h3>Biography</h3>
      <p>${p.bio}</p>
      <p>Based in ${p.location} with ${p.experience} of dedicated practice, ${p.name.split(" ")[0]} approaches every commission as a long-term collaboration — from initial concept through hand-finished delivery.</p>
      <h3>Skills & Specialties</h3>
      <div class="pf-skills">${p.tags.map(s => `<span class="pf-skill">${s}</span>`).join("")}</div>
      <h3>At a Glance</h3>
      <div class="pf-stats">
        <div class="pf-stat"><span class="v">${p.experience}</span><span class="l">Experience</span></div>
        <div class="pf-stat"><span class="v">240+</span><span class="l">Projects</span></div>
        <div class="pf-stat"><span class="v">${p.rate}</span><span class="l">Hourly Rate</span></div>
        <div class="pf-stat"><span class="v">&lt; 2h</span><span class="l">Response Time</span></div>
      </div>
    </div>`;

  main.innerHTML = `
    <section class="pf-hero">
      <div class="pf-avatar"><i class="bi bi-person"></i></div>
      <h1 class="pf-name">${p.name}</h1>
      <div class="pf-meta">
        <span><span class="pf-stars">${window.starsHTML(p.rating)}</span> ${p.rating.toFixed(1)} (${p.reviews} reviews)</span>
        <span><i class="bi bi-geo-alt"></i> ${p.location}</span>
      </div>
      <div class="pf-actions">
        <button class="btn-orange">Contact Craftsman</button>
      </div>
    </section>

    <div class="pf-tabs" role="tablist">
      <button class="pf-tab active" data-tab="portfolio"><i class="bi bi-grid me-2"></i>Portfolio</button>
      <button class="pf-tab" data-tab="reviews"><i class="bi bi-chat-quote me-2"></i>Reviews</button>
      <button class="pf-tab" data-tab="about"><i class="bi bi-person-lines-fill me-2"></i>About</button>
    </div>

    <div class="pf-panel" data-panel="portfolio"><div class="row g-4">${portfolioHTML}</div></div>
    <div class="pf-panel hidden" data-panel="reviews">${reviewsHTML}</div>
    <div class="pf-panel hidden" data-panel="about">${aboutHTML}</div>
  `;

  document.querySelectorAll(".pf-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      const t = btn.dataset.tab;
      document.querySelectorAll(".pf-tab").forEach(b => b.classList.toggle("active", b === btn));
      document.querySelectorAll(".pf-panel").forEach(p => {
        const active = p.dataset.panel === t;
        p.classList.toggle("hidden", !active);
        if (active) { p.style.animation = "none"; void p.offsetWidth; p.style.animation = ""; }
      });
    });
  });
}
