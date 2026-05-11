let canvas;
let world;
let keyboard = new Keyboard();
let audioManager = new AudioManager();

/**
 * Initializes the game page.
 */
const init = function () {
  canvas = document.querySelector(".canvas-container");
  checkTouchDevice();
  addButtonEvents();
  addDialogEvents();
  addFirstInteractionEvents();
  addMobileButtonEvents();
  updateMuteButton();
  updateTouchButton();
};

/**
 * Checks if the user is using a touch device.
 */
function checkTouchDevice() {
  if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
    document.body.classList.add("touch-device");
  }

  document.addEventListener(
    "touchstart",
    () => document.body.classList.add("touch-device"),
    { once: true },
  );
}

/**
 * Adds events that start the audio after the first user interaction.
 */
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

/**
 * Starts the menu music after the first user interaction.
 */
function startAudioAfterInteraction() {
  if (isStartScreenVisible()) {
    audioManager.playMenuMusic();
  }
}

/**
 * Checks if the start screen is visible.
 * @returns {boolean} True if the start screen is visible.
 */
function isStartScreenVisible() {
  return !document.querySelector(".start-screen").classList.contains("d-none");
}

/**
 * Starts a new game.
 */
function startGame() {
  if (world) world.stopWorld();
  keyboard = new Keyboard();
  resetTouchControls();
  hideStartScreen();
  setGameBoxPlaying();
  audioManager.playClickSound();
  audioManager.playStartSound();
  audioManager.playGameMusic();
  world = new World(canvas, keyboard, audioManager);
}

/**
 * Restarts the game after win or game over.
 */
function restartGame() {
  audioManager.playClickSound();
  hideEndScreen();
  startGame();
}

/**
 * Goes back to the home screen.
 */
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

/**
 * Adds the playing class to the game box.
 */
function setGameBoxPlaying() {
  document.querySelector(".game-box").classList.add("is-playing");
}

/**
 * Removes the playing class from the game box.
 */
function unsetGameBoxPlaying() {
  document.querySelector(".game-box").classList.remove("is-playing");
}

/**
 * Hides the start screen.
 */
function hideStartScreen() {
  document.querySelector(".start-screen").classList.add("d-none");
}

/**
 * Shows the start screen.
 */
function showStartScreen() {
  document.querySelector(".start-screen").classList.remove("d-none");
}

/**
 * Shows the end screen.
 * @param {string} type - The end screen type, either win or gameover.
 */
function showEndScreen(type) {
  unsetGameBoxPlaying();
  let endScreen = document.querySelector(".end-screen");
  let title = document.querySelector(".end-title");
  title.innerHTML = type == "win" ? "Gewonnen!" : "Game Over";
  endScreen.classList.remove("d-none");
}

/**
 * Hides the end screen.
 */
function hideEndScreen() {
  document.querySelector(".end-screen").classList.add("d-none");
}

/**
 * Clears the canvas.
 */
function clearCanvas() {
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * Adds click events to all main buttons.
 */
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
  document
    .querySelector(".touch-toggle-button")
    .addEventListener("click", toggleTouchControls);
}

/**
 * Turns the sound on or off.
 */
function toggleMute() {
  audioManager.playClickSound();
  audioManager.toggleMute();
  updateMuteButton();
  playMusicAfterMuteChange();
}

/**
 * Toggles the fake fullscreen mode.
 */
function toggleFullscreen() {
  audioManager.playClickSound();
  document.body.classList.toggle("fake-fullscreen");
}

/**
 * Closes the fake fullscreen mode.
 */
function closeFallbackFullscreen() {
  document.body.classList.remove("fake-fullscreen");
}

/**
 * Updates the mute button icon.
 */
function updateMuteButton() {
  document.querySelector(".mute-button").innerHTML = audioManager.getMuteIcon();
}

/**
 * Shows or hides the touch controls.
 */
function toggleTouchControls() {
  audioManager.playClickSound();

  if (touchControlsAreVisible()) {
    hideTouchControls();
  } else {
    showTouchControls();
  }

  updateTouchButton();
}

/**
 * Checks if touch controls are currently visible.
 * @returns {boolean} True if the touch controls are visible.
 */
function touchControlsAreVisible() {
  let gameBox = document.querySelector(".game-box");

  if (gameBox.classList.contains("touch-controls-hidden")) return false;

  return (
    gameBox.classList.contains("touch-controls-visible") ||
    isSmallLandscapeScreen()
  );
}

/**
 * Checks if the current screen is a small landscape screen.
 * @returns {boolean} True if the screen is small and in landscape mode.
 */
function isSmallLandscapeScreen() {
  return window.matchMedia("(max-width: 1024px) and (orientation: landscape)")
    .matches;
}

/**
 * Shows the touch controls.
 */
function showTouchControls() {
  let gameBox = document.querySelector(".game-box");
  gameBox.classList.add("touch-controls-visible");
  gameBox.classList.remove("touch-controls-hidden");
}

/**
 * Hides the touch controls.
 */
function hideTouchControls() {
  let gameBox = document.querySelector(".game-box");
  gameBox.classList.add("touch-controls-hidden");
  gameBox.classList.remove("touch-controls-visible");
}

/**
 * Resets the touch control classes.
 */
function resetTouchControls() {
  let gameBox = document.querySelector(".game-box");
  gameBox.classList.remove("touch-controls-hidden");
  gameBox.classList.remove("touch-controls-visible");
  updateTouchButton();
}

/**
 * Updates the touch button icon.
 */
function updateTouchButton() {
  let button = document.querySelector(".touch-toggle-button");
  if (!button) return;

  button.innerHTML = touchControlsAreVisible() ? "✕" : "🎮";
}

/**
 * Plays the correct music after mute was changed.
 */
function playMusicAfterMuteChange() {
  if (audioManager.isMuted) return;

  if (world && isStartScreenHidden()) {
    audioManager.playGameMusic();
  } else {
    audioManager.playMenuMusic();
  }
}

/**
 * Checks if the start screen is hidden.
 * @returns {boolean} True if the start screen is hidden.
 */
function isStartScreenHidden() {
  return document.querySelector(".start-screen").classList.contains("d-none");
}

/**
 * Adds all events for the help dialog.
 */
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

/**
 * Opens the help dialog.
 * @param {HTMLDialogElement} dialog - The help dialog.
 */
function openHelpDialog(dialog) {
  audioManager.playClickSound();
  audioManager.playMenuMusic();
  dialog.showModal();
}

/**
 * Closes the help dialog.
 * @param {HTMLDialogElement} dialog - The help dialog.
 */
function closeHelpDialog(dialog) {
  audioManager.playClickSound();
  dialog.close();
}

/**
 * Closes the dialog when the backdrop is clicked.
 * @param {PointerEvent} event - The click event.
 * @param {HTMLDialogElement} dialog - The help dialog.
 */
function closeDialogByBackdrop(event, dialog) {
  if (event.target == dialog) {
    audioManager.playClickSound();
    dialog.close();
  }
}

/**
 * Adds pointer events to the mobile buttons.
 */
function addMobileButtonEvents() {
  let buttons = document.querySelectorAll(".mobile-button");

  buttons.forEach((button) => {
    addMobilePointerEvents(button);
    addMobileContextMenuEvent(button);
  });
}

/**
 * Adds pointer events to one mobile button.
 * @param {HTMLButtonElement} button - The mobile button.
 */
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

/**
 * Prevents the context menu on one mobile button.
 * @param {HTMLButtonElement} button - The mobile button.
 */
function addMobileContextMenuEvent(button) {
  button.addEventListener("contextmenu", (event) => event.preventDefault());
}

/**
 * Handles pressing a mobile button.
 * @param {PointerEvent} event - The pointer event.
 * @param {HTMLButtonElement} button - The pressed mobile button.
 */
function pressMobileButton(event, button) {
  event.preventDefault();
  let key = button.dataset.key;

  if (isAttackKey(key)) {
    pressAttackKey(key);
  } else {
    keyboard[key] = true;
  }
}

/**
 * Handles releasing a mobile button.
 * @param {PointerEvent} event - The pointer event.
 * @param {HTMLButtonElement} button - The released mobile button.
 */
function releaseMobileButton(event, button) {
  event.preventDefault();
  let key = button.dataset.key;

  if (!isAttackKey(key)) {
    keyboard[key] = false;
  }
}

/**
 * Checks if the key is an attack key.
 * @param {string} key - The key name.
 * @returns {boolean} True if the key is an attack key.
 */
function isAttackKey(key) {
  return key == "D" || key == "F";
}

/**
 * Presses an attack key for a short time.
 * @param {string} key - The attack key.
 */
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
