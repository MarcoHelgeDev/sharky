class LightObject extends MovableObject {
  width = 720;
  height = 480;
  parallaxSpeed = 0.55;

  constructor(imagePath, x) {
    super().loadImg(imagePath);
    this.x = x;
    this.y = 0;
  }
}
