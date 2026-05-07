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

  constructor() {
    this.isMuted = localStorage.getItem("sharkyMuted") == "true";
    this.loadSounds();
  }

  loadSounds() {
    this.loadMusicSounds();
    this.loadEffectSounds();
  }

  loadMusicSounds() {
    this.menuMusic = this.createAudio("audio/menu-background.mp3", 0.18, true);
    this.gameMusic = this.createAudio("audio/background.mp3", 0.18, true);
  }

  loadEffectSounds() {
    this.loadGameEffectSounds();
    this.loadEndEffectSounds();
  }

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

  loadEndEffectSounds() {
    this.enemyDeadSound = this.createAudio("audio/enemy-dead.mp3", 0.35, false);
    this.bossHitSound = this.createAudio("audio/boss-hit.mp3", 0.75, false);
    this.gameOverSound = this.createAudio("audio/game-over.mp3", 0.45, false);
    this.winSound = this.createAudio("audio/win.mp3", 0.45, false);
    this.finSlapSound = this.createAudio("audio/fin-slap.mp3", 0.38, false);
    this.sleepSound = this.createAudio("audio/sleep.mp3", 0.28, false);
  }

  createAudio(path, volume, loop) {
    let audio = new Audio(path);
    audio.volume = volume;
    audio.loop = loop;
    return audio;
  }

  playMenuMusic() {
    if (this.isMuted) return;
    this.pauseAudio(this.gameMusic);
    this.playMusic(this.menuMusic);
  }

  playGameMusic() {
    if (this.isMuted) return;
    this.pauseAudio(this.menuMusic);
    this.playMusic(this.gameMusic);
  }

  playMusic(audio) {
    if (this.isMuted || !audio.paused) return;

    let playPromise = audio.play();

    if (playPromise) {
      playPromise.catch(() => {});
    }
  }

  stopAllMusic() {
    this.pauseAudio(this.menuMusic);
    this.pauseAudio(this.gameMusic);
  }

  stopAllSounds() {
    this.stopAllMusic();
    this.stopSleepSound();
  }

  pauseAudio(audio) {
    audio.pause();
    audio.currentTime = 0;
  }

  playEffect(audio) {
    if (this.isMuted) return;

    let sound = audio.cloneNode();
    sound.volume = audio.volume;
    let playPromise = sound.play();

    if (playPromise) {
      playPromise.catch(() => {});
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem("sharkyMuted", this.isMuted);

    if (this.isMuted) {
      this.stopAllSounds();
    }
  }

  getMuteIcon() {
    if (this.isMuted) return "🔇";
    return "🔊";
  }

  playStartSound() {
    this.playEffect(this.startSound);
  }

  playClickSound() {
    this.playEffect(this.clickSound);
  }

  playBubbleSound() {
    this.playEffect(this.bubbleSound);
  }

  playCoinSound() {
    this.playEffect(this.coinSound);
  }

  playPoisonSound() {
    this.playEffect(this.poisonSound);
  }

  playPowerReadySound() {
    this.playEffect(this.powerReadySound);
  }

  playHurtSound() {
    this.playEffect(this.hurtSound);
  }

  playEnemyDeadSound() {
    this.playEffect(this.enemyDeadSound);
  }

  playBossHitSound() {
    this.playEffect(this.bossHitSound);
  }

  playGameOverSound() {
    this.playEffect(this.gameOverSound);
  }

  playWinSound() {
    this.playEffect(this.winSound);
  }

  playFinSlapSound() {
    this.playEffect(this.finSlapSound);
  }

  playSleepSound() {
    if (this.isMuted || !this.sleepSound.paused) return;

    this.sleepSound.currentTime = 0;
    let playPromise = this.sleepSound.play();

    if (playPromise) {
      playPromise.catch(() => {});
    }
  }

  stopSleepSound() {
    this.pauseAudio(this.sleepSound);
  }
}
