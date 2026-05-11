/**
 * Represents the final boss of the game.
 * @class
 * @extends MovableObject
 */
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

  /**
   * Creates a new endboss.
   */
  constructor() {
    super().loadImg(this.IMAGES_SWIMMING[0]);
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
  }

  /**
   * Starts the movement and animation intervals.
   */
  animate() {
    setInterval(() => {
      this.moveBoss();
    }, 1000 / 60);

    setInterval(() => {
      this.playEndbossAnimation();
    }, 200);
  }

  /**
   * Activates the endboss.
   */
  activate() {
    if (!this.isActivated) {
      this.isActivated = true;
      this.lastAttack = new Date().getTime();
    }
  }

  /**
   * Moves the boss when he is activated.
   */
  moveBoss() {
    if (!this.isActivated || this.isKilled) return;
    this.floatUpAndDown();
    this.handleAttackMode();
  }

  /**
   * Moves the boss up and down.
   */
  floatUpAndDown() {
    this.y += 1.1 * this.moveDirection;

    if (this.y > 60 || this.y < -25) {
      this.moveDirection *= -1;
    }
  }

  /**
   * Handles the current attack mode of the boss.
   */
  handleAttackMode() {
    if (this.attackMode == "idle") this.waitBeforeAttack();
    if (this.attackMode == "attack") this.chargeAttack();
    if (this.attackMode == "return") this.returnToStart();
  }

  /**
   * Waits before the next boss attack starts.
   */
  waitBeforeAttack() {
    let timePassed = new Date().getTime() - this.lastAttack;

    if (timePassed > this.getAttackPause()) {
      this.attackMode = "attack";
    }
  }

  /**
   * Moves the boss forward during an attack.
   */
  chargeAttack() {
    this.x -= this.getAttackSpeed();

    if (this.x <= this.startX - this.attackDistance) {
      this.attackMode = "return";
    }
  }

  /**
   * Moves the boss back to the start position.
   */
  returnToStart() {
    this.x += 4;

    if (this.x >= this.startX) {
      this.x = this.startX;
      this.lastAttack = new Date().getTime();
      this.attackMode = "idle";
    }
  }

  /**
   * Returns the pause between boss attacks.
   * @returns {number} The attack pause in milliseconds.
   */
  getAttackPause() {
    if (this.energy <= 50) return 1100;
    return 1700;
  }

  /**
   * Returns the speed of the boss attack.
   * @returns {number} The attack speed.
   */
  getAttackSpeed() {
    if (this.energy <= 50) return 8;
    return 6;
  }

  /**
   * Plays the correct endboss animation.
   */
  playEndbossAnimation() {
    if (this.isKilled) {
      this.playDeadAnimation();
    } else {
      this.playAnimation(this.IMAGES_SWIMMING);
    }
  }

  /**
   * Plays the dead animation of the boss.
   */
  playDeadAnimation() {
    this.playAnimation(this.IMAGES_DEAD);
    this.y += 2;
    this.deadCounter++;
  }

  /**
   * Hits the boss with a poison bubble.
   * @returns {boolean} True if the boss was hit.
   */
  hitByPoisonBubble() {
    if (!this.canBeHit()) return false;
    this.energy -= 25;
    this.lastHit = new Date().getTime();
    this.checkBossEnergy();
    return true;
  }

  /**
   * Checks if the boss can be hit again.
   * @returns {boolean} True if the boss can be hit.
   */
  canBeHit() {
    let timePassed = new Date().getTime() - this.lastHit;
    return timePassed > this.hitCooldown;
  }

  /**
   * Checks if the boss has no energy left.
   */
  checkBossEnergy() {
    if (this.energy <= 0) {
      this.energy = 0;
      this.kill();
    }
  }

  /**
   * Kills the boss.
   */
  kill() {
    this.isKilled = true;
    this.currentImage = 0;
  }
}
