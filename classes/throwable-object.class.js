/**
 * Represents a bubble that is shot by the character.
 * @class
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
  speed = 10;
  direction = 1;
  isPoisoned = false;
  removeFromWorld = false;
  offset = { top: 4, right: 4, bottom: 4, left: 4 };

  /**
   * Creates a new bubble.
   * @param {number} x - The start x position of the bubble.
   * @param {number} y - The start y position of the bubble.
   * @param {number} direction - The direction of the bubble.
   * @param {boolean} isPoisoned - True if the bubble is poisoned.
   */
  constructor(x, y, direction, isPoisoned) {
    super().loadImg(this.getBubbleImage(isPoisoned));
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.isPoisoned = isPoisoned;
    this.height = this.getBubbleSize(isPoisoned);
    this.width = this.getBubbleSize(isPoisoned);
    this.throw();
  }

  /**
   * Returns the image for the bubble type.
   * @param {boolean} isPoisoned - True if the bubble is poisoned.
   * @returns {string} The image path of the bubble.
   */
  getBubbleImage(isPoisoned) {
    if (isPoisoned) {
      return "img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png";
    }
    return "img/1.Sharkie/4.Attack/Bubble trap/Bubble.png";
  }

  /**
   * Returns the size for the bubble type.
   * @param {boolean} isPoisoned - True if the bubble is poisoned.
   * @returns {number} The size of the bubble.
   */
  getBubbleSize(isPoisoned) {
    if (isPoisoned) {
      return 45;
    }
    return 32;
  }

  /**
   * Moves the bubble in its direction.
   */
  throw() {
    setInterval(() => {
      this.x += this.speed * this.direction;
      this.removeBubbleOutOfLevel();
    }, 25);
  }

  /**
   * Marks the bubble for removal when it leaves the level.
   */
  removeBubbleOutOfLevel() {
    if (this.x > 4300 || this.x < -900) {
      this.removeFromWorld = true;
    }
  }
}
