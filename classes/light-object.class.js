/**
 * Represents a light layer for the parallax background.
 * @class
 * @extends MovableObject
 */
class LightObject extends MovableObject {
  width = 720;
  height = 480;
  parallaxSpeed = 0.55;

  /**
   * Creates a new light object.
   * @param {string} imagePath - The path of the light image.
   * @param {number} x - The x position of the light image.
   */
  constructor(imagePath, x) {
    super().loadImg(imagePath);
    this.x = x;
    this.y = 0;
  }
}
