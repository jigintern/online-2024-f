function toggleAudio() {
  const audio = document.getElementById("audio");
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

globalThis.onload = function() {
  const audio = document.getElementById("audio");
  audio.volume = 0;
  audio.play();
};

function volumeUp() {
  const audio = document.getElementById("audio");
  const image0 = document.querySelector(".beach0");
  const image1 = document.querySelector(".beach1");
  if(audio.paused) audio.play();
  if (audio.volume < 1) {
    audio.volume += 0.1;
    image0.style.opacity = 1 - audio.volume;
    image1.style.opacity = audio.volume;
  }
}

function volumeDown() {
  const audio = document.getElementById("audio");
  const image0 = document.querySelector(".beach0");
  const image1 = document.querySelector(".beach1");
  if (audio.volume > 0) {
    audio.volume -= 0.1;
    image0.style.opacity = 1 - audio.volume;
    image1.style.opacity = audio.volume;
  }
}

function toggleInsectNet() {
  const icon = document.querySelector(".tools0");
  if (icon.classList.contains("insectNet-active")) {
      icon.classList.remove("insectNet-active");
  } else {
      icon.classList.add("insectNet-active");
  }
}

//流木以外のゴミの配列
const gabages = [
  "assets/PlasticBottle_blue.png",
  "assets/PlasticBottle_green.png",
  "assets/PlasticBottle_white.png",
  "assets/EmptyCan.png"
]

//ゴミをn個ランダム表示
  const n = 7;
  for(let i = 0; i < n; i++){
  //画像をランダムで選ぶ
  const gabageSrc = gabages[Math.floor(Math.random() * gabages.length)];
  const gabageElement = document.createElement("img");
  gabageElement.src = gabageSrc;
  gabageElement.classList.add("gabage");
  //座標をランダムに生成
  //X: 10px - 380px, Y: 550px - 750px
  const randomX = Math.floor(10 + Math.random()*350);
  const randomY = Math.floor(550 + Math.random()*200);
  //表示
  gabageElement.style.position = 'absolute';
  gabageElement.style.left = `${randomX}px`;
  gabageElement.style.top = `${randomY}px`;
  // 画像をクリックした際に削除するイベントリスナーを追加
  gabageElement.addEventListener('click', function() {
    this.remove();
    volumeUp();
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
  const randomX = Math.floor(10 + Math.random() * 250);
  const randomY = Math.floor(550 + Math.random() * 200);
  // 表示
  driftwoodElement.style.position = 'absolute';
  driftwoodElement.style.left = `${randomX}px`;
  driftwoodElement.style.top = `${randomY}px`;
  // 画像をクリックした際に削除するイベントリスナーを追加
  driftwoodElement.addEventListener('click', function() {
    this.remove();
    volumeUp();
  });
  document.body.appendChild(driftwoodElement);
}

