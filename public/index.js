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
  // TODO: 水鉄砲の機能が実装できたらコメントアウトをやめる
  // const waterGunIcon = document.querySelector("img.water-gun");

  if (insectNetActive) {
    insectNetIcon.classList.add("insectNet-active");
  } else {
    insectNetIcon.classList.remove("insectNet-active");
  }

  // TODO: 水鉄砲の機能が実装できたらコメントアウトをやめる
  // if (waterGunActive) {
  //  waterGunIcon.classList.add("waterGun-active");
  // } else {
  //   waterGunIcon.classList.remove("waterGun-active");
  // }
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
  // クリック時にInsectNetAction状態を確認して削除
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
      gabage_click(event);
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
  InsectNetElement.style.width = 35 + "%";
  InsectNetElement.style.position = "absolute";
  document.body.appendChild(InsectNetElement);
  setTimeout(function () {
    InsectNetElement.remove();
  }, 500);
}

function bubbles() {
  // すべての".particletext.bubbles"要素を取得
  const elements = document.querySelectorAll(".particletext.bubbles");
  elements.forEach(function (element) {
    const bubblecount = (element.offsetWidth / 50) * 10;

    // 0からbubblecountまでのループを実行
    for (let i = 0; i <= bubblecount; i++) {
      const size = Math.floor(Math.random() * 10 + 10);

      // 新しいバブル(span)を作成
      const bubble = document.createElement("span");
      bubble.classList.add("particle");

      // ランダムな位置とサイズ、アニメーションディレイを設定
      const top = Math.floor(Math.random() * 30 + 30);
      const left = Math.floor(Math.random() * 95);
      const delay = Math.random() * 3;

      // スタイルを適用
      bubble.style.top = `${top}%`;
      bubble.style.left = `${left}%`;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.animationDelay = `${delay}s`;

      // span要素を追加
      element.appendChild(bubble);
    }
  });
}

bubbles();
