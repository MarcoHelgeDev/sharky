/**
 * Represents an object that can move and collide with other objects.
 * @class
 * @extends DrawableObject
 */
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

  /**
   * Checks if this object is colliding with another object.
   * @param {MovableObject} object - The object to check.
   * @returns {boolean} True if both objects collide.
   */
  isColliding(object) {
    let ownBox = this.getCollisionBox();
    let otherBox = object.getCollisionBox();
    return this.checkBoxCollision(ownBox, otherBox);
  }

  /**
   * Checks if two collision boxes overlap.
   * @param {Object} ownBox - The collision box of this object.
   * @param {Object} otherBox - The collision box of the other object.
   * @returns {boolean} True if the boxes overlap.
   */
  checkBoxCollision(ownBox, otherBox) {
    return (
      ownBox.x + ownBox.width > otherBox.x &&
      ownBox.y + ownBox.height > otherBox.y &&
      ownBox.x < otherBox.x + otherBox.width &&
      ownBox.y < otherBox.y + otherBox.height
    );
  }

  /**
   * Returns the collision box of the object.
   * @returns {Object} The collision box with x, y, width and height.
   */
  getCollisionBox() {
    return {
      x: this.x + this.offset.left,
      y: this.y + this.offset.top,
      width: this.width - this.offset.left - this.offset.right,
      height: this.height - this.offset.top - this.offset.bottom,
    };
  }

  /**
   * Applies gravity to the object.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
      this.checkTopAndBottomBorder();
    }, 1000 / 25);
  }

  /**
   * Keeps the object inside the top and bottom borders.
   */
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

  /**
   * Checks if the object is above the ground.
   * @returns {boolean} True if the object is above the ground.
   */
  isAboveGround() {
    return this.y < this.bottomBorder;
  }

  /**
   * Plays an animation from an image array.
   * @param {string[]} images - The images of the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Moves the object to the right.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Reduces the energy of the object.
   */
  hit() {
    if (!this.isHurt()) {
      this.energy -= 20;
      this.lastHit = new Date().getTime();
    }
    if (this.energy < 0) {
      this.energy = 0;
    }
  }

  /**
   * Checks if the object was hit recently.
   * @returns {boolean} True if the object is still hurt.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

  /**
   * Checks if the object has no energy left.
   * @returns {boolean} True if the object is dead.
   */
  isDead() {
    return this.energy == 0;
  }
}
