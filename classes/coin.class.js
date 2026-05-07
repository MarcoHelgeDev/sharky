class Coin extends MovableObject {
  height = 45;
  width = 45;
  offset = { top: 6, right: 6, bottom: 6, left: 6 };

  IMAGES = [
    "img/4. Marcadores/1. Coins/1.png",
    "img/4. Marcadores/1. Coins/2.png",
    "img/4. Marcadores/1. Coins/3.png",
    "img/4. Marcadores/1. Coins/4.png",
  ];

  constructor(x, y) {
    super().loadImg(this.IMAGES[0]);
    this.x = x;
    this.y = y;
    this.loadImages(this.IMAGES);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES);
    }, 200);
  }
}
