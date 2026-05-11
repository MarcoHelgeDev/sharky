/**
 * Represents one background image in the level.
 * @class
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;

  /**
   * Creates a new background object.
   * @param {string} imagePath - The path of the background image.
   * @param {number} x - The x position of the background image.
   */
  constructor(imagePath, x) {
    super().loadImg(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
