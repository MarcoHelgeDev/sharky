class Cloud extends MovableObject {
  y = 25;
  width = 500;
  height = 250;

  constructor() {
    super().loadImg("img/1.png");
    this.x = Math.random() * 500;
    this.animate();
  }

  animate() {
    this.moveLeft();
  }
}
