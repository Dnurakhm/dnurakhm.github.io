/* script.js
 - Countdown 48h (session)
 - Reveal on scroll (IntersectionObserver)
 - Counters animation
 - Offcanvas menu control
 - Parallax subtle bg
 - Floating contacts visibility
 - Smooth anchor scroll
*/
(function () {
 // ---- Countdown (48 hours/session) ----
 (function countdown() {
   const KEY = 'promo_end_v6';
   const DURATION = 48 * 3600;
   let end = sessionStorage.getItem(KEY);
   if (!end) {
     end = Math.floor(Date.now() / 1000) + DURATION;
     sessionStorage.setItem(KEY, end);
   } else end = Number(end);
   const el = document.getElementById('countdown');
   if (!el) return;
   function tick() {
     const now = Math.floor(Date.now() / 1000);
     let diff = Math.max(0, end - now);
     const hours = Math.floor(diff / 3600);
     const mins = Math.floor((diff % 3600) / 60);
     const secs = diff % 60;
     el.textContent = `${String(hours).padStart(2,'0')}:${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
     if (diff > 0) setTimeout(tick, 1000);
   }
   document.addEventListener('DOMContentLoaded', tick);
 })();
 // ---- Animate number ----
 function animateNumber(el, to, opts = {}) {
   if (!el) return;
   const dur = opts.duration || 1200;
   const isCurrency = opts.currency || false;
   const suffix = opts.suffix || '';
   const start = 0;
   const startTs = performance.now();
   function frame(now) {
     const t = Math.min((now - startTs) / dur, 1);
     const val = Math.floor(start + (to - start) * t);
     if (isCurrency) el.textContent = val.toLocaleString('ru-RU') + ' ₸';
     else el.textContent = val.toLocaleString('ru-RU') + suffix;
     if (t < 1) requestAnimationFrame(frame);
   }
   requestAnimationFrame(frame);
 }
 // ---- Counters init ----
 function initCounters() {
   const items = [
     { id: 'stat-clients', to: 120, opts: { duration: 1200, suffix: '+' } },
     { id: 'stat-saved', to: 10000000, opts: { duration: 1400, currency: true } },
     { id: 'stat-years', to: 7, opts: { duration: 1000 } }
   ];
   items.forEach((it, i) => {
     const el = document.getElementById(it.id);
     if (!el) return;
     const run = () => setTimeout(() => animateNumber(el, it.to, it.opts), i * 250);
     const rect = el.getBoundingClientRect();
     if (rect.top < window.innerHeight) run();
     else {
       const io = new IntersectionObserver((entries, ob) => {
         entries.forEach(entry => {
           if (entry.isIntersecting) {
             run();
             ob.unobserve(entry.target);
           }
         });
       }, { threshold: 0.2 });
       io.observe(el);
     }
   });
 }
 // ---- Reveal animation ----
 function initReveal() {
   const items = document.querySelectorAll('[data-anim], .card');
   const io = new IntersectionObserver((entries, ob) => {
     entries.forEach(entry => {
       if (entry.isIntersecting) {
         const el = entry.target;
         el.classList.add('in-view');
         const inner = el.querySelectorAll('.card');
         inner.forEach(c => c.classList.add('in-view'));
         ob.unobserve(el);
       }
     });
   }, { threshold: 0.12 });
   items.forEach(i => io.observe(i));
   // reveal already visible cards
   document.querySelectorAll('.card').forEach(c => {
     if (c.getBoundingClientRect().top < window.innerHeight) c.classList.add('in-view');
   });
 }
 // ---- Offcanvas menu ----
 function initOffcanvas() {
   const off = document.getElementById('offcanvas');
   const btn = document.getElementById('menuBtn');
   const closeBtn = document.getElementById('offClose');
   if (!off || !btn) return;
   btn.addEventListener('click', () => {
     off.classList.add('open');
     off.setAttribute('aria-hidden', 'false');
     document.body.style.overflow = 'hidden';
   });
   if (closeBtn) closeBtn.addEventListener('click', closeOff);
   off.addEventListener('click', (e) => {
     if (e.target === off) closeOff();
   });
   function closeOff() {
     off.classList.remove('open');
     off.setAttribute('aria-hidden', 'true');
     document.body.style.overflow = '';
   }
   // close when clicking a link
   off.querySelectorAll('.off-link').forEach(a => a.addEventListener('click', closeOff));
 }
 // ---- Parallax background (subtle) ----
 function initParallax() {
   const bg = document.querySelector('.hero-bg');
   if (!bg) return;
   window.addEventListener('scroll', () => {
     const sc = window.scrollY;
     bg.style.transform = `translateY(${sc * 0.03}px) scale(1.02)`;
   }, { passive: true });
 }
 // ---- Fixed contacts visibility on mobile ----
 function initFixedContacts() {
   const fc = document.querySelector('.fixed-contacts');
   if (!fc) return;
   function toggle() { fc.style.display = window.innerWidth <= 720 ? 'flex' : 'none'; }
   window.addEventListener('resize', toggle);
   toggle();
 }
 // ---- Smooth anchors ----
 function initSmooth() {
   document.querySelectorAll('a[href^="#"]').forEach(a => {
     a.addEventListener('click', function (e) {
       const href = this.getAttribute('href');
       if (href && href.length > 1) {
         e.preventDefault();
         const target = document.querySelector(href);
         if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
       }
     });
   });
 }
 // ---- Init ----
 document.addEventListener('DOMContentLoaded', () => {
   initReveal();
   initCounters();
   initOffcanvas();
   initParallax();
   initFixedContacts();
   initSmooth();
 });
})();