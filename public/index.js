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

async function volumeUp() {
  const audio = document.getElementById("audio");
  const image0 = document.querySelector(".dirtybeach");
  const image1 = document.querySelector(".cleanbeach");
  if(audio.paused){
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
  //画面の大きさに合わせて配置
  const randomX = Math.floor(10 + Math.random()*350);
  const randomY = Math.floor(550 + Math.random()*200);
  //表示
  gabageElement.style.position = 'absolute';
  gabageElement.style.left = `${randomX}px`;
  gabageElement.style.top = `${randomY}px`;
  // 画像をクリックした際に削除するイベントリスナーを追加
  // クリック時にInsectNetAction状態を確認して削除
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
  const randomX = Math.floor(10 + Math.random() * 250);
  const randomY = Math.floor(550 + Math.random() * 200);
  // 表示
  driftwoodElement.style.position = 'absolute';
  driftwoodElement.style.left = `${randomX}px`;
  driftwoodElement.style.top = `${randomY}px`;
  // 画像をクリックした際に削除するイベントリスナーを追加
  // クリック時にwaterGunActive状態を確認して削除
  driftwoodElement.addEventListener('click', function() {
    if (waterGunActive) {
      gabage_click(event);
      this.remove();
      volumeUp();
    }
  });
  document.body.appendChild(driftwoodElement);

}

function gabage_click(event){
  const click_x = event.pageX-30;
  const click_y = event.pageY-30;
  const InsectNetElement = document.createElement("img");
  InsectNetElement.classList.add("InsectNet");
  InsectNetElement.src="assets/InsectNet_catching.png";
  InsectNetElement.style.position = 'absolute';
  InsectNetElement.style.left = `${click_x}px`;
  InsectNetElement.style.top = `${click_y}px`;
  InsectNetElement.style.width=35+"%";
  InsectNetElement.style.position="absolute";
  document.body.appendChild(InsectNetElement);
  setTimeout(function(){
    
    InsectNetElement.style.transform = "rotate(" + -90 + "deg)";
  },100);
  setTimeout(function(){
    InsectNetElement.remove();
  },500);
}
