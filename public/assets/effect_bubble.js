//背景に泡を表示させるエフェクト
//https://tipsy.github.io/bubbly-bg/

bubbly({
  bubbles: {
    count: 300,
    objectCreator: function () {
      const createImage = (canvas) => {
        const img = new Image();
        img.src = canvas.toDataURL();
        return img;
      };
      const radius = 5 + Math.random() * 15;
      const blur = 15;
      const bubbleCv = document.createElement("canvas");
      bubbleCv.width = bubbleCv.height = radius * 2 + blur * 2 + 2;
      const bubbleCtx = bubbleCv.getContext("2d");
      bubbleCtx.shadowColor = "#fff";
      bubbleCtx.shadowBlur = blur;
      bubbleCtx.fillStyle = `hsla(${200 + Math.random() * 50}, 100%, 65%, .1)`;
      bubbleCtx.beginPath();
      bubbleCtx.arc(radius + blur, radius + blur, radius, 0, Math.PI * 2);
      bubbleCtx.fill();
      return {
        r: bubbleCv.width,
        a: -Math.PI / 2,
        v: 3 + Math.random() * 5.5,
        x: Math.random() * globalThis.innerWidth,
        y: Math.random() * globalThis.innerHeight,
        img: createImage(bubbleCv),
        draw: (ctx, b) => ctx.drawImage(b.img, b.x - b.r, b.y - b.r),
      };
    },
  },
  background: (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, ctx.canvas.height);
    gradient.addColorStop(0, "#194167");
    gradient.addColorStop(1, "#112144");
    return gradient;
  },
});
