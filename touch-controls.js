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
  if (!isAttackKey(key)) keyboard[key] = false;
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
