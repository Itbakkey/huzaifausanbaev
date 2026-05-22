 // ── CURSOR
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  // ── MARQUEE
  const techs = ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'GraphQL', 'Next.js', 'Redis', 'MongoDB'];
  const track = document.getElementById('marqueeTrack');
  [...techs, ...techs, ...techs].forEach(t => {
    const el = document.createElement('div');
    el.className = 'marquee-item';
    el.innerHTML = t + '<div class="marquee-sep"></div>';
    track.appendChild(el);
  });

  // ── SCROLL REVEAL
   const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');

        // Counter animation
        e.target.querySelectorAll('[data-target]').forEach(el => {
          const target = +el.dataset.target;
          let val = 0;
          const step = target / 60;
          const iv = setInterval(() => {
            val = Math.min(val + step, target);
            el.textContent = Math.round(val) + (target === 99 ? '%' : '+');
            if (val >= target) clearInterval(iv);
          }, 25);
        });

        // Experience counter
        if (e.target.id === 'expCount') {
          let v = 0;
          const iv = setInterval(() => {
            v++;
            document.getElementById('expCounter').textContent = v;
            if (v >= 5) clearInterval(iv);
          }, 200);
        }
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // About card float counter
  const aboutObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        let v = 0;
        const iv = setInterval(() => {
          v++;
          document.getElementById('expCounter').textContent = v + '+';
          if (v >= 5) clearInterval(iv);
        }, 150);
        aboutObs.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const aboutVis = document.querySelector('.about-visual');
  if (aboutVis) aboutObs.observe(aboutVis);

  // ── FORM SUBMIT
  document.querySelector('.btn-submit').addEventListener('click', function() {
    this.textContent = '✓ Отправлено!';
    this.style.background = 'linear-gradient(135deg, #00FF94, #00D4FF)';
    this.style.color = '#000';
    setTimeout(() => {
      this.textContent = 'Отправить сообщение →';
      this.style.background = '';
      this.style.color = '';
    }, 3000);
  });

  // ── PROJECT ITEMS hover sound-ish effect (visual)
  document.querySelectorAll('.project-item').forEach((item, i) => {
    item.style.transitionDelay = (i * 0.05) + 's';
  });

  // ── NAV active on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current
        ? 'rgba(255,255,255,0.9)'
        : '';
    });
  });