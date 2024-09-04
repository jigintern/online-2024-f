//爽やかエフェクト
function bubbles(element) {
  const bubblecount = (element.offsetWidth / 50) * 10;
  for (let i = 0; i <= bubblecount; i++) {
    //ランダムにサイズや発生源を作成
    const size = Math.floor(Math.random() * 5 + 5);
    const bubble = document.createElement("span");
    bubble.classList.add("particle");
    const top = Math.floor(Math.random() * 30 - 15);
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
}

//「爽やか！！」の表示
function showSawayakaEffect(x, y) {
  const sawayakaText = document.createElement("span");
  sawayakaText.classList.add("particletext", "bubbles");
  sawayakaText.textContent = "爽やか！！";
  sawayakaText.style.position = "absolute";
  sawayakaText.style.left = `${x}px`;
  sawayakaText.style.top = `${y}px`;
  document.body.appendChild(sawayakaText);
  //効果音呼び出し.
  callSawayakasound(); 
  //2秒間だけ表示
  setTimeout(function () {
    sawayakaText.remove();
  }, 2000);
  bubbles(sawayakaText);
}

function callSawayakasound() {
  //効果音の再生.
  audio = document.getElementById("sawayakasound");
  audio.volume = 0.1;
  //ここの行で今の音の再生をなくしてもう一度音を出せるようにしている.
  audio.pause();
  audio.currentTime = 0; 
  audio.play();
}