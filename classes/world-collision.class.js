/**
 * Handles collisions and collectables inside the game world.
 * @class
 */
class WorldCollision {
  world;

  /**
   * Creates a collision helper for the game world.
   * @param {World} world - The current game world.
   */
  constructor(world) {
    this.world = world;
  }

  /**
   * Checks if the fin slap hits an enemy.
   */
  checkFinSlapAttack() {
    if (!this.world.character.isFinSlapActive) return;
    this.world.level.enemies.forEach((enemy) => {
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
    if (this.world.character.isFinSlapColliding(enemy)) {
      enemy.kill();
      this.world.audioManager.playEnemyDeadSound();
    }
  }

  /**
   * Checks all enemy and bubble collisions.
   */
  checkCollisions() {
    this.world.level.enemies.forEach((enemy) => {
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
    if (this.world.character.isColliding(enemy)) {
      this.hitCharacter();
    }
  }

  /**
   * Hits the character and updates the health bar.
   */
  hitCharacter() {
    let energyBeforeHit = this.world.character.energy;
    this.world.character.hit();
    this.world.statusBar.setPercentage(this.world.character.energy);
    if (this.world.character.energy < energyBeforeHit) {
      this.world.audioManager.playHurtSound();
    }
  }

  /**
   * Checks if a player bubble hits an enemy.
   * @param {MovableObject} enemy - The enemy that should be checked.
   */
  checkBubbleCollision(enemy) {
    this.world.throwableObjects.forEach((bubble) => {
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
      this.world.audioManager.playEnemyDeadSound();
    }
  }

  /**
   * Hits the endboss and updates the boss health bar.
   * @param {Endboss} endboss - The endboss that should be hit.
   */
  hitEndboss(endboss) {
    if (endboss.hitByPoisonBubble()) {
      this.world.bossBar.setPercentage(endboss.energy);
      this.playBossDamageSound(endboss);
    }
  }

  /**
   * Plays the correct sound after boss damage.
   * @param {Endboss} endboss - The endboss that was hit.
   */
  playBossDamageSound(endboss) {
    if (endboss.isKilled) return this.world.audioManager.playEnemyDeadSound();
    this.world.audioManager.playBossHitSound();
  }

  /**
   * Checks if a boss bubble hits the character.
   */
  checkBossBubbleCollisions() {
    this.world.bossBubbles.forEach((bubble) => {
      this.hitCharacterWithBossBubble(bubble);
    });
  }

  /**
   * Hits the character with a boss bubble.
   * @param {BossBubble} bubble - The boss bubble that should be checked.
   */
  hitCharacterWithBossBubble(bubble) {
    if (bubble.removeFromWorld) return;
    if (this.world.character.isColliding(bubble)) {
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
    this.world.level.coins.forEach((coin) => {
      if (this.world.character.isColliding(coin)) {
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
    this.world.collectedCoins += 10;
    this.checkCoinAmount();
    this.world.coinBar.setPercentage(this.world.collectedCoins);
    this.world.audioManager.playCoinSound();
  }

  /**
   * Keeps the coin amount at a maximum of 100.
   */
  checkCoinAmount() {
    if (this.world.collectedCoins > 100) {
      this.world.collectedCoins = 100;
    }
  }

  /**
   * Checks if the character collects poison bottles.
   */
  checkPoisonCollisions() {
    this.world.level.poisonBottles.forEach((bottle) => {
      if (this.world.character.isColliding(bottle)) {
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
    this.world.collectedPoison += 20;
    this.checkPoisonAmount();
    this.world.poisonBar.setPercentage(this.world.collectedPoison);
    this.world.audioManager.playPoisonSound();
  }

  /**
   * Keeps the poison amount at a maximum of 100.
   */
  checkPoisonAmount() {
    if (this.world.collectedPoison >= 100) {
      this.world.collectedPoison = 100;
      this.unlockPoisonBubble();
    }
  }

  /**
   * Unlocks poison bubbles.
   */
  unlockPoisonBubble() {
    if (this.world.isPoisonUnlocked) return;
    this.world.isPoisonUnlocked = true;
    this.world.audioManager.playPowerReadySound();
  }
}
