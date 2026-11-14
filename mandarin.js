let requestedMode = typeof location !== 'undefined' ? new URLSearchParams(location.search).get('mode') : null;
let mandarinMode = requestedMode === 'mandarin';

const mandarinDialogue = {
  city: [
    { prompt: '放學啦？先把書包放下吧。', choices: ['奶奶，我回來了！', '奶奶，我先去搭車了。', '奶奶，這張相片是誰的？'], answer: 0 },
    { prompt: '今天在學校過得好嗎？', choices: ['今天過得很好。奶奶，你呢？', '我搭公車回來的。', '下次見，奶奶！'], answer: 0 },
    { prompt: '這張是你的生日照，可以拿去給同學看。', choices: ['我把整本相簿都帶走。', '謝謝奶奶，我會把這張帶回來。', '我下次再回來找看看。'], answer: 1 },
    { prompt: '電梯到了，搭上車後記得跟我說。', choices: ['奶奶再見，我上車再跟你說。', '我回來了，奶奶。', '等會兒我們一起出門吧。'], answer: 0 },
  ],
  home: [
    { prompt: '今天你是怎麼回來的？', choices: ['我走路回來，經過前面那個轉角。', '好啊，我們一起出發！', '今天過得很好，奶奶。'], answer: 0 },
    { prompt: '今天在學校過得好嗎？', choices: ['我走路回來的。', '今天過得很好。奶奶，你呢？', '好啊，我們一起出門。'], answer: 1 },
    { prompt: '等阿青到了，我們一起去找那棵樹，好嗎？', choices: ['好，我們先等阿青到。', '好，我現在一個人先去。', '奶奶，你是走路回來的嗎？'], answer: 0 },
    { prompt: '我們現在就去找那棵樹，好嗎？', choices: ['你知道我今天過得怎麼樣嗎？', '好，我帶著地圖，我們走吧。', '我們等明天再畫地圖。'], answer: 1 },
  ],
};

const mandarinActivities = {
  city: paths.city.scenes[0],
  home: ['姨婆端著兩杯水招呼你過去坐。她拍了拍長椅。', paths.home.scenes[0][1]],
};

const mandarinClips = {
  'city-clue': '我回來了！',
  'home-clue': '我走路回來的。',
};
for (const [side, rounds] of Object.entries(mandarinDialogue)) {
  rounds.forEach(({ prompt, choices, answer }, index) => {
    mandarinClips[`${side}-${index}-prompt`] = prompt;
    mandarinClips[`${side}-${index}-reply`] = choices[answer];
  });
  for (const [id, memory] of Object.entries(turningPoints[side].options)) {
    mandarinClips[`memory-${id}`] = memory.line;
  }
}

function mandarinVoice(id, avatar) {
  if (id.endsWith('-clue') || id.endsWith('-reply')) return avatar === 'girl' ? 'girl' : 'boy';
  return ['home-3-prompt', 'memory-phone', 'memory-map'].includes(id) ? 'boy' : 'elder-woman';
}

function mandarinClipFile(id, role) {
  const revision = { boy: 'lively', girl: mandarinClips[id]?.includes('奶奶') ? 'nainai' : 'tw' };
  const version = revision[role] ?? 'take';
  return `mandarin-${id}-${role}-${version}.flac`;
}

function mandarinDialogueView() {
  const story = trukuStories[game.route];
  const lesson = game.mandarinDialogue;
  const index = lesson.index;
  const round = mandarinDialogue[game.route][index];
  if (!round) return `${banner('6–9 歲・全華語', '完成童年對話')}
    <section class="panel preview">${icon(30)}<div><h2>${story.title}</h2><p>${story.ending}</p></div></section>
    <div class="actions">${button('接續童年故事 →', 'mandarin-dialogue-continue', '', 'primary')}</div>`;
  const scene = story.scenes[index];
  const speaker = scene.speaker ?? '奶奶';
  const clip = `${game.route}-${index}`;
  const correct = lesson.answer === round.answer;
  const answers = round.choices.map((label, option) => button(label, 'mandarin-dialogue-answer', option,
    `answer${lesson.answer === option ? ' wrong' : ''}`)).join('');
  return `${scenery(`visit-${game.route}-${index === 0 || index === 3 ? 'door' : 'inside'}`, story.title)}
    ${banner('6–9 歲・全華語', story.title)}
    <section class="panel scene">
      <strong>對話 ${index + 1}／${story.scenes.length}</strong>
      <progress max="${story.scenes.length}" value="${index + Number(correct)}" aria-label="對話進度"></progress>
      ${index === 0 ? `<p>${story.intro}</p>` : ''}<p>${scene.scene}</p>
      <blockquote class="memory-note">${icon(portraits[scene.speaker ?? '姨婆'])}<div><strong>${speaker}</strong>
        <p>「${index === 0 ? `${escapeText(game.name)}，` : ''}${round.prompt}」</p>
        ${button('▶ 聽對方說話', 'mandarin-audio', `${clip}-prompt`)}</div></blockquote>
    </section>
    <section class="panel"><h2>你會怎麼回應？</h2>${correct
      ? `<div class="feedback" tabindex="-1" role="status"><strong>「${round.choices[round.answer]}」</strong><p>${scene.reply}</p>${button('▶ 重聽你的回覆', 'mandarin-audio', `${clip}-reply`)}</div>`
      : `<div class="lesson-list answers">${answers}</div>${lesson.answer === undefined ? '' : `<p class="feedback" tabindex="-1" role="status">${speaker}還在等你回話。想一想剛才對方說了什麼。</p>`}`}
      <p id="truku-audio-status" role="status"></p>
    </section>
    <div class="actions">${correct ? button('接著說 →', 'mandarin-dialogue-next', '', 'primary') : ''}${button('暫回首頁', 'home')}</div>`;
}

const mandarinActions = {
  'mandarin-lesson-audio': id => playMandarinLesson(id),
  'mandarin-audio': id => {
    if (mandarinMode && Object.hasOwn(mandarinClips, id)) {
      playVoiceFiles([mandarinClipFile(id, mandarinVoice(id, game.avatar))]);
    }
  },
  'mandarin-dialogue-answer': value => {
    if (!mandarinMode || screen !== 'play') return;
    const lesson = game.mandarinDialogue;
    const round = mandarinDialogue[game.route][lesson.index];
    const index = Number(value);
    if (!round?.choices[index] || lesson.answer === round.answer) return;
    lesson.answer = index;
    save();
    render('play', 'result');
    if (index === round.answer) mandarinActions['mandarin-audio'](`${game.route}-${lesson.index}-reply`);
    else gameAudio.play('miss');
  },
  'mandarin-dialogue-next': () => {
    if (!mandarinMode || screen !== 'play') return;
    const lesson = game.mandarinDialogue;
    const round = mandarinDialogue[game.route][lesson.index];
    if (!round || lesson.answer !== round.answer) return;
    lesson.index++;
    delete lesson.answer;
    save();
    render('play');
  },
  'mandarin-dialogue-continue': () => {
    if (!mandarinMode || screen !== 'play' || game.mandarinDialogue.index !== mandarinDialogue[game.route].length) return;
    game.mandarinDialogueDone = true;
    actions.advance();
  },
};
