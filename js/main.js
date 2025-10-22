// Interactivity and polish for the portfolio
(function(){
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);

  function setIcon() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (toggle) toggle.textContent = isLight ? '🌞' : '🌙';
  }
  setIcon();

  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      setIcon();
    });
  }

  // Typing effect for subtitle
  const typingEl = document.querySelector('.typing');
  if (typingEl) {
    const text = typingEl.getAttribute('data-text') || '';
    let i = 0; typingEl.textContent = '';
    const loop = () => {
      if (i <= text.length) {
        typingEl.textContent = text.slice(0, i) + (i % 2 === 0 ? '|' : '');
        i++; setTimeout(loop, 60);
      } else { typingEl.textContent = text; }
    };
    loop();
  }

  // IntersectionObserver to reveal cards on scroll
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Animated gradient particles canvas background
  const canvas = document.getElementById('bg');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H; const dots = Array.from({length: 36}, ()=>({
      x: Math.random(), y: Math.random(), r: Math.random()*2+0.4,
      vx: (Math.random()*2-1)*0.0004, vy: (Math.random()*2-1)*0.0004
    }));
    const resize = () => { W = canvas.width = innerWidth; H = canvas.height = innerHeight; };
    addEventListener('resize', resize); resize();
    function step(){
      ctx.clearRect(0,0,W,H);
      for (const d of dots){
        d.x += d.vx; d.y += d.vy;
        if (d.x<0||d.x>1) d.vx*=-1; if (d.y<0||d.y>1) d.vy*=-1;
        const x = d.x*W, y = d.y*H;
        const g = ctx.createRadialGradient(x,y,0,x,y,60);
        g.addColorStop(0, 'rgba(124,58,237,0.25)');
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x,y,60,0,Math.PI*2); ctx.fill();
      }
      requestAnimationFrame(step);
    }
    step();
  }

  // Current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
