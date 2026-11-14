const main = document.querySelector('#game');
let key = mandarinMode ? 'language-journey-mandarin' : 'language-graduation-preview-1';
const turnsPerChapter = 2;
const teachingSkill = 24;
const teachingBreadth = 33;
const saved = readSave();
let game = saved.game;
let album = saved.album;
let notebook = saved.notebook;
let newAlbumBadges = new Set(saved.newAlbumBadges);
let screen = 'home';
let route = game?.route ?? 'city';
let nickname = game?.name ?? '';
let avatar = game?.avatar ?? 'boy';
const playerAvatars = { boy: 36, girl: 16 };
let timer;
let lastTick;
let albumObserver;

function readSave() {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    if (data && Array.isArray(data.album) && (!data.game || Object.hasOwn(paths, data.game.route))) {
      migrateTrukuLesson(data.game);
      migrateOutreach(data.game);
      if (data.game?.matchPending) data.game.schoolMatch ??= { matched: [] };
      data.newAlbumBadges = Array.isArray(data.newAlbumBadges) ? data.newAlbumBadges : [];
      const careerBadge = completedCareerBadge(data.game);
      if (careerBadge && !data.album.includes(careerBadge)) {
        data.album.push(careerBadge);
        data.newAlbumBadges.push(careerBadge);
      }
      if (!mandarinMode) data.notebook = mergeTrukuNotebook(data.notebook, data.game);
      return data;
    }
  } catch {}
  return { game: null, album: [] };
}

function save() {
  try {
    const data = { game, album, newAlbumBadges: [...newAlbumBadges] };
    if (!mandarinMode) {
      const latest = readSave();
      notebook = mergeTrukuNotebook(notebook, game, latest.notebook);
      data.notebook = notebook;
    }
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    document.querySelector('#save-note').textContent = '此瀏覽器無法保存進度';
  }
}

function escapeText(value) {
  const node = document.createElement('span');
  node.textContent = value;
  return node.innerHTML;
}

function icon(index, className = '') {
  const sheet = index >= 32 ? ' icon-extra' : index >= 16 ? ' icon-new' : '';
  const tile = index % 16;
  return `<span class="icon${sheet} ${className}" aria-hidden="true" style="--x:${tile % 4 * 100 / 3}%;--y:${Math.floor(tile / 4) * 100 / 3}%"></span>`;
}

const portraits = { 阿予: 16, 阿青: 17, 佳芸老師: 18, 姨婆: 19, 小霖: 36, 阿瑩: 37, 阿樂: 38, 米米的爸爸: 39, 阿岑: 40, 林阿姨: 41 };
const memoryIcons = { phone: 24, photo: 27, map: 26, greeting: 29 };
const careerIcons = { teaching: 20, outreach: 21, preschool: 22, caregiver: 23, adult: 24, research: 25 };
const graduationBadgeIcons = {
  advanced: 20, guided: 20, 'outreach-recurring': 21, 'outreach-pilot': 21,
  'preschool-guided': 22, 'preschool-advanced': 22, 'caregiver-guided': 23, 'caregiver-advanced': 23,
  'adult-guided': 24, 'adult-advanced': 24, 'research-guided': 25, 'research-advanced': 25,
};

function memoryIcon(memory) {
  return icon(memoryIcons[game.memory] ?? memory.art);
}

function button(text, action, value = '', className = '') {
  return `<button type="button" class="${className}" data-action="${action}" data-value="${value}">${text}</button>`;
}

function banner(kicker, title) {
  return `<section class="banner"><span>${kicker}</span><h1 tabindex="-1">${title}</h1></section>`;
}

function scenery(scene, title) {
  return `<div class="scenery scenery-${scene}" role="img" aria-label="${title}"></div>`;
}

function statLabel(index) {
  return mandarinMode ? (index === 1 ? '表達力' : attributes[index])
    : ['體力', '族語能力', '文化理解', '人際連結'][index];
}

function activityCopy(text) {
  const copy = storyCopy(text);
  return mandarinMode ? copy : copy.replaceAll('精力', '體力');
}

function activityFeedback(text) {
  const copy = activityCopy(text);
  if (mandarinMode || !copy.includes(support[game.route])) return copy;
  return `${copy} 人際連結達標，獲得同伴支援，族語能力＋4。`;
}

function stats(values, showZero = true, changes = [], withIcons = false) {
  return `<div class="chips">${values.map((value, index) => {
    if (!showZero && !value) return '';
    const sign = !showZero && value > 0 ? '+' : '';
    const delta = changes[index];
    const total = !mandarinMode && showZero && index === 0 ? '／100' : '';
    return `<span class="chip chip-${index}${delta ? ' has-change' : ''}">${withIcons ? icon(32 + index, 'stat-symbol') : ''}${statLabel(index)} <b>${sign}${value}${total}</b>${delta ? `<em aria-label="變化 ${delta}">${delta > 0 ? '+' : ''}${delta}</em>` : ''}</span>`;
  }).join('')}</div>`;
}

function resumeProgress() {
  if (game.ending) {
    const job = careerTitle(game.direction ?? 'teaching');
    return completedCareerBadge(game) ? `${job}・已通關` : job;
  }
  if (game.chapter >= chapters.length) {
    return game.direction ? `畢業任務・${careerTitle(game.direction)}` : '22 歲・選擇職涯';
  }
  const age = chapters[game.chapter][0];
  if (roundPracticePending(game)) return `${age}・第 ${game.turn} 回合練習`;
  if (game.chapter === 0 && game.turn >= turnsPerChapter && !game.memoryPending && !game.memory &&
      !(mandarinMode ? game.mandarinDialogueDone : game.trukuChapterDone)) return `${age}・童年對話`;
  if (game.matchPending) return `${age}・問答連連看`;
  if (game.memoryPending) return `${age}・童年回憶`;
  if (game.observationPending) return `${age}・職涯見習`;
  if (game.turn >= turnsPerChapter) return `${age}・本章回合已完成`;
  return `${age}・第 ${game.turn + 1} 回合`;
}

function homeView() {
  const bilingualCover = requestedMode === 'bilingual';
  const coverEdition = bilingualCover ? ' cover-bilingual' : mandarinMode ? ' cover-mandarin' : '';
  const cover = `<div class="cover-title scenery${coverEdition}">
    <div class="cover-art" aria-hidden="true"></div>
    <div class="cover-motes" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
    <div class="cover-wildlife" aria-hidden="true">
      <span class="cover-bird"><i></i></span>
      <span class="cover-bird cover-bird-small"><i></i></span>
      <span class="cover-butterfly"><i></i></span>
    </div>
    <button type="button" class="cover-motion" data-action="cover-motion" aria-label="暫停首頁動畫" aria-pressed="${main.dataset.coverPaused === 'true'}"><span aria-hidden="true"></span></button>
    <div class="cover-identity">
      <h1 tabindex="-1" aria-label="${bilingualCover ? 'Spi kari rudan・語你成長' : '族語の夢：語你成長'}">
        ${bilingualCover ? '<span class="cover-wordmark" lang="trv"><span>Spi</span> <span>kari</span> <span>rudan</span></span>' : '<span class="cover-wordmark">族語<span class="cover-no" lang="ja">の</span>夢</span>'}
        <span class="cover-subtitle">語你成長</span>
      </h1>
      <p class="cover-age">6 歲起步・22 歲畢業・展開職涯</p>
    </div>
    ${button('存檔管理', 'backup', '', 'cover-backup')}</div>`;
  if (!mandarinMode && requestedMode !== 'bilingual') {
    return `${cover}
      <nav class="mode-grid" aria-label="選擇遊戲版本">
        <a class="mode-card mode-mandarin" href="?mode=mandarin">${icon(8)}<strong>華語版</strong><small>全華語</small><span class="mode-enter" aria-hidden="true">›</span></a>
        <a class="mode-card mode-bilingual" href="?mode=bilingual">${icon(11)}<strong>雙語版</strong><small>太魯閣語＋華語</small><span class="mode-enter" aria-hidden="true">›</span></a>
      </nav>`;
  }
  const modeLabel = mandarinMode ? '華語版' : '雙語版（太魯閣語＋華語）';
  return `${cover}
    <section class="panel introduction${mandarinMode ? ' mandarin-entry' : ''}"><h2>${mandarinMode ? icon(8) : ''}${modeLabel}</h2>
    <div class="actions">${game ? button(`<strong>${completedCareerBadge(game) ? '重看職涯結局' : game.ending ? '繼續職涯旅程' : '繼續旅程'}</strong><small>${resumeProgress()}</small>`, 'resume', '', 'primary resume-journey') : ''}${button(mandarinMode && game ? '開始新旅程' : '建立角色', 'setup', '', game ? '' : 'primary')}</div>
    ${!mandarinMode ? `<div class="actions">
      ${button('成長手帳', 'truku-notebook')}
      ${button('職涯接力地圖', 'career-map')}
      ${game?.chapter > 0 ? button('童年對話・回奶奶家', 'truku') : ''}
      ${game?.chapter > 1 || game?.matchDone ? button('10–14 歲・問答連連看', 'school-match') : ''}
    </div>` : ''}
    <a class="mode-link" href="./">← 選擇遊戲版本</a></section>`;
}

function setupView() {
  return `${banner('新遊戲', '建立角色')}
    <form class="panel" id="profile">
      <fieldset class="avatar-choice"><legend>選擇角色</legend>
        ${Object.entries({ boy: '男生', girl: '女生' }).map(([id, label]) => `<label><input type="radio" name="avatar" value="${id}" ${avatar === id ? 'checked' : ''}>${icon(playerAvatars[id])}<span>${label}</span></label>`).join('')}
      </fieldset>
      <label for="nickname">角色名字</label>
      <input id="nickname" name="nickname" maxlength="18" placeholder="小禾" value="${escapeText(nickname).replaceAll('"', '&quot;')}">
      <div class="actions">${button('返回', 'home')}<button class="primary" type="submit">下一步・選擇出身 →</button></div>
    </form>`;
}

function routeView() {
  const selected = paths[route];
  const cards = Object.entries(paths).map(([id, path]) => `
    <button class="route-card" type="button" data-action="route" data-value="${id}" aria-pressed="${route === id}">${icon(path.icon)}<strong>${path.name}</strong></button>`).join('');
  return `${banner('角色建立', '你在哪裡長大？')}
    <section class="panel preview" aria-live="polite">${icon(selected.icon)}
      <div><h2>${selected.name}</h2><p>${mandarinMode && route === 'home' ? '從家門口的長椅開始。放學後，你和阿青會帶著長輩畫的地圖去找舊路。' : selected.detail}</p><small>這名角色的起始能力</small>${stats(selected.initial)}</div>
    </section>
    <div class="panel route-grid">${cards}</div>
    <div class="actions">${button('返回', 'setup')}${button('確認出身 →', 'start', '', 'primary')}</div>`;
}

function selectedMemory() {
  return turningPoints[game.route].options[game.memory];
}

function memoryView() {
  const event = turningPoints[game.route];
  const choice = selectedMemory();
  const cards = Object.entries(event.options).map(([id, option]) =>
    button(`${icon(option.art)}<span>${option.name}</span>`, 'choose-memory', id, 'activity')).join('');
  return `${banner('童年・一次選擇', event.title)}
    <section class="panel"><p>${event.intro}</p>
      ${choice ? `<div class="memory-note" tabindex="-1">
        ${icon(portraits[choice.person] ?? choice.portrait)}<div><strong>${choice.person}</strong><p>「${choice.line}」</p>
        ${mandarinMode ? button('▶ 聽這句回憶', 'mandarin-audio', `memory-${game.memory}`) : ''}
        <span class="reward-token">${memoryIcon(choice)}取得 ${choice.material}${mandarinMode ? '' : '・可帶進畢業試教'}</span></div></div>`
        : `<div class="lesson-list">${cards}</div>`}${mandarinMode && choice ? '<p id="truku-audio-status" role="status"></p>' : ''}</section>
    ${choice ? `<div class="actions">${button('前往下一個年齡階段 →', 'advance', '', 'primary')}</div>` : ''}`;
}

function trialView() {
  const questions = trials[game.route];
  const trial = game.trial;
  if (!trial) return `${banner('22 歲・畢業試教', '準備試教')}
    <section class="panel"><p>三道情境題。每題 10 分，答對兩題且達到養成條件，即可獨立試教。</p>
    ${stats(game.stats)}
    <div class="lesson-list">${button('開始挑戰・每題 30 秒', 'begin-trial', 'timed', 'primary')}
    ${button('開始挑戰・不限時', 'begin-trial', 'untimed')}</div></section>`;
  if (trial.index === questions.length) return trialLessonView(trial);
  const [category, prompt, answers, correct, detail] = questions[trial.index];
  const answered = trial.answer !== null;
  const options = answers.map((answer, index) => {
    const status = answered && index === correct ? ' right' : answered && index === trial.answer ? ' wrong' : '';
    return `<button type="button" class="answer${status}" data-action="answer" data-value="${index}" ${answered ? 'disabled' : ''}>
      <b>${'ABC'[index]}</b><span>${answer}</span></button>`;
  }).join('');
  return `${banner('22 歲・畢業試教', '情境挑戰')}
    <section class="panel challenge-meta"><div><strong>第 ${trial.index + 1}／${questions.length} 題</strong><strong>得分 ${trial.score}／30</strong></div>
      ${trial.timed ? `<progress id="clock-bar" max="30" value="${trial.seconds}" aria-label="答題剩餘時間"></progress><span id="clock-text">剩餘 ${trial.seconds} 秒</span>` : ''}</section>
    <section class="panel question"><span class="chip">${storyCopy(category)}</span><h2>${storyCopy(prompt)}</h2></section>
    <div class="lesson-list answers">${options}</div>
    ${answered ? `<div class="feedback" tabindex="-1" role="status"><strong>${trial.answer === correct ? '答對了 ＋10 分' : trial.answer === -1 ? '時間到' : '這題再想想'}</strong><p>${storyCopy(detail)}</p></div>
      <div class="actions">${button(trial.index === questions.length - 1 ? '前往試教安排 →' : '下一題 →', 'next-question', '', 'primary')}</div>` : ''}`;
}

function trialLessonView(trial) {
  const memory = selectedMemory();
  return `${banner('22 歲・畢業試教', '你會怎麼帶這堂課？')}
    <section class="panel">
      <strong>情境挑戰 ${trial.score}／30 分</strong>
      <p>${game.route === 'city' ? '學生帶來家庭照片。兩個家庭對親人的稱呼不同。' : '學生把兩個在家聽過的地名寫在同一個轉角旁。'}</p>
      ${stats(game.stats)}
      <p class="trial-rule">${mandarinMode ? `獨立試教需要挑戰達 20 分、${storyCopy('族語力')}與所選方向各達 ${teachingSkill}，文化理解與連結合計達 ${teachingBreadth}。`
        : `獨立試教需要挑戰達 20 分，族語能力與所選方向各達 ${teachingSkill}，文化理解與人際連結合計達 ${teachingBreadth}。目前族語能力 ${game.stats[1]}／${teachingSkill}，文化理解與人際連結合計 ${game.stats[2] + game.stats[3]}／${teachingBreadth}。`}</p>
      ${memory ? `<div class="memory-note">${memoryIcon(memory)}<div><strong>${memory.material}</strong>
        <p>童年帶來的教材・${statLabel({ language: 1, culture: 2, ties: 3 }[memory.focus])}方向</p></div></div>` : ''}
      <div class="lesson-list">
        ${game.observation === 'teaching' ? button('帶同伴互問教案，先看提示再換搭檔', 'finish', 'observed-teaching', 'primary lesson') : ''}
        ${memory ? button(memory.lesson, 'finish', 'memory', 'primary lesson') : ''}
        ${button('讓學生兩兩練習問答，再換搭檔', 'finish', 'language', 'lesson')}
        ${button('請學生說明家中的用法和場合', 'finish', 'culture', 'lesson')}
        ${button('讓熟悉的同伴陪第一輪，再各自練習', 'finish', 'ties', 'lesson')}
      </div>
    </section>`;
}

function chapterDialogue() {
  const recall = game.chapter === 1 ? schoolDialogues : seniorDialogues;
  const context = recall[game.route];
  const dialogue = game.chapter === 3
    ? ['佳芸老師', 4, mentorDialogues[game.observation] ?? '先聽孩子想把族語用在哪裡，再陪他把那一句練出口。']
    : context[game.memory] ?? context.default;
  const [speaker, art, line] = dialogue;
  return `<blockquote class="memory-note chapter-dialogue">${icon(portraits[speaker] ?? art)}<div><strong>${speaker}</strong><p>「${escapeText(game.name || '小禾')}，${storyCopy(line)}」</p></div></blockquote>`;
}

function playView() {
  if (roundPracticePending(game)) return roundPracticeView();
  if (game.chapter === 0 && game.turn >= turnsPerChapter && !game.memoryPending && !game.memory) {
    if (mandarinMode && !game.mandarinDialogueDone) return mandarinDialogueView();
    if (!mandarinMode && !game.trukuChapterDone) return trukuView();
  }
  if (game.matchPending) return matchingView();
  if (game.memoryPending) return memoryView();
  if (game.observationPending) return observationView();
  if (game.chapter === chapters.length) {
    if (game.outreach) return outreachView();
    if (game.practice) return practiceView();
    return game.direction === 'teaching' || game.trial ? trialView() : directionView();
  }
  const [age, title, goal] = chapters[game.chapter];
  const sceneArt = [game.route, `school-${game.route}`, `teen-${game.route}`, 'classroom'][game.chapter];
  const [scene, activities] = mandarinMode && game.chapter === 0 ? mandarinActivities[game.route] : paths[game.route].scenes[game.chapter];
  const rows = [...activities, rest].map(([art, name, description, effect], index) => {
    const remaining = game.stats[0] + effect[0];
    const disabled = game.turn >= turnsPerChapter || remaining < 0;
    return `<button class="activity" type="button" data-action="act" data-value="${index}" ${disabled ? 'disabled' : ''}>
      ${icon(art)}<span class="activity-copy"><strong>${storyCopy(name)}</strong><small>${activityCopy(description)}</small>${stats(effect, false)}
        ${!mandarinMode && effect[2] > 0 ? '<small>文化理解有助於畢業試教時說明族語的使用場合。</small>' : ''}
        ${!mandarinMode && remaining < 0 ? `<small>還差 ${-remaining} 點體力</small>` : ''}</span>
    </button>`;
  }).join('');
  return `<div class="scenery scenery-${sceneArt} chapter-cover">${banner(`${age}・${paths[game.route].name}`, title)}</div>
    <section class="panel player"><strong class="player-name">${icon(playerAvatars[game.avatar] ?? 2)}${escapeText(game.name)}</strong>
      <span>本章 ${Math.min(game.turn, turnsPerChapter)}／${turnsPerChapter} 回合</span>
      <progress class="chapter-progress" max="${turnsPerChapter}" value="${Math.min(game.turn, turnsPerChapter)}" aria-label="本章回合"></progress>${stats(game.stats, true, game.feedback?.effect, true)}</section>
    <section class="panel scene"><h2>${storyCopy(goal)}</h2><p>${storyCopy(scene)}</p>
      ${game.chapter > 0 && !game.turn ? chapterDialogue() : ''}
      ${game.feedback ? `<div class="feedback" tabindex="-1" role="status"><strong>${storyCopy(game.feedback.name)}</strong>
        ${stats(game.feedback.effect, false)}<p>${activityFeedback(game.feedback.text)}</p></div>` : ''}</section>
    ${game.turn < turnsPerChapter ? `<div class="panel activity-list">${rows}</div>` : `
      <div class="actions">${button(game.chapter === 1 && !game.matchDone ? (mandarinMode ? '開始華語問答連連看 →' : '開始太魯閣語連連看 →') : game.chapter === 3 ? '選擇畢業方向 →' : '前往下一個年齡階段 →', 'advance', '', 'primary')}</div>`}`;
}

function graduationActions() {
  const done = game.career?.index === careerStories[game.direction ?? 'teaching'].rounds.length;
  return `<div class="actions">${button(done ? '重看職涯結局 →' : game.career ? '繼續職涯篇 →' : '進入職涯篇 →', 'epilogue', '', 'primary')}${button('結局圖鑑', 'album')}${button('首頁', 'home')}</div>`;
}

function endingView() {
  if (game.outreach) return outreachEndingView();
  if (game.practice) return practiceEndingView();
  const reflection = {
    'observed-teaching': '你讓孩子先看提示和同桌練一輪，再換搭檔自己問。小霖忘了一個詞，停了一下，還是把問題說完了。',
    language: '兩人一組時，孩子先練一句，再換人追問。',
    culture: '孩子把兩種家裡的說法留在黑板上，標出各自會用的場合。',
    ties: '熟悉的同伴陪過第一輪後，原本低著頭的孩子也願意自己試一句。',
  }[game.focus];
  const memory = game.focus === 'memory' ? selectedMemory() : null;
  return `${banner(mandarinMode ? '22 歲・語言與文化教學畢業去向' : '22 歲・族語教學畢業去向', game.ending === 'advanced' ? '獨立完成試教' : '完成協同試教')}
    <section class="panel ending">${icon(careerIcons.teaching)}<h2>${escapeText(game.name)}，畢業了！</h2>
      <p>${game.ending === 'advanced' ? '你獨立帶完這一節課。' : '佳芸老師陪你帶完這一節課，並邀你下次帶一小組。'}</p>
      ${memory ? `<div class="memory-note">${memoryIcon(memory)}<div><strong>${memory.material}</strong><p>${memory.payoff}</p></div></div>` : ''}
      ${reflection ? `<p>${reflection}</p>` : ''}
      ${memory ? '' : `<p>${storyCopy(paths[game.route].final)}</p>`}${stats(game.stats)}
      ${graduationActions()}</section>`;
}

function unlockAlbumBadge(id) {
  if (album.includes(id)) return;
  album.push(id);
  newAlbumBadges.add(id);
}

function shineAlbumCard(card) {
  if (!card) return;
  card.classList.remove('is-shining');
  void card.offsetWidth;
  card.classList.add('is-shining');
}

function albumView() {
  function group(title, badges) {
    let completed = 0;
    const cards = Object.entries(paths).flatMap(([routeId, path]) =>
      badges.map(([badge, name, art]) => {
        const id = `${routeId}-${badge}`;
        const unlocked = album.includes(id);
        const fresh = unlocked && newAlbumBadges.has(id);
        if (unlocked) completed++;
        return `<article class="collection ${unlocked ? 'unlocked' : 'locked'}${fresh ? ' is-new' : ''}" data-badge="${id}">
          ${icon(art, 'collection-art')}${icon(unlocked ? 30 : 31, 'album-mark')}
          <strong>${path.name}・${name}</strong><small>${icon(path.icon)}${fresh ? '新解鎖' : unlocked ? '已完成' : '尚未解鎖'}</small>
          ${unlocked ? `<span class="album-sparks" aria-hidden="true"><i></i><i></i><i></i></span>
            <button type="button" class="album-replay" data-action="album-shine" data-value="${id}" aria-label="重播${path.name}・${name}的發光效果"></button>` : ''}
        </article>`;
      })).join('');
    return `<section class="panel album-group"><h2>${title} <small>${completed}／${badges.length * Object.keys(paths).length}</small></h2>
      <div class="route-grid">${cards}</div></section>`;
  }
  return `${banner('成長與職涯紀錄', '結局圖鑑')}
    ${mandarinMode ? '' : careerMapAlbumEntry()}
    ${album.length ? '<p class="panel album-hint">點一下已解鎖的卡片，可以重播亮光。</p>' : ''}
    ${group('職涯通關', Object.keys(careerTitles).map(id => [`career-${id}`, careerTitle(id), careerIcons[id]]))}
    ${group('畢業成果', graduationBadges.map(([id, name]) => [id, name, graduationBadgeIcons[id]]))}
    <div class="actions">${button('返回首頁', 'home', '', 'primary')}</div>`;
}

const views = { home: homeView, setup: setupView, route: routeView, play: playView, ending: endingView, album: albumView, epilogue: epilogueView, career: careerView, truku: trukuView, trukuNotebook: trukuNotebookView, schoolMatch: matchingView, careerMap: careerMapView };

function render(next, focus = 'heading') {
  clearNotebookNotice();
  stopTrukuAudio();
  albumObserver?.disconnect();
  albumObserver = undefined;
  window.clearInterval(timer);
  timer = undefined;
  screen = next;
  main.dataset.screen = screen;
  main.dataset.motion = ['memory', 'result', 'route', 'celebration'].includes(focus) ? focus : 'enter';
  const graduationArt = screen === 'ending'
    ? `<div class="graduation-art${focus === 'celebration' ? ' is-reveal' : ''}" role="img" aria-label="畢業生在校門口道別">${'<span aria-hidden="true"></span>'.repeat(6)}${icon(47, 'graduation-medal')}</div>` : '';
  main.innerHTML = graduationArt + views[screen]();
  const toolbarAlbum = document.querySelector('#album');
  toolbarAlbum.hidden = !mandarinMode && requestedMode !== 'bilingual';
  toolbarAlbum.textContent = `圖鑑 ${album.length}／${albumSize}`;
  toolbarAlbum.className = newAlbumBadges.size && screen !== 'album' ? 'album-has-new' : '';
  if (screen === 'album') {
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      albumObserver = new IntersectionObserver((entries, observer) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.35) continue;
          entry.target.classList.add('is-shining');
          observer.unobserve(entry.target);
        }
      }, { threshold: 0.35 });
      main.querySelectorAll('.collection.unlocked').forEach(card => albumObserver.observe(card));
    }
    if (newAlbumBadges.size) {
      newAlbumBadges.clear();
      save();
    }
  }
  if (next === 'play' && game.trial?.timed && game.trial.answer === null && game.trial.index < trials[game.route].length) {
    lastTick = Date.now();
    timer = window.setInterval(tick, 250);
  }
  if (focus === 'none') return;
  if (focus === 'match-left' || focus === 'match-right') {
    main.querySelector(focus === 'match-left'
      ? '[data-action="match-left"][aria-pressed="true"]'
      : selectedMatch === null ? '[data-action="match-left"]:not(:disabled), [data-action="leave-match"]'
        : '[data-action="match-right"]:not(:disabled)')?.focus({ preventScroll: true });
    return;
  }
  const target = focus === 'result' ? '.feedback' : focus === 'memory' ? '.memory-note' : focus === 'route' ? '[aria-pressed="true"]' : 'h1';
  main.querySelector(target)?.focus({ preventScroll: focus === 'route' });
  if (focus === 'heading' || focus === 'celebration') window.scrollTo(0, 0);
}

function act(index) {
  if (game.turn >= turnsPerChapter || roundPracticePending(game)) return;
  const activities = paths[game.route].scenes[game.chapter][1];
  const [, name, , effect, response] = [...activities, rest][index];
  if (game.stats[0] + effect[0] < 0) return;
  const before = game.stats;
  const after = before.map((value, stat) => stat === 0 ? Math.min(100, value + effect[stat]) : value + effect[stat]);
  game.stats = after;
  game.turn++;
  if (game.chapter === 0 && game.turn === turnsPerChapter) {
    if (mandarinMode) game.mandarinDialogue ??= { index: 0 };
    else game.truku ??= newTrukuLesson();
  }
  let message = response;
  if (!game.support && game.chapter >= 1 && after[3] >= 27 && index !== 3) {
    game.support = true;
    game.stats[1] += 4;
    message += '　' + support[game.route];
  }
  game.feedback = { name, effect: after.map((value, stat) => value - before[stat]), text: message };
  if (game.chapter === 1 && game.turn === turnsPerChapter && !game.matchDone) {
    actions.advance();
    return;
  }
  save();
  render('play', game.chapter < 2 || roundPracticePending(game) ? 'heading' : 'result');
  gameAudio.play('gain');
}

function tick() {
  const now = Date.now();
  if (document.hidden) {
    lastTick = now;
    return;
  }
  const elapsed = Math.floor((now - lastTick) / 1000);
  if (!elapsed) return;
  lastTick += elapsed * 1000;
  const trial = game.trial;
  trial.seconds = Math.max(0, trial.seconds - elapsed);
  if (trial.seconds === 0) {
    answerTrial(-1);
    return;
  }
  document.querySelector('#clock-bar').value = trial.seconds;
  document.querySelector('#clock-text').textContent = `剩餘 ${trial.seconds} 秒`;
  save();
}

function answerTrial(answer) {
  const trial = game.trial;
  if (trial.answer !== null) return;
  trial.answer = answer;
  const correct = answer === trials[game.route][trial.index][3];
  if (correct) trial.score += 10;
  save();
  render('play', 'result');
  gameAudio.play(correct ? 'correct' : 'miss');
}

function finish(focus) {
  const [, language, culture, ties] = game.stats;
  const scores = { language, culture, ties };
  if (focus === 'observed-teaching' && game.observation !== 'teaching') return;
  const direction = focus === 'memory' ? selectedMemory().focus : focus === 'observed-teaching' ? 'language' : focus;
  game.focus = focus;
  const ending = game.trial.score >= 20 && language >= teachingSkill && scores[direction] >= teachingSkill && culture + ties >= teachingBreadth ? 'advanced' : 'guided';
  recordGraduation(ending, `${game.route}-${ending}`);
}

function recordGraduation(ending, badge) {
  game.ending = ending;
  unlockAlbumBadge(badge);
  save();
  render('ending', 'celebration');
  gameAudio.play('finish');
}

const actions = {
  'cover-motion': () => {
    const paused = main.dataset.coverPaused !== 'true';
    main.dataset.coverPaused = String(paused);
    main.querySelector('.cover-motion').setAttribute('aria-pressed', String(paused));
  },
  backup: openSaveBackup,
  ...mandarinActions,
  ...trukuActions,
  ...schoolMatchActions,
  ...roundPracticeActions,
  ...careerActions,
  ...careerMapActions,
  'career-practice-answer': answerCareerPractice,
  'career-practice-replay': replayCareerPractice,
  'teacher-dialogue': arrangeTeacherDialogue,
  home: () => render('home'),
  album: () => render('album'),
  'album-shine': id => {
    if (screen === 'album' && album.includes(id)) {
      shineAlbumCard(main.querySelector(`[data-badge="${CSS.escape(id)}"]`));
    }
  },
  music: () => gameAudio.toggle('music'),
  sound: () => gameAudio.toggle('sound'),
  setup: () => render('setup'),
  route: id => { route = id; render('route', 'route'); },
  start: () => {
    if (game && !game.ending && !window.confirm(mandarinMode
      ? '開始新旅程會取代目前進度，已完成的圖鑑會保留。'
      : '開始新旅程會取代目前進度，成長手帳與已完成的圖鑑會保留。')) return;
    selectedMatch = null;
    game = { route, avatar, name: nickname || '小禾', chapter: 0, turn: 0, stats: [...paths[route].initial], feedback: null };
    save();
    render('play');
  },
  resume: () => render(game.career ? 'career' : game.epilogueChoice !== undefined ? 'epilogue' : game.ending ? 'ending' : 'play'),
  act: value => act(Number(value)),
  'choose-memory': id => {
    if (!game.memoryPending || game.memory || !Object.hasOwn(turningPoints[game.route].options, id)) return;
    game.memory = id;
    save();
    render('play', 'memory');
    gameAudio.play('gain');
  },
  'begin-trial': mode => {
    game.trial = { timed: mode === 'timed', seconds: 30, index: 0, answer: null, score: 0 };
    save();
    render('play');
  },
  answer: value => answerTrial(Number(value)),
  'next-question': () => {
    Object.assign(game.trial, { index: game.trial.index + 1, seconds: 30, answer: null });
    save();
    render('play');
  },
  advance: () => {
    if (game.turn < turnsPerChapter || roundPracticePending(game) || (mandarinMode && game.chapter === 0 && !game.mandarinDialogueDone)) return;
    if (game.chapter === 1 && !game.matchDone) {
      game.matchPending = true;
      game.schoolMatch ??= { matched: [] };
      save();
      render('play');
      return;
    }
    if (game.chapter === 0 && !game.memory) {
      game.memoryPending = true;
      save();
      render('play');
      gameAudio.play('chapter');
      return;
    }
    if (game.chapter === 2 && !game.observation) {
      game.observationPending = true;
      save();
      render('play');
      gameAudio.play('chapter');
      return;
    }
    game.memoryPending = false;
    game.observationPending = false;
    game.chapter++;
    game.turn = 0;
    game.stats[0] = Math.min(100, game.stats[0] + 24);
    game.feedback = null;
    save();
    render('play');
    gameAudio.play('chapter');
  },
  'choose-observation': id => {
    if (!game.observationPending || game.observation || !Object.hasOwn(observations, id)) return;
    game.observation = id;
    save();
    render('play', 'memory');
    gameAudio.play('gain');
  },
  direction: direction => {
    if (game.chapter !== chapters.length || game.direction || game.trial || game.ending) return;
    if (!graduationDirections.some(([id]) => id === direction)) return;
    if (!mandarinMode) rememberCareerOrigin();
    startGraduationDirection(direction);
  },
  'outreach-step': value => selectOutreachStep(Number(value)),
  'practice-answer': value => answerPractice(Number(value)),
  'practice-next': advancePractice,
  epilogue: () => { if (game?.ending) render(game.career ? 'career' : 'epilogue'); },
  'return-ending': () => render('ending'),
  'epilogue-choice': value => {
    if (!game?.ending || game.epilogueChoice !== undefined || !['0', '1'].includes(value)) return;
    game.epilogueChoice = Number(value);
    save();
    render('epilogue', 'result');
    gameAudio.play('gain');
  },
  finish,
};

document.addEventListener('click', event => {
  const modeLink = event.target.closest('.mode-card, .mode-link');
  if (modeLink && !event.defaultPrevented && event.button === 0 &&
      !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
    event.preventDefault();
    history.pushState(null, '', modeLink.href);
    loadHomeMode();
    return;
  }
  const control = event.target.closest('[data-action]');
  if (!control) return;
  const action = control.dataset.action;
  if (action !== 'music') gameAudio.unlock();
  if (!action.endsWith('-audio') && !['music', 'sound', 'act', 'answer', 'finish', 'truku-answer', 'mandarin-dialogue-answer'].includes(action)) gameAudio.play('tap');
  actions[action](control.dataset.value);
});

function loadHomeMode() {
  requestedMode = new URLSearchParams(location.search).get('mode');
  mandarinMode = requestedMode === 'mandarin';
  key = mandarinMode ? 'language-journey-mandarin' : 'language-graduation-preview-1';
  const state = readSave();
  ({ game, album, notebook } = state);
  newAlbumBadges = new Set(state.newAlbumBadges);
  route = game?.route ?? 'city';
  nickname = game?.name ?? '';
  avatar = game?.avatar ?? 'boy';
  selectedMatch = null;
  render('home');
}

if (typeof window.addEventListener === 'function') window.addEventListener('popstate', loadHomeMode);

main.addEventListener('submit', event => {
  if (event.target.id !== 'profile') return;
  event.preventDefault();
  gameAudio.unlock();
  gameAudio.play('tap');
  const form = new FormData(event.target);
  nickname = form.get('nickname').trim();
  avatar = form.get('avatar') === 'girl' ? 'girl' : 'boy';
  render('route');
});
render('home', 'none');
