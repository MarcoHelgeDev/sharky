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
  openMobileFullscreen();
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
  closeFullscreen();
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
 * Toggles the fullscreen mode.
 */
function toggleFullscreen() {
  audioManager.playClickSound();
  if (isFullscreenActive()) {
    closeFullscreen();
  } else {
    openFullscreen();
  }
}

/**
 * Opens fullscreen and uses the CSS fallback if it is not supported.
 */
function openFullscreen() {
  let element = document.documentElement;
  let request = element.requestFullscreen || element.webkitRequestFullscreen;
  if (!request) return document.body.classList.add("fake-fullscreen");

  let result = request.call(element);
  if (result && result.catch) {
    result.catch(() => document.body.classList.add("fake-fullscreen"));
  }
}

/**
 * Opens fullscreen automatically when a game starts on a small touch device.
 */
function openMobileFullscreen() {
  if (!document.body.classList.contains("touch-device")) return;
  if (!isSmallLandscapeScreen() || isFullscreenActive()) return;
  openFullscreen();
}

/**
 * Checks if native or fallback fullscreen is active.
 * @returns {boolean} True if fullscreen is active.
 */
function isFullscreenActive() {
  return !!(
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.body.classList.contains("fake-fullscreen")
  );
}

/**
 * Closes native and fallback fullscreen.
 */
function closeFullscreen() {
  document.body.classList.remove("fake-fullscreen");
  if (document.fullscreenElement && document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitFullscreenElement && document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

/**
 * Updates the mute button icon.
 */
function updateMuteButton() {
  document.querySelector(".mute-button").innerHTML = audioManager.getMuteIcon();
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

init();
