
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
menuBtn?.addEventListener('click',()=> {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('visible'); observer.unobserve(e.target);}
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

const glow = document.querySelector('.cursor-glow');
window.addEventListener('mousemove', e=>{
  if(glow){glow.style.left=e.clientX+'px'; glow.style.top=e.clientY+'px';}
});

const modal = document.getElementById('mediaModal');
const modalImg = document.getElementById('modalImage');
const modalVideo = document.getElementById('modalVideo');

function openModal(type){
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  if(type==='image'){ modalImg.style.display='block'; modalVideo.style.display='none';}
  else { modalImg.style.display='none'; modalVideo.style.display='block';}
}
document.querySelector('.event-open')?.addEventListener('click',()=>openModal('image'));
document.querySelectorAll('.play-trigger').forEach(b=>b.addEventListener('click',()=>openModal('video')));
document.querySelector('.modal-close')?.addEventListener('click',()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true');});
modal?.addEventListener('click',e=>{if(e.target===modal){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');}});

let sliderIndex=0;
const track=document.querySelector('.event-track');
const slides=[...document.querySelectorAll('.event-slide')];
function moveSlider(dir){
  if(!track || !slides.length) return;
  const perView = window.innerWidth < 620 ? 1 : window.innerWidth < 980 ? 2 : 3;
  const max = Math.max(0, slides.length-perView);
  sliderIndex = Math.min(max, Math.max(0, sliderIndex+dir));
  const gap=16;
  const w=slides[0].getBoundingClientRect().width+gap;
  track.style.transform=`translateX(${-sliderIndex*w}px)`;
}
document.querySelector('.slide-prev')?.addEventListener('click',()=>moveSlider(-1));
document.querySelector('.slide-next')?.addEventListener('click',()=>moveSlider(1));

document.getElementById('quoteForm')?.addEventListener('submit', e=>{
  e.preventDefault();
  const fd = new FormData(e.currentTarget);
  const subject = encodeURIComponent('Demande de devis - La Baronne de Bruxelles');
  const body = encodeURIComponent(
`Bonjour La Baronne de Bruxelles,

Je souhaite recevoir un devis.

Nom : ${fd.get('nom') || ''}
Téléphone : ${fd.get('telephone') || ''}
E-mail : ${fd.get('email') || ''}
Date : ${fd.get('date') || ''}
Type d'événement : ${fd.get('type') || ''}
Nombre d'invités : ${fd.get('invites') || ''}

Mon projet :
${fd.get('message') || ''}`
  );
  window.location.href=`mailto:Bjulienne206@yahoo.com?subject=${subject}&body=${body}`;
});

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
window.addEventListener('scroll',()=>{
  let current='';
  sections.forEach(s=>{ if(scrollY >= s.offsetTop-160) current=s.id; });
  navLinks.forEach(a=>a.classList.toggle('active', a.getAttribute('href')==='#'+current));
});
