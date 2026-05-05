class Statusbar extends DrawableObject {
  IMAGES = [
    "img/4. Marcadores/Purple/100_ .png",
    "img/4. Marcadores/Purple/80_ .png",
    "img/4. Marcadores/Purple/60_ .png",
    "img/4. Marcadores/Purple/40_ .png",
    "img/4. Marcadores/Purple/20_ .png",
    "img/4. Marcadores/Purple/0_ .png",
  ];

  percentage = 100;

  constructor() {
    super();
    this.loadImges(this.IMAGES);
    this.x = 10;
    this.y = -5;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage == 100) {
      return 0;
    } else if (this.percentage > 80) {
      return 1;
    } else if (this.percentage > 60) {
      return 2;
    } else if (this.percentage > 40) {
      return 3;
    } else if (this.percentage > 20) {
      return 4;
    } else {
      return 5;
    }
  }
}
