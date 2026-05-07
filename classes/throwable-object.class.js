class ThrowableObject extends MovableObject {
  speed = 10;
  direction = 1;
  isPoisoned = false;
  removeFromWorld = false;
  offset = { top: 4, right: 4, bottom: 4, left: 4 };

  constructor(x, y, direction, isPoisoned) {
    super().loadImg(this.getBubbleImage(isPoisoned));
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.isPoisoned = isPoisoned;
    this.height = this.getBubbleSize(isPoisoned);
    this.width = this.getBubbleSize(isPoisoned);
    this.throw();
  }

  getBubbleImage(isPoisoned) {
    if (isPoisoned) {
      return "img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png";
    }
    return "img/1.Sharkie/4.Attack/Bubble trap/Bubble.png";
  }

  getBubbleSize(isPoisoned) {
    if (isPoisoned) {
      return 45;
    }
    return 32;
  }

  throw() {
    setInterval(() => {
      this.x += this.speed * this.direction;
      this.removeBubbleOutOfLevel();
    }, 25);
  }

  removeBubbleOutOfLevel() {
    if (this.x > 4300 || this.x < -900) {
      this.removeFromWorld = true;
    }
  }
}
