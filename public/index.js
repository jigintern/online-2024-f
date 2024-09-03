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
  audio.play();
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

// positions of insectNet and waterGun
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
  const randomX = Math.floor(windW - 35 - Math.random() * (windW - 35));
  const randomY = Math.floor(0.6 * windH + Math.random() * (windH * 0.3));
  //表示
  gabageElement.style.position = "absolute";
  gabageElement.style.left = `${randomX}px`;
  gabageElement.style.top = `${randomY}px`;
  // 画像をクリックした際に削除するイベントリスナーを追加
  // クリック時にinsectNetAction状態を確認して削除
  gabageElement.addEventListener('click', function() {
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
      this.remove();
      volumeUp();
    }
  });
  document.body.appendChild(driftwoodElement);
}

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
  }, 500);
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
  const duration = 300;
  const startTime = Date.now();

  function drawWaterStream() {
    const elapsedTime = Date.now() - startTime;
    const progress = Math.min(elapsedTime / duration, 1);

    const currentX = startX + (targetX - startX) * progress;
    const currentY = startY + (targetY - startY) * progress;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(currentX, currentY);
    ctx.strokeStyle = "rgba(0, 150, 255, 0.7)";
    ctx.lineWidth = 5;
    ctx.stroke();

    if (progress < 1) {
      requestAnimationFrame(drawWaterStream);
    } else {
      setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }, 100);
    }
  }

  drawWaterStream();
}
