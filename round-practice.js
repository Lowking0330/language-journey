const roundPracticeStories = [
  {
    city: {
      title: '門鈴響了，這句話在哪裡說？',
      intro: '週末共學前，你來到奶奶的公寓。聽這段話，找出它出現在哪個時刻。',
      art: 'visit-city-door',
      audio: 10,
      choices: [
        [27, '把相片收好，準備道別'],
        [19, '推開家門，跟奶奶說自己回來了'],
        [29, '奶奶把相片交給你，你向她道謝'],
      ],
      answer: 1,
      result: '奶奶接過你的書包。等一下，你就能坐下來和她聊聊。',
    },
    home: {
      title: '沿著坡道，聽一句',
      intro: '放學後，你回到長椅旁。聽這段話，想想你和奶奶聊到了什麼。',
      art: 'visit-home-door',
      audio: 52,
      choices: [
        [26, '聊你是怎麼走回來的'],
        [14, '約阿青一起出發'],
        [27, '和奶奶一起看手繪地圖'],
      ],
      answer: 0,
      result: '奶奶聽你說是走路回來的，也想問問你經過了哪個轉角。',
    },
  },
  {
    city: {
      title: '換你先問阿予',
      intro: '阿予把家裡的合照擺在桌上。你想知道他平常跟哪些家人一起住。哪一句可以問他？',
      art: 'school-city',
      choices: [105, 121, 101],
      answer: 1,
      result: '阿予聽出你在問他和誰一起住，便把同住的家人指給你看。',
    },
    home: {
      title: '在圖上找到學校',
      intro: '阿青帶來一張路線圖。你想先請阿青指出學校在哪裡。哪一句可以問他？',
      art: 'school-home',
      choices: [122, 111, 115],
      answer: 0,
      result: '阿青把手指停在學校的位置。你們從這裡出發，沿著圖去找下一個地點。',
    },
  },
];

const lateRoundPractices = {
  2: {
    city: [
      { title: '漏聽了就問回去', intro: '放學後你和阿予練習課堂對話，他扮演老師。你漏聽了半句，選一句請老師再說一次。', choices: [453748, 453752, 453749], answer: 1, result: '阿予把問題重說了一次。換你扮演老師時，你也記得留一點時間給他。' },
      { title: '約在放學路上見', intro: '阿予想在放學後走去郵局。聽他確認郵局離學校近不近，再選能接上去的一句。', promptAudio: 115, choices: [112, 114, 116], answer: 2, result: '阿予把見面地點記在手機裡，你們約好從學校一起走過去。' },
    ],
    home: [
      { title: '請老師再說一次', intro: '到外地念書後，你聽不清楚老師剛才說的後半句。選一句請老師再說一次。', choices: [453752, 453746, 453749], answer: 0, result: '你開口請老師重說。過了幾秒，你聽清楚了，也看見旁邊的同學一起點頭。' },
      { title: '和阿青沿圖走', intro: '回到家鄉，阿青在岔路口問你要去哪裡。聽完問句，選出你要去菜園種菜的回答。', promptAudio: 111, choices: [114, 112, 116], answer: 1, result: '阿青聽懂你要去的地方，拿著手繪圖和你走上菜園的小路。' },
    ],
  },
  3: {
    city: [
      { title: '試教前的第一句', intro: '佳芸老師請你試播一句教室用語。聽完後，選出學生接下來該做的動作。', audio: 453749, choices: [[27, '拿出家庭照'], [19, '回座位坐下'], [29, '到門口排隊']], answer: 1, result: '學生們坐好，抬頭等你開始。你知道這句可以放在試教的開場。' },
      { title: '讓學生自己開口', intro: '小霖忘了帶橡皮擦，又不好意思打斷同桌。選一張可以讓他開口借橡皮擦的句子卡。', choices: [453748, 453754, 453765], answer: 2, result: '小霖小聲問了一遍。同桌把橡皮擦推過去，等他把話說完。' },
    ],
    home: [
      { title: '手繪圖進教室', intro: '佳芸老師請你示範怎麼帶學生讀圖。聽一句太魯閣語，點出句子裡要找的地點。', audio: 122, choices: [[20, '學校'], [14, '菜園'], [24, '郵局']], answer: 0, result: '學生在手繪圖上指出學校，你把地圖轉過去，請他帶下一段。' },
      { title: '下課後也能用', intro: '試教前先練一段午餐對話。同伴說自己忘了帶便當，請選一句可以邀他一起吃的話。', promptAudio: 453882, choices: [453749, 453883, 453748], answer: 1, result: '同伴搬了張椅子坐過來。你把這段對話留在教案裡，準備交給學生練習。' },
    ],
  },
};

function currentRoundPractice(current) {
  if (!current || current.turn < 1) return;
  if (current.chapter < 2) {
    if (current.turn === 1 && current.roundPractice?.chapter !== current.chapter) {
      return roundPracticeStories[current.chapter][current.route];
    }
    return;
  }
  if (current.observationPending || (current.chapter === 2 && current.observation)) return;
  if (current.latePractice?.chapter === current.chapter && current.latePractice.turn >= current.turn) return;
  return lateRoundPractices[current.chapter]?.[current.route]?.[current.turn - 1];
}

function roundPracticePending(current) {
  return Boolean(currentRoundPractice(current));
}

function roundPracticeView() {
  const practice = currentRoundPractice(game);
  const mandarinClue = mandarinMode && game.chapter === 0 ? `${game.route}-clue` : null;
  const attempt = game.roundPracticeAttempt;
  const correct = attempt === practice.answer;
  const choices = practice.choices.map((choice, index) => {
    const state = attempt === index ? correct ? ' right' : ' wrong' : '';
    if (practice.audio) {
      return `<button type="button" class="activity answer${state}" data-action="round-practice-answer" data-value="${index}" ${correct ? 'disabled' : ''}>
        ${icon(choice[0])}<span>${choice[1]}</span></button>`;
    }
    const phrase = mandarinMode ? mandarinPhraseBank[choice][0] : (schoolTrukuPhrases[choice] ?? teacherTrukuPhrases[choice]).indigenous;
    return `<div class="match-card${attempt === index ? correct ? ' matched' : ' is-wrong' : ''}">
      <button type="button" class="match-choice answer${state}" data-action="round-practice-answer" data-value="${index}" ${correct ? 'disabled' : ''}>
        <span lang="${mandarinMode ? 'zh-Hant' : 'trv'}" id="round-phrase-${index}">${phrase}</span></button>
      <button type="button" class="match-listen" data-action="${mandarinMode ? 'mandarin-lesson-audio' : 'truku-audio'}" data-value="${choice}" aria-label="播放這句" aria-describedby="round-phrase-${index}">▶</button>
    </div>`;
  }).join('');
  const art = practice.art ?? (game.chapter === 2 ? `teen-${game.route}` : 'classroom');
  const next = game.turn < turnsPerChapter ? '開始第 2 回合 →' : game.chapter === 2 ? '選擇職涯見習 →' : '選擇畢業方向 →';
  const sourceId = practice.audio ?? practice.choices[practice.answer];
  const source = trukuPhrases[sourceId] ?? schoolTrukuPhrases[sourceId] ?? teacherTrukuPhrases[sourceId];
  return `${scenery(art, practice.title)}
    ${banner(`${chapters[game.chapter][0]}・第 ${game.turn} 回合`, practice.title)}
    <section class="panel scene">
      ${game.feedback ? `<strong>${storyCopy(game.feedback.name)}</strong>${stats(game.feedback.effect, false)}<p>${activityFeedback(game.feedback.text)}</p>` : ''}
      <p>${mandarinMode && practice.audio === 122 ? '佳芸老師請你帶學生讀圖。聽完華語線索，點出句子裡要找的地點。' : practice.intro}</p>
      ${mandarinClue ? `${button('▶ 聽華語線索', 'mandarin-audio', mandarinClue)}
        <details class="clue-transcript"><summary>查看文字線索</summary><p>「${mandarinClips[mandarinClue]}」</p></details>` : practice.audio ? (mandarinMode ? mandarinTranscript(practice.audio, '▶ 聽華語線索') : button('▶ 播放這句太魯閣語', 'truku-audio', practice.audio)) : ''}
      ${practice.promptAudio ? (mandarinMode ? mandarinTranscript(practice.promptAudio, '▶ 聽對方說什麼') : button('▶ 聽對方說什麼', 'truku-audio', practice.promptAudio)) : ''}
      <div class="lesson-list answers">${choices}</div>
      ${attempt === undefined ? '' : `<div class="feedback" tabindex="-1" role="status">${correct ? practice.result : '再聽一次，想想這句適合用在哪一刻。'}</div>`}
      <p id="truku-audio-status" role="status"></p>
      ${!mandarinMode && game.chapter >= 2 ? `<a href="${source.url}" target="_blank" rel="noopener noreferrer">族語 E 樂園教材</a>` : ''}
    </section>
    <div class="actions">${correct ? button(next, 'round-practice-next', '', 'primary') : ''}</div>`;
}

const roundPracticeActions = {
  'round-practice-answer': value => {
    if (screen !== 'play' || !roundPracticePending(game)) return;
    const practice = currentRoundPractice(game);
    const index = Number(value);
    if (!Object.hasOwn(practice.choices, index) || game.roundPracticeAttempt === practice.answer) return;
    game.roundPracticeAttempt = index;
    save();
    render('play', 'result');
    if (index === practice.answer && !practice.audio) {
      if (mandarinMode) playMandarinLesson(practice.choices[index]);
      else playTrukuPhrase(practice.choices[index]);
    }
    else gameAudio.play(index === practice.answer ? 'correct' : 'miss');
  },
  'round-practice-next': () => {
    const practice = currentRoundPractice(game);
    if (screen !== 'play' || !practice || game.roundPracticeAttempt !== practice.answer) return;
    if (game.chapter < 2) game.roundPractice = { chapter: game.chapter };
    else game.latePractice = { chapter: game.chapter, turn: game.turn };
    delete game.roundPracticeAttempt;
    if (game.turn === turnsPerChapter) {
      actions.advance();
      return;
    }
    save();
    render('play');
  },
};
