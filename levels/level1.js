/**
 * Creates the first game level.
 * @returns {Level} The created level.
 */
function createLevel() {
  return new Level(
    createEnemies(),
    [],
    createBackgroundObjects(),
    createCoins(),
    createPoisonBottles(),
    createLightObjects(),
  );
}

/**
 * Creates all enemies for the level.
 * @returns {MovableObject[]} The enemies of the level.
 */
function createEnemies() {
  return [
    new Jellyfish(350, 70),
    new Jellyfish(760, 260),
    new Jellyfish(1220, 110),
    new Jellyfish(1760, 280),
    new Jellyfish(2320, 90),
    new Pufferfish(620, 320),
    new Pufferfish(1080, 180),
    new Pufferfish(1560, 300),
    new Pufferfish(2180, 190),
    new Pufferfish(2700, 320),
    new Endboss(),
  ];
}

/**
 * Creates all coins for the level.
 * @returns {Coin[]} The coins of the level.
 */
function createCoins() {
  return [
    new Coin(180, 120),
    new Coin(390, 300),
    new Coin(650, 150),
    new Coin(920, 280),
    new Coin(1240, 120),
    new Coin(1580, 310),
    new Coin(1950, 150),
    new Coin(2360, 280),
    new Coin(2780, 110),
    new Coin(3150, 260),
  ];
}

/**
 * Creates all poison bottles for the level.
 * @returns {PoisonBottle[]} The poison bottles of the level.
 */
function createPoisonBottles() {
  return [
    new PoisonBottle(260, 300),
    new PoisonBottle(560, 110),
    new PoisonBottle(1020, 320),
    new PoisonBottle(1480, 230),
    new PoisonBottle(1980, 110),
    new PoisonBottle(2500, 300),
  ];
}

/**
 * Creates all background objects for the level.
 * @returns {BackgroundObject[]} The background objects of the level.
 */
function createBackgroundObjects() {
  let backgroundObjects = [];
  let positions = [-720, 0, 720, 1440, 2160, 2880, 3600];

  for (let i = 0; i < positions.length; i++) {
    addBackgroundSet(backgroundObjects, positions[i], i);
  }

  return backgroundObjects;
}

/**
 * Adds one set of background layers.
 * @param {BackgroundObject[]} backgroundObjects - The background object array.
 * @param {number} x - The x position of the background set.
 * @param {number} i - The index of the background set.
 */
function addBackgroundSet(backgroundObjects, x, i) {
  let image = i % 2 == 0 ? "D2" : "D1";

  backgroundObjects.push(
    new BackgroundObject(`img/3. Background/Layers/5. Water/${image}.png`, x),
  );
  backgroundObjects.push(
    new BackgroundObject(`img/3. Background/Layers/4.Fondo 2/${image}.png`, x),
  );
  backgroundObjects.push(
    new BackgroundObject(`img/3. Background/Layers/3.Fondo 1/${image}.png`, x),
  );
  backgroundObjects.push(
    new BackgroundObject(`img/3. Background/Layers/2. Floor/${image}.png`, x),
  );
}

/**
 * Creates all light objects for the level.
 * @returns {LightObject[]} The light objects of the level.
 */
function createLightObjects() {
  let lightObjects = [];
  let positions = [-720, 0, 720, 1440, 2160, 2880, 3600];

  for (let i = 0; i < positions.length; i++) {
    addLightObject(lightObjects, positions[i], i);
  }

  return lightObjects;
}

/**
 * Adds one light object.
 * @param {LightObject[]} lightObjects - The light object array.
 * @param {number} x - The x position of the light object.
 * @param {number} i - The index of the light object.
 */
function addLightObject(lightObjects, x, i) {
  let image = i % 2 == 0 ? "1" : "2";
  lightObjects.push(
    new LightObject(`img/3. Background/Layers/1. Light/${image}.png`, x),
  );
}
