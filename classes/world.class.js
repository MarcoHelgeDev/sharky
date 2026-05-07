class World {
  canvas;
  ctx;
  keyboard;
  audioManager;
  camera_x = 0;
  character;
  level;
  throwableObjects = [];
  bossBubbles = [];
  statusBar = new Statusbar("life", 10, 0);
  coinBar = new Statusbar("coin", 10, 45);
  poisonBar = new Statusbar("poison", 10, 90);
  bossBar = new Statusbar("life", 520, 0);
  collectedCoins = 0;
  collectedPoison = 0;
  isPoisonUnlocked = false;
  gameOver = false;
  gameWon = false;
  stopped = false;
  gameInterval;
  lastBubbleShot = 0;
  bubbleCooldown = 600;
  bubbleDelay = 520;
  lastBossBubble = 0;
  bossActivationX = 2700;

  constructor(canvas, keyboard, audioManager) {
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.audioManager = audioManager;
    this.ctx = canvas.getContext("2d");
    this.level = createLevel();
    this.character = new Character();
    this.setWorld();
    this.draw();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    this.gameInterval = setInterval(() => {
      if (!this.gameOver && !this.gameWon && !this.stopped) {
        this.runGameChecks();
      }
    }, 1000 / 60);
  }

  runGameChecks() {
    this.checkBossActivation();
    this.checkFinSlapAttack();
    this.checkCollisions();
    this.checkThrowObjects();
    this.checkBossBubbleAttack();
    this.checkCollectables();
    this.removeObjects();
    this.checkGameEnd();
  }

  checkBossActivation() {
    let endboss = this.getEndboss();
    if (endboss && this.character.x > this.bossActivationX) {
      endboss.activate();
    }
  }

  checkThrowObjects() {
    if (this.keyboard.D && this.canThrowBubble()) {
      this.prepareBubbleShot();
    }
  }

  canThrowBubble() {
    let timePassed = new Date().getTime() - this.lastBubbleShot;
    return timePassed > this.bubbleCooldown;
  }

  prepareBubbleShot() {
    this.character.startBubbleAttack();
    this.lastBubbleShot = new Date().getTime();
    this.keyboard.D = false;
    setTimeout(() => {
      this.throwBubbleAfterAnimation();
    }, this.bubbleDelay);
  }

  throwBubbleAfterAnimation() {
    if (this.stopped || this.character.isDead()) return;
    let bubble = this.createBubble();
    this.throwableObjects.push(bubble);
    this.audioManager.playBubbleSound();
  }

  createBubble() {
    let direction = this.character.otherDirection ? -1 : 1;
    let x = this.getBubbleStartX(direction);
    let y = this.character.y + 150;
    return new ThrowableObject(x, y, direction, this.isPoisonUnlocked);
  }

  getBubbleStartX(direction) {
    return direction == -1
      ? this.character.x + 20
      : this.character.x + this.character.width - 35;
  }

  checkFinSlapAttack() {
    if (!this.character.isFinSlapActive) return;
    this.level.enemies.forEach((enemy) => {
      this.hitEnemyWithFinSlap(enemy);
    });
  }

  hitEnemyWithFinSlap(enemy) {
    if (enemy instanceof Endboss) return;
    if (enemy.isKilled || enemy.removeFromWorld) return;
    if (this.character.isFinSlapColliding(enemy)) {
      enemy.kill();
      this.audioManager.playEnemyDeadSound();
    }
  }

  checkBossBubbleAttack() {
    let endboss = this.getEndboss();
    if (this.canBossShoot(endboss)) {
      this.createBossBubble(endboss);
    }
  }

  canBossShoot(endboss) {
    if (!endboss || !endboss.isActivated || endboss.isKilled) return false;
    let timePassed = new Date().getTime() - this.lastBossBubble;
    return timePassed > this.getBossBubbleCooldown(endboss);
  }

  getBossBubbleCooldown(endboss) {
    return endboss.energy <= 50 ? 1700 : 2400;
  }

  createBossBubble(endboss) {
    let bubble = new BossBubble(endboss.x + 80, endboss.y + 220);
    this.bossBubbles.push(bubble);
    this.lastBossBubble = new Date().getTime();
    this.audioManager.playBubbleSound();
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      this.checkEnemyCollision(enemy);
      this.checkBubbleCollision(enemy);
    });
    this.checkBossBubbleCollisions();
  }

  checkEnemyCollision(enemy) {
    if (enemy.isKilled || enemy.removeFromWorld) return;
    if (this.character.isColliding(enemy)) {
      this.hitCharacter();
    }
  }

  hitCharacter() {
    let energyBeforeHit = this.character.energy;
    this.character.hit();
    this.statusBar.setPercentage(this.character.energy);
    if (this.character.energy < energyBeforeHit) {
      this.audioManager.playHurtSound();
    }
  }

  checkBubbleCollision(enemy) {
    this.throwableObjects.forEach((bubble) => {
      this.hitEnemyWithBubble(enemy, bubble);
    });
  }

  hitEnemyWithBubble(enemy, bubble) {
    if (enemy.isKilled || bubble.removeFromWorld) return;
    if (bubble.isColliding(enemy)) {
      this.damageEnemy(enemy, bubble);
      bubble.removeFromWorld = true;
    }
  }

  damageEnemy(enemy, bubble) {
    if (enemy instanceof Endboss && bubble.isPoisoned) {
      this.hitEndboss(enemy);
    } else if (!(enemy instanceof Endboss)) {
      enemy.kill();
      this.audioManager.playEnemyDeadSound();
    }
  }

  hitEndboss(endboss) {
    if (endboss.hitByPoisonBubble()) {
      this.bossBar.setPercentage(endboss.energy);
      this.playBossDamageSound(endboss);
    }
  }

  playBossDamageSound(endboss) {
    if (endboss.isKilled) return this.audioManager.playEnemyDeadSound();
    this.audioManager.playBossHitSound();
  }

  checkBossBubbleCollisions() {
    this.bossBubbles.forEach((bubble) => {
      this.hitCharacterWithBossBubble(bubble);
    });
  }

  hitCharacterWithBossBubble(bubble) {
    if (bubble.removeFromWorld) return;
    if (this.character.isColliding(bubble)) {
      this.hitCharacter();
      bubble.removeFromWorld = true;
    }
  }

  checkCollectables() {
    this.checkCoinCollisions();
    this.checkPoisonCollisions();
  }

  checkCoinCollisions() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.collectCoin(coin);
      }
    });
  }

  collectCoin(coin) {
    coin.removeFromWorld = true;
    this.collectedCoins += 10;
    this.checkCoinAmount();
    this.coinBar.setPercentage(this.collectedCoins);
    this.audioManager.playCoinSound();
  }

  checkCoinAmount() {
    if (this.collectedCoins > 100) {
      this.collectedCoins = 100;
    }
  }

  checkPoisonCollisions() {
    this.level.poisonBottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.collectPoison(bottle);
      }
    });
  }

  collectPoison(bottle) {
    bottle.removeFromWorld = true;
    this.collectedPoison += 20;
    this.checkPoisonAmount();
    this.poisonBar.setPercentage(this.collectedPoison);
    this.audioManager.playPoisonSound();
  }

  checkPoisonAmount() {
    if (this.collectedPoison >= 100) {
      this.collectedPoison = 100;
      this.unlockPoisonBubble();
    }
  }

  unlockPoisonBubble() {
    if (this.isPoisonUnlocked) return;
    this.isPoisonUnlocked = true;
    this.audioManager.playPowerReadySound();
  }

  removeObjects() {
    this.level.enemies = this.level.enemies.filter(
      (enemy) => !enemy.removeFromWorld,
    );
    this.throwableObjects = this.throwableObjects.filter(
      (bubble) => !bubble.removeFromWorld,
    );
    this.bossBubbles = this.bossBubbles.filter(
      (bubble) => !bubble.removeFromWorld,
    );
    this.level.coins = this.level.coins.filter((coin) => !coin.removeFromWorld);
    this.level.poisonBottles = this.level.poisonBottles.filter(
      (bottle) => !bottle.removeFromWorld,
    );
  }

  checkGameEnd() {
    if (this.character.isDead()) {
      this.endGame("gameover");
    }
    if (this.isEndbossDead()) {
      this.endGame("win");
    }
  }

  isEndbossDead() {
    let endboss = this.getEndboss();
    return endboss && endboss.isKilled && endboss.deadCounter > 18;
  }

  getEndboss() {
    for (let i = 0; i < this.level.enemies.length; i++) {
      if (this.level.enemies[i] instanceof Endboss) {
        return this.level.enemies[i];
      }
    }
  }

  endGame(type) {
    this.gameOver = type == "gameover";
    this.gameWon = type == "win";
    this.stopWorld();
    this.audioManager.stopAllSounds();
    this.playEndSound(type);
    showEndScreen(type);
  }

  playEndSound(type) {
    if (type == "win") return this.audioManager.playWinSound();
    this.audioManager.playGameOverSound();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.drawMovableObjects();
    this.ctx.translate(-this.camera_x, 0);
    this.drawStatusBars();
    if (!this.stopped) {
      requestAnimationFrame(() => this.draw());
    }
  }

  drawMovableObjects() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addParallaxObjectsToMap(this.level.lightObjects);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.poisonBottles);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.bossBubbles);
  }

  addParallaxObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addParallaxObjectToMap(object);
    });
  }

  addParallaxObjectToMap(object) {
    let originalX = object.x;
    object.x = originalX - this.camera_x + this.camera_x * object.parallaxSpeed;
    this.addToMap(object);
    object.x = originalX;
  }

  drawStatusBars() {
    this.addToMap(this.statusBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.poisonBar);
    this.addToMap(this.bossBar);
  }

  stopWorld() {
    this.stopped = true;
    clearInterval(this.gameInterval);
  }

  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  addToMap(object) {
    if (object.otherDirection) {
      this.flipImage(object);
    }
    object.draw(this.ctx);
    if (object.otherDirection) {
      this.flipImageBack(object);
    }
  }

  flipImage(object) {
    this.ctx.save();
    this.ctx.translate(object.width, 0);
    this.ctx.scale(-1, 1);
    object.x = object.x * -1;
  }

  flipImageBack(object) {
    object.x = object.x * -1;
    this.ctx.restore();
  }
}
