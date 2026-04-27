class Jellyfish extends MovableObject {
  height = 90;
  width = 90;
  y = 300;

  constructor() {
    super().loadImg("img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png");
    this.x = 250 + Math.random() * 500;
  }
}
