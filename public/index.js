function toggleAudio() {
  const audio = document.getElementById("audio");
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

globalThis.onload = function () {
  const audio = document.getElementById("audio");
  audio.volume = 0;
};

async function volumeUp() {
  const audio = document.getElementById("audio");
  const image0 = document.querySelector(".dirtybeach");
  const image1 = document.querySelector(".cleanbeach");
  if (audio.paused) {
    await audio.play();
  }
  if (audio.volume < 1) {
    audio.volume += 0.1;
    image0.style.opacity = 1 - audio.volume;
    image1.style.opacity = audio.volume;
  }
}

function volumeDown() {
  const audio = document.getElementById("audio");
  const image0 = document.querySelector(".dirtybeach");
  const image1 = document.querySelector(".cleanbeach");
  if (audio.volume > 0) {
    audio.volume -= 0.1;
    image0.style.opacity = 1 - audio.volume;
    image1.style.opacity = audio.volume;
  }
}

//States for insectNet and waterGun
let insectNetActive = false;
let waterGunActive = false;

function toggleInsectNet() {
  waterGunActive = false;
  insectNetActive = !insectNetActive;
  updateToolIcons();
}

function toggleWaterGun() {
  insectNetActive = false;
  waterGunActive = !waterGunActive;
  updateToolIcons();
}

function updateToolIcons() {
  const insectNetIcon = document.querySelector("img.insect-net");
  const waterGunIcon = document.querySelector("img.water-gun");
  if (insectNetActive) {
    insectNetIcon.classList.add("insectNet-active");
  } else {
    insectNetIcon.classList.remove("insectNet-active");
  }

  if (waterGunActive) {
    waterGunIcon.classList.add("waterGun-active");
  } else {
    waterGunIcon.classList.remove("waterGun-active");
  }
}

//流木以外のゴミの配列
const gabages = [
  "assets/PlasticBottle_blue.png",
  "assets/PlasticBottle_green.png",
  "assets/PlasticBottle_white.png",
  "assets/EmptyCan.png",
];
//画面サイズ取得
const windW = globalThis.innerWidth;
const windH = globalThis.innerHeight;

//ゴミをn個ランダム表示
const n = 7;
for (let i = 0; i < n; i++) {
  //画像をランダムで選ぶ
  const gabageSrc = gabages[Math.floor(Math.random() * gabages.length)];
  const gabageElement = document.createElement("img");
  gabageElement.src = gabageSrc;
  gabageElement.classList.add("gabage");
  //座標をランダムに生成
  //画面の大きさに合わせて縦6~9割あたりに配置
  const randomX = Math.floor(windW - 40 - Math.random() * (windW - 40));
  const randomY = Math.floor(0.6 * windH + Math.random() * (windH * 0.3));
  //表示
  gabageElement.style.position = "absolute";
  gabageElement.style.left = `${randomX}px`;
  gabageElement.style.top = `${randomY}px`;
  // 画像をクリックした際に削除するイベントリスナーを追加
  // クリック時にinsectNetAction状態を確認して削除
  gabageElement.addEventListener("click", function () {
    if (insectNetActive) {
      gabage_click(event);
      this.remove();
      volumeUp();
    }
  });
  document.body.appendChild(gabageElement);
}

//流木の表示
const driftwoodSrc = "assets/driftwood.png";
// Driftwoodをm個ランダム表示
const m = 3;
for (let i = 0; i < m; i++) {
  const driftwoodElement = document.createElement("img");
  driftwoodElement.src = driftwoodSrc;
  driftwoodElement.classList.add("wood");
  // 座標をランダムに生成
  //画面の大きさに合わせて縦6~9.5割あたりに配置
  const randomX = Math.floor(windW - 95 - Math.random() * (windW - 95));
  const randomY = Math.floor(0.6 * windH + Math.random() * (windH * 0.35));
  // 表示
  driftwoodElement.style.position = "absolute";
  driftwoodElement.style.left = `${randomX}px`;
  driftwoodElement.style.top = `${randomY}px`;
  // 画像をクリックした際に削除するイベントリスナーを追加
  // クリック時にwaterGunActive状態を確認して削除
  driftwoodElement.addEventListener("click", function () {
    if (waterGunActive) {
      driftwood_click(event);
    }
  });
  document.body.appendChild(driftwoodElement);
}

//ゴミクリック時
function gabage_click(event) {
  const click_x = event.pageX - 30;
  const click_y = event.pageY - 30;
  const InsectNetElement = document.createElement("img");
  InsectNetElement.classList.add("InsectNet");
  InsectNetElement.src = "assets/InsectNet_catching.png";
  InsectNetElement.style.position = "absolute";
  InsectNetElement.style.left = `${click_x}px`;
  InsectNetElement.style.top = `${click_y}px`;
  InsectNetElement.style.width = "120px";
  document.body.appendChild(InsectNetElement);
  setTimeout(function () {
    InsectNetElement.style.transform = "rotate(-90deg)";
  }, 100);
  setTimeout(function () {
    InsectNetElement.remove();
    updateSawayakaGauge(); // Update gauge
  }, 500);
  showSawayakaEffect(click_x, click_y);
}

function driftwood_click(event) {
  if (!waterGunActive) {
    return;
  }

  const canvas = document.getElementById("waterCanvas");
  const ctx = canvas.getContext("2d");

  const targetX = event.clientX;
  const targetY = event.clientY;

  canvas.width = globalThis.innerWidth;
  canvas.height = globalThis.innerHeight;

  const startX = canvas.width / 2;
  const startY = canvas.height;
  const duration = 500; // Animation Duration
  const startTime = Date.now();

  function drawWaterStream() {
    const elapsedTime = Date.now() - startTime;
    const progress = Math.min(elapsedTime / duration, 1);

    // Shaking effect
    const jitterX = (Math.random() - 0.5) * 10;
    const jitterY = (Math.random() - 0.5) * 10;

    const currentX = startX + (targetX - startX) * progress + jitterX;
    const currentY = startY + (targetY - startY) * progress + jitterY;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gradient for the water stream
    const gradient = ctx.createLinearGradient(startX, startY, currentX, currentY);
    gradient.addColorStop(0, "rgba(0, 150, 255, 1)"); // Deep Blue
    gradient.addColorStop(0.5, "rgba(0, 200, 255, 0.8)"); // Mid Blue
    gradient.addColorStop(1, "rgba(0, 255, 255, 0.6)"); // Light Blue

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(currentX, currentY);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 8;
    ctx.stroke();

    // Draw speed lines along the water stream
    drawSpeedLines(ctx, currentX, currentY, progress);

    if (progress < 1) {
      requestAnimationFrame(drawWaterStream);
    } else {
      setTimeout(() => {
        drawDynamicWaterSplash(ctx, targetX, targetY); // Water splash effect
        event.target.remove(); // Remove driftwood element after the animation ends
        volumeUp(); // Assuming this controls audio volume
        showSawayakaEffect(event.clientX - 30, event.clientY);
        updateSawayakaGauge(); // Update gauge
      }, 100);
    }
  }

  function drawDynamicWaterSplash(ctx, x, y) {
    const splashCount = 15;
    const maxSplashSize = 8;
    const splashRange = 60;
    const splashDuration = 500;
    const startTime = Date.now();

    function animateSplash() {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / splashDuration, 1);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < splashCount; i++) {
        const splashX = x + (Math.random() - 0.5) * splashRange * progress;
        const splashY = y + (Math.random() - 0.5) * splashRange * progress;
        const splashSize = (Math.random() * maxSplashSize + 4) * (1 - progress);
        const alpha = 1 - progress;

        // Gradient for the splash droplet
        const gradient = ctx.createRadialGradient(
          splashX,
          splashY,
          0,
          splashX,
          splashY,
          splashSize
        );
        gradient.addColorStop(0, `rgba(0, 150, 255, ${alpha})`); // Deep Blue
        gradient.addColorStop(1, `rgba(0, 255, 255, ${alpha * 0.5})`); // Light Blue

        // Draw droplet
        ctx.beginPath();
        ctx.arc(splashX, splashY, splashSize, 0, Math.PI * 2);
        // ctx.fillStyle = `rgba(0, 150, 255, ${alpha})`;
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      if (progress < 1) {
        requestAnimationFrame(animateSplash);
      }
    }

    animateSplash();
  }

  function drawSpeedLines(ctx, x, y, progress) {
    const speedLineCount = 15;
    const maxSpeedLineLength = 100;
    const speedLineWidth = 4;

    for (let i = 0; i < speedLineCount; i++) {
      const offsetX = (Math.random() - 0.5) * maxSpeedLineLength;
      const offsetY = (Math.random() - 0.5) * maxSpeedLineLength;

      // Gradient for the speed line
      const lineStartX = x - offsetX * progress;
      const lineStartY = y - offsetY * progress;
      const gradient = ctx.createLinearGradient(lineStartX, lineStartY, x, y);
      gradient.addColorStop(0, "rgba(0, 150, 255, 1)"); // Deep Blue
      gradient.addColorStop(1, "rgba(0, 255, 255, 0.5)"); // Light Blue

      // Draw speed line
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(lineStartX, lineStartY);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = speedLineWidth;
      ctx.stroke();
    }
  }

  drawWaterStream(); // Start the water stream animation
}

const canvas = document.getElementById("gaugeCanvas");
const ctx = canvas.getContext("2d");
const totalItems = m + n; // Total number of items(gabage + driftwood)
let clearedItems = 0;

// Initial gauge
function drawGauge() {
  const canvas = document.getElementById("gaugeCanvas");
  const ctx = canvas.getContext("2d");

  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);
}

drawGauge();

// Update gauge
function updateSawayakaGauge() {
  clearedItems += 1;
  const percentage = Math.min((clearedItems / totalItems) * 100, 100);

  console.log("Updated percentage:", percentage);

  const gaugeFill = document.getElementById("gaugeFill");
  gaugeFill.style.width = `${percentage}%`;

  const gaugePercentage = document.getElementById("gaugePercentage");
  gaugePercentage.textContent = `${Math.floor(percentage)}% 爽やか`;
}
