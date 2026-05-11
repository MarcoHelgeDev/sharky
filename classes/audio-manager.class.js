/**
 * Handles all sounds and music of the game.
 * @class
 */
class AudioManager {
  isMuted = false;
  menuMusic;
  gameMusic;
  startSound;
  clickSound;
  bubbleSound;
  coinSound;
  poisonSound;
  powerReadySound;
  hurtSound;
  enemyDeadSound;
  bossHitSound;
  gameOverSound;
  winSound;
  finSlapSound;
  sleepSound;

  /**
   * Creates a new audio manager and loads all sounds.
   */
  constructor() {
    this.isMuted = localStorage.getItem("sharkyMuted") == "true";
    this.loadSounds();
  }

  /**
   * Loads all music and sound effects.
   */
  loadSounds() {
    this.loadMusicSounds();
    this.loadEffectSounds();
  }

  /**
   * Loads the background music sounds.
   */
  loadMusicSounds() {
    this.menuMusic = this.createAudio("audio/menu-background.mp3", 0.18, true);
    this.gameMusic = this.createAudio("audio/background.mp3", 0.18, true);
  }

  /**
   * Loads all sound effects.
   */
  loadEffectSounds() {
    this.loadGameEffectSounds();
    this.loadEndEffectSounds();
  }

  /**
   * Loads the normal game sound effects.
   */
  loadGameEffectSounds() {
    this.startSound = this.createAudio("audio/start.mp3", 0.45, false);
    this.clickSound = this.createAudio("audio/click.mp3", 0.35, false);
    this.bubbleSound = this.createAudio("audio/bubble.mp3", 0.35, false);
    this.coinSound = this.createAudio("audio/coin.mp3", 0.38, false);
    this.poisonSound = this.createAudio("audio/poison.mp3", 0.38, false);
    this.powerReadySound = this.createAudio(
      "audio/power-ready.mp3",
      0.45,
      false,
    );
    this.hurtSound = this.createAudio("audio/hurt.mp3", 0.4, false);
  }

  /**
   * Loads the attack and end screen sound effects.
   */
  loadEndEffectSounds() {
    this.enemyDeadSound = this.createAudio("audio/enemy-dead.mp3", 0.35, false);
    this.bossHitSound = this.createAudio("audio/boss-hit.mp3", 0.75, false);
    this.gameOverSound = this.createAudio("audio/game-over.mp3", 0.45, false);
    this.winSound = this.createAudio("audio/win.mp3", 0.45, false);
    this.finSlapSound = this.createAudio("audio/fin-slap.mp3", 0.38, false);
    this.sleepSound = this.createAudio("audio/sleep.mp3", 0.28, false);
  }

  /**
   * Creates one audio object.
   * @param {string} path - The path of the audio file.
   * @param {number} volume - The volume of the audio file.
   * @param {boolean} loop - True if the audio should loop.
   * @returns {HTMLAudioElement} The created audio object.
   */
  createAudio(path, volume, loop) {
    let audio = new Audio(path);
    audio.volume = volume;
    audio.loop = loop;
    return audio;
  }

  /**
   * Plays the menu music.
   */
  playMenuMusic() {
    if (this.isMuted) return;
    this.pauseAudio(this.gameMusic);
    this.playMusic(this.menuMusic);
  }

  /**
   * Plays the game music.
   */
  playGameMusic() {
    if (this.isMuted) return;
    this.pauseAudio(this.menuMusic);
    this.playMusic(this.gameMusic);
  }

  /**
   * Plays one music audio object.
   * @param {HTMLAudioElement} audio - The music that should be played.
   */
  playMusic(audio) {
    if (this.isMuted || !audio.paused) return;

    let playPromise = audio.play();

    if (playPromise) {
      playPromise.catch(() => {});
    }
  }

  /**
   * Stops all music sounds.
   */
  stopAllMusic() {
    this.pauseAudio(this.menuMusic);
    this.pauseAudio(this.gameMusic);
  }

  /**
   * Stops all sounds that can run longer.
   */
  stopAllSounds() {
    this.stopAllMusic();
    this.stopSleepSound();
  }

  /**
   * Pauses an audio object and resets it.
   * @param {HTMLAudioElement} audio - The audio that should be paused.
   */
  pauseAudio(audio) {
    audio.pause();
    audio.currentTime = 0;
  }

  /**
   * Plays a sound effect.
   * @param {HTMLAudioElement} audio - The sound effect that should be played.
   */
  playEffect(audio) {
    if (this.isMuted) return;

    let sound = audio.cloneNode();
    sound.volume = audio.volume;
    let playPromise = sound.play();

    if (playPromise) {
      playPromise.catch(() => {});
    }
  }

  /**
   * Turns the sound on or off and saves it in local storage.
   */
  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem("sharkyMuted", this.isMuted);

    if (this.isMuted) {
      this.stopAllSounds();
    }
  }

  /**
   * Returns the icon for the mute button.
   * @returns {string} The mute icon.
   */
  getMuteIcon() {
    if (this.isMuted) return "🔇";
    return "🔊";
  }

  /**
   * Plays the start sound.
   */
  playStartSound() {
    this.playEffect(this.startSound);
  }

  /**
   * Plays the click sound.
   */
  playClickSound() {
    this.playEffect(this.clickSound);
  }

  /**
   * Plays the bubble sound.
   */
  playBubbleSound() {
    this.playEffect(this.bubbleSound);
  }

  /**
   * Plays the coin sound.
   */
  playCoinSound() {
    this.playEffect(this.coinSound);
  }

  /**
   * Plays the poison sound.
   */
  playPoisonSound() {
    this.playEffect(this.poisonSound);
  }

  /**
   * Plays the sound when poison bubbles are unlocked.
   */
  playPowerReadySound() {
    this.playEffect(this.powerReadySound);
  }

  /**
   * Plays the hurt sound.
   */
  playHurtSound() {
    this.playEffect(this.hurtSound);
  }

  /**
   * Plays the enemy dead sound.
   */
  playEnemyDeadSound() {
    this.playEffect(this.enemyDeadSound);
  }

  /**
   * Plays the boss hit sound.
   */
  playBossHitSound() {
    this.playEffect(this.bossHitSound);
  }

  /**
   * Plays the game over sound.
   */
  playGameOverSound() {
    this.playEffect(this.gameOverSound);
  }

  /**
   * Plays the win sound.
   */
  playWinSound() {
    this.playEffect(this.winSound);
  }

  /**
   * Plays the fin slap sound.
   */
  playFinSlapSound() {
    this.playEffect(this.finSlapSound);
  }

  /**
   * Plays the sleep sound if it is not already playing.
   */
  playSleepSound() {
    if (this.isMuted || !this.sleepSound.paused) return;

    this.sleepSound.currentTime = 0;
    let playPromise = this.sleepSound.play();

    if (playPromise) {
      playPromise.catch(() => {});
    }
  }

  /**
   * Stops the sleep sound.
   */
  stopSleepSound() {
    this.pauseAudio(this.sleepSound);
  }
}
