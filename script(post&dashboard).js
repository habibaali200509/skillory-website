// Year stamp
document.querySelectorAll('#yr').forEach(el => el.textContent = new Date().getFullYear());

const STORAGE_KEY = 'craftsmen_requests';

const seed = [
  { id:'s1', title:'Fix broken kitchen cabinet', description:'Two hinges are loose and the door wobbles. Need it secured today if possible.', category:'Carpentry', budget:350, location:'Maarif, Casablanca' },
  { id:'s2', title:'Install new bathroom shelves', description:'3 floating shelves on a tiled wall. Materials provided.', category:'Carpentry', budget:600, location:'Gauthier, Casablanca' },
  { id:'s3', title:'Repair wooden front door', description:'Door is warped and won\'t close properly. Looking for a quick assessment.', category:'Carpentry', budget:450, location:'Ain Diab, Casablanca' }
];

function loadRequests(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(raw) return JSON.parse(raw);
  }catch(e){}
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  return seed.slice();
}
function saveRequests(list){ localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); }

function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}

function cardHtml(r){
  return `
  <div class="col-md-6 col-xl-4" data-id="${r.id}">
    <article class="req-card">
      <h3 class="req-title h6">${escapeHtml(r.title)}</h3>
      <div class="req-meta">
        <span class="chip"><i class="bi bi-tag"></i> ${escapeHtml(r.category)}</span>
        <span class="chip"><i class="bi bi-geo-alt"></i> ${escapeHtml(r.location)}</span>
        <span class="chip budget"><i class="bi bi-cash-coin"></i> ${Number(r.budget).toLocaleString()} DH</span>
      </div>
      <p class="req-desc mb-0">${escapeHtml(r.description)}</p>
      <div class="req-actions">
        <button class="btn-accept" data-action="accept"><i class="bi bi-check2"></i> Accept</button>
        <button class="btn-reject" data-action="reject"><i class="bi bi-x"></i> Reject</button>
      </div>
    </article>
  </div>`;
}

function renderDashboard(){
  const grid = document.getElementById('requestsGrid');
  if(!grid) return;
  const list = loadRequests();
  grid.innerHTML = list.map(cardHtml).join('');
  document.getElementById('reqCount').textContent = list.length;
  document.getElementById('emptyState').classList.toggle('d-none', list.length>0);

  grid.querySelectorAll('button[data-action]').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const col = btn.closest('[data-id]');
      const id = col.dataset.id;
      const action = btn.dataset.action;
      const card = col.querySelector('.req-card');
      if(action==='accept'){
        card.classList.add('accepted');
        btn.innerHTML = '<i class="bi bi-check2-all"></i> Accepted';
        col.querySelectorAll('button').forEach(b=>b.disabled=true);
        setTimeout(()=>removeRequest(id, col), 900);
      }else{
        card.classList.add('removing');
        setTimeout(()=>removeRequest(id, col), 250);
      }
    });
  });
}

function removeRequest(id, col){
  const list = loadRequests().filter(r=>r.id!==id);
  saveRequests(list);
  col?.remove();
  const countEl = document.getElementById('reqCount');
  if(countEl) countEl.textContent = list.length;
  document.getElementById('emptyState')?.classList.toggle('d-none', list.length>0);
}

// Form
const form = document.getElementById('problemForm');
if(form){
  form.addEventListener('submit', e=>{
    e.preventDefault();
    if(!form.checkValidity()){ form.classList.add('was-validated'); return; }
    const fd = new FormData(form);
    const newReq = {
      id: 'r' + Date.now(),
      title: fd.get('title').trim(),
      description: fd.get('description').trim(),
      category: fd.get('category'),
      budget: Number(fd.get('budget')),
      location: fd.get('location').trim()
    };
    const list = loadRequests();
    list.unshift(newReq);
    saveRequests(list);
    document.getElementById('formAlert').classList.remove('d-none');
    form.reset(); form.classList.remove('was-validated');
    setTimeout(()=>{ window.location.href = 'artisan-dashboard.html'; }, 1100);
  });
}

renderDashboard();
