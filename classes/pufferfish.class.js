class Pufferfish extends MovableObject {
  height = 80;
  width = 80;
  speed = 1.5;
  isKilled = false;
  removeFromWorld = false;
  deadCounter = 0;
  offset = { top: 15, right: 12, bottom: 15, left: 12 };

  IMAGES_SWIMMING = [
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png",
  ];

  IMAGES_DEAD = [
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png",
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png",
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 3 (can animate by going down to the floor after the Fin Slap attack).png",
  ];

  constructor(x, y) {
    super().loadImg(this.IMAGES_SWIMMING[0]);
    this.x = x;
    this.y = y;
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.movePufferfish();
    }, 1000 / 60);

    setInterval(() => {
      this.playPufferfishAnimation();
    }, 160);
  }

  movePufferfish() {
    if (this.isKilled) return;
    this.moveLeft();
  }

  playPufferfishAnimation() {
    if (this.isKilled) {
      this.playDeadAnimation();
    } else {
      this.playAnimation(this.IMAGES_SWIMMING);
    }
  }

  playDeadAnimation() {
    this.playAnimation(this.IMAGES_DEAD);
    this.y -= 2;
    this.deadCounter++;
    if (this.deadCounter > 10) {
      this.removeFromWorld = true;
    }
  }

  kill() {
    this.isKilled = true;
    this.currentImage = 0;
  }
}
