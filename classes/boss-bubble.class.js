/**
 * Represents a bubble that is shot by the endboss.
 * @class
 * @extends MovableObject
 */
class BossBubble extends MovableObject {
  width = 38;
  height = 38;
  speed = 6;
  removeFromWorld = false;
  offset = { top: 5, right: 5, bottom: 5, left: 5 };

  /**
   * Creates a new boss bubble.
   * @param {number} x - The start x position of the bubble.
   * @param {number} y - The start y position of the bubble.
   */
  constructor(x, y) {
    super().loadImg("img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
    this.x = x;
    this.y = y;
    this.moveBubble();
  }

  /**
   * Moves the boss bubble to the left.
   */
  moveBubble() {
    setInterval(() => {
      this.x -= this.speed;
      this.checkIfBubbleIsGone();
    }, 1000 / 60);
  }

  /**
   * Marks the boss bubble for removal when it leaves the level.
   */
  checkIfBubbleIsGone() {
    if (this.x < -900) {
      this.removeFromWorld = true;
    }
  }
}
