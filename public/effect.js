//爽やかエフェクト
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

//「爽やか！！」の表示
function showSawayakaEffect(x, y) {
  const sawayakaText = document.querySelector(".textcontainer");
  sawayakaText.style.display = "block";
  //ゴミがあった場所に表示
  sawayakaText.style.left = `${x}px`;
  sawayakaText.style.top = `${y - 10}px`;
  bubbles();
  //2秒間だけ表示
  setTimeout(function () {
    sawayakaText.style.display = "none";
    const bubbles = document.querySelectorAll(".particle");
    bubbles.forEach((bubble) => bubble.remove());
  }, 2000);
}
