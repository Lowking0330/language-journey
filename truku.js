const trukuPhrases = {
  "1": {
    "indigenous": "Embiyax su hug?",
    "chinese": "你好嗎？",
    "source": "族語句型篇（國中）第16類〈問候語〉",
    "url": "https://web.klokah.tw/extension/sp_junior/practice.php?d=33&c=16&i=12240",
    "file": "truku-release/1.flac"
  },
  "4": {
    "indigenous": "Swayay ta han!",
    "chinese": "再見了！",
    "source": "族語句型篇(高中版) 第16類〈道別語〉第4組",
    "url": "https://web.klokah.tw/extension/sp_senior/practice.php?d=33&c=16&i=8044",
    "file": "truku-release/4.flac"
  },
  "10": {
    "indigenous": "Miyah ku da!",
    "chinese": "我回來了！",
    "source": "親子溝通族語〈放學回家・洗澡〉",
    "url": "https://web.klokah.tw/text/read.php?tid=76085",
    "file": "truku-release/10.flac"
  },
  "13": {
    "indigenous": "Mhuway su balay.",
    "chinese": "謝謝你。",
    "source": "族語生活會話篇 第6課〈問路〉第10句",
    "url": "https://web.klokah.tw/extension/con_practice/index.php?d=33&l=6&view=dialogue",
    "file": "truku-release/13.flac"
  },
  "51": {
    "indigenous": "Embiyax ku balay, isu ga?",
    "chinese": "我很好，你呢？",
    "source": "族語句型篇（國中）第16類〈問候語〉",
    "url": "https://web.klokah.tw/extension/sp_junior/practice.php?d=33&c=16&i=12240",
    "file": "truku-release/51.flac"
  },
  "52": {
    "indigenous": "Mnksa ku.",
    "chinese": "我走路來的。",
    "source": "情境族語 S1 L8",
    "url": "https://web.klokah.tw/text/read.php?tid=27390",
    "file": "truku-release/52.flac"
  },
  "53": {
    "indigenous": "Iq wah! seupu ta musa.",
    "chinese": "好啊！我們一起去。",
    "source": "情境族語 S2 L5",
    "url": "https://web.klokah.tw/text/read.php?tid=36890",
    "file": "truku-release/53.flac"
  },
  "54": {
    "indigenous": "Iq, lita da.",
    "chinese": "好啊！走吧！",
    "source": "情境族語 S1 L7",
    "url": "https://web.klokah.tw/text/read.php?tid=27389",
    "file": "truku-release/54-v4.flac"
  }
};

const trukuStories = {
  city: {
    title: '公車到站後',
    intro: '下了公車，你照約定到奶奶的公寓拿相片，週末共學時想帶去介紹家人。',
    scenes: [
      { scene: '你搭電梯上樓，按了門鈴。奶奶開門，接過你肩上快滑下來的書包。', line: '你從學校回來啦？', answerId: 10, options: [13, 10, 1], reply: '奶奶把書包放在玄關，帶你到窗邊找那張相片。' },
      { scene: '窗外又有一班公車進站。奶奶把相簿放到窗邊的小桌，坐下來向你問好。', promptId: 1, answerId: 51, options: [1, 13, 51], reply: '奶奶點點頭，把相簿翻到你小時候過生日的那一頁。' },
      { scene: '奶奶抽出相片給你帶去共學班。你覺得下次能用這張相片介紹家人了。', line: '這張給你，回來再跟我說你們聊了什麼。', answerId: 13, options: [10, 13, 4], reply: '你把相片放進書包裡。樓下傳來公車轉進巷口的聲音。' },
      { scene: '你要搭下一班車回家。電梯到了，奶奶把書包遞給你。', line: '到了跟我說一聲。', answerId: 4, options: [4, 1, 10], reply: '電梯門關上前，奶奶朝你揮手。你想著週末要先把相片拿給阿予看。' },
    ],
    ending: '你帶著相片離開奶奶的公寓。下次共學時，可以用它問問阿予家裡怎麼稱呼親人。',
  },
  home: {
    title: '沿著舊路回家',
    intro: '放學路上，你和阿青繞過一個常走的轉角，想回家問奶奶以前怎麼走。',
    scenes: [
      { scene: '你沿著緩坡走到家門口。奶奶坐在門廊整理東西，看到你走近就抬起頭。', line: '你今天是怎麼回來的？', answerId: 52, options: [53, 54, 52], reply: '奶奶拍了拍長椅，等你坐下，再聽你說剛剛經過哪裡。' },
      { scene: '你把書包靠著長椅。奶奶問候你，想聽聽你今天在學校過得怎樣。', promptId: 1, answerId: 51, options: [51, 52, 1], reply: '奶奶笑著點頭，指向門廊外那個你剛走過的轉角。' },
      { scene: '奶奶在紙上畫出舊路，想起那棵樹就在轉角。你坐到她旁邊。', line: '等阿青到了，我們一起去找那棵樹好嗎？', answerId: 53, options: [53, 52, 51], reply: '你答應和奶奶一起去。她又在圖上補了一條窄窄的小路。' },
      { scene: '阿青從坡下跑到門廊，把你跟奶奶一起畫的圖攤開來。', speaker: '阿青', line: '我們現在就去找那棵樹，好嗎？', answerId: 54, options: [52, 54, 51], reply: '你們陪奶奶沿著坡道走到轉角。她停在那棵樹旁，指給你們看以前常走的小路。' },
    ],
    ending: '你記住了奶奶說的轉角。下次見到阿青，你們可以輪流帶路，或回到門口練習招呼人。',
  },
};

function newTrukuLesson() {
  return { version: 2, index: 0, collected: [] };
}

function migrateTrukuLesson(game) {
  const lesson = game?.truku;
  if (!lesson || lesson.version === 2) return;
  const updated = newTrukuLesson();
  updated.collected = lesson.collected.filter(id => id !== 1 && trukuPhrases[id]);
  if (game.route === 'city') {
    updated.index = Math.min(lesson.index, 1);
    if (lesson.index === 0 && lesson.answer === 10) updated.answer = 10;
  }
  game.truku = updated;
}

let trukuAudio;
let trukuNotebookReturn;

function stopTrukuAudio() {
  if (!trukuAudio) return;
  trukuAudio.pause();
  trukuAudio = null;
  gameAudio.setVoicePlaying(false);
}

function playTrukuPhrase(...ids) {
  if (mandarinMode) return;
  const files = ids.map(id => (id === 'career-ending' ? careerFinalPhrase : careerPracticePhrase(id))?.file);
  if (files.length && files.every(Boolean)) playVoiceFiles(files);
}

function playVoiceFiles(files) {
  stopTrukuAudio();
  const player = new Audio(files[0]);
  const speed = mandarinMode ? .9 : 1;
  player.defaultPlaybackRate = speed;
  player.preservesPitch = true;
  player.webkitPreservesPitch = true;
  trukuAudio = player;
  gameAudio.setVoicePlaying(true);
  const status = main.querySelector('#truku-audio-status');
  let index = 0;
  const settle = message => {
    if (trukuAudio !== player) return;
    stopTrukuAudio();
    if (status) status.textContent = message;
  };
  const play = () => {
    if (status) status.textContent = files.length > 1 ? `播放中 ${index + 1}／${files.length}` : '播放中';
    player.playbackRate = speed;
    player.play().catch(() => settle('請再點一下播放，或先看字幕。'));
  };
  player.addEventListener('ended', () => {
    if (trukuAudio !== player) return;
    index++;
    if (index === files.length) {
      settle('播放完成');
      return;
    }
    player.src = files[index];
    play();
  });
  player.addEventListener('error', () => settle('音檔目前無法播放，可以先看字幕或重試。'), { once: true });
  play();
}

function mergeTrukuNotebook(previous, current, other) {
  const list = value => Array.isArray(value) ? value : [];
  return Object.fromEntries(Object.keys(trukuStories).map(id => {
    const journey = current?.route === id ? current : null;
    const collect = (group, progress, allowed) => [
      ...new Set([...list(previous?.[id]?.[group]), ...list(other?.[id]?.[group]), ...list(progress)]),
    ].filter(value => allowed.includes(value));
    return [id, {
      childhood: collect('childhood', journey?.truku?.collected, trukuStories[id].scenes.map(scene => scene.answerId)),
      school: collect('school', journey?.schoolTrukuCollected, schoolMatchStories[id].cards.map(card => card.answer)),
    }];
  }));
}

function hasNotebookEntry(group, id) {
  const collection = mergeTrukuNotebook(notebook, game, readSave().notebook);
  return Object.values(collection).some(entries => entries[group].includes(id));
}

let notebookNoticeTimer;

function clearNotebookNotice() {
  window.clearTimeout?.(notebookNoticeTimer);
  const notice = document.querySelector('#notebook-notice');
  if (notice) notice.textContent = '';
}

function showNotebookNotice(text) {
  const notice = document.querySelector('#notebook-notice');
  if (!notice) return;
  notice.textContent = text;
  notebookNoticeTimer = window.setTimeout(clearNotebookNotice, 3600);
}

function trukuNotebookView() {
  function entry(id, phrase, chinese) {
    return `<article class="panel"><h2 lang="trv">${phrase.indigenous}</h2><p>${chinese}</p>
      <small><a href="${phrase.url}" target="_blank" rel="noopener noreferrer">${phrase.source}</a> · 原語會 TTS</small><div class="actions">
      ${button('▶ 聽發音', 'truku-audio', id)}</div></article>`;
  }
  const collection = mergeTrukuNotebook(notebook, game, readSave().notebook);
  const routes = Object.entries(collection).map(([id, { childhood, school }]) => {
    if (!childhood.length && !school.length) return '';
    const childhoodEntries = childhood.map(phrase => entry(phrase, trukuPhrases[phrase], trukuPhrases[phrase].chinese)).join('');
    const schoolEntries = schoolMatchStories[id].cards.filter(card => school.includes(card.answer))
      .map(({ question, answer, meaning }) => entry(question, schoolTrukuPhrases[question], meaning[0])
        + entry(answer, schoolTrukuPhrases[answer], meaning[1])).join('');
    return `<section class="notebook-route"><h2>${paths[id].name}</h2>
      ${childhoodEntries ? `<section><h3>6–9 歲・童年對話</h3>${childhoodEntries}</section>` : ''}
      ${schoolEntries ? `<section><h3>10–14 歲・問答連連看</h3>${schoolEntries}</section>` : ''}</section>`;
  }).join('');
  return `${banner('Kari Truku・太魯閣語', '成長手帳')}
    ${routes || '<p class="panel">完成童年對話或問答連連看後，可以在這裡重聽收錄的句子。</p>'}
    <p id="truku-audio-status" role="status"></p>
    <div class="actions">${button('返回上一頁', 'truku-notebook-back', '', 'primary')}</div>`;
}

function trukuView() {
  const lesson = game.truku ?? newTrukuLesson();
  const story = trukuStories[game.route];
  const round = story.scenes[lesson.index];
  const inChapter = game.chapter === 0 && game.turn >= turnsPerChapter && !game.trukuChapterDone && !game.memoryPending && !game.memory;
  if (!round) return `${banner('6–9 歲・太魯閣語', story.title)}
    <section class="panel preview">${icon(30)}<div><h2>四句話已收進成長手帳</h2><p>${story.ending}</p></div></section>
    <div class="actions">${button(inChapter ? '接續童年故事 →' : '回到旅程', inChapter ? 'truku-continue' : 'resume', '', 'primary')}
      ${button('成長手帳', 'truku-notebook')}${button('再玩一次', 'truku-reset')}</div>`;
  const speaker = round.speaker ?? '奶奶';
  const id = round.answerId;
  const answered = lesson.answer === id;
  const prompt = round.promptId ? trukuPhrases[round.promptId].indigenous : round.line;
  const choices = round.options.map(optionId => {
    const state = answered && optionId === id ? ' right' : lesson.answer === optionId ? ' wrong' : '';
    return `<button type="button" lang="trv" class="answer${state}" data-action="truku-answer" data-value="${optionId}" ${answered ? 'disabled' : ''}>${trukuPhrases[optionId].indigenous}</button>`;
  }).join('');
  return `${scenery(`visit-${game.route}-${lesson.index === 0 || lesson.index === 3 ? 'door' : 'inside'}`, story.title)}
    ${banner('6–9 歲・太魯閣語', story.title)}
    <section class="panel scene">
      <strong>對話 ${lesson.index + 1}／${story.scenes.length}</strong>
      <progress max="${story.scenes.length}" value="${lesson.index + Number(answered)}" aria-label="對話進度"></progress>
      ${lesson.index === 0 ? `<p>${story.intro}</p>` : ''}<p>${round.scene}</p>
      <blockquote class="memory-note">${icon(round.speaker ? portraits[speaker] : portraits.姨婆)}<div><strong>${speaker}</strong><p${round.promptId ? ' lang="trv"' : ''}>「${lesson.index === 0 ? `${escapeText(game.name || '小禾')}，` : ''}${prompt}」</p>
      ${round.promptId ? button('▶ 聽奶奶問候', 'truku-audio', round.promptId) : ''}</div></blockquote>
    </section>
    <section class="panel"><h2>你會怎麼回應？</h2><div class="lesson-list answers">${choices}</div>
      ${lesson.answer !== undefined ? `<div class="feedback" tabindex="-1" role="status">
        ${answered ? `<p>${round.reply}</p>${button('▶ 重聽你說的話', 'truku-audio', id)}`
          : lesson.answer === round.promptId
            ? '這是奶奶剛才問你的話。想想你要怎麼告訴奶奶自己的近況。'
            : `${speaker}還在等你接話。想想你這時候要說什麼，再試一句。`}</div>` : ''}
      <p id="truku-audio-status" role="status"></p>
    </section>
    <div class="actions">${answered ? button(lesson.index === story.scenes.length - 1 ? '收進成長手帳 →' : '接著說 →', 'truku-next', '', 'primary') : ''}</div>`;
}

function answerTruku(id) {
  const lesson = game.truku ??= newTrukuLesson();
  const round = trukuStories[game.route].scenes[lesson.index];
  const expected = round?.answerId;
  if (!round?.options.includes(id) || lesson.answer === expected) return;
  const firstCollection = id === expected && !hasNotebookEntry('childhood', id);
  lesson.answer = id;
  if (id === expected && !lesson.collected.includes(id)) lesson.collected.push(id);
  save();
  render('truku', 'result');
  if (firstCollection) showNotebookNotice('已收進成長手帳');
  if (id === expected) playTrukuPhrase(id);
  else gameAudio.play('miss');
}

const trukuActions = {
  truku: () => {
    if (!game) return;
    if (!game.truku) {
      game.truku = newTrukuLesson();
      save();
    }
    render('truku');
  },
  'truku-audio': value => playTrukuPhrase(value),
  'truku-answer': value => answerTruku(Number(value)),
  'truku-next': () => {
    const lesson = game.truku;
    const round = trukuStories[game.route].scenes[lesson?.index];
    if (!round || lesson.answer !== round.answerId) return;
    lesson.index++;
    delete lesson.answer;
    save();
    render('truku');
  },
  'truku-continue': () => {
    if (game.chapter !== 0 || game.turn < turnsPerChapter || game.truku?.index !== trukuStories[game.route].scenes.length) return;
    game.trukuChapterDone = true;
    actions.advance();
  },
  'truku-reset': () => {
    game.truku.index = 0;
    delete game.truku.answer;
    save();
    render('truku');
  },
  'truku-notebook': () => {
    trukuNotebookReturn = screen;
    render('trukuNotebook');
  },
  'truku-notebook-back': () => render(trukuNotebookReturn ?? 'home'),
};
