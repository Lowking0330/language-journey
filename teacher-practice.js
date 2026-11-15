const teacherTrukuPhrases = Object.fromEntries([
  [453746, "Embiyax namu kana? prajing ta da!", 27383],
  [453747, "Hiyug! Thmuku!", 27383],
  [453748, "Embiyax su, mtgsa!", 27383],
  [453749, "Tluung!", 27383],
  [453751, "Mkla su qmbahang ka kari mu hug?", 27383],
  [453752, "Mtgsa,ini ku kla.rngaw pxal duri hug?", 27383],
  [453754, "Qita hini, purug knan spug ha.", null],
  [453765, "Siyuki ta ssrus su hug?", 27383],
  [453882, "Smhungi ku madas hndayu da.", 27387],
  [453883, "Seupu ta mkan hndayu mu da!", 27387],
].map(([id, indigenous, lesson]) => [id, {
  indigenous,
  ...(lesson ? {
    url: `https://web.klokah.tw/text/read.php?tid=${lesson}`,
    file: id === 453747 ? 'truku-release/453747-v2.flac' : `truku-release/${id}.flac`,
  } : { chinese: '請看這裡，跟著我一起唸。', file: 'truku-release/453754.flac' }),
}]));

const teacherPractice = {
  city: [
    { title: '第一次上課', prompt: '聽老師說話，再點教室裡下一步會用到的地方。', audio: 453749, options: [['座位', 20], ['門口', 29], ['教室地圖', 26]], order: [0], review: [453749], result: '小霖聽完就回到座位，抬頭看著你。' },
    { title: '小霖沒聽清楚', prompt: '你問小霖聽懂了沒有。他想請你再說一次。替他挑出那句話。', audio: 453751, options: [453748, 453752, 453746], order: [1], review: [453752, 453751], result: '你把問題重說一遍。小霖這次聽清楚，也知道卡住時可以開口問。' },
    { title: '下課借文具', prompt: '小霖向同桌借東西。聽他開口，再把他要借的物件放到桌上。', audio: 453765, options: [['便當', 13], ['書本', 20], ['橡皮擦', 14]], order: [2], review: [453765], result: '同桌把橡皮擦推到小霖面前。剛練的太魯閣語在下課時用上了。' },
    { title: '從學校走到郵局', prompt: '聽一段問答，先點出發的地方，再點步行要到的地方。', audio: 115, replyAudio: 116, options: [['郵局', 24], ['學校', 20], ['菜園', 14]], order: [1, 0], review: [115, 116], result: '小霖把學校和郵局連起來。兩人收起地圖，沿著這條線去找郵局。', map: true },
    { title: '把開場排出來', prompt: '小霖要帶新同學預演上課。依序排出起立敬禮、學生問好、請坐下。', options: [453749, 453747, 453748], order: [1, 2, 0], review: [453747, 453748, 453749], result: '小霖帶完開場，向新同學點點頭，請對方也試一次。', sequence: true },
    { title: '把提示交給小霖', prompt: '小霖拿出童年的相片帶大家練習。新同學漏聽了一句，問能不能重說。把適合的提示交給小霖。', audio: 453752, options: [['指著圖卡，慢慢重說，邀他跟念', 27], ['直接翻到下一張圖卡', 20], ['請另一位同學代答', 5]], order: [0], review: [453754], result: '小霖指著圖卡放慢速度。新同學跟念完，小霖還留了一點時間，讓他自己再說一次。' },
  ],
  home: [
    { title: '從門口進教室', prompt: '小霖帶著長輩畫的舊路地圖來上課。聽老師說話，點他現在該去的地方。', audio: 453749, options: [['門口', 29], ['地圖牆', 26], ['座位', 20]], order: [2], review: [453749], result: '小霖坐下，把手繪地圖從袋裡拿出來，攤平在桌上。' },
    { title: '請老師再說一遍', prompt: '教室旁有同學說話。你問小霖有沒有聽懂，他想請你重說。替他找出那句話。', audio: 453751, options: [453749, 453748, 453752], order: [2], review: [453752, 453751], result: '你等教室安靜些，慢慢再問一次。小霖點頭，也跟著試了一遍。' },
    { title: '午餐一起吃', prompt: '同伴忘了帶午餐。聽小霖的邀請，再點他想和同伴分享的東西。', audio: 453883, options: [['橡皮擦', 14], ['便當', 13], ['地圖', 26]], order: [1], review: [453883], result: '小霖把便當往同伴那邊推，兩人搬著椅子坐到一起。' },
    { title: '從學校找到菜園', prompt: '聽同伴問去處，再聽小霖回答。從學校出發，沿地圖點到他要去的地方。', audio: 111, replyAudio: 112, options: [['菜園', 14], ['學校', 20], ['郵局', 24]], order: [1, 0], review: [111, 112], result: '小霖帶同伴走到菜園，回頭指給他看剛才經過的轉角。', map: true },
    { title: '把午餐對話交給新同學', prompt: '新同學想練習午餐時的對話。先排出忘帶便當的話，再排出一起吃的邀請。', options: [453883, 453882], order: [1, 0], review: [453882, 453883], result: '新同學念完第一句，小霖接上自己的邀請。下一輪換他們交換角色。', sequence: true },
    { title: '把地圖和提示交出去', prompt: '小霖拿著手繪圖帶新同學走路。聽新同學怎麼求助，再交給小霖一張提示卡。', audio: 453752, options: [['請他回教室自己看', 20], ['停在轉角，指著圖慢慢重說', 26], ['先往前走，等他跟上', 14]], order: [1], review: [453754], result: '小霖停在轉角指給他看，等他好好說完，再一起走下一段路。' },
  ],
};

function currentCareerPractices() {
  if (game.direction === 'preschool') return preschoolPractice;
  if (game.direction === 'caregiver') return caregiverPractice;
  if (game.direction === 'adult') return lecturerPractice;
  if (game.direction === 'research') return researchPractice;
  return game.direction === 'outreach' ? outreachPractice : (game.direction ?? 'teaching') === 'teaching' ? teacherPractice : null;
}

function careerPracticeStorage() {
  if (game.direction === 'preschool') return { done: 'preschoolPracticeDone', step: 'preschoolPracticeStep' };
  if (game.direction === 'caregiver') return { done: 'caregiverPracticeDone', step: 'caregiverPracticeStep' };
  if (game.direction === 'adult') return { done: 'lecturerPracticeDone', step: 'lecturerPracticeStep' };
  if (game.direction === 'research') return { done: 'researchPracticeDone', step: 'researchPracticeStep' };
  return game.direction === 'outreach' ? { done: 'outreachPracticeDone', step: 'outreachPracticeStep' }
    : { done: 'teacherPracticeDone', step: 'teacherPracticeStep' };
}

function careerPracticeView(index) {
  if (hasTeacherDialogue(index)) return teacherDialogueView();
  const practice = currentCareerPractices()[game.route][index];
  const storage = careerPracticeStorage();
  const completed = careerPracticeReady(index);
  const state = game[storage.step]?.index === index ? game[storage.step] : {};
  const step = state.step ?? 0;
  const audio = (id, text) => mandarinMode ? mandarinTranscript(id, text) : button(text, 'truku-audio', id);
  const options = practice.options.map((option, choice) => {
    const position = practice.order.slice(0, step).indexOf(choice);
    const checked = position >= 0;
    const label = checked ? `<span class="teacher-step-label">${position + 1}</span>` : '';
    if (Array.isArray(option)) return `<button type="button" class="lesson teacher-object" data-action="career-practice-answer" data-value="${choice}" ${checked ? 'disabled' : ''}>${icon(option[1])}${label}${storyCopy(option[0])}</button>`;
    const phrase = mandarinMode ? mandarinPhraseBank[option][0] : careerPracticePhrase(option).indigenous;
    return `<div class="match-card${checked ? ' matched' : ''}"><button type="button" class="match-choice" data-action="career-practice-answer" data-value="${choice}" ${checked ? 'disabled' : ''}>${label}<span lang="${mandarinMode ? 'zh-Hant' : 'trv'}" id="teacher-phrase-${option}">${phrase}</span></button>
      <button type="button" class="match-listen" data-action="${mandarinMode ? 'mandarin-lesson-audio' : 'truku-audio'}" data-value="${option}" aria-label="播放這句" aria-describedby="teacher-phrase-${option}">▶</button></div>`;
  }).join('');
  const phrases = practice.review.map(id => mandarinMode ? mandarinPhraseBank[id][0] : careerPracticePhrase(id).indigenous);
  const translations = mandarinMode ? [] : practice.review.map((id, i) => careerPracticePhrase(id).chinese ?? practice.translations?.[i]);
  const links = mandarinMode ? [] : [...new Set([...practice.review, practice.audio, practice.replyAudio].filter(Boolean)
    .map(id => careerPracticePhrase(id).url).filter(Boolean))];
  return `<section class="panel teacher-practice">
    <h2>${storyCopy(practice.title)}</h2>
    ${completed ? `<div class="feedback" tabindex="-1" role="status"><p>${storyCopy(practice.result)}</p>
      ${phrases.length ? `<ol class="teacher-review">${phrases.map((phrase, i) => `<li><span lang="${mandarinMode ? 'zh-Hant' : 'trv'}">${phrase}</span>${translations[i] ? `<br><span>${translations[i]}</span>` : ''}</li>`).join('')}</ol>` : ''}
      ${phrases.length ? button(phrases.length > 1 ? '▶ 依序重聽' : '▶ 重聽這句', 'career-practice-replay', index) : ''}</div>`
      : `<p>${storyCopy(practice.prompt)}</p>
        <div class="actions">${practice.audio ? audio(practice.audio, practice.replyAudio ? (practice.audioLabels?.[0] ?? '▶ 聽問句') : '▶ 聽這句') : ''}
          ${practice.replyAudio ? audio(practice.replyAudio, practice.audioLabels?.[1] ?? '▶ 聽回答') : ''}</div>
        ${practice.order.length > 1 ? `<p aria-live="polite">${practice.map ? '路線' : practice.sequence ? '台詞' : '安排'} ${step}／${practice.order.length}</p>` : ''}
        <div class="${practice.map ? 'teacher-map' : practice.sequence ? 'lesson-list teacher-sequence' : 'lesson-list'}">${options}</div>
        ${state.wrong ? '<p class="feedback" tabindex="-1" role="status">再聽一次，看看這一步該選哪張卡。</p>' : ''}`}
    <p id="truku-audio-status" role="status"></p>
    ${links.map(url => `<a href="${url}" target="_blank" rel="noopener noreferrer">族語 E 樂園教材</a>`).join('')}
  </section>`;
}

const teacherDialogue = [
  { id: 453751, speaker: '老師', portrait: 18 },
  { id: 453752, speaker: '小霖', portrait: 36 },
  { id: 453754, speaker: '老師', portrait: 18 },
];
const teacherDialogueChoices = [2, 0, 1];

function hasTeacherDialogue(index) {
  return !mandarinMode && index === 1 && (game.direction ?? 'teaching') === 'teaching';
}

function teacherDialogueView() {
  const storage = careerPracticeStorage();
  const completed = careerPracticeReady(1);
  const state = game[storage.step]?.index === 1 ? game[storage.step] : null;
  const order = completed ? [0, 1, 2] : state?.dialogue ?? [];
  const card = (choice, placed) => {
    const { id, speaker, portrait } = teacherDialogue[choice];
    const { indigenous: phrase, chinese } = careerPracticePhrase(id);
    return `<div class="match-card dialogue-card${placed ? ' matched' : ''}">
      ${placed ? `<div class="dialogue-line">${icon(portrait)}<span><small>${speaker}</small><span lang="trv" id="dialogue-line-${id}">${phrase}</span>${completed && chinese ? `<small>${chinese}</small>` : ''}</span></div>`
        : button(`${icon(portrait)}<span><small>${speaker}</small><span lang="trv" id="dialogue-line-${id}">${phrase}</span></span>`, 'teacher-dialogue', choice, 'match-choice')}
      <button type="button" class="match-listen" data-action="truku-audio" data-value="${id}" aria-label="播放這句" aria-describedby="dialogue-line-${id}">▶</button>
    </div>`;
  };
  const clue = game.route === 'home'
    ? '小霖把舊路地圖攤在桌上。旁邊有同學說話，他漏聽了老師的問題。'
    : '小霖捏著圖卡，抬頭看你。他漏聽了老師的問題，想請老師再說一次。';
  return `<section class="panel teacher-dialogue" aria-labelledby="teacher-dialogue-title">
    <h2 id="teacher-dialogue-title">把教室對話接起來</h2>
    ${completed ? `<div class="feedback dialogue-reaction" tabindex="-1" role="status">
        ${icon(36, 'dialogue-reaction-portrait')}
        <div><strong>小霖</strong><p>小霖鬆開捏著圖卡的手，跟著念完，抬頭對你笑了笑。</p>
        <p>「老師，下次沒聽懂，我會自己再問一次。」</p></div>
      </div>`
      : `<p>${clue} 先聽小霖說什麼，再把三張台詞卡排成一段對話。</p>
        ${button('▶ 聽小霖怎麼說', 'truku-audio', 453752)}`}
    <p class="dialogue-progress" aria-live="polite">${completed ? '對話已接好' : `對話順序 ${order.length}／3`}</p>
    <ol class="dialogue-slots" aria-label="對話順序">${teacherDialogue.map((_, step) =>
      `<li><span class="teacher-step-label" aria-hidden="true">${step + 1}</span>${step < order.length ? card(order[step], true) : '<span class="dialogue-empty">待放入台詞</span>'}</li>`
    ).join('')}</ol>
    ${completed ? button('▶ 依序重聽完整對話', 'career-practice-replay', 1)
      : `<div class="dialogue-choices" aria-label="待排序的台詞">${teacherDialogueChoices.filter(choice => !order.includes(choice)).map(choice => card(choice, false)).join('')}</div>
        ${state?.wrong ? '<p class="feedback" tabindex="-1" role="status">再聽聽看。是誰先開口？接著小霖會說什麼？</p>' : ''}
        ${order.length ? `<div class="actions">${button('撤回上一張', 'teacher-dialogue', 'undo')}
          ${order.length === teacherDialogue.length ? button('確認對話 →', 'teacher-dialogue', 'submit', 'primary') : ''}</div>` : ''}`}
    <p id="truku-audio-status" role="status"></p>
    <a href="${careerPracticePhrase(453751).url}" target="_blank" rel="noopener noreferrer">族語 E 樂園教材</a>
  </section>`;
}

function arrangeTeacherDialogue(value) {
  if (activeCareerPractice() !== 1 || !hasTeacherDialogue(1) || careerPracticeReady(1)) return;
  const storage = careerPracticeStorage();
  if (game[storage.step]?.index !== 1) game[storage.step] = { index: 1 };
  const state = game[storage.step];
  const order = state.dialogue ??= [];
  state.wrong = false;
  if (value === 'submit') {
    if (order.length !== teacherDialogue.length) return;
    state.wrong = order.some((choice, index) => choice !== index);
    if (!state.wrong) {
      game.teacherDialogueCompleted = true;
      (game[storage.done] ??= []).push(1);
      delete game[storage.step];
    }
  } else if (value === 'undo') {
    order.pop();
  } else {
    const choice = Number(value);
    if (!teacherDialogueChoices.includes(choice) || order.includes(choice)) return;
    order.push(choice);
  }
  save();
  const completed = careerPracticeReady(1);
  render(screen, 'none');
  if (completed) main.querySelector('.dialogue-reaction')?.classList.add('is-revealed');
  main.querySelector(completed || state.wrong ? '.teacher-dialogue .feedback'
    : '.dialogue-choices .match-choice, [data-action="teacher-dialogue"][data-value="submit"]')?.focus();
  if (completed) replayCareerPractice(1);
  else if (state.wrong) gameAudio.play('miss');
}

function careerPracticePhrase(id) {
  return trukuPhrases[id] ?? schoolTrukuPhrases[id] ?? teacherTrukuPhrases[id] ?? outreachTrukuPhrases[id] ?? preschoolTrukuPhrases[id] ?? caregiverTrukuPhrases[id] ?? lecturerTrukuPhrases[id] ?? researchTrukuPhrases[id];
}

function careerPracticeReady(index) {
  if (hasTeacherDialogue(index) && game.teacherDialogueCompleted) return true;
  return !currentCareerPractices() || game[careerPracticeStorage().done]?.includes(index);
}

function activeCareerPractice() {
  if (!game || !currentCareerPractices()) return -1;
  if (screen === 'epilogue' && game.epilogueChoice !== undefined) return 0;
  if (screen === 'career' && game.career.choices.length === game.career.index + 1) return game.career.index + 1;
  return -1;
}

function answerCareerPractice(value) {
  const index = activeCareerPractice();
  if (index < 0 || hasTeacherDialogue(index)) return;
  const practice = currentCareerPractices()[game.route][index];
  const storage = careerPracticeStorage();
  const choice = Number(value);
  if (!practice?.options[choice] || careerPracticeReady(index)) return;
  if (game[storage.step]?.index !== index) game[storage.step] = { index, step: 0 };
  const state = game[storage.step];
  state.wrong = choice !== practice.order[state.step];
  if (!state.wrong) state.step++;
  const done = state.step === practice.order.length;
  if (done) {
    (game[storage.done] ??= []).push(index);
    delete game[storage.step];
  }
  save();
  render(screen, 'result');
  main.querySelector('.teacher-practice .feedback')?.focus();
  if (done) playCareerReview(practice.review);
  else if (!state.wrong) main.querySelector('.teacher-practice [data-action="career-practice-answer"]:not(:disabled)')?.focus();
  else gameAudio.play('miss');
}

function replayCareerPractice(value) {
  const index = Number(value);
  if (index === activeCareerPractice() && careerPracticeReady(index)) {
    if (hasTeacherDialogue(index)) {
      playCareerReview(teacherDialogue.map(({ id }) => id));
      return;
    }
    const { review } = currentCareerPractices()[game.route][index];
    if (review.length) playCareerReview(review);
  }
}

function playCareerReview(ids) {
  if (mandarinMode) playMandarinLesson(...ids);
  else playTrukuPhrase(...ids);
}
