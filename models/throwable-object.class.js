class ThrowableObject extends MovableObject {
  speed = 10;
  direction = 1;

  constructor(x, y, direction) {
    super().loadImg("img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.height = 30;
    this.width = 30;
    this.throw();
  }

  throw() {
    setInterval(() => {
      this.x += this.speed * this.direction;
    }, 25);
  }
}
