/**
 * Represents an object that can be drawn on the canvas.
 * @class
 */
class DrawableObject {
  img;
  currentImage = 0;
  imageCache = {};
  x = -600;
  y = 250;
  height = 200;
  width = 200;
  showFrame = false;

  /**
   * Loads one image for the object.
   * @param {string} path - The path of the image.
   */
  loadImg(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the object on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The canvas context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Loads several images and saves them in the image cache.
   * @param {string[]} arr - The image paths that should be loaded.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the collision frame if debug mode is active.
   * @param {CanvasRenderingContext2D} ctx - The canvas context.
   */
  drawFrame(ctx) {
    if (this.showFrame) {
      this.drawCollisionFrame(ctx);
    }
  }

  /**
   * Draws the collision box of the object.
   * @param {CanvasRenderingContext2D} ctx - The canvas context.
   */
  drawCollisionFrame(ctx) {
    let box = this.getCollisionBox();
    ctx.beginPath();
    ctx.lineWidth = "3";
    ctx.strokeStyle = "blue";
    ctx.rect(box.x, box.y, box.width, box.height);
    ctx.stroke();
  }
}
