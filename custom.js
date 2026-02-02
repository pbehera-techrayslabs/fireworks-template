
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});


let particles = [];
let rockets = [];
let currentColor = "#FF5A6E";
let currentType = "burst";
let autoShowInterval = null;


function random(min, max) {
  return Math.random() * (max - min) + min;
}


class Rocket {
  constructor(x, y) {
    this.x = x;
    this.y = canvas.height;
    this.targetY = y;
    this.speed = random(5, 7);
    this.exploded = false;
  }

  update() {
    this.y -= this.speed;
    if (this.y <= this.targetY && !this.exploded) {
      this.exploded = true;
      explode(this.x, this.y);
    }
  }

  draw() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(this.x, this.y, 2, 10);
  }
}
class Particle {
  constructor(x,y,angle,speed,life) {
    this.x = x;
    this.y = y;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.life = life;
    this.opacity = 1;
    this.gravity = 0.05;
  }

  update() {
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.life--;
    this.opacity = this.life / 100;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = currentColor;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function explode(x, y) {
  let count = 80;

  if (currentType === "Ring") count = 120;
  if (currentType === "willow") count = 100;
  if (currentType === "spiral") count = 150;

  for (let i = 0; i < count; i++) {
    let angle, speed;

    switch (currentType) {
      case "Ring":
        angle = (Math.PI * 2 * i) / count;
        speed = 3;
        break;

      case "willow":
        angle = random(0, Math.PI * 2);
        speed = random(1.5, 2.5);
        break;

      case "spiral":
        angle = i * 0.3;
        speed = i * 0.02;
        break;

      default: 
        angle = random(0, Math.PI * 2);
        speed = random(2.5, 4);
    }

    particles.push(new Particle(x, y, angle, speed, 80));
  }
}


function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.15)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  rockets = rockets.filter(r => !r.exploded);
  rockets.forEach(r => {
    r.update();
    r.draw();
  });

  particles = particles.filter(p => p.life > 0);
  particles.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate);
}
animate();


canvas.addEventListener("click", e => {
  rockets.push(new Rocket(e.clientX, e.clientY));
});


document.querySelectorAll("#color-option button").forEach(btn => {
  btn.addEventListener("click", () => {
    currentColor = getComputedStyle(btn).backgroundColor;

    document
      .querySelectorAll("#color-option button")
      .forEach(b => b.classList.remove("ring-2", "ring-white"));

    btn.classList.add("ring-2", "ring-white");
  });
});


const patternButtons = document.querySelectorAll(".type-option");

patternButtons.forEach(btn => {
  btn.addEventListener("click", () => {
  
    currentType = btn.dataset.type.toLowerCase();

  
    patternButtons.forEach(b => b.classList.remove("active"));

 
    btn.classList.add("active");
  });
});


const autoBtn = document.getElementById("autoshow");

autoBtn.addEventListener("click", () => {
  if (autoShowInterval) {
    clearInterval(autoShowInterval);
    autoShowInterval = null;
    autoBtn.innerText = "▶ PLAY";
    return;
  }

  autoBtn.innerText = "⏹ STOP";
  autoShowInterval = setInterval(() => {
    rockets.push(
      new Rocket(
        random(100, canvas.width - 100),
        random(100, canvas.height / 2)
      )
    );
  }, 700);
});





const btn2 = document.getElementById("eyebtn");
const hidebox = document.getElementById("hidebox");
const hidebox1 = document.getElementById("hidebox1");
const hidebtn = document.getElementById("fullbtn")
btn2.addEventListener("click", () => {
  hidebox.classList.toggle('hidden');
  hidebox1.classList.toggle('hidden');
  hidebtn.classList.toggle('hidden');
});



btn2.addEventListener("click", () => {
  this.classList.toggle('active-state');
  this.classList.toggle('hover-state');
  this.classList.toggle('focus-state');
});


document.getElementById('fullbtn').addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
});




const loadText= document.querySelector("#loadText")
document.addEventListener("DOMContentLoaded",()=>{
  setTimeout(()=>{
  loadText.classList.add("hidden");
},2000);
  loadText.classList.transitionDuration= '6s';
});
