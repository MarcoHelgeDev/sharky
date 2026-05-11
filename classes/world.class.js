/**
 * Represents the main game world.
 * It handles drawing, collisions, collectables, attacks and the game end.
 * @class
 */
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

  /**
   * Creates a new game world.
   * @param {HTMLCanvasElement} canvas - The canvas element of the game.
   * @param {Keyboard} keyboard - The keyboard input object.
   * @param {AudioManager} audioManager - The audio manager of the game.
   */
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

  /**
   * Gives the character access to the world.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Starts the main game interval.
   */
  run() {
    this.gameInterval = setInterval(() => {
      if (!this.gameOver && !this.gameWon && !this.stopped) {
        this.runGameChecks();
      }
    }, 1000 / 60);
  }

  /**
   * Runs all important game checks.
   */
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

  /**
   * Activates the boss when the character reaches the boss area.
   */
  checkBossActivation() {
    let endboss = this.getEndboss();
    if (endboss && this.character.x > this.bossActivationX) {
      endboss.activate();
    }
  }

  /**
   * Checks if the character should shoot a bubble.
   */
  checkThrowObjects() {
    if (this.keyboard.D && this.canThrowBubble()) {
      this.prepareBubbleShot();
    }
  }

  /**
   * Checks if the bubble cooldown is over.
   * @returns {boolean} True if the character can shoot a bubble.
   */
  canThrowBubble() {
    let timePassed = new Date().getTime() - this.lastBubbleShot;
    return timePassed > this.bubbleCooldown;
  }

  /**
   * Starts the bubble animation and creates the bubble after a short delay.
   */
  prepareBubbleShot() {
    this.character.startBubbleAttack();
    this.lastBubbleShot = new Date().getTime();
    this.keyboard.D = false;
    setTimeout(() => {
      this.throwBubbleAfterAnimation();
    }, this.bubbleDelay);
  }

  /**
   * Creates the bubble after the attack animation started.
   */
  throwBubbleAfterAnimation() {
    if (this.stopped || this.character.isDead()) return;
    let bubble = this.createBubble();
    this.throwableObjects.push(bubble);
    this.audioManager.playBubbleSound();
  }

  /**
   * Creates a normal bubble or poison bubble.
   * @returns {ThrowableObject} The created bubble.
   */
  createBubble() {
    let direction = this.character.otherDirection ? -1 : 1;
    let x = this.getBubbleStartX(direction);
    let y = this.character.y + 150;
    return new ThrowableObject(x, y, direction, this.isPoisonUnlocked);
  }

  /**
   * Returns the start x position for a bubble.
   * @param {number} direction - The direction of the bubble.
   * @returns {number} The x position of the bubble.
   */
  getBubbleStartX(direction) {
    return direction == -1
      ? this.character.x + 20
      : this.character.x + this.character.width - 35;
  }

  /**
   * Checks if the fin slap hits an enemy.
   */
  checkFinSlapAttack() {
    if (!this.character.isFinSlapActive) return;
    this.level.enemies.forEach((enemy) => {
      this.hitEnemyWithFinSlap(enemy);
    });
  }

  /**
   * Hits one enemy with the fin slap attack.
   * @param {MovableObject} enemy - The enemy that should be checked.
   */
  hitEnemyWithFinSlap(enemy) {
    if (enemy instanceof Endboss) return;
    if (enemy.isKilled || enemy.removeFromWorld) return;
    if (this.character.isFinSlapColliding(enemy)) {
      enemy.kill();
      this.audioManager.playEnemyDeadSound();
    }
  }

  /**
   * Checks if the boss should shoot a bubble.
   */
  checkBossBubbleAttack() {
    let endboss = this.getEndboss();
    if (this.canBossShoot(endboss)) {
      this.createBossBubble(endboss);
    }
  }

  /**
   * Checks if the boss can shoot.
   * @param {Endboss} endboss - The endboss of the level.
   * @returns {boolean} True if the boss can shoot.
   */
  canBossShoot(endboss) {
    if (!endboss || !endboss.isActivated || endboss.isKilled) return false;
    let timePassed = new Date().getTime() - this.lastBossBubble;
    return timePassed > this.getBossBubbleCooldown(endboss);
  }

  /**
   * Returns the cooldown for boss bubbles.
   * @param {Endboss} endboss - The endboss of the level.
   * @returns {number} The cooldown in milliseconds.
   */
  getBossBubbleCooldown(endboss) {
    return endboss.energy <= 50 ? 1700 : 2400;
  }

  /**
   * Creates a new boss bubble.
   * @param {Endboss} endboss - The endboss that shoots the bubble.
   */
  createBossBubble(endboss) {
    let bubble = new BossBubble(endboss.x + 80, endboss.y + 220);
    this.bossBubbles.push(bubble);
    this.lastBossBubble = new Date().getTime();
    this.audioManager.playBubbleSound();
  }

  /**
   * Checks all enemy and bubble collisions.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      this.checkEnemyCollision(enemy);
      this.checkBubbleCollision(enemy);
    });
    this.checkBossBubbleCollisions();
  }

  /**
   * Checks if the character collides with an enemy.
   * @param {MovableObject} enemy - The enemy that should be checked.
   */
  checkEnemyCollision(enemy) {
    if (enemy.isKilled || enemy.removeFromWorld) return;
    if (this.character.isColliding(enemy)) {
      this.hitCharacter();
    }
  }

  /**
   * Hits the character and updates the health bar.
   */
  hitCharacter() {
    let energyBeforeHit = this.character.energy;
    this.character.hit();
    this.statusBar.setPercentage(this.character.energy);
    if (this.character.energy < energyBeforeHit) {
      this.audioManager.playHurtSound();
    }
  }

  /**
   * Checks if a player bubble hits an enemy.
   * @param {MovableObject} enemy - The enemy that should be checked.
   */
  checkBubbleCollision(enemy) {
    this.throwableObjects.forEach((bubble) => {
      this.hitEnemyWithBubble(enemy, bubble);
    });
  }

  /**
   * Hits one enemy with one bubble.
   * @param {MovableObject} enemy - The enemy that should be hit.
   * @param {ThrowableObject} bubble - The bubble that should hit the enemy.
   */
  hitEnemyWithBubble(enemy, bubble) {
    if (enemy.isKilled || bubble.removeFromWorld) return;
    if (bubble.isColliding(enemy)) {
      this.damageEnemy(enemy, bubble);
      bubble.removeFromWorld = true;
    }
  }

  /**
   * Damages an enemy depending on the enemy and bubble type.
   * @param {MovableObject} enemy - The enemy that gets damage.
   * @param {ThrowableObject} bubble - The bubble that hits the enemy.
   */
  damageEnemy(enemy, bubble) {
    if (enemy instanceof Endboss && bubble.isPoisoned) {
      this.hitEndboss(enemy);
    } else if (!(enemy instanceof Endboss)) {
      enemy.kill();
      this.audioManager.playEnemyDeadSound();
    }
  }

  /**
   * Hits the endboss and updates the boss health bar.
   * @param {Endboss} endboss - The endboss that should be hit.
   */
  hitEndboss(endboss) {
    if (endboss.hitByPoisonBubble()) {
      this.bossBar.setPercentage(endboss.energy);
      this.playBossDamageSound(endboss);
    }
  }

  /**
   * Plays the correct sound after boss damage.
   * @param {Endboss} endboss - The endboss that was hit.
   */
  playBossDamageSound(endboss) {
    if (endboss.isKilled) return this.audioManager.playEnemyDeadSound();
    this.audioManager.playBossHitSound();
  }

  /**
   * Checks if a boss bubble hits the character.
   */
  checkBossBubbleCollisions() {
    this.bossBubbles.forEach((bubble) => {
      this.hitCharacterWithBossBubble(bubble);
    });
  }

  /**
   * Hits the character with a boss bubble.
   * @param {BossBubble} bubble - The boss bubble that should be checked.
   */
  hitCharacterWithBossBubble(bubble) {
    if (bubble.removeFromWorld) return;
    if (this.character.isColliding(bubble)) {
      this.hitCharacter();
      bubble.removeFromWorld = true;
    }
  }

  /**
   * Checks all collectable collisions.
   */
  checkCollectables() {
    this.checkCoinCollisions();
    this.checkPoisonCollisions();
  }

  /**
   * Checks if the character collects coins.
   */
  checkCoinCollisions() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.collectCoin(coin);
      }
    });
  }

  /**
   * Collects one coin and updates the coin bar.
   * @param {Coin} coin - The coin that should be collected.
   */
  collectCoin(coin) {
    coin.removeFromWorld = true;
    this.collectedCoins += 10;
    this.checkCoinAmount();
    this.coinBar.setPercentage(this.collectedCoins);
    this.audioManager.playCoinSound();
  }

  /**
   * Keeps the coin amount at a maximum of 100.
   */
  checkCoinAmount() {
    if (this.collectedCoins > 100) {
      this.collectedCoins = 100;
    }
  }

  /**
   * Checks if the character collects poison bottles.
   */
  checkPoisonCollisions() {
    this.level.poisonBottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.collectPoison(bottle);
      }
    });
  }

  /**
   * Collects one poison bottle and updates the poison bar.
   * @param {PoisonBottle} bottle - The poison bottle that should be collected.
   */
  collectPoison(bottle) {
    bottle.removeFromWorld = true;
    this.collectedPoison += 20;
    this.checkPoisonAmount();
    this.poisonBar.setPercentage(this.collectedPoison);
    this.audioManager.playPoisonSound();
  }

  /**
   * Keeps the poison amount at a maximum of 100.
   */
  checkPoisonAmount() {
    if (this.collectedPoison >= 100) {
      this.collectedPoison = 100;
      this.unlockPoisonBubble();
    }
  }

  /**
   * Unlocks poison bubbles.
   */
  unlockPoisonBubble() {
    if (this.isPoisonUnlocked) return;
    this.isPoisonUnlocked = true;
    this.audioManager.playPowerReadySound();
  }

  /**
   * Removes all objects that should no longer be drawn.
   */
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

  /**
   * Checks if the game is won or lost.
   */
  checkGameEnd() {
    if (this.character.isDead()) {
      this.endGame("gameover");
    }
    if (this.isEndbossDead()) {
      this.endGame("win");
    }
  }

  /**
   * Checks if the endboss is dead and the dead animation is done.
   * @returns {boolean} True if the endboss is fully defeated.
   */
  isEndbossDead() {
    let endboss = this.getEndboss();
    return endboss && endboss.isKilled && endboss.deadCounter > 18;
  }

  /**
   * Returns the endboss from the enemy array.
   * @returns {Endboss} The endboss of the level.
   */
  getEndboss() {
    for (let i = 0; i < this.level.enemies.length; i++) {
      if (this.level.enemies[i] instanceof Endboss) {
        return this.level.enemies[i];
      }
    }
  }

  /**
   * Ends the game and shows the correct end screen.
   * @param {string} type - The end type, either win or gameover.
   */
  endGame(type) {
    this.gameOver = type == "gameover";
    this.gameWon = type == "win";
    this.stopWorld();
    this.audioManager.stopAllSounds();
    this.playEndSound(type);
    showEndScreen(type);
  }

  /**
   * Plays the correct end sound.
   * @param {string} type - The end type, either win or gameover.
   */
  playEndSound(type) {
    if (type == "win") return this.audioManager.playWinSound();
    this.audioManager.playGameOverSound();
  }

  /**
   * Draws the whole game on the canvas.
   */
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

  /**
   * Draws all movable objects and background objects.
   */
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

  /**
   * Adds all parallax objects to the map.
   * @param {LightObject[]} objects - The parallax objects.
   */
  addParallaxObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addParallaxObjectToMap(object);
    });
  }

  /**
   * Adds one parallax object to the map.
   * @param {LightObject} object - The parallax object.
   */
  addParallaxObjectToMap(object) {
    let originalX = object.x;
    object.x = originalX - this.camera_x + this.camera_x * object.parallaxSpeed;
    this.addToMap(object);
    object.x = originalX;
  }

  /**
   * Draws all status bars.
   */
  drawStatusBars() {
    this.addToMap(this.statusBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.poisonBar);
    this.addToMap(this.bossBar);
  }

  /**
   * Stops the world interval and drawing loop.
   */
  stopWorld() {
    this.stopped = true;
    clearInterval(this.gameInterval);
  }

  /**
   * Adds several objects to the map.
   * @param {DrawableObject[]} objects - The objects that should be drawn.
   */
  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  /**
   * Adds one object to the map.
   * @param {DrawableObject} object - The object that should be drawn.
   */
  addToMap(object) {
    if (object.otherDirection) {
      this.flipImage(object);
    }
    object.draw(this.ctx);
    if (object.otherDirection) {
      this.flipImageBack(object);
    }
  }

  /**
   * Flips an image to the other direction.
   * @param {DrawableObject} object - The object that should be flipped.
   */
  flipImage(object) {
    this.ctx.save();
    this.ctx.translate(object.width, 0);
    this.ctx.scale(-1, 1);
    object.x = object.x * -1;
  }

  /**
   * Flips an image back to the normal direction.
   * @param {DrawableObject} object - The object that should be flipped back.
   */
  flipImageBack(object) {
    object.x = object.x * -1;
    this.ctx.restore();
  }
}
