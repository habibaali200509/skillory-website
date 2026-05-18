const grid = document.getElementById("grid");
grid.innerHTML = window.CRAFTSMEN.map(c => {
  const dotCls = c.availability === "Busy" ? "busy" : c.availability === "Offline" ? "off" : "";
  const open = c.availability === "Available" ? "Yes" : c.availability === "Busy" ? "Soon" : "No";
  return `
  <div class="col-lg-4 col-md-6">
    <article class="craft-card">
      <div class="top">
        <div class="avatar"><i class="bi bi-person"></i></div>
        <div>
          <h3 class="name">${c.name}</h3>
          <div class="meta"><span class="stars">${window.starsHTML(c.rating)}</span><span>${c.rating.toFixed(1)} (${c.reviews})</span></div>
          <div class="meta mt-1"><i class="bi bi-geo-alt"></i> ${c.location}</div>
        </div>
      </div>
      <p class="bio">${c.bio}</p>
      <div class="tags">${c.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
      <div class="stats">
        <div class="stat"><span class="v">${c.experience}</span><span class="l">Experience</span></div>
        <div class="stat"><span class="v">${c.rate}</span><span class="l">Rate</span></div>
        <div class="stat"><span class="v">${open}</span><span class="l">Open</span></div>
      </div>
      <div class="availability"><span class="dot ${dotCls}"></span>${c.availability}</div>
      <div class="actions">
        <a href="profile.html?id=${c.id}" class="btn-orange sm">View Profile</a>
        <button class="btn-outline-navy sm">Contact</button>
      </div>
    </article>
  </div>`;
}).join("");
