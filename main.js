// Home page categories + scroll reveal
const CATS = [
  { icon:"bi-tree", title:"Woodworking", desc:"Custom furniture, cabinetry & wood crafts." },
  { icon:"bi-cup", title:"Ceramics", desc:"Pottery, sculpture & ceramic art." },
  { icon:"bi-hammer", title:"Metalwork", desc:"Blacksmithing, welding & metal fabrication." },
  { icon:"bi-bag", title:"Leathercraft", desc:"Bags, belts, shoes & leather goods." },
  { icon:"bi-droplet-half", title:"Glassblowing", desc:"Art glass, vessels & decorative pieces." },
  { icon:"bi-scissors", title:"Textile Arts", desc:"Weaving, embroidery & fabric design." },
  { icon:"bi-gem", title:"Jewelry Making", desc:"Custom rings, necklaces & accessories." },
  { icon:"bi-house-door", title:"Furniture Making", desc:"Upholstery, restoration & custom pieces." },
];

const catsEl = document.getElementById("cats");
if (catsEl) {
  catsEl.innerHTML = CATS.map(c => `
    <div class="col-lg-3 col-md-6 reveal">
      <div class="cat-card">
        <div class="icon"><i class="bi ${c.icon}"></i></div>
        <h3>${c.title}</h3>
        <p>${c.desc}</p>
        <a href="craftsmen.html" class="browse">BROWSE <i class="bi bi-arrow-right"></i></a>
      </div>
    </div>`).join("");
}

// Scroll reveal
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => obs.observe(el));

// Navbar shadow
const nav = document.querySelector(".navbar-craft");
window.addEventListener("scroll", () => {
  if (!nav) return;
  nav.style.boxShadow = window.scrollY > 20 ? "0 4px 20px rgba(0,0,0,.15)" : "0 2px 12px rgba(0,0,0,.08)";
});
// 
