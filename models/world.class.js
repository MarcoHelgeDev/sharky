class World {
  canvas;
  ctx;
  character = new Character();
  enemies = [new Jellyfish(), new Jellyfish(), new Jellyfish()];
  clouds = [new Cloud()];
  backgroundObject = [
    new BackgroundObject("img/3. Background/Layers/5. Water/D1.png", 0),
    new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D1.png", 0),
    new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D1.png", 0),
    new BackgroundObject("img/3. Background/Layers/2. Floor/D1.png", 0),
  ];

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.addObjectsToMap(this.backgroundObject);

    this.addToMap(this.character);
    this.addObjectsToMap(this.clouds);
    this.addObjectsToMap(this.enemies);

    requestAnimationFrame(() => {
      this.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
  }
}
