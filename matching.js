const schoolMatchStories = {
  city: {
    speaker: '阿予',
    title: '相片裡的人是誰？',
    context: '你把童年帶來的相片放上共學班的桌子。阿予指著照片裡的人，你用太魯閣語介紹家人。',
    cards: [
      { question: 101, answer: 102, icon: 27, clue: '阿予指著照片裡的叔叔。', meaning: ['那個男生是誰？', '他是我叔叔。'] },
      { question: 103, answer: 104, icon: 12, clue: '你翻到姊姊那張照片。', meaning: ['那個女生是誰？', '她是我姊姊。'] },
      { question: 105, answer: 106, icon: 27, clue: '弟弟也在合照裡。', meaning: ['那個小孩是誰？', '他是我弟弟。'] },
    ],
    ending: '你和阿予把三張照片排在一起，下次共學換你問、他來介紹。',
  },
  home: {
    speaker: '阿青',
    title: '把路線圖走一遍',
    context: '你和阿青帶著長輩畫的路線圖出門。經過菜園和學校時，試著用太魯閣語接話。',
    cards: [
      { question: 111, answer: 112, icon: 26, clue: '阿青在岔路口問你。', meaning: ['你要去哪裡？', '我要去菜園裡種菜。'] },
      { question: 113, answer: 114, icon: 14, clue: '到了菜園，阿青問你剛才把工具放在哪。', meaning: ['你放在哪裡呢？', '放在犁耙旁邊。'] },
      { question: 115, answer: 116, icon: 20, clue: '要回去時，阿青指著地圖上的郵局。', meaning: ['郵局離學校近嗎？', '很近，走路就會到。'] },
    ],
    ending: '你們在圖上補了菜園和郵局，再沿著熟悉的路回到學校。',
  },
};

const schoolTrukuPhrases = Object.fromEntries([
  [101, 'Ima ka snaw gaga?', '情境族語 S2 L3'],
  [102, 'Hiya o swayi tama mu.', '情境族語 S2 L3'],
  [103, 'Ima ka kuyuh gaga?', '情境族語 S2 L3'],
  [104, 'Hiya o qbsuran mu kuyuh.', '情境族語 S2 L3'],
  [105, 'Ima ka laqi gaga?', '情境族語 S2 L3'],
  [106, 'Hiya o swayi mu snaw.', '情境族語 S2 L3'],
  [111, 'Mha su inu?', '情境族語 S1 L12'],
  [112, 'Mha ku hmaan pajiq hiya mhuma pajiq.', '情境族語 S1 L12'],
  [113, 'Gaga su psaun inu?', '情境族語 S1 L12'],
  [114, 'Gaga psaan kiyig qraq susu sudu hiya.', '情境族語 S1 L12'],
  [115, 'Dalih ptasan ka saan smku pila hug?', '情境族語 S2 L8'],
  [116, 'Dalih bi, mksa do dhuq da.', '情境族語 S2 L8'],
  [121, 'Mseupu su tghuy ima ka isu?', '情境族語 S1 L3'],
  [122, 'Ga inu ka ptasan?', '族語短文 S1 L8〈情境句型〉'],
].map(([id, indigenous, source]) => {
  const lesson = id <= 106 ? 36884 : id <= 114 ? 27394 : id <= 116 ? 36899 : id === 121 ? 27385 : 35515;
  return [id, { indigenous, source, url: `https://web.klokah.tw/text/read.php?tid=${lesson}`, file: `truku-release/${id}.flac` }];
}));

let selectedMatch = null;
let schoolMatchPractice;
const matchingBonus = [0, 4, 4, 0];

function selectSchoolMatchState() {
  if (screen === 'schoolMatch') return schoolMatchPractice;
  if (screen === 'play' && game.matchPending) return game.schoolMatch;
}

function matchingView() {
  const story = schoolMatchStories[game.route];
  const { matched, message } = selectSchoolMatchState();
  const complete = matched.length === story.cards.length;
  const questions = story.cards.map((card, index) => {
    const done = matched.includes(index);
    const active = selectedMatch === index;
    const phrase = mandarinMode ? mandarinPhraseBank[card.question][0] : schoolTrukuPhrases[card.question].indigenous;
    return `<div class="match-card${done ? ' matched' : ''}${active ? ' is-selected' : ''}">
      <button type="button" class="match-choice" data-action="match-left" data-value="${index}" aria-pressed="${active}" ${done ? 'disabled' : ''}>
        ${icon(card.icon)}<span><small>${card.clue}</small><span lang="${mandarinMode ? 'zh-Hant' : 'trv'}" id="match-question-${index}">${phrase}</span></span>${done ? '<b aria-label="配對成功">✓</b>' : ''}
      </button>
      <button type="button" class="match-listen" data-action="${mandarinMode ? 'mandarin-lesson-audio' : 'truku-audio'}" data-value="${card.question}" aria-label="播放${story.speaker}的問句" aria-describedby="match-question-${index}">▶</button>
    </div>`;
  }).join('');
  const answers = [2, 0, 1].map(index => {
    const card = story.cards[index];
    const done = matched.includes(index);
    return `<div class="match-card${done ? ' matched' : ''}">
      <button type="button" class="match-choice" data-action="match-right" data-value="${index}" ${done ? 'disabled' : ''}>
        <span lang="${mandarinMode ? 'zh-Hant' : 'trv'}" id="match-answer-${index}">${mandarinMode ? mandarinPhraseBank[card.answer][0] : schoolTrukuPhrases[card.answer].indigenous}</span>${done ? '<b aria-label="配對成功">✓</b>' : ''}
      </button>
      <button type="button" class="match-listen" data-action="${mandarinMode ? 'mandarin-lesson-audio' : 'truku-audio'}" data-value="${card.answer}" aria-label="播放你的回答" aria-describedby="match-answer-${index}">▶</button>
    </div>`;
  }).join('');
  const lastCard = story.cards[matched.at(-1)];
  return `${scenery(`school-${game.route}`, story.title)}
    ${banner(mandarinMode ? '10–14 歲・華語問答連連看' : '10–14 歲・太魯閣語', story.title)}
    <section class="panel">
      <p>${mandarinMode && game.route === 'city' ? '你把童年帶來的相片放上共學班的桌子。阿予指著照片裡的人，等你介紹家人。' : story.context}</p>
      <p>選一張${story.speaker}的問句卡，再找能接下去的回答。</p>
      <progress max="${story.cards.length}" value="${matched.length}" aria-label="配對進度"></progress>
      <div class="match-grid"><div><h2>問句</h2>${questions}</div><div><h2>回答</h2>${answers}</div></div>
      <div class="feedback" role="status"><strong>${message ?? `已配對 ${matched.length}／${story.cards.length}`}</strong>
        ${lastCard ? `<p>${(mandarinMode ? [mandarinPhraseBank[lastCard.question][0], mandarinPhraseBank[lastCard.answer][0]] : lastCard.meaning).join('　→　')}</p>` : ''}</div>
      <p id="truku-audio-status" role="status"></p>
      ${mandarinMode ? '' : `<p class="lesson-sources"><a href="${schoolTrukuPhrases[story.cards[0].question].url}" target="_blank" rel="noopener noreferrer">族語 E 樂園教材${game.route === 'home' ? '・菜園對話' : ''}</a>
        ${game.route === 'home' ? `<a href="${schoolTrukuPhrases[115].url}" target="_blank" rel="noopener noreferrer">交通工具對話</a>` : ''}</p>`}
      ${complete ? `<p>${story.ending}</p>${screen === 'play' && !game.matchDone ? stats(matchingBonus, false) : ''}` : ''}
    </section>
    <div class="actions">${screen === 'schoolMatch' || complete || !mandarinMode ? button(screen === 'schoolMatch' ? '返回首頁' : complete ? '繼續旅程 →' : '先跳過', 'leave-match', '', complete ? 'primary' : '') : button('暫回首頁', 'home')}
      ${matched.length && !mandarinMode ? button('成長手帳', 'truku-notebook') : ''}</div>`;
}

function pickMatch(side, index) {
  const state = selectSchoolMatchState();
  const cards = schoolMatchStories[game.route].cards;
  if (!state || !cards[index] || state.matched.includes(index)) return;
  if (side === 'left') {
    selectedMatch = index;
    render(screen, 'match-left');
    return;
  }
  if (selectedMatch === null) {
    state.message = '先選一張問句卡。';
  } else if (selectedMatch === index) {
    state.matched.push(index);
    const id = cards[index].answer;
    const firstCollection = !mandarinMode && !hasNotebookEntry('school', id);
    if (!mandarinMode) {
      game.schoolTrukuCollected ??= [];
      if (!game.schoolTrukuCollected.includes(id)) game.schoolTrukuCollected.push(id);
    }
    state.message = `接對了！已配對 ${state.matched.length}／${cards.length}。`;
    if (screen === 'play' && state.matched.length === cards.length && game.matches?.length !== cards.length) {
      game.stats = game.stats.map((value, i) => value + matchingBonus[i]);
    }
    selectedMatch = null;
    save();
    render(screen, 'match-right');
    if (firstCollection) showNotebookNotice('問答已收進成長手帳');
    if (mandarinMode) playMandarinLesson(id);
    else playTrukuPhrase(id);
    return;
  } else {
    state.message = '這句接不上。可以重聽問句，再試另一張。';
    gameAudio.play('miss');
  }
  save();
  render(screen, 'match-right');
}

const schoolMatchActions = {
  'school-match': () => {
    if (game.chapter < 1) return;
    selectedMatch = null;
    schoolMatchPractice = { matched: [] };
    render('schoolMatch');
  },
  'match-left': value => pickMatch('left', Number(value)),
  'match-right': value => pickMatch('right', Number(value)),
  'leave-match': () => {
    selectedMatch = null;
    if (screen === 'schoolMatch') {
      schoolMatchPractice = undefined;
      render('home');
      return;
    }
    if (!game.matchPending) return;
    if (mandarinMode && game.schoolMatch.matched.length < schoolMatchStories[game.route].cards.length) return;
    game.matchPending = false;
    game.matchDone = true;
    actions.advance();
  },
};
