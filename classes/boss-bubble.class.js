class BossBubble extends MovableObject {
  width = 38;
  height = 38;
  speed = 6;
  removeFromWorld = false;
  offset = { top: 5, right: 5, bottom: 5, left: 5 };

  constructor(x, y) {
    super().loadImg("img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
    this.x = x;
    this.y = y;
    this.moveBubble();
  }

  moveBubble() {
    setInterval(() => {
      this.x -= this.speed;
      this.checkIfBubbleIsGone();
    }, 1000 / 60);
  }

  checkIfBubbleIsGone() {
    if (this.x < -900) {
      this.removeFromWorld = true;
    }
  }
}
