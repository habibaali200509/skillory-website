const PORTFOLIO = ["Walnut Dining Table","Oak Bookshelf","Carved Mantel","Custom Cabinetry","Live-Edge Bench","Heirloom Chest"];
const REVIEWS = [
  { name:"Sarah Mitchell", rating:5, date:"Mar 2026", text:"Absolutely stunning craftsmanship. The dining table exceeded every expectation — communication was clear and the timeline was respected." },
  { name:"David Park", rating:5, date:"Feb 2026", text:"A true professional. Took the time to understand exactly what I wanted and delivered a heirloom piece our family will treasure." },
  { name:"Linda Okafor", rating:4, date:"Jan 2026", text:"Beautiful work and very fair pricing. Took slightly longer than estimated but the quality made it worth the wait." },
  { name:"Tom Reyes", rating:5, date:"Dec 2025", text:"Highly recommend. Attention to detail is unmatched and the finished bookshelf is a centerpiece in our home." },
];
const id = window.getQueryParam("id");
const found = window.CRAFTSMEN.find(c => c.id === id);
const root = document.getElementById("profile-root");

if(!found){
  root.innerHTML = `<section class="pf-hero"><h1 class="pf-name">Craftsman not found</h1><p class="pf-meta justify-content-center">No artisan exists with id "${id}".</p></section>`;
} else {
  document.title = `Craftsman Profile — ${found.name}`;
  const profile = { ...found, projects:"240+", response:"< 2h", skills:found.tags };
  let tab = "portfolio";
  function renderPanel(){
    if(tab==="portfolio"){
      return `<div class="pf-panel"><div class="row g-4">${PORTFOLIO.map(it => `
        <div class="col-lg-4 col-md-6"><div class="pf-portfolio-item"><i class="bi bi-image"></i><span class="label">${it}</span></div></div>`).join("")}</div></div>`;
    }
    if(tab==="reviews"){
      return `<div class="pf-panel">${REVIEWS.map(r => `
        <article class="pf-review"><div class="head"><div><div class="who">${r.name}</div><span class="pf-stars">${window.starsHTML(r.rating)}</span></div><span class="date">${r.date}</span></div><p class="text">${r.text}</p></article>`).join("")}</div>`;
    }
    return `<div class="pf-panel"><div class="pf-about">
      <h3>Biography</h3>
      <p>${profile.bio}</p>
      <p>Based in ${profile.location} with ${profile.experience} of dedicated practice, ${profile.name.split(" ")[0]} approaches every commission as a long-term collaboration — from initial concept through hand-finished delivery.</p>
      <h3>Skills & Specialties</h3>
      <div class="pf-skills">${profile.skills.map(s => `<span class="pf-skill">${s}</span>`).join("")}</div>
      <h3>At a Glance</h3>
      <div class="pf-stats">
        <div class="pf-stat"><span class="v">${profile.experience}</span><span class="l">Experience</span></div>
        <div class="pf-stat"><span class="v">${profile.projects}</span><span class="l">Projects</span></div>
        <div class="pf-stat"><span class="v">${profile.rate}</span><span class="l">Hourly Rate</span></div>
        <div class="pf-stat"><span class="v">${profile.response}</span><span class="l">Response Time</span></div>
      </div></div></div>`;
  }
  function render(){
    root.innerHTML = `
      <section class="pf-hero">
        <div class="pf-avatar"><i class="bi bi-person"></i></div>
        <h1 class="pf-name">${profile.name}</h1>
        <div class="pf-meta">
          <span><span class="pf-stars">${window.starsHTML(profile.rating)}</span> ${profile.rating.toFixed(1)} (${profile.reviews} reviews)</span>
          <span><i class="bi bi-geo-alt"></i> ${profile.location}</span>
        </div>
        <div class="pf-actions">
          <button class="btn-orange">Contact Craftsman</button>
        </div>
      </section>
      <div class="pf-tabs" role="tablist">
        <button class="pf-tab ${tab==="portfolio"?"active":""}" data-t="portfolio"><i class="bi bi-grid me-2"></i>Portfolio</button>
        <button class="pf-tab ${tab==="reviews"?"active":""}" data-t="reviews"><i class="bi bi-chat-quote me-2"></i>Reviews</button>
        <button class="pf-tab ${tab==="about"?"active":""}" data-t="about"><i class="bi bi-person-lines-fill me-2"></i>About</button>
      </div>
      ${renderPanel()}`;
    root.querySelectorAll(".pf-tab").forEach(b => b.addEventListener("click", () => { tab = b.dataset.t; render(); }));
  }
  render();
}
