/**
 * Represents Sharky, the playable character.
 * @class
 * @extends MovableObject
 */
class Character extends MovableObject {
  height = 280;
  width = 220;
  y = 120;
  speed = 4;
  world;
  canFlap = true;
  attackAnimation = "";
  currentAnimation = "";
  animationSpeed = 0;
  isFinSlapActive = false;
  isSleepSoundActive = false;
  lastActionTime = new Date().getTime();
  sleepTime = 15000;
  lastFinSlap = 0;
  finSlapCooldown = 900;
  offset = { top: 95, right: 55, bottom: 55, left: 45 };

  IMAGES_IDLE = [
    "img/1.Sharkie/1.IDLE/1.png",
    "img/1.Sharkie/1.IDLE/2.png",
    "img/1.Sharkie/1.IDLE/3.png",
    "img/1.Sharkie/1.IDLE/4.png",
    "img/1.Sharkie/1.IDLE/5.png",
    "img/1.Sharkie/1.IDLE/6.png",
    "img/1.Sharkie/1.IDLE/7.png",
    "img/1.Sharkie/1.IDLE/8.png",
    "img/1.Sharkie/1.IDLE/9.png",
    "img/1.Sharkie/1.IDLE/10.png",
    "img/1.Sharkie/1.IDLE/11.png",
    "img/1.Sharkie/1.IDLE/12.png",
    "img/1.Sharkie/1.IDLE/13.png",
    "img/1.Sharkie/1.IDLE/14.png",
    "img/1.Sharkie/1.IDLE/15.png",
    "img/1.Sharkie/1.IDLE/16.png",
    "img/1.Sharkie/1.IDLE/17.png",
    "img/1.Sharkie/1.IDLE/18.png",
  ];

  IMAGES_LONG_IDLE = [
    "img/1.Sharkie/2.Long_IDLE/i1.png",
    "img/1.Sharkie/2.Long_IDLE/I2.png",
    "img/1.Sharkie/2.Long_IDLE/I3.png",
    "img/1.Sharkie/2.Long_IDLE/I4.png",
    "img/1.Sharkie/2.Long_IDLE/I5.png",
    "img/1.Sharkie/2.Long_IDLE/I6.png",
    "img/1.Sharkie/2.Long_IDLE/I7.png",
    "img/1.Sharkie/2.Long_IDLE/I8.png",
    "img/1.Sharkie/2.Long_IDLE/I9.png",
    "img/1.Sharkie/2.Long_IDLE/I10.png",
    "img/1.Sharkie/2.Long_IDLE/I11.png",
    "img/1.Sharkie/2.Long_IDLE/I12.png",
    "img/1.Sharkie/2.Long_IDLE/I13.png",
    "img/1.Sharkie/2.Long_IDLE/I14.png",
  ];

  IMAGES_SWIMMING = [
    "img/1.Sharkie/3.Swim/1.png",
    "img/1.Sharkie/3.Swim/2.png",
    "img/1.Sharkie/3.Swim/3.png",
    "img/1.Sharkie/3.Swim/4.png",
    "img/1.Sharkie/3.Swim/5.png",
    "img/1.Sharkie/3.Swim/6.png",
  ];

  IMAGES_BUBBLE_ATTACK = [
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png",
  ];

  IMAGES_FIN_SLAP = [
    "img/1.Sharkie/4.Attack/Fin slap/1.png",
    "img/1.Sharkie/4.Attack/Fin slap/2.png",
    "img/1.Sharkie/4.Attack/Fin slap/3.png",
    "img/1.Sharkie/4.Attack/Fin slap/4.png",
    "img/1.Sharkie/4.Attack/Fin slap/5.png",
    "img/1.Sharkie/4.Attack/Fin slap/6.png",
    "img/1.Sharkie/4.Attack/Fin slap/7.png",
    "img/1.Sharkie/4.Attack/Fin slap/8.png",
  ];

  IMAGES_DEAD = [
    "img/1.Sharkie/6.dead/1.Poisoned/1.png",
    "img/1.Sharkie/6.dead/1.Poisoned/2.png",
    "img/1.Sharkie/6.dead/1.Poisoned/3.png",
    "img/1.Sharkie/6.dead/1.Poisoned/4.png",
    "img/1.Sharkie/6.dead/1.Poisoned/5.png",
    "img/1.Sharkie/6.dead/1.Poisoned/6.png",
    "img/1.Sharkie/6.dead/1.Poisoned/7.png",
    "img/1.Sharkie/6.dead/1.Poisoned/8.png",
    "img/1.Sharkie/6.dead/1.Poisoned/9.png",
    "img/1.Sharkie/6.dead/1.Poisoned/10.png",
    "img/1.Sharkie/6.dead/1.Poisoned/11.png",
    "img/1.Sharkie/6.dead/1.Poisoned/12.png",
  ];

  IMAGES_HURT = [
    "img/1.Sharkie/5.Hurt/1.Poisoned/1.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/2.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/3.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/4.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/5.png",
  ];

  /**
   * Creates the character and starts gravity and animation.
   */
  constructor() {
    super().loadImg("img/1.Sharkie/1.IDLE/1.png");
    this.loadAllImages();
    this.applyGravity();
    this.animate();
  }

  /**
   * Loads all character animation images.
   */
  loadAllImages() {
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_BUBBLE_ATTACK);
    this.loadImages(this.IMAGES_FIN_SLAP);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
  }

  /**
   * Starts the movement and animation intervals.
   */
  animate() {
    setInterval(() => {
      this.moveCharacter();
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      this.playCharacterAnimation();
    }, 100);
  }

  /**
   * Handles the character movement and attacks.
   */
  moveCharacter() {
    if (this.isDead()) return;
    this.moveRightByKeyboard();
    this.moveLeftByKeyboard();
    this.flapByKeyboard();
    this.finSlapByKeyboard();
    this.resetFlap();
  }

  /**
   * Moves the character to the right.
   */
  moveRightByKeyboard() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.otherDirection = false;
      this.markAction();
    }
  }

  /**
   * Moves the character to the left.
   */
  moveLeftByKeyboard() {
    if (this.world.keyboard.LEFT && this.x > -600) {
      this.moveLeft();
      this.otherDirection = true;
      this.markAction();
    }
  }

  /**
   * Lets the character swim upwards by keyboard input.
   */
  flapByKeyboard() {
    if ((this.world.keyboard.SPACE || this.world.keyboard.UP) && this.canFlap) {
      this.flap();
    }
  }

  /**
   * Starts the fin slap attack by keyboard input.
   */
  finSlapByKeyboard() {
    if (this.world.keyboard.F && this.canUseFinSlap()) {
      this.startFinSlap();
    }
  }

  /**
   * Allows the next flap when the key is released.
   */
  resetFlap() {
    if (!this.world.keyboard.SPACE && !this.world.keyboard.UP) {
      this.canFlap = true;
    }
  }

  /**
   * Checks if the fin slap attack can be used.
   * @returns {boolean} True if the fin slap can be used.
   */
  canUseFinSlap() {
    let timePassed = new Date().getTime() - this.lastFinSlap;
    return timePassed > this.finSlapCooldown && this.attackAnimation == "";
  }

  /**
   * Starts the fin slap attack.
   */
  startFinSlap() {
    this.attackAnimation = "fin";
    this.currentAnimation = "";
    this.isFinSlapActive = true;
    this.currentImage = 0;
    this.lastFinSlap = new Date().getTime();
    this.world.keyboard.F = false;
    this.world.audioManager.playFinSlapSound();
    this.markAction();
  }

  /**
   * Starts the bubble attack animation.
   */
  startBubbleAttack() {
    if (this.attackAnimation != "") return;
    this.attackAnimation = "bubble";
    this.currentAnimation = "";
    this.currentImage = 0;
    this.markAction();
  }

  /**
   * Plays the correct character animation.
   */
  playCharacterAnimation() {
    if (this.isDead()) {
      this.playNewAnimation("dead", this.IMAGES_DEAD);
    } else if (this.isHurt()) {
      this.playNewAnimation("hurt", this.IMAGES_HURT);
    } else {
      this.playLivingAnimation();
    }
  }

  /**
   * Plays the animation while the character is alive.
   */
  playLivingAnimation() {
    if (this.attackAnimation == "fin") {
      this.playNewAnimation("fin", this.IMAGES_FIN_SLAP);
    } else if (this.attackAnimation == "bubble") {
      this.playNewAnimation("bubble", this.IMAGES_BUBBLE_ATTACK);
    } else if (this.isMoving()) {
      this.playNewAnimation("swim", this.IMAGES_SWIMMING);
    } else if (this.isSleeping()) {
      this.playSleepAnimation();
    } else {
      this.playNewAnimation("idle", this.IMAGES_IDLE);
    }
  }

  /**
   * Plays the sleep animation and sleep sound.
   */
  playSleepAnimation() {
    if (!this.isSleepSoundActive) {
      this.world.audioManager.playSleepSound();
      this.isSleepSoundActive = true;
    }

    this.playNewAnimation("sleep", this.IMAGES_LONG_IDLE);
  }

  /**
   * Plays an animation and resets it if needed.
   * @param {string} animationName - The name of the animation.
   * @param {string[]} images - The images of the animation.
   */
  playNewAnimation(animationName, images) {
    this.resetAnimationIfNeeded(animationName);

    if (this.canPlayNextFrame(animationName)) {
      this.playFrame(animationName, images);
    }
  }

  /**
   * Resets the animation when another animation starts.
   * @param {string} animationName - The name of the animation.
   */
  resetAnimationIfNeeded(animationName) {
    if (this.currentAnimation != animationName) {
      this.currentImage = 0;
      this.animationSpeed = 0;
      this.currentAnimation = animationName;
    }
  }

  /**
   * Checks if the next animation frame can be played.
   * @param {string} animationName - The name of the animation.
   * @returns {boolean} True if the next frame can be played.
   */
  canPlayNextFrame(animationName) {
    this.animationSpeed++;
    return this.animationSpeed >= this.getAnimationSpeed(animationName);
  }

  /**
   * Returns the speed for an animation.
   * @param {string} animationName - The name of the animation.
   * @returns {number} The animation speed.
   */
  getAnimationSpeed(animationName) {
    if (animationName == "fin") return 1;
    if (animationName == "bubble") return 1;
    if (animationName == "hurt") return 2;
    if (animationName == "dead") return 2;
    if (animationName == "swim") return 2;
    if (animationName == "sleep") return 3;
    return 3;
  }

  /**
   * Plays one frame of an animation.
   * @param {string} animationName - The name of the animation.
   * @param {string[]} images - The images of the animation.
   */
  playFrame(animationName, images) {
    this.animationSpeed = 0;

    if (animationName == "fin" || animationName == "bubble") {
      this.playAttackAnimation(images);
    } else {
      this.playAnimation(images);
    }
  }

  /**
   * Plays one frame of an attack animation.
   * @param {string[]} images - The images of the attack animation.
   */
  playAttackAnimation(images) {
    if (this.currentImage < images.length) {
      let path = images[this.currentImage];
      this.img = this.imageCache[path];
      this.currentImage++;
    } else {
      this.finishAttack();
    }
  }

  /**
   * Finishes the current attack animation.
   */
  finishAttack() {
    this.attackAnimation = "";
    this.currentAnimation = "";
    this.isFinSlapActive = false;
    this.currentImage = 0;
  }

  /**
   * Checks if the character is moving.
   * @returns {boolean} True if the character is moving.
   */
  isMoving() {
    return (
      this.world.keyboard.RIGHT ||
      this.world.keyboard.LEFT ||
      this.world.keyboard.UP ||
      this.world.keyboard.SPACE
    );
  }

  /**
   * Checks if the character should sleep.
   * @returns {boolean} True if the character should sleep.
   */
  isSleeping() {
    let timePassed = new Date().getTime() - this.lastActionTime;
    return timePassed > this.sleepTime;
  }

  /**
   * Moves the character upwards.
   */
  flap() {
    this.speedY = 15;
    this.canFlap = false;
    this.markAction();
  }

  /**
   * Saves the last player action and stops the sleep sound.
   */
  markAction() {
    this.lastActionTime = new Date().getTime();
    this.isSleepSoundActive = false;

    if (this.world && this.world.audioManager) {
      this.world.audioManager.stopSleepSound();
    }
  }

  /**
   * Checks if the fin slap hits another object.
   * @param {MovableObject} object - The object that should be checked.
   * @returns {boolean} True if the fin slap hits the object.
   */
  isFinSlapColliding(object) {
    let ownBox = this.getFinSlapBox();
    let otherBox = object.getCollisionBox();
    return this.checkBoxCollision(ownBox, otherBox);
  }

  /**
   * Returns the collision box of the fin slap attack.
   * @returns {Object} The fin slap collision box.
   */
  getFinSlapBox() {
    let box = this.getCollisionBox();
    let x = this.getFinSlapX(box);
    return this.createFinSlapBox(box, x);
  }

  /**
   * Returns the x position of the fin slap box.
   * @param {Object} box - The character collision box.
   * @returns {number} The x position of the fin slap box.
   */
  getFinSlapX(box) {
    if (this.otherDirection) {
      return box.x - 90;
    }
    return box.x + box.width - 10;
  }

  /**
   * Creates the fin slap collision box.
   * @param {Object} box - The character collision box.
   * @param {number} x - The x position of the fin slap box.
   * @returns {Object} The fin slap collision box.
   */
  createFinSlapBox(box, x) {
    return {
      x: x,
      y: box.y + 20,
      width: 100,
      height: box.height - 40,
    };
  }
}
