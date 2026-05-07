class Endboss extends MovableObject {
  width = 450;
  height = 450;
  y = 0;
  x = 3350;
  startX = 3350;
  energy = 100;
  isActivated = false;
  isKilled = false;
  deadCounter = 0;
  moveDirection = 1;
  attackMode = "idle";
  attackDistance = 430;
  lastAttack = 0;
  lastHit = 0;
  hitCooldown = 1000;
  offset = { top: 90, right: 70, bottom: 85, left: 90 };

  IMAGES_SWIMMING = [
    "img/2.Enemy/3 Final Enemy/2.floating/1.png",
    "img/2.Enemy/3 Final Enemy/2.floating/2.png",
    "img/2.Enemy/3 Final Enemy/2.floating/3.png",
    "img/2.Enemy/3 Final Enemy/2.floating/4.png",
    "img/2.Enemy/3 Final Enemy/2.floating/5.png",
    "img/2.Enemy/3 Final Enemy/2.floating/6.png",
    "img/2.Enemy/3 Final Enemy/2.floating/7.png",
    "img/2.Enemy/3 Final Enemy/2.floating/8.png",
    "img/2.Enemy/3 Final Enemy/2.floating/9.png",
    "img/2.Enemy/3 Final Enemy/2.floating/10.png",
    "img/2.Enemy/3 Final Enemy/2.floating/11.png",
    "img/2.Enemy/3 Final Enemy/2.floating/12.png",
    "img/2.Enemy/3 Final Enemy/2.floating/13.png",
  ];

  IMAGES_DEAD = [
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png",
  ];

  constructor() {
    super().loadImg(this.IMAGES_SWIMMING[0]);
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveBoss();
    }, 1000 / 60);

    setInterval(() => {
      this.playEndbossAnimation();
    }, 200);
  }

  activate() {
    if (!this.isActivated) {
      this.isActivated = true;
      this.lastAttack = new Date().getTime();
    }
  }

  moveBoss() {
    if (!this.isActivated || this.isKilled) return;
    this.floatUpAndDown();
    this.handleAttackMode();
  }

  floatUpAndDown() {
    this.y += 1.1 * this.moveDirection;

    if (this.y > 60 || this.y < -25) {
      this.moveDirection *= -1;
    }
  }

  handleAttackMode() {
    if (this.attackMode == "idle") this.waitBeforeAttack();
    if (this.attackMode == "attack") this.chargeAttack();
    if (this.attackMode == "return") this.returnToStart();
  }

  waitBeforeAttack() {
    let timepassed = new Date().getTime() - this.lastAttack;

    if (timepassed > this.getAttackPause()) {
      this.attackMode = "attack";
    }
  }

  chargeAttack() {
    this.x -= this.getAttackSpeed();

    if (this.x <= this.startX - this.attackDistance) {
      this.attackMode = "return";
    }
  }

  returnToStart() {
    this.x += 4;

    if (this.x >= this.startX) {
      this.x = this.startX;
      this.lastAttack = new Date().getTime();
      this.attackMode = "idle";
    }
  }

  getAttackPause() {
    if (this.energy <= 50) return 1100;
    return 1700;
  }

  getAttackSpeed() {
    if (this.energy <= 50) return 8;
    return 6;
  }

  playEndbossAnimation() {
    if (this.isKilled) {
      this.playDeadAnimation();
    } else {
      this.playAnimation(this.IMAGES_SWIMMING);
    }
  }

  playDeadAnimation() {
    this.playAnimation(this.IMAGES_DEAD);
    this.y += 2;
    this.deadCounter++;
  }

  hitByPoisonBubble() {
    if (!this.canBeHit()) return false;
    this.energy -= 25;
    this.lastHit = new Date().getTime();
    this.checkBossEnergy();
    return true;
  }

  canBeHit() {
    let timepassed = new Date().getTime() - this.lastHit;
    return timepassed > this.hitCooldown;
  }

  checkBossEnergy() {
    if (this.energy <= 0) {
      this.energy = 0;
      this.kill();
    }
  }

  kill() {
    this.isKilled = true;
    this.currentImage = 0;
  }
}
