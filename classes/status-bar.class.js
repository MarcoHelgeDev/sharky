class Statusbar extends DrawableObject {
  percentage = 100;
  kind = "life";

  LIFE_IMAGES = [
    "img/4. Marcadores/green/Life/100_  copia 2.png",
    "img/4. Marcadores/green/Life/80_  copia 3.png",
    "img/4. Marcadores/green/Life/60_  copia 3.png",
    "img/4. Marcadores/green/Life/40_  copia 3.png",
    "img/4. Marcadores/green/Life/20_ copia 4.png",
    "img/4. Marcadores/green/Life/0_  copia 3.png",
  ];

  COIN_IMAGES = [
    "img/4. Marcadores/green/Coin/100_ copia 4.png",
    "img/4. Marcadores/green/Coin/80_  copia 4.png",
    "img/4. Marcadores/green/Coin/60_  copia 4.png",
    "img/4. Marcadores/green/Coin/40_  copia 4.png",
    "img/4. Marcadores/green/Coin/20_  copia 2.png",
    "img/4. Marcadores/green/Coin/0_  copia 4.png",
  ];

  POISON_IMAGES = [
    "img/4. Marcadores/green/poisoned bubbles/100_ copia 3.png",
    "img/4. Marcadores/green/poisoned bubbles/80_ copia 2.png",
    "img/4. Marcadores/green/poisoned bubbles/60_ copia 2.png",
    "img/4. Marcadores/green/poisoned bubbles/40_ copia 2.png",
    "img/4. Marcadores/green/poisoned bubbles/20_ copia 3.png",
    "img/4. Marcadores/green/poisoned bubbles/0_ copia 2.png",
  ];

  constructor(kind, x, y) {
    super();
    this.kind = kind;
    this.x = x;
    this.y = y;
    this.width = 190;
    this.height = 55;
    this.loadImagesForKind();
    this.setPercentage(this.getStartPercentage());
  }

  loadImagesForKind() {
    this.images = this.getImagesForKind();
    this.loadImages(this.images);
  }

  getImagesForKind() {
    if (this.kind == "coin") return this.COIN_IMAGES;
    if (this.kind == "poison") return this.POISON_IMAGES;
    return this.LIFE_IMAGES;
  }

  getStartPercentage() {
    if (this.kind == "life") return 100;
    return 0;
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.images[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage >= 100) return 0;
    if (this.percentage >= 80) return 1;
    if (this.percentage >= 60) return 2;
    if (this.percentage >= 40) return 3;
    if (this.percentage >= 20) return 4;
    return 5;
  }
}
