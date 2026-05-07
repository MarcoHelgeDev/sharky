class MovableObject extends DrawableObject {
  speed = 0.15;
  speedY = 0;
  acceleration = 2;
  topBorder = -180;
  bottomBorder = 220;
  otherDirection = false;
  energy = 100;
  lastHit = 0;
  offset = { top: 0, right: 0, bottom: 0, left: 0 };

  isColliding(object) {
    let ownBox = this.getCollisionBox();
    let otherBox = object.getCollisionBox();
    return this.checkBoxCollision(ownBox, otherBox);
  }

  checkBoxCollision(ownBox, otherBox) {
    return (
      ownBox.x + ownBox.width > otherBox.x &&
      ownBox.y + ownBox.height > otherBox.y &&
      ownBox.x < otherBox.x + otherBox.width &&
      ownBox.y < otherBox.y + otherBox.height
    );
  }

  getCollisionBox() {
    return {
      x: this.x + this.offset.left,
      y: this.y + this.offset.top,
      width: this.width - this.offset.left - this.offset.right,
      height: this.height - this.offset.top - this.offset.bottom,
    };
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
      this.checkTopAndBottomBorder();
    }, 1000 / 25);
  }

  checkTopAndBottomBorder() {
    if (this.y < this.topBorder) {
      this.y = this.topBorder;
      this.speedY = 0;
    }
    if (this.y > this.bottomBorder) {
      this.y = this.bottomBorder;
      this.speedY = 0;
    }
  }

  isAboveGround() {
    return this.y < this.bottomBorder;
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
    if (!this.isHurt()) {
      this.energy -= 20;
      this.lastHit = new Date().getTime();
    }
    if (this.energy < 0) {
      this.energy = 0;
    }
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }
}
