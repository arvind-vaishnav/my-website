const products = {
  windows: {
    icon: '🪟', title: 'Aluminium Windows', subtitle: 'Sliding · Fixed · Casement',
    desc: 'We manufacture aluminium windows in all standard and custom sizes. Available in sliding, fixed, casement and combination styles. Powder coated in any colour. Suitable for homes, offices and commercial buildings.',
    features: ['Sliding Windows','Fixed Windows','Casement Windows','Powder Coated','Custom Sizes','Mosquito Mesh Option','Single & Double Glass'],
    slots: 6
  },
  doors: {
    icon: '🚪', title: 'Aluminium Doors', subtitle: 'Main Doors · Sliding · Entry',
    desc: 'Precision fabricated aluminium doors for main entrances, interiors and commercial spaces. Strong, lightweight and rust-proof. Available with glass panels, solid panels and custom designs.',
    features: ['Main Entry Doors','Sliding Doors','Folding Doors','Glass Panels','Custom Design','Rust-Proof','Heavy Duty Profile'],
    slots: 6
  },
  partitions: {
    icon: '🏢', title: 'Partitions & Sliders', subtitle: 'Office · Room Dividers · Commercial',
    desc: 'Aluminium and glass partition systems for offices, showrooms and homes. Sliding partitions, fixed partitions and full-height glass walls. Gives a modern, professional look to any space.',
    features: ['Office Partitions','Room Dividers','Glass Partitions','Sliding Systems','Full Height Walls','ACP Panels','Commercial Grade'],
    slots: 6
  },
  ventilation: {
    icon: '🌬️', title: 'Ventilation Nets', subtitle: 'Mosquito Nets · Ventilation Frames',
    desc: 'Aluminium framed ventilation nets and mosquito mesh windows. Custom sized for any wall or window opening. Durable, light and easy to maintain. Keeps insects out while allowing fresh air in.',
    features: ['Mosquito Mesh','Ventilation Frames','Custom Sizes','Powder Coated','Sliding Type','Fixed Type','SS Mesh Available'],
    slots: 4
  },
  railings: {
    icon: '🔩', title: 'Steel Railings', subtitle: 'Staircase · Balcony · Boundary',
    desc: 'Mild steel railings fabricated and installed for staircases, balconies and boundary fencing. Available in standard and custom designs. Can be painted or powder coated in any finish.',
    features: ['Staircase Railings','Balcony Guards','Boundary Fencing','Custom Designs','MS Steel','Painted Finish','Heavy Gauge'],
    slots: 6
  },
  custom: {
    icon: '✨', title: 'Custom Fabrication', subtitle: 'Any Design · Any Size',
    desc: 'Have a unique or non-standard requirement? We take on custom fabrication work in aluminium and steel. Share your design, drawing or idea and we will manufacture it to specification.',
    features: ['Custom Designs','Aluminium & Steel','Per Drawing','Any Size','Site Measurement','Consultation Free','Special Profiles'],
    slots: 4
  }
};

function openModal(key) {
  const p = products[key];
  document.getElementById('modal-icon').textContent = p.icon;
  document.getElementById('modal-title').textContent = p.title;
  document.getElementById('modal-subtitle').textContent = p.subtitle;
  document.getElementById('modal-desc').innerHTML = '<p style="padding:24px 36px 0;font-size:15px;color:#7a6a5a;line-height:1.8;">' + p.desc + '</p>';
  
  let gallery = '';
  for (let i = 1; i <= p.slots; i++) {
    gallery += `<div class="gallery-slot">
      <div class="gallery-slot-num">${String(i).padStart(2,'0')}</div>
      <div class="gallery-slot-icon">🖼️</div>
      <div class="gallery-slot-label">Add Image / 3D Model</div>
    </div>`;
  }
  document.getElementById('modal-gallery').innerHTML = gallery;

  let tags = p.features.map(f => `<span class="modal-feature-tag">${f}</span>`).join('');
  document.getElementById('modal-features').innerHTML = tags;

  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
// Scroll progress bar
window.addEventListener('scroll', () => {
  const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  document.getElementById('scroll-bar').style.width = scrolled + '%';
});

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// Add reveal classes dynamically to sections
const targets = [
  { sel: '.about-text', cls: 'reveal from-left' },
  { sel: '.about-card', cls: 'reveal from-right' },
  { sel: '.product-card', cls: 'reveal scale-in' },
  { sel: '.why-card', cls: 'reveal' },
  { sel: '.contact-info', cls: 'reveal from-left' },
  { sel: '.contact-card', cls: 'reveal from-right' },
  { sel: '.products-header', cls: 'reveal' },
  { sel: '.why-header', cls: 'reveal' },
  { sel: '.footer-logo', cls: 'reveal' },
  { sel: '.footer-tagline', cls: 'reveal reveal-delay-1' },
  { sel: '.footer-divider', cls: 'reveal reveal-delay-2' },
];

targets.forEach(({ sel, cls }) => {
  document.querySelectorAll(sel).forEach((el, i) => {
    cls.split(' ').forEach(c => el.classList.add(c));
    const delays = ['reveal-delay-1','reveal-delay-2','reveal-delay-3','reveal-delay-4','reveal-delay-5','reveal-delay-6'];
    if (sel === '.product-card' || sel === '.why-card') {
      el.classList.add(delays[i] || '');
    }
    observer.observe(el);
  });
});

// Magnetic button effect on primary buttons
document.querySelectorAll('.btn-primary, .btn-outline, .nav-cta').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    btn.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// Tilt effect on product cards
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `translateY(-8px) scale(1.02) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'all 0.5s cubic-bezier(0.22,1,0.36,1)';
  });
});

// Why card tilt
document.querySelectorAll('.why-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `translateY(-8px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// Stat number count-up animation
function animateCount(el, target, suffix) {
  let start = 0;
  const duration = 1200;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const nums = e.target.querySelectorAll('.stat-num');
      nums.forEach(n => {
        const txt = n.textContent;
        if (txt.includes('★')) animateCount(n, 5, '★');
        else if (txt.includes('+')) animateCount(n, parseInt(txt), '+');
        else if (txt.includes('%')) animateCount(n, parseInt(txt), '%');
        else animateCount(n, parseInt(txt), '');
      });
      statsObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

const statsEl = document.querySelector('.hero-stats');
if (statsEl) statsObserver.observe(statsEl);
(function() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const MAROON = '#6b1a1a';
  const GOLD = '#c8a07a';
  const CREAM = '#f5f0ea';

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); });

  // Floating geometric particles — aluminium/steel inspired shapes
  const SHAPES = ['rect', 'line', 'diamond', 'cross'];
  const particles = [];
  const COUNT = 38;

  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 22 + 8,
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      color: Math.random() > 0.5 ? GOLD : CREAM,
      alpha: Math.random() * 0.18 + 0.04,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.008,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.008,
    });
  }

  // Connecting lines between nearby particles
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          ctx.save();
          ctx.globalAlpha = (1 - dist / 140) * 0.09;
          ctx.strokeStyle = GOLD;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  function drawShape(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    const pulse = Math.sin(p.pulse) * 0.18 + 1;
    const s = p.size * pulse;
    ctx.globalAlpha = p.alpha * (Math.sin(p.pulse) * 0.3 + 0.85);
    ctx.strokeStyle = p.color;
    ctx.lineWidth = 0.8;
    ctx.fillStyle = p.color;

    if (p.shape === 'rect') {
      ctx.strokeRect(-s / 2, -s / 2, s, s * 0.6);
    } else if (p.shape === 'line') {
      ctx.beginPath();
      ctx.moveTo(-s / 2, 0);
      ctx.lineTo(s / 2, 0);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-s / 2, s * 0.25);
      ctx.lineTo(s / 2, s * 0.25);
      ctx.stroke();
    } else if (p.shape === 'diamond') {
      ctx.beginPath();
      ctx.moveTo(0, -s / 2);
      ctx.lineTo(s / 3, 0);
      ctx.lineTo(0, s / 2);
      ctx.lineTo(-s / 3, 0);
      ctx.closePath();
      ctx.stroke();
    } else if (p.shape === 'cross') {
      ctx.beginPath();
      ctx.moveTo(-s / 2, 0); ctx.lineTo(s / 2, 0);
      ctx.moveTo(0, -s / 2); ctx.lineTo(0, s / 2);
      ctx.stroke();
      // small dot center
      ctx.beginPath();
      ctx.arc(0, 0, 1.5, 0, Math.PI * 2);
      ctx.globalAlpha = p.alpha * 0.6;
      ctx.fill();
    }
    ctx.restore();
  }

  // Slow horizontal scan line — like a laser level tool
  let scanY = 0;
  let scanDir = 1;

  function drawScanLine() {
    ctx.save();
    ctx.globalAlpha = 0.06;
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 1;
    const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
    grad.addColorStop(0, 'transparent');
    grad.addColorStop(0.3, GOLD);
    grad.addColorStop(0.7, GOLD);
    grad.addColorStop(1, 'transparent');
    ctx.strokeStyle = grad;
    ctx.beginPath();
    ctx.moveTo(0, scanY);
    ctx.lineTo(canvas.width, scanY);
    ctx.stroke();
    ctx.restore();
    scanY += scanDir * 0.4;
    if (scanY > canvas.height || scanY < 0) scanDir *= -1;
  }

  // Corner bracket decorations — industrial feel
  function drawCornerBrackets() {
    const margin = 24;
    const bSize = 20;
    ctx.save();
    ctx.globalAlpha = 0.12;
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 1.5;
    // top-left
    ctx.beginPath(); ctx.moveTo(margin + bSize, margin); ctx.lineTo(margin, margin); ctx.lineTo(margin, margin + bSize); ctx.stroke();
    // top-right
    ctx.beginPath(); ctx.moveTo(canvas.width - margin - bSize, margin); ctx.lineTo(canvas.width - margin, margin); ctx.lineTo(canvas.width - margin, margin + bSize); ctx.stroke();
    // bottom-left
    ctx.beginPath(); ctx.moveTo(margin + bSize, canvas.height - margin); ctx.lineTo(margin, canvas.height - margin); ctx.lineTo(margin, canvas.height - margin - bSize); ctx.stroke();
    // bottom-right
    ctx.beginPath(); ctx.moveTo(canvas.width - margin - bSize, canvas.height - margin); ctx.lineTo(canvas.width - margin, canvas.height - margin); ctx.lineTo(canvas.width - margin, canvas.height - margin - bSize); ctx.stroke();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawConnections();
    drawScanLine();
    drawCornerBrackets();

    particles.forEach(p => {
      drawShape(p);
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.rotSpeed;
      p.pulse += p.pulseSpeed;
      // wrap around
      if (p.x < -p.size) p.x = canvas.width + p.size;
      if (p.x > canvas.width + p.size) p.x = -p.size;
      if (p.y < -p.size) p.y = canvas.height + p.size;
      if (p.y > canvas.height + p.size) p.y = -p.size;
    });

    requestAnimationFrame(animate);
  }

  animate();

  // Mouse parallax — particles subtly react to cursor
  canvas.closest('section').addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width - 0.5;
    const my = (e.clientY - rect.top) / rect.height - 0.5;
    particles.forEach((p, i) => {
      const factor = (i % 3 === 0) ? 0.6 : (i % 3 === 1) ? 0.3 : 0.15;
      p.x += mx * factor;
      p.y += my * factor;
    });
  });
})();