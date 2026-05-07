class DrawableObject {
  img;
  currentImage = 0;
  imageCache = {};
  x = -600;
  y = 250;
  height = 200;
  width = 200;
  showFrame = false;

  loadImg(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  drawFrame(ctx) {
    if (this.showFrame) {
      this.drawCollisionFrame(ctx);
    }
  }

  drawCollisionFrame(ctx) {
    let box = this.getCollisionBox();
    ctx.beginPath();
    ctx.lineWidth = "3";
    ctx.strokeStyle = "blue";
    ctx.rect(box.x, box.y, box.width, box.height);
    ctx.stroke();
  }
}
