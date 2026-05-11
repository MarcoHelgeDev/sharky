/**
 * Represents a poison bottle that can be collected by the character.
 * @class
 * @extends MovableObject
 */
class PoisonBottle extends MovableObject {
  height = 55;
  width = 45;
  offset = { top: 8, right: 8, bottom: 8, left: 8 };

  IMAGES = [
    "img/4. Marcadores/Posión/Animada/1.png",
    "img/4. Marcadores/Posión/Animada/2.png",
    "img/4. Marcadores/Posión/Animada/3.png",
    "img/4. Marcadores/Posión/Animada/4.png",
    "img/4. Marcadores/Posión/Animada/5.png",
    "img/4. Marcadores/Posión/Animada/6.png",
    "img/4. Marcadores/Posión/Animada/7.png",
    "img/4. Marcadores/Posión/Animada/8.png",
  ];

  /**
   * Creates a new poison bottle.
   * @param {number} x - The x position of the poison bottle.
   * @param {number} y - The y position of the poison bottle.
   */
  constructor(x, y) {
    super().loadImg(this.IMAGES[0]);
    this.x = x;
    this.y = y;
    this.loadImages(this.IMAGES);
    this.animate();
  }

  /**
   * Starts the poison bottle animation.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES);
    }, 180);
  }
}
