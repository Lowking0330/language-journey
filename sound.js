const gameAudio = (() => {
  const preferenceKey = 'language-graduation-audio';
  let preferences = { music: true, sound: true };
  try {
    const saved = JSON.parse(localStorage.getItem(preferenceKey));
    if (saved) preferences = { ...preferences, ...saved };
  } catch {}

  let context;
  let music;
  let autoplayBlocked = false;
  let voicePlaying = false;
  let effectsBus;
  const effects = {
    tap: [[72, 0, .08]],
    gain: [[72, 0, .11], [76, .08, .13], [79, .16, .19]],
    correct: [[76, 0, .12], [81, .08, .14], [84, .17, .24]],
    miss: [[65, 0, .13], [60, .1, .21]],
    chapter: [[67, 0, .14], [72, .14, .18], [76, .3, .26]],
    finish: [[72, 0, .13], [76, .1, .13], [79, .2, .15], [84, .31, .46]],
    careerVictory: [[67, 0, .17], [72, .13, .20], [76, .27, .24], [79, .42, .28],
      [84, .60, .75], [79, .60, .67], [76, .60, .62], [60, .60, .62]],
  };

  function note(pitch, start, duration, volume, bus, shape = 'sine') {
    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    oscillator.type = shape;
    oscillator.frequency.value = 440 * 2 ** ((pitch - 69) / 12);
    envelope.gain.setValueAtTime(.0001, start);
    envelope.gain.exponentialRampToValueAtTime(volume, start + .016);
    envelope.gain.exponentialRampToValueAtTime(.0001, start + duration);
    oscillator.connect(envelope).connect(bus);
    oscillator.start(start);
    oscillator.stop(start + duration + .02);
  }

  function mix() {
    if (context) effectsBus.gain.setTargetAtTime(preferences.sound ? .43 : 0, context.currentTime, .02);
    if (preferences.music && !voicePlaying && !document.hidden) {
      if (!music) {
        music = new Audio('dream-path-breeze.mp3');
        music.loop = true;
        music.volume = .40;
      }
      if (music.paused) music.play().then(() => {
        autoplayBlocked = false;
        updateControls();
      }).catch(error => {
        if (error.name === 'NotAllowedError') {
          autoplayBlocked = true;
          updateControls();
        }
      });
    } else {
      music?.pause();
    }
  }

  function unlock() {
    mix();
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!context) {
      context = new AudioContext();
      effectsBus = context.createGain();
      effectsBus.gain.value = preferences.sound ? .43 : 0;
      effectsBus.connect(context.destination);
    }
    if (context.state === 'running') mix();
    else context.resume().then(mix).catch(() => {});
  }

  function play(name) {
    if (!preferences.sound || !context) return;
    for (const [pitch, offset, duration] of effects[name]) {
      note(pitch, context.currentTime + offset + .018, duration,
        name === 'careerVictory' ? .12 : .19, effectsBus, 'triangle');
    }
  }

  function updateControls() {
    for (const name of ['music', 'sound']) {
      const control = document.querySelector('#' + name);
      const label = name === 'music' ? '背景音樂' : '音效';
      control.setAttribute('aria-pressed', String(preferences[name]));
      control.title = name === 'music' && preferences.music && autoplayBlocked
        ? '點一下播放背景音樂' : label + (preferences[name] ? '已開啟' : '已關閉');
    }
  }

  function toggle(name) {
    if (name === 'music' && preferences.music && autoplayBlocked) {
      mix();
      return;
    }
    preferences[name] = !preferences[name];
    try { localStorage.setItem(preferenceKey, JSON.stringify(preferences)); } catch {}
    mix();
    updateControls();
    if (name === 'sound' && preferences.sound) play('tap');
  }

  document.addEventListener('visibilitychange', mix);
  document.addEventListener('click', event => {
    if (event.isTrusted && !event.target.closest('#music') && music?.paused) mix();
  }, { capture: true });
  updateControls();
  mix();
  function setVoicePlaying(active) {
    voicePlaying = active;
    mix();
  }
  return { unlock, play, toggle, setVoicePlaying };
})();
