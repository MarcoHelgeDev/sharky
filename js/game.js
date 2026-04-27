let canvas;
let world;

const init = function () {
  canvas = document.querySelector(".canvas-container");
  world = new World(canvas);

  console.log("My Character is", world.character);
};

init();
