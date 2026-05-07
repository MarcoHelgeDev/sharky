let canvas;
let world;
let keyboard = new Keyboard();
let audioManager = new AudioManager();

const init = function () {
  canvas = document.querySelector(".canvas-container");
  addButtonEvents();
  addDialogEvents();
  addFirstInteractionEvents();
  addMobileButtonEvents();
  updateMuteButton();
};

function addFirstInteractionEvents() {
  document.addEventListener("click", startAudioAfterInteraction, {
    once: true,
  });
  document.addEventListener("keydown", startAudioAfterInteraction, {
    once: true,
  });
  document.addEventListener("touchstart", startAudioAfterInteraction, {
    once: true,
  });
}

function startAudioAfterInteraction() {
  if (isStartScreenVisible()) {
    audioManager.playMenuMusic();
  }
}

function isStartScreenVisible() {
  return !document.querySelector(".start-screen").classList.contains("d-none");
}

function startGame() {
  if (world) world.stopWorld();
  keyboard = new Keyboard();
  hideStartScreen();
  setGameBoxPlaying();
  audioManager.playClickSound();
  audioManager.playStartSound();
  audioManager.playGameMusic();
  world = new World(canvas, keyboard, audioManager);
}

function restartGame() {
  audioManager.playClickSound();
  hideEndScreen();
  startGame();
}

function goToHomeScreen() {
  if (world) world.stopWorld();
  unsetGameBoxPlaying();
  closeFallbackFullscreen();
  audioManager.playClickSound();
  audioManager.playMenuMusic();
  hideEndScreen();
  showStartScreen();
  clearCanvas();
}

function setGameBoxPlaying() {
  document.querySelector(".game-box").classList.add("is-playing");
}

function unsetGameBoxPlaying() {
  document.querySelector(".game-box").classList.remove("is-playing");
}

function hideStartScreen() {
  document.querySelector(".start-screen").classList.add("d-none");
}

function showStartScreen() {
  document.querySelector(".start-screen").classList.remove("d-none");
}

function showEndScreen(type) {
  unsetGameBoxPlaying();
  let endScreen = document.querySelector(".end-screen");
  let title = document.querySelector(".end-title");
  title.innerHTML = type == "win" ? "Gewonnen!" : "Game Over";
  endScreen.classList.remove("d-none");
}

function hideEndScreen() {
  document.querySelector(".end-screen").classList.add("d-none");
}

function clearCanvas() {
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function addButtonEvents() {
  document.querySelector(".start-button").addEventListener("click", startGame);
  document
    .querySelector(".restart-button")
    .addEventListener("click", restartGame);
  document
    .querySelector(".home-button")
    .addEventListener("click", goToHomeScreen);
  document.querySelector(".mute-button").addEventListener("click", toggleMute);
  document
    .querySelector(".fullscreen-button")
    .addEventListener("click", toggleFullscreen);
}

function toggleMute() {
  audioManager.playClickSound();
  audioManager.toggleMute();
  updateMuteButton();
  playMusicAfterMuteChange();
}

function toggleFullscreen() {
  audioManager.playClickSound();
  document.body.classList.toggle("fake-fullscreen");
}

function closeFallbackFullscreen() {
  document.body.classList.remove("fake-fullscreen");
}

function updateMuteButton() {
  document.querySelector(".mute-button").innerHTML = audioManager.getMuteIcon();
}

function playMusicAfterMuteChange() {
  if (audioManager.isMuted) return;

  if (world && isStartScreenHidden()) {
    audioManager.playGameMusic();
  } else {
    audioManager.playMenuMusic();
  }
}

function isStartScreenHidden() {
  return document.querySelector(".start-screen").classList.contains("d-none");
}

function addDialogEvents() {
  let dialog = document.querySelector(".help-dialog");
  document
    .querySelector(".help-button")
    .addEventListener("click", () => openHelpDialog(dialog));
  document
    .querySelector(".close-dialog-button")
    .addEventListener("click", () => closeHelpDialog(dialog));
  dialog.addEventListener("click", (event) =>
    closeDialogByBackdrop(event, dialog),
  );
}

function openHelpDialog(dialog) {
  audioManager.playClickSound();
  audioManager.playMenuMusic();
  dialog.showModal();
}

function closeHelpDialog(dialog) {
  audioManager.playClickSound();
  dialog.close();
}

function closeDialogByBackdrop(event, dialog) {
  if (event.target == dialog) {
    audioManager.playClickSound();
    dialog.close();
  }
}

function addMobileButtonEvents() {
  let buttons = document.querySelectorAll(".mobile-button");

  buttons.forEach((button) => {
    addMobilePointerEvents(button);
    addMobileContextMenuEvent(button);
  });
}

function addMobilePointerEvents(button) {
  button.addEventListener("pointerdown", (event) =>
    pressMobileButton(event, button),
  );
  button.addEventListener("pointerup", (event) =>
    releaseMobileButton(event, button),
  );
  button.addEventListener("pointerleave", (event) =>
    releaseMobileButton(event, button),
  );
  button.addEventListener("pointercancel", (event) =>
    releaseMobileButton(event, button),
  );
}

function addMobileContextMenuEvent(button) {
  button.addEventListener("contextmenu", (event) => event.preventDefault());
}

function pressMobileButton(event, button) {
  event.preventDefault();
  let key = button.dataset.key;

  if (isAttackKey(key)) {
    pressAttackKey(key);
  } else {
    keyboard[key] = true;
  }
}

function releaseMobileButton(event, button) {
  event.preventDefault();
  let key = button.dataset.key;

  if (!isAttackKey(key)) {
    keyboard[key] = false;
  }
}

function isAttackKey(key) {
  return key == "D" || key == "F";
}

function pressAttackKey(key) {
  keyboard[key] = true;

  setTimeout(() => {
    keyboard[key] = false;
  }, 180);
}

document.addEventListener("keydown", (event) => {
  if (event.keyCode == 39) keyboard.RIGHT = true;
  if (event.keyCode == 37) keyboard.LEFT = true;
  if (event.keyCode == 38) keyboard.UP = true;
  if (event.keyCode == 40) keyboard.DOWN = true;
  if (event.keyCode == 32) keyboard.SPACE = true;
  if (event.keyCode == 68) keyboard.D = true;
  if (event.keyCode == 70) keyboard.F = true;
});

document.addEventListener("keyup", (event) => {
  if (event.keyCode == 39) keyboard.RIGHT = false;
  if (event.keyCode == 37) keyboard.LEFT = false;
  if (event.keyCode == 38) keyboard.UP = false;
  if (event.keyCode == 40) keyboard.DOWN = false;
  if (event.keyCode == 32) keyboard.SPACE = false;
  if (event.keyCode == 68) keyboard.D = false;
  if (event.keyCode == 70) keyboard.F = false;
});

init();
