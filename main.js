/* MAIN.JS — All effects: loader, floating decor, luxury sparkle cursor trail, confetti, music start, page transitions */

/* ========== Page loader hide & disable scroll until ready ========== */
window.addEventListener('load', () => {
  // hide loader after 2.7s gracefully
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'none';
  }, 2700);

  // allow fade transitions on navigation
  document.querySelectorAll('a').forEach(a => {
    // only for internal links
    if (a.href && a.getAttribute('href') && a.getAttribute('href').startsWith('#') === false) {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (href && !href.startsWith('http') && !a.target) {
          e.preventDefault();
          document.body.classList.add('fade-out');
          setTimeout(() => { window.location = href; }, 350);
        }
      });
    }
  });
});


/* ========== BACKGROUND MUSIC: play on first user interaction ========== */
(function setupMusic() {
  const audioEl = document.getElementById('bg-music');
  if (!audioEl) return;

  // Attempt to play once (may be blocked)
  audioEl.volume = 0.28;
  audioEl.loop = true;
  audioEl.play().catch(()=>{ /* blocked */ });

  // Ensure play on first user gesture
  const startAudio = () => {
    audioEl.play().catch(()=>{});
    window.removeEventListener('click', startAudio);
    window.removeEventListener('touchstart', startAudio);
  };
  window.addEventListener('click', startAudio, { once: true });
  window.addEventListener('touchstart', startAudio, { once: true });
})();


/* ========== FLOATING DECOR GENERATOR (bows / butterflies / sparkles) ========== */
(function floatingDecor() {
  const container = document.getElementById('floating-decor');
  if (!container) return;
  const symbols = ['🦋','🎀','✨','💫'];

  function spawn() {
    const el = document.createElement('div');
    el.className = 'decor-item';
    el.innerText = symbols[Math.floor(Math.random()*symbols.length)];
    el.style.position = 'absolute';
    el.style.left = Math.random()*100 + 'vw';
    el.style.top = (100 + Math.random()*20) + 'vh';
    el.style.fontSize = (Math.random()*18 + 18) + 'px';
    el.style.opacity = 0.9;
    el.style.pointerEvents = 'none';
    el.style.transform = `translateY(0) rotate(${Math.random()*360}deg)`;
    container.appendChild(el);

    const dur = 8000 + Math.random()*7000;
    el.animate([
      { transform: `translateY(0) rotate(0deg)`, opacity: 0.95 },
      { transform: `translateY(-140vh) rotate(${Math.random()*720}deg)`, opacity: 0.02 }
    ], { duration: dur, easing: 'linear', fill: 'forwards' });

    setTimeout(()=> el.remove(), dur+50);
  }

  setInterval(spawn, 900);
})();

/* ========== LUXURY SPARKLE CURSOR TRAIL (Option 4) ========== */
(function sparkleCursorTrail(){
  const trailChars = ['✨','✦','✶','✵'];
  const cleanup = 1200;

  function createSpark(x,y){
    const s = document.createElement('div');
    s.className = 'spark-trail';
    s.style.position = 'fixed';
    s.style.left = x + 'px';
    s.style.top = y + 'px';
    s.style.pointerEvents = 'none';
    s.style.zIndex = 9999;
    s.style.fontSize = (8 + Math.random()*12) + 'px';
    s.style.opacity = 0.95;
    s.innerText = trailChars[Math.floor(Math.random()*trailChars.length)];
    s.style.transform = `translate(-50%,-50%) scale(${0.8 + Math.random()*0.6})`;
    s.style.transition = `transform ${cleanup}ms linear, opacity ${cleanup}ms linear`;
    document.body.appendChild(s);

    requestAnimationFrame(()=> {
      s.style.transform = `translate(-50%,-50%) translateY(-40px) scale(${0.2 + Math.random()*0.6})`;
      s.style.opacity = '0';
    });

    setTimeout(()=> s.remove(), cleanup);
  }

  let lastMove = 0;
  window.addEventListener('mousemove', (e)=>{
    const now = Date.now();
    if (now - lastMove > 30){
      createSpark(e.clientX, e.clientY);
      lastMove = now;
    }
  });
  window.addEventListener('touchmove', (e)=>{
    const t = e.touches[0];
    if (t) createSpark(t.clientX, t.clientY);
  });
})();

/* ========== CONFETTI BURST (used on surprise page) ========== */
window.createConfettiBurst = function(){
  const items = ['✨','🎀','💫','💞','✦'];
  for(let i=0;i<40;i++){
    const c = document.createElement('div');
    c.className = 'confetti';
    c.innerText = items[Math.floor(Math.random()*items.length)];
    c.style.left = Math.random()*100 + 'vw';
    c.style.fontSize = (12 + Math.random()*20) + 'px';
    c.style.animationDuration = (2 + Math.random()*2) + 's';
    document.body.appendChild(c);
    setTimeout(()=> c.remove(), 4500);
  }
};
