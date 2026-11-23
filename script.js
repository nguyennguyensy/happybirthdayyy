const giftButton = document.getElementById('giftButton');
const giftStage = document.getElementById('giftStage');
const birthdayCard = document.getElementById('birthdayCard');
const messageElement = document.getElementById('message');
const replayButton = document.getElementById('replayButton');
const birthdayMusic = document.getElementById('birthdayMusic');
const musicToggle = document.getElementById('musicToggle');

const wishes = [
  'Dear sis',
  "It's your birthday today.",
  'Wish you beauty, health, a lot of laughters,',
  'and most importantly,',
  'A Happy Birthday',
  'Your sweetest chapter is just beginning.',
  'Live it at the fullest!'
];

let typingTimer;
let transitionTimer;

function typeWishes(index = 0) {
  clearTimeout(typingTimer);
  clearTimeout(transitionTimer);
  messageElement.animate([{ opacity: 0 }], { duration: 1, fill: 'none' }).cancel();
  messageElement.style.opacity = '1';
  messageElement.textContent = '';

  if (index >= wishes.length) return;

  const text = wishes[index];
  let charIndex = 0;

  function typeNext() {
    if (charIndex < text.length) {
      messageElement.textContent += text.charAt(charIndex);
      charIndex += 1;
      typingTimer = setTimeout(typeNext, 55);
    } else if (index < wishes.length - 1) {
      transitionTimer = setTimeout(() => {
        messageElement.style.opacity = '0';
        transitionTimer = setTimeout(() => {
          messageElement.style.opacity = '1';
          typeWishes(index + 1);
        }, 420);
      }, 1800);
    }
  }

  typeNext();
}

function launchConfetti() {
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  ctx.scale(dpr, dpr);

  const colors = ['#ffeff3', '#d87393', '#f8a8be', '#fff7b3', '#c98ea1', '#ffffff'];
  const pieces = Array.from({ length: 130 }, () => ({
    x: innerWidth * (0.35 + Math.random() * 0.3),
    y: innerHeight * 0.38,
    vx: (Math.random() - 0.5) * 10,
    vy: -Math.random() * 10 - 3,
    gravity: 0.14 + Math.random() * 0.08,
    size: 5 + Math.random() * 8,
    rotation: Math.random() * Math.PI,
    spin: (Math.random() - 0.5) * 0.18,
    color: colors[Math.floor(Math.random() * colors.length)]
  }));

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    pieces.forEach(p => {
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.spin;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.62);
      ctx.restore();
    });
    frame += 1;
    if (frame < 180) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, innerWidth, innerHeight);
  }
  draw();
}

giftButton.addEventListener('click', () => {
  giftButton.classList.add('opened');
  giftButton.setAttribute('aria-label', 'Quà đã mở');
  birthdayMusic.volume = 0.55;
  birthdayMusic.play().catch(() => {});

  setTimeout(() => {
    giftStage.classList.add('hidden');
    birthdayCard.classList.add('show');
    launchConfetti();
    typeWishes();
  }, 650);
});

replayButton.addEventListener('click', () => typeWishes());
musicToggle.addEventListener('click', () => {
  if (birthdayMusic.paused) {
    birthdayMusic.play().catch(() => {});
    musicToggle.classList.remove('paused');
    musicToggle.setAttribute('aria-label', 'Tắt nhạc');
  } else {
    birthdayMusic.pause();
    musicToggle.classList.add('paused');
    musicToggle.setAttribute('aria-label', 'Bật nhạc');
  }
});
