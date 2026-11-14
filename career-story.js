const careerStageNames = ['初入職場', '獨立帶領', '把接力棒交出去'];
const careerFinalPhrase = {};

function careerProgress(stage) {
  const names = game.direction === 'outreach' ? ['訪談與採集', '家庭訪視與翻譯', '校對與回交']
    : game.direction === 'caregiver' ? ['跟資深保母見習', '取得資格後獨立收托', '交給下一位']
    : game.direction === 'adult' ? ['聽懂來電', '練習生活邀約', '學員接手']
    : game.direction === 'research' ? ['訪談與整理', '比較與校對', '教材回饋'] : careerStageNames;
  return `<ol class="career-progress" aria-label="職涯進度">${names.map((name, index) =>
    `<li class="${index < stage ? 'is-complete' : ''}"${index === stage ? ' aria-current="step"' : ''}>${name}</li>`
  ).join('')}</ol>`;
}

function completedCareerBadge(current) {
  if (!current?.ending || !current.career) return;
  const direction = current.direction ?? 'teaching';
  if (current.career.index === careerStories[direction]?.rounds.length) return `${current.route}-career-${direction}`;
}

function careerView() {
  const direction = game.direction ?? 'teaching';
  const story = careerStories[direction];
  const { index, choices } = game.career;
  const round = story.rounds[index];
  if (!round) {
    const lastRound = story.rounds.at(-1);
    const result = lastRound[2 + choices.at(-1)][1];
    const title = direction === 'outreach' ? '把聲音交還給家人' : '把這一句交給下一個人';
    return `<section class="career-victory panel" aria-labelledby="career-victory-title">
        <div class="career-victory-sparks" aria-hidden="true">${'<i></i>'.repeat(8)}</div>
        <div class="career-victory-medal" aria-hidden="true">${icon(47)}</div>
        <p class="career-victory-label">${careerTitle(direction)}・職涯完成</p>
        <h1 id="career-victory-title" tabindex="-1">恭喜你過關，我們一起加油</h1>
        ${mandarinMode ? mandarinListeningButton('ending', '▶ 聽華語賀詞') : `<p class="career-victory-phrase" lang="trv">${careerFinalPhrase.indigenous}</p>
        ${button('▶ 聽太魯閣語賀詞', 'truku-audio', 'career-ending')}`}
        <p id="truku-audio-status" role="status"></p>
        ${mandarinMode ? '' : button(`${icon(careerIcons[direction])}<span><strong>職涯徽章已解鎖</strong><small>${paths[game.route].name}・${careerTitle(direction)}</small></span><span class="career-badge-arrow" aria-hidden="true">›</span>`, 'album', '', 'career-badge-unlock')}
      </section>
      ${scenery('graduation', careerTitle(direction))}
      <div class="banner career-ending-title"><h2>${title}</h2></div>
      ${careerProgress(careerStageNames.length)}
      <section class="panel scene career-ending">
        <p>${storyCopy(result)}</p><p>${storyCopy(story.closing[game.route === 'city' ? 0 : 1])}</p>
        ${direction === 'teaching' ? `<p>小霖回過頭對你說：「${escapeText(game.name || '小禾')}老師，剛才他沒聽懂。我就像你那時候一樣，慢一點，再說一次。」</p>` : ''}
        ${direction === 'outreach' ? `<p>阿瑩收起訪視筆記，對你說：「${escapeText(game.name || '小禾')}，他們想明天再聽一次。我們下次見面，再問他們有沒有什麼想補進去。」</p>` : ''}
        ${direction === 'preschool' ? `<p>家人對你說：「${escapeText(game.name || '小禾')}，昨天是他先開口的。我們在家也跟著接了一句。」</p>` : ''}
        ${direction === 'caregiver' ? `<p>家人對你說：「${escapeText(game.name || '小禾')}，她現在會先說一句，再等我回她。我們在家也接著說。」</p>` : ''}
        ${direction === 'adult' ? `<p>阿岑對你說：「${escapeText(game.name || '小禾')}老師，下次讓我先接電話。新人要是不放心，我可以陪他練一輪。」</p>` : ''}
        ${direction === 'research' ? `<p>林阿姨把核對好的材料收進布袋，對你說：「${escapeText(game.name || '小禾')}，等孩子回來，我想親口說給他們聽。你下次來，我還有一段想說。」</p>` : ''}
      </section>
      ${mandarinMode ? '' : careerRelayInvites()}
      <div class="actions">${button('回到首頁', 'home', '', 'primary')}${button('結局圖鑑', 'album')}${currentCareerPractices() ? button(`重玩${careerTitle(direction)}職涯`, 'replay-career') : ''}</div>`;
  }
  const completedRounds = index + 1;
  const stage = Math.floor(completedRounds / 2);
  const turn = completedRounds % 2 + 1;
  const [title, setup, ...options] = round;
  const result = options[choices[index]]?.[1];
  const previous = index > 0 && !result ? story.rounds[index - 1][2 + choices[index - 1]][1] : '';
  const scene = Array.isArray(setup) ? setup[game.route === 'city' ? 0 : 1] : setup;
  const art = direction === 'teaching' && stage === 0 ? 'classroom' : `school-${game.route}`;
  return `${scenery(art, title)}
    ${banner(`${careerTitle(direction)}・第 ${stage + 1} 階段・第 ${turn} 回合`, storyCopy(title))}
    ${careerProgress(stage)}
    <section class="panel scene">
      ${previous ? `<p class="career-previous">${storyCopy(previous)}</p>` : ''}
      <div class="memory-note">${icon(story.art)}<p>${storyCopy(scene)}</p></div>
      ${result ? `<div class="feedback" tabindex="-1" role="status">${storyCopy(result)}</div>`
        : `<div class="lesson-list">${options.map(([label], choice) => button(storyCopy(label), 'career-choice', choice, 'lesson')).join('')}</div>`}
    </section>
    ${currentCareerPractices() && result ? careerPracticeView(index + 1) : ''}
    <div class="actions">
      ${result && careerPracticeReady(index + 1) ? button(index === story.rounds.length - 1 ? '看最後一幕 →' : turn === 2 ? '前往下一階段 →' : '接續第 2 回合 →', 'career-next', '', 'primary') : ''}
      ${button('暫回首頁', 'home')}
    </div>`;
}

const careerActions = {
  'replay-career': () => {
    if (screen !== 'career' || !currentCareerPractices() || !completedCareerBadge(game)) return;
    const storage = careerPracticeStorage();
    if (!mandarinMode && (game.direction ?? 'teaching') === 'teaching' && game.teacherPracticeDone?.includes(1)) game.teacherDialogueCompleted = true;
    delete game.career;
    delete game.epilogueChoice;
    delete game[storage.done];
    delete game[storage.step];
    save();
    render('epilogue');
  },
  'career-continue': () => {
    if (!game?.ending || game.epilogueChoice === undefined || !careerPracticeReady(0)) return;
    game.career ??= { index: 0, choices: [] };
    save();
    render('career');
  },
  'career-choice': value => {
    if (screen !== 'career' || !['0', '1'].includes(value)) return;
    const { index, choices } = game.career;
    if (index >= careerStories[game.direction ?? 'teaching'].rounds.length || choices.length !== index) return;
    choices.push(Number(value));
    save();
    render('career', 'result');
    gameAudio.play('gain');
  },
  'career-next': () => {
    if (screen !== 'career') return;
    const { index, choices } = game.career;
    if (choices.length !== index + 1 || !careerPracticeReady(index + 1)) return;
    game.career.index++;
    const badge = completedCareerBadge(game);
    if (badge) {
      if (!mandarinMode) rememberCareerEnding(game.direction ?? 'teaching');
      unlockAlbumBadge(badge);
    }
    save();
    render('career', badge ? 'celebration' : 'heading');
    gameAudio.play(badge ? 'careerVictory' : 'chapter');
  },
};

// Each career starts with the established graduation scene, followed by five decisions.
const careerStories = {
  teaching: {
    art: 20,
    rounds: [
      ['把半句聽清楚', '小霖漏聽了問題，捏著圖卡的手越來越緊。你察覺他想開口。',
        ['停一下，給他時間問回來', '你把圖卡放低，小霖抬起頭。'],
        ['走近一點，讓他可以小聲問', '小霖看了你一眼，終於舉起手。']],
      ['把話帶到下課時間', ['小霖找不到橡皮擦，同桌正好帶了一塊。', '同伴翻遍書包，才發現今天忘了帶便當。'],
        ['請小霖自己先開口', '小霖朝同伴那邊挪了挪椅子。'],
        ['先把圖卡給他，讓他想一句能用的話', '小霖看過圖卡，轉向身旁的同伴。']],
      ['帶學生走出教室', ['小霖把郵局畫在學校地圖的邊上，想和同桌走一趟。', '小霖把童年的手繪圖攤開，說想和同伴沿著路找菜園。'],
        ['讓兩人一問一答，再跟著圖走', '你把地圖交給兩人，等他們商量。'],
        ['先請小霖指給同伴看，再請兩人開口', '小霖把地圖轉向同伴，讓對方也能看清楚。']],
      ['把第一輪交給小霖', ['新同學想知道上課怎麼開場。小霖拿出班上的台詞卡。', '午餐前，新同學想跟上同伴的對話。小霖把兩張練習卡放在長椅上。'],
        ['讓小霖自己帶著新同學練習', '小霖把卡分給新同學，自己留一張。'],
        ['先幫兩人分好角色，再讓他們試', '你站到旁邊，小霖轉頭看新同學，等他準備好。']],
      ['換你等他', '下課鈴響了。小霖把以前捏皺的圖卡壓平，問能不能留下來教新同學。',
        ['把圖卡交給他，讓他自己帶一次', '你把圖卡推過去。這一次，小霖說完自己的話，也記得等對方說完。'],
        ['請他做一張自己的圖卡，下堂課帶來', '他在圖卡背面寫下新同學的名字，說下次要換一個人先問。']],
    ],
    closing: ['走到公車站，你看見小霖拿著相片問家人。曾經只敢小聲練習的孩子，如今先把那句話送了出去。', '走過童年的轉角，你聽見小霖用族語問路。身旁的小孩聽完也跟著問了一句，你站在路邊聽他們說完。'],
  },
  outreach: {
    art: 21,
    rounds: [
      ['從錄音整理出用語情境', ['都會訪談剛結束。阿瑩想把跟家人同住有關的資料找出來，方便下次回訪。', '林伯伯提到舊路上的菜園。阿青請你在教材對照錄音裡分辨誰在問、誰在回答。'],
        ['先聽完片段，再決定情境標籤', '你把耳機接好，逐段核對錄音內容。'],
        ['先圈出待聽的片段，再逐一對照', '阿瑩把待核對的片段放在眼前，等你一起處理。']],
      ['走進族語家庭', ['阿瑩邀你到家裡。餐桌上，她和孩子說起午餐時常用的語句。', '你跟阿青訪視一戶族語家庭。家人說起大家分開出門、再到活動室會合的情形。'],
        ['請家人說明這句話對誰說、何時說', '你留了一欄，記錄家人描述的對象和情境。'],
        ['先聽家人說完，再用自己的話回述確認', '家人補了你沒記到的細節，你把它寫進訪視筆記。']],
      ['做成可以核對的雙語稿', '訪視後，你要把太魯閣語原文和中文譯文並排。阿瑩留下幾張意思相近、需要一一核對的草稿。',
        ['先聽錄音，再逐句核對中文', '你開啟錄音，把注意力放在這句究竟說了什麼。'],
        ['把原文和中文放在同一張資料卡上核對', '你把欄位排好，留出可以標記疑問的地方。']],
      ['讓逐字稿對得上錄音', '逐字稿和錄音已整理成小段。阿瑩請你再確認每段文字是否對到正確的音檔。',
        ['重聽一次，再連回對應的文字', '你把音量調好，從頭聽這段。'],
        ['先把待核對的記錄標出，再一筆一筆重聽', '你把待核對的卡放到一旁，免得把它當成已定稿。']],
      ['把資料交回說話的人', ['美玲姨看完雙語稿。她想把談家裡生活的那段留給女兒。', '林伯伯沿著手繪圖看過雙語稿。他指著轉角，把想留給家人的片段圈了起來。'],
        ['跟長者一起確認最後要交回哪些資料', '你把音檔和稿件逐一列出來，請長者確認。'],
        ['交付前再核對一次錄音的使用範圍', '你翻回第一次訪談的紀錄，對照長者這次的決定。']],
    ],
    closing: ['你離開時，美玲姨的女兒把錄音播回開頭，請母親說說她小時候在哪裡聽過這句話。你在玄關穿鞋，聽見兩人用太魯閣語聊了下去。', '林伯伯的孫女把地圖攤在長椅上。錄音說到舊路時，她抬頭問那個轉角在哪裡。林伯伯牽起她的手，帶她走過去。'],
  },
  preschool: {
    art: 22,
    rounds: [
      ['等孩子指完', ['美勞桌上有幾種材料。新孩子盯著彩色筆，阿樂想直接替他拿。', '阿樂準備帶大家去院子。有個孩子站在門口，手抬起來又放下。'],
        ['蹲低一點，等他先說或先用動作表示', '你和阿樂都停了下來，留給孩子幾秒鐘。'],
        ['把能選的東西放到孩子看得到的位置', '孩子抬頭看了看，阿樂等他做下一個動作。']],
      ['把族語放進每天會做的事', ['午餐快開始了，阿樂想試著招呼同伴過來。', '院子裡有孩子發現了平常沒注意的小角落。他想讓大家也看看。'],
        ['讓阿樂先開口，自己在旁邊等他', '阿樂回頭看了你一眼，準備試一句。'],
        ['用眼前的物件提醒他，再把話交給他', '你指了指眼前的東西，阿樂跟著轉向同伴。']],
      ['接送時把情境交給家人', '來接孩子的家人聽見他用太魯閣語招呼同伴，也想知道回家後怎麼接下去。',
        ['請孩子示範一次，讓家人照他的速度接話', '家人放低手上的袋子，蹲下來聽孩子說。'],
        ['和家人一起找晚餐時能用的一句', '家人想起每天一起坐下吃飯的時候，請孩子說給他聽。']],
      ['換阿樂陪新同伴', ['活動要移到遊戲區，新孩子還站在原地。阿樂回頭確認他想不想一起去。', '新同伴站在美勞桌邊。阿樂想先聽他打算做什麼，再把材料推近。'],
        ['讓阿樂自己問，給新同伴時間回應', '阿樂沒有急著替同伴回答，抬頭等了一會兒。'],
        ['留在旁邊陪阿樂，到需要時再給提示', '你在旁邊坐下，阿樂知道這一輪可以自己先來。']],
      ['下一個孩子也能加入', ['孩子捧著畫找阿樂。阿樂接過來，想回他一句，也想聽他的畫裡有什麼。', '學期快結束了，又有孩子站在門口。阿樂走過去，想把早先聽到的族語招呼用一次。'],
        ['把下一句留給阿樂，讓他慢慢說', '阿樂停了一下，轉向孩子。'],
        ['邀阿樂先示意，等孩子看過來再開口', '孩子抬起頭，阿樂才把準備好的話說出來。']],
    ],
    closing: ['接送時間，孩子把畫交給家人。圖上有一張餐桌、幾副碗筷和一張空椅子。回去的路上，他說今晚想第一個開口招呼大家吃飯。', '你在院子旁的長椅等家人來接。阿樂牽著新同伴走回門口，孩子的奶奶看見了，伸出另一隻手。孩子停了一下，自己用太魯閣語招呼她。'],
  },
  caregiver: {
    art: 23,
    rounds: [
      ['今天最常說的一句', '秀姨仍負責照顧米米。家人把小卡帶回來，秀姨請你坐在一旁，跟她一起把家裡的作息和托育時會用的話對起來。',
        ['先把兩張卡攤開，和家人照日常順序排', '米米看了看兩張卡，等你和家人把下一步選出來。'],
        ['請米米和家人一起重聽，留時間讓她接話', '家人把音量調低一點，和米米一起聽。']],
      ['家裡和托育的一天', ['幾年後，你完成托育訓練並取得資格，成為一般型族語保母。第一個委託你照顧的家庭也住在都會，和你沒有親屬關係。孩子叫小安。爸爸下班後會接手晚間照顧，想知道洗澡前能用哪一句。', '幾年後，你完成托育訓練並取得資格，回到原鄉成為一般型族語保母。小安的家人和你沒有親屬關係，他們希望白天有人照顧小安，也能和她說太魯閣語。接送的奶奶帶來洗澡前常用的一句。'],
        ['和家人一起選固定的一個生活時刻', '家人把那一句留在日常裡。沒幾天，小安開始自己提醒。'],
        ['請家人示範平常的說法，自己跟著學一次', '家人聽見你用同樣的話回應小安，也願意多分享一句。']],
      ['說法不一樣的時候', '交接時，爸爸發現家裡和托育時的招呼略有不同，想知道能不能兩種都用。',
        ['跟家人一起記下兩種用法與情境', '爸爸在交接小卡上補了自己的例子，兩人都知道該在何時接話。'],
        ['用家裡熟悉的一種先練，再讓米米聽原本的說法', '小安聽見兩種說法時都抬頭，還把家裡常用的一句說給你聽。']],
      ['換家人接住這一句', '接送時，小安抱著書包，還想自己把東西收好。你記起秀姨當年說的話，請家人先等她把話說完。',
        ['讓家人先用族語問，等小安自己回應', '小安回答完，把袋子放進書包，再抬頭看看家人。'],
        ['請家人回想她在家怎麼表示準備好了', '家人用家裡的方式接話，小安聽完才把書包交給他。']],
      ['最後一次交接', '小安快要換到新的照顧環境。秀姨也來看看她。你們邀家人和下一位照顧者坐下，把小安熟悉的小卡交過去。',
        ['和家人整理一張小卡，挑出最常一起說的話', '家人把小卡交給下一位照顧者，小安在門口回頭，用她熟悉的方式和你道別。'],
        ['請家人親自說給下一位照顧者聽', '家人示範時停了一下，小安抬頭接完後半句。秀姨坐在一旁，笑著看你等她自己說完。']],
    ],
    closing: ['幾週後，小安的爸爸傳來一張相片。小安把小卡放在牙刷杯旁。爸爸說，她今天先用太魯閣語說要去刷牙，說完還抬頭等他回話。', '你去看秀姨，路上遇見小安和奶奶。小安用太魯閣語接了奶奶一句，旁邊的孩子也湊過來聽。秀姨把步子放慢，讓兩個孩子把話說完。'],
  },
  adult: {
    art: 24,
    rounds: [
      ['先聽清，再接話', '阿岑重播電話練習。旁邊兩位學員也說，聽到熟悉的字，後面的話還是跟不上。',
        ['讓學員標記漏聽的位置，再互相問一次', '阿岑先指出自己少聽到的地方，第一次能說清楚想請對方重說哪裡。'],
        ['先換慢速搭檔，練熟後再用原速', '第一輪停了兩次。練過之後，學員自己要求下一輪用平常速度。']],
      ['帶自己的情境進班', ['學員想學會在下班路上打電話，確認接送的時間。', '學員想在遠地工作時，打電話和家中長輩約好回去的日子。'],
        ['請學員寫下電話真正要確認的事，再兩人演練', '演練過後，學員發現自己能問時間，也能再確認了一遍。'],
        ['兩人輪流當接電話的人，隨機換一個時間', '原本只敢照稿念的學員，也開始停下來聽改過的時間。']],
      ['一句話有好幾種說法', '有人聽得懂邀約的時間，卻忘了確認地點。你和阿岑把兩張資訊卡攤在桌上。',
        ['把時間卡和地點卡分開，讓大家輪流問', '學員手上各拿一張卡，必須開口才能補上另一項資訊。'],
        ['讓阿岑說一次自己最常漏聽哪一段', '阿岑指著自己的筆記，請同伴先想好要確認時段還是地點。']],
      ['讓學員先帶一輪', '新學員來報到。阿岑曾經連一句電話都不敢打，今天自己拿起了練習卡。',
        ['把第一通模擬來電交給阿岑', '他示範時漏聽了一句，笑著再問，讓新人看見可以怎麼做。'],
        ['讓阿岑當同伴，帶新學員完成一段短對話', '阿岑等新人講完，再請他換個時間問一次。']],
      ['電話另一端', '最後一堂課，阿岑下課後留在門口，拿著手機打給家人。另一位學員也想跟著練。',
        ['留出安靜的地方，讓阿岑自己把話說完', '他掛電話後說，家人還順便問了下星期的事。他都聽懂，也回了話。'],
        ['請阿岑先和同學練一輪，再各自撥電話', '兩通電話先後接起。阿岑笑著說，他下次也能陪新人練。']],
    ],
    closing: ['回程車上，你看到班群跳出訊息。學員在約下一次用族語通話的時間，阿岑第一個回了。', '阿岑回到家，把上課用的提示卡放在桌上。過了一會兒，電話響了，這次是家人主動打給他。'],
  },
  research: {
    art: 25,
    rounds: [
      ['錄音要留在哪裡', '林阿姨願意重說那句話。談到以前的家人時，她請你先停一下錄音。',
        ['停下來，等她說明哪些內容可以保留', '她看過你留下的記錄，在可收存的段落旁寫下自己的確認。'],
        ['先把文字筆記給她看，由她決定何時再錄', '她挑了想重錄的段落。你把決定寫在同一頁，方便她下次查對。']],
      ['把相近的問句分開', ['林阿姨談到織布。學生聽見兩段都在問織布，卻不確定兩段各在問什麼。', '學生把兩個有關學校的問句放在一起。一句問位置，另一句談遠近。'],
        ['先按提問的目的整理，再補上使用情境', '學生把兩張卡分開放，等你一起聽完再加標籤。'],
        ['帶著兩段原句回訪，請說話者一起核對', '說話者請學生先重聽，看看兩句各在問哪件事。']],
      ['回來一起校對', '學生整理了兩份卡片。林阿姨提醒大家先聽錄音，再確認卡片說的是哪件事。',
        ['和她一起重聽，把問句和回答放在同一處', '她指出這句之前問的是什麼，學生把前後的句子放回一起。'],
        ['讓學生坐在旁邊聽她重說，再請她檢查新稿', '學生放慢速度，一邊記、一邊等林阿姨說明寫法。']],
      ['把教材先送回去', '學生想把成果做成一張課堂小卡。林阿姨已經確認哪些片段可以在共學時用。',
        ['和林阿姨一起挑出同意的片段，請她看過小卡', '她在小卡後面補了一句中文說明，讓學生知道適合在哪種場合使用。'],
        ['請學生先在共學桌展示草稿，讓當事人決定內容', '有人補了使用情境，也有人只願意留給家人聽。學生把決定逐一記下。']],
      ['下一個人也會問', '分享那天，一位年輕人帶著家中長輩來，問能不能學怎麼整理家人的故事。',
        ['請林阿姨和學生一起示範怎麼聽、怎麼確認', '林阿姨先說了自己在意什麼。年輕人轉過頭，先問長輩想從哪一句開始。'],
        ['把核對過的小卡交給年輕人，讓他練習問一句', '長輩聽完沒有立刻回應，想了一會兒才開口；年輕人安靜地等他說完。']],
    ],
    closing: ['你在共學桌邊收好自己那份稿子。林阿姨把她確認過的版本帶回家，說晚飯後想先講給孩子聽。', '你和林阿姨走到故事裡那個轉角。年輕人指著圖問起舊路，她停了一下，接著用太魯閣語說下去。'],
  },
};
