/**
 * Represents a jellyfish enemy.
 * @class
 * @extends MovableObject
 */
class Jellyfish extends MovableObject {
  height = 90;
  width = 90;
  speed = 1.2;
  topBorder = 40;
  bottomBorder = 350;
  moveDirection = 1;
  isKilled = false;
  removeFromWorld = false;
  deadCounter = 0;
  offset = { top: 12, right: 18, bottom: 14, left: 18 };

  IMAGES_SWIMMING = [
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png",
  ];

  IMAGES_DEAD = [
    "img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png",
    "img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png",
    "img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png",
    "img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png",
  ];

  /**
   * Creates a new jellyfish.
   * @param {number} x - The x position of the jellyfish.
   * @param {number} y - The y position of the jellyfish.
   */
  constructor(x, y) {
    super().loadImg(this.IMAGES_SWIMMING[0]);
    this.x = x;
    this.y = y;
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
  }

  /**
   * Starts the movement and animation intervals.
   */
  animate() {
    setInterval(() => {
      this.moveUpAndDown();
    }, 1000 / 60);

    setInterval(() => {
      this.playJellyfishAnimation();
    }, 200);
  }

  /**
   * Moves the jellyfish up and down.
   */
  moveUpAndDown() {
    if (this.isKilled) return;
    this.y += this.speed * this.moveDirection;
    this.changeDirectionAtBorder();
  }

  /**
   * Changes the movement direction at the top or bottom border.
   */
  changeDirectionAtBorder() {
    if (this.y > this.bottomBorder || this.y < this.topBorder) {
      this.moveDirection *= -1;
    }
  }

  /**
   * Plays the correct jellyfish animation.
   */
  playJellyfishAnimation() {
    if (this.isKilled) {
      this.playDeadAnimation();
    } else {
      this.playAnimation(this.IMAGES_SWIMMING);
    }
  }

  /**
   * Plays the dead animation and moves the jellyfish upwards.
   */
  playDeadAnimation() {
    this.playAnimation(this.IMAGES_DEAD);
    this.y -= 3;
    this.deadCounter++;
    if (this.deadCounter > 12) {
      this.removeFromWorld = true;
    }
  }

  /**
   * Kills the jellyfish.
   */
  kill() {
    this.isKilled = true;
    this.currentImage = 0;
  }
}
