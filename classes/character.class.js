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

  constructor() {
    super().loadImg("img/1.Sharkie/1.IDLE/1.png");
    this.loadAllImages();
    this.applyGravity();
    this.animate();
  }

  loadAllImages() {
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_BUBBLE_ATTACK);
    this.loadImages(this.IMAGES_FIN_SLAP);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
  }

  animate() {
    setInterval(() => {
      this.moveCharacter();
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      this.playCharacterAnimation();
    }, 100);
  }

  moveCharacter() {
    if (this.isDead()) return;
    this.moveRightByKeyboard();
    this.moveLeftByKeyboard();
    this.flapByKeyboard();
    this.finSlapByKeyboard();
    this.resetFlap();
  }

  moveRightByKeyboard() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.otherDirection = false;
      this.markAction();
    }
  }

  moveLeftByKeyboard() {
    if (this.world.keyboard.LEFT && this.x > -600) {
      this.moveLeft();
      this.otherDirection = true;
      this.markAction();
    }
  }

  flapByKeyboard() {
    if ((this.world.keyboard.SPACE || this.world.keyboard.UP) && this.canFlap) {
      this.flap();
    }
  }

  finSlapByKeyboard() {
    if (this.world.keyboard.F && this.canUseFinSlap()) {
      this.startFinSlap();
    }
  }

  resetFlap() {
    if (!this.world.keyboard.SPACE && !this.world.keyboard.UP) {
      this.canFlap = true;
    }
  }

  canUseFinSlap() {
    let timePassed = new Date().getTime() - this.lastFinSlap;
    return timePassed > this.finSlapCooldown && this.attackAnimation == "";
  }

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

  startBubbleAttack() {
    if (this.attackAnimation != "") return;
    this.attackAnimation = "bubble";
    this.currentAnimation = "";
    this.currentImage = 0;
    this.markAction();
  }

  playCharacterAnimation() {
    if (this.isDead()) {
      this.playNewAnimation("dead", this.IMAGES_DEAD);
    } else if (this.isHurt()) {
      this.playNewAnimation("hurt", this.IMAGES_HURT);
    } else {
      this.playLivingAnimation();
    }
  }

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

  playSleepAnimation() {
    if (!this.isSleepSoundActive) {
      this.world.audioManager.playSleepSound();
      this.isSleepSoundActive = true;
    }

    this.playNewAnimation("sleep", this.IMAGES_LONG_IDLE);
  }

  playNewAnimation(animationName, images) {
    this.resetAnimationIfNeeded(animationName);

    if (this.canPlayNextFrame(animationName)) {
      this.playFrame(animationName, images);
    }
  }

  resetAnimationIfNeeded(animationName) {
    if (this.currentAnimation != animationName) {
      this.currentImage = 0;
      this.animationSpeed = 0;
      this.currentAnimation = animationName;
    }
  }

  canPlayNextFrame(animationName) {
    this.animationSpeed++;
    return this.animationSpeed >= this.getAnimationSpeed(animationName);
  }

  getAnimationSpeed(animationName) {
    if (animationName == "fin") return 1;
    if (animationName == "bubble") return 1;
    if (animationName == "hurt") return 2;
    if (animationName == "dead") return 2;
    if (animationName == "swim") return 2;
    if (animationName == "sleep") return 3;
    return 3;
  }

  playFrame(animationName, images) {
    this.animationSpeed = 0;

    if (animationName == "fin" || animationName == "bubble") {
      this.playAttackAnimation(images);
    } else {
      this.playAnimation(images);
    }
  }

  playAttackAnimation(images) {
    if (this.currentImage < images.length) {
      let path = images[this.currentImage];
      this.img = this.imageCache[path];
      this.currentImage++;
    } else {
      this.finishAttack();
    }
  }

  finishAttack() {
    this.attackAnimation = "";
    this.currentAnimation = "";
    this.isFinSlapActive = false;
    this.currentImage = 0;
  }

  isMoving() {
    return (
      this.world.keyboard.RIGHT ||
      this.world.keyboard.LEFT ||
      this.world.keyboard.UP ||
      this.world.keyboard.SPACE
    );
  }

  isSleeping() {
    let timePassed = new Date().getTime() - this.lastActionTime;
    return timePassed > this.sleepTime;
  }

  flap() {
    this.speedY = 15;
    this.canFlap = false;
    this.markAction();
  }

  markAction() {
    this.lastActionTime = new Date().getTime();
    this.isSleepSoundActive = false;

    if (this.world && this.world.audioManager) {
      this.world.audioManager.stopSleepSound();
    }
  }

  isFinSlapColliding(object) {
    let ownBox = this.getFinSlapBox();
    let otherBox = object.getCollisionBox();
    return this.checkBoxCollision(ownBox, otherBox);
  }

  getFinSlapBox() {
    let box = this.getCollisionBox();
    let x = this.getFinSlapX(box);
    return this.createFinSlapBox(box, x);
  }

  getFinSlapX(box) {
    if (this.otherDirection) {
      return box.x - 90;
    }
    return box.x + box.width - 10;
  }

  createFinSlapBox(box, x) {
    return {
      x: x,
      y: box.y + 20,
      width: 100,
      height: box.height - 40,
    };
  }
}
