const epilogues = {
  teaching: {
    title: '第一次帶班', speaker: '小霖', art: 4,
    opening: '你第一次帶班。小霖提早到了，卻站在教室門口，手上的圖卡捏出一道摺痕。',
    line: '老師，我可以先坐在同桌旁邊嗎？',
    choices: [
      ['在同桌旁留一個位置，邀他進來', '你替小霖拉出一張椅子，等他走進教室。'],
      ['在門口陪他站一下，再一起進去', '小霖把圖卡鬆開一點，跟你走到同桌旁。'],
    ],
  },
  outreach: {
    title: '錄音之前', speaker: '阿瑩', art: 5,
    opening: '阿瑩陪你第一次拜訪長者。人坐定了，她把錄音筆留在桌上，還沒開機。',
    line: '長者說有些話可以留下，有些只想聊聊。我們先跟他們一項一項確認，好嗎？',
    choices: [
      ['請阿瑩先介紹你們來訪的原因', '阿瑩介紹完，把時間留給長者決定今天想從哪裡說起。'],
      ['先聽長者說想留下哪一段', '長者先說了可以記錄的部分。你把錄音筆放近一點，等對方確認。'],
    ],
  },
  preschool: {
    title: '空椅子留給誰', speaker: '阿樂', art: 6,
    opening: '早上的活動快要開始。新孩子站在旁邊，盯著阿樂身邊的空位。',
    line: '他好像想過來。我可以先招呼他嗎？',
    choices: [
      ['把椅子拉近，讓阿樂先招呼', '阿樂把椅子轉向孩子，留出能走過來的空間。'],
      ['先示意旁邊有空位，再讓阿樂接話', '新孩子看見你的手勢。阿樂也轉過身來，準備招呼他。'],
    ],
  },
  caregiver: {
    title: '門口的交接', speaker: '秀姨', art: 7,
    opening: '22 歲這年，你跟著資深的一般型族語保母秀姨學習。米米的家人來接她時，秀姨攤開兩張交接小卡，邀你一起聽。',
    line: '等一下，讓她自己說完。你聽聽她怎麼開口，再和家人說我們今天在哪個時候用了這句。',
    choices: [
      ['把小卡放低，等米米先說一遍', '米米看著小卡，準備把她記得的話說給家人聽。'],
      ['請家人說說平常何時會用這句', '家人蹲下來，指著小卡和米米一起想起家裡的日常。'],
    ],
  },
  adult: {
    title: '下課後的來電', speaker: '阿岑', art: 8,
    opening: '成人班散場後，阿岑把手機拿出來。上次他打給外婆時，有一句沒有聽清楚。',
    line: '我想再打一次。這次我可以自己問回去。',
    choices: [
      ['陪他重練一句「可以再說一次嗎」', '他在樓梯口撥出電話。這一次，他停下來問清楚，才和外婆約好時間。'],
      ['請他下次帶外婆的回答回來分享', '下一週，他把外婆的回話說給同桌聽，也陪剛進班的學員試了一輪。'],
    ],
  },
  research: {
    title: '把故事送回去', speaker: '林阿姨', art: 9,
    opening: '你帶著修改過的逐字稿回到共學桌。林阿姨看到一段舊路的故事，指著一處想改的字。',
    line: '這句我想再說一次。等我確認完，再決定播哪一段。',
    choices: [
      ['和她一起重聽並核對那一句', '她在逐字稿上補了一個地名，親手圈出願意在共學時播放的那段。'],
      ['先把逐字稿留給她，下次再討論分享', '她把材料帶回家和親人一起看。你們約好，下次見面再確認可分享的範圍。'],
    ],
  },
};

const epilogueArrivals = {
  teaching: {
    advanced: '完成獨立試教後，佳芸老師請你回來帶一小組，讓孩子用自己的方式問完一句話。',
    guided: '協同試教結束後，佳芸老師邀你再來。這次她坐在後面，先把小組的第一輪交給你。',
  },
  outreach: {
    recurring: '完成初次整理後，阿瑩陪你回訪，想多聽一段家人平常會說的話。',
    pilot: '你帶著初步訪查的筆記來回訪，打算先把待確認的內容和長者逐一核對。',
  },
  preschool: {
    advanced: '上次孩子把倒水時學的問句帶進了積木區。今天你想看看，他們能不能用同一句招呼新同伴。',
    guided: '教保員陪你把問句放回熟悉的遊戲。這一次，你在積木區等著看孩子會怎麼用。',
  },
  caregiver: {
    advanced: '完成畢業見習後，秀姨邀你再跟她幾次接送，看看她怎麼和不同家庭交接。',
    guided: '見習結束後，秀姨讓你先從記錄孩子的反應學起。今天她負責照顧，你在旁觀察。',
  },
  adult: {
    advanced: '阿岑已經敢打給外婆。下一堂課前，他來找你練自己最想問清楚的那一句。',
    guided: '試講結束後，你留了五分鐘給阿岑，讓他再練一次怎麼在電話裡問回去。',
  },
  research: {
    advanced: '專題交出後，林阿姨想在共學前再確認一次。你把逐字稿和她先前同意的片段都帶了回來。',
    guided: '見習時留下的材料還在原先同意的範圍內。你約林阿姨回來逐句核對，聽她自己決定接下來怎麼用。',
  },
};

const childhoodReflections = {
  phone: '你想起和阿予練電話時，漏聽了就請對方再說一次。今天輪到你留出那幾秒，讓別人問回去。',
  photo: '你想起相片背面那句「我們家這樣叫」。今天聽到另一種說法，你也先問它在什麼時候會用。',
  map: '你想起阿青在地圖上的轉角停下來，等你問下一步怎麼走。今天換你把那個停頓留給別人。',
  greeting: '你想起姨婆讓你先招呼客人，等對方回了話才端水。今天你也等了一下，再接下一句。',
};

function epilogueView() {
  const direction = game.direction ?? 'teaching';
  const scene = epilogues[direction];
  const memory = selectedMemory();
  const observation = observations[game.observation];
  const outcome = game.epilogueChoice === undefined ? null : scene.choices[game.epilogueChoice][1];
  const choices = scene.choices.map(([label], index) => button(label, 'epilogue-choice', index, 'lesson')).join('');
  const arrival = epilogueArrivals[direction][game.ending] ?? scene.opening;
  const callback = childhoodReflections[game.memory] ?? (game.route === 'city'
    ? '你想起公車上那通只聽清半句的語音。現在，你也知道要留一點時間給另一個人。'
    : '你想起姨婆拍了拍長椅，等你過去坐。現在，你也留在原地，等對方把那句話說完。');
  return `${banner(`${careerTitle(direction)}・第 1 階段・第 1 回合`, scene.title)}
    ${careerProgress(0)}
    <section class="panel scene">
      <p>${storyCopy(arrival)}</p>
      ${arrival === scene.opening ? '' : `<p>${storyCopy(scene.opening)}</p>`}
      ${direction === 'teaching' ? `<p>你在黑板寫下「${escapeText(game.name || '小禾')}」，轉身向全班自我介紹。小霖也試著跟著叫了一聲「${escapeText(game.name || '小禾')}老師」。</p>` : ''}
      <blockquote class="memory-note">${icon(portraits[scene.speaker] ?? scene.art)}<div><strong>${scene.speaker}</strong><p>「${scene.line}」</p></div></blockquote>
      ${memory || observation ? `<div class="chips">
        ${memory ? `<span class="chip">童年・${memory.material}</span>` : ''}
        ${observation ? `<span class="chip">見習・${observation.reward}</span>` : ''}
      </div>` : ''}
      ${outcome ? `<div class="feedback" tabindex="-1" role="status"><p>${outcome}</p><p>${callback}</p></div>`
        : `<div class="lesson-list">${choices}</div>`}
    </section>
    ${currentCareerPractices() && outcome ? careerPracticeView(0) : ''}
    <div class="actions">${outcome && careerPracticeReady(0) ? button('接續第 2 回合 →', 'career-continue', '', 'primary') : ''}${button('返回畢業成果', 'return-ending')}</div>`;
}
