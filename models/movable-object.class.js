class MovableObject extends DrawableObject {
  speed = 0.15;
  speedY = 0;
  acceleration = 2;
  topBorder = -130;
  bottomBorder = 220;
  otherDirection = false;

  energy = 100;
  lastHit = 0;

  //character.isColliding(jellyfish)
  isColliding(mo) {
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height
    );
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }

      if (this.y < this.topBorder) {
        this.y = this.topBorder;
        this.speedY = 0;
      }

      if (this.y > this.bottomBorder) {
        this.y = this.bottomBorder;
        this.speedY = 0;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if ((!this) instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < this.bottomBorder;
    }
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  hit() {
    this.energy -= 20;

    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 4;
  }

  isDead() {
    return this.energy == 0;
  }
}
