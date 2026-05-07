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

function createBackgroundObjects() {
  let backgroundObjects = [];
  let positions = [-720, 0, 720, 1440, 2160, 2880, 3600];

  for (let i = 0; i < positions.length; i++) {
    addBackgroundSet(backgroundObjects, positions[i], i);
  }

  return backgroundObjects;
}

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

function createLightObjects() {
  let lightObjects = [];
  let positions = [-720, 0, 720, 1440, 2160, 2880, 3600];

  for (let i = 0; i < positions.length; i++) {
    addLightObject(lightObjects, positions[i], i);
  }

  return lightObjects;
}

function addLightObject(lightObjects, x, i) {
  let image = i % 2 == 0 ? "1" : "2";
  lightObjects.push(
    new LightObject(`img/3. Background/Layers/1. Light/${image}.png`, x),
  );
}
