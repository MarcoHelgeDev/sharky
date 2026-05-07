class Level {
  enemies;
  clouds;
  backgroundObjects;
  coins;
  poisonBottles;
  lightObjects;
  level_end_x = 3600;

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
