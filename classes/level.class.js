/**
 * Represents one game level with enemies, items and background objects.
 * @class
 */
class Level {
  enemies;
  clouds;
  backgroundObjects;
  coins;
  poisonBottles;
  lightObjects;
  level_end_x = 3600;

  /**
   * Creates a new level.
   * @param {MovableObject[]} enemies - The enemies of the level.
   * @param {MovableObject[]} clouds - The cloud objects of the level.
   * @param {BackgroundObject[]} backgroundObjects - The background objects.
   * @param {Coin[]} coins - The coins that can be collected.
   * @param {PoisonBottle[]} poisonBottles - The poison bottles that can be collected.
   * @param {LightObject[]} lightObjects - The light objects for the background.
   */
  constructor(
    enemies,
    clouds,
    backgroundObjects,
    coins,
    poisonBottles,
    lightObjects,
  ) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.poisonBottles = poisonBottles;
    this.lightObjects = lightObjects;
  }
}
