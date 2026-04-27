class MovableObject {
  x = 120;
  y = 250;
  height = 200;
  width = 200;
  img;

  loadImg(path) {
    this.img = new Image();
    this.img.src = path;
  }

  moveRight() {
    console.log("Moving right");
  }
  moveLeft() {
    console.log("Moving left");
  }
}
