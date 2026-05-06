// Shared data + helpers for Craftsmen static site
window.CRAFTSMEN = [
  { id:"1", name:"James Morrison", rating:4.9, reviews:127, location:"Portland, OR", bio:"Master woodworker specializing in heirloom-quality furniture and custom cabinetry.", tags:["Custom Furniture","Cabinetry","Wood Carving"], experience:"18 yrs", rate:"$85/hr", availability:"Available" },
  { id:"2", name:"Elena Vasquez", rating:4.8, reviews:94, location:"Santa Fe, NM", bio:"Ceramic artist crafting hand-thrown pottery with traditional and contemporary glazes.", tags:["Pottery","Sculpture","Glazing"], experience:"12 yrs", rate:"$60/hr", availability:"Available" },
  { id:"3", name:"Marcus Chen", rating:5.0, reviews:58, location:"Brooklyn, NY", bio:"Blacksmith and metal fabricator producing architectural ironwork and custom hardware.", tags:["Blacksmithing","Welding","Architectural"], experience:"15 yrs", rate:"$95/hr", availability:"Busy" },
  { id:"4", name:"Sophie Laurent", rating:4.7, reviews:81, location:"Austin, TX", bio:"Leather artisan handcrafting bespoke bags, belts and small leather goods.", tags:["Leathercraft","Bags","Hand-stitching"], experience:"9 yrs", rate:"$55/hr", availability:"Available" },
  { id:"5", name:"Daniel O'Hara", rating:4.9, reviews:142, location:"Seattle, WA", bio:"Glassblower creating sculptural vessels and lighting for residential and gallery spaces.", tags:["Glassblowing","Lighting","Sculpture"], experience:"20 yrs", rate:"$110/hr", availability:"Offline" },
  { id:"6", name:"Amara Johnson", rating:4.8, reviews:76, location:"Charleston, SC", bio:"Textile artist weaving custom rugs, wall hangings and contemporary fiber works.", tags:["Weaving","Embroidery","Fiber Art"], experience:"11 yrs", rate:"$50/hr", availability:"Available" },
];

window.starsHTML = function(rating){
  const full = Math.floor(rating);
  const half = (rating - full) >= 0.5;
  let html = "";
  for (let i=0;i<full;i++) html += '<i class="bi bi-star-fill"></i>';
  if (half) html += '<i class="bi bi-star-half"></i>';
  for (let i=0;i<5-full-(half?1:0);i++) html += '<i class="bi bi-star"></i>';
  return html;
};

window.getQueryParam = function(name){
  return new URLSearchParams(window.location.search).get(name);
};
