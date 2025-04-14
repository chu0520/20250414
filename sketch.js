// 粒子連線背景（彩色線條 + 米色背景）
let particles = [];
let particleCount = 150;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  generateParticles();
}

function draw() {
  background(245, 245, 220); // 米色背景

  // 更新與繪製粒子
  for (let particle of particles) {
    fill(particle.color);
    ellipse(particle.x, particle.y, particle.size);

    // 更新粒子位置
    particle.x += particle.speedX;
    particle.y += particle.speedY;

    // 邊界檢查，讓粒子反彈
    if (particle.x < 0 || particle.x > width) particle.speedX *= -1;
    if (particle.y < 0 || particle.y > height) particle.speedY *= -1;
  }

  // 繪製粒子之間的彩色連線
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let distance = sqrt(dx * dx + dy * dy);

      // 如果粒子之間的距離小於 120，繪製彩色連線
      if (distance < 120) {
        stroke(random(255), random(255), random(255), map(distance, 0, 120, 255, 50)); // 彩色線條
        line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  generateParticles();
}

function generateParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: random(width),
      y: random(height),
      size: random(2, 5),
      speedX: random(-1, 1),
      speedY: random(-1, 1),
      color: color(random(255), random(255), random(255), 200), // 隨機彩色粒子
    });
  }
}

function updateParticles() {
  const input = document.getElementById('particleCount');
  particleCount = parseInt(input.value) || 150;
  generateParticles();
}