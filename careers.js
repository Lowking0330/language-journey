const careerPractices = {
  "preschool": {
    "name": "族語教保",
    "icon": 6,
    "tag": "幼兒園・帶一群孩子練習",
    "skill": 1,
    "endings": [
      "完成教保見習",
      "孩子把問句帶進遊戲"
    ],
    "endingText": [
      "你和教保員一起完成了活動。下一次，你們約好把問句放進另一個孩子熟悉的遊戲。",
      "你走到積木區時，孩子已經拿著積木問同伴還想不想再要一塊。"
    ],
    "steps": [
      [
        "排入活動的第一步",
        "午點時間，阿樂想再喝一杯水。你有三個活動片段，先安排哪一個？",
        [
          [
            "拿起水壺，邊倒邊示範問句",
            "孩子看見水壺和杯子，逐漸理解「還要嗎？」的意思。",
            1
          ],
          [
            "先請孩子兩人一組自由問答",
            "有孩子想試，阿樂還在看別人怎麼做。",
            0
          ],
          [
            "直接把活動搬到積木區",
            "換了物件後，孩子暫時用手勢互相招呼。",
            0
          ]
        ]
      ],
      [
        "讓孩子接下一句",
        "阿樂指著杯子。同伴想代答。你現在要做什麼？",
        [
          [
            "請同伴先替阿樂回答",
            "這一輪很快結束，阿樂還在等下一次機會。",
            0
          ],
          [
            "接住手勢，把意思說出來，再等阿樂",
            "阿樂先點頭，過了一會兒，自己試了半句。",
            1
          ],
          [
            "收起杯子，回座位抄寫問句",
            "孩子抄下了問句，還需要機會把它用出口。",
            0
          ]
        ]
      ],
      [
        "換一個地方用",
        "孩子移到積木區。你想確認他們會把問句用到新情境。",
        [
          [
            "請孩子指認積木顏色",
            "孩子找出了顏色，這次還沒用上剛才的問句。",
            0
          ],
          [
            "把倒水時的對話再說一次",
            "孩子聽出熟悉的問句，還沒有把它接到遊戲裡。",
            0
          ],
          [
            "請阿樂分積木，問同伴還要不要一塊",
            "阿樂把積木往前推，等同伴回答。",
            1
          ]
        ]
      ]
    ]
  },
  "caregiver": {
    "name": "一般型族語保母",
    "icon": 7,
    "tag": "跟資深保母見習，日後為有需求的家庭提供族語托育",
    "skill": 3,
    "endings": [
      "完成托育見習",
      "接送和家裡都接得上話"
    ],
    "endingText": [
      "你把孩子有反應的話記了下來，交接時和家人約定先試其中一句。",
      "爸爸來接米米時先說家裡的招呼。米米聽見就回頭，主動把杯子拿給他。"
    ],
    "steps": [
      [
        "認出孩子的回應",
        "你跟資深族語保母秀姨見習。米米午睡醒來哭了，秀姨請你在她身旁試著用熟悉的話回應。",
        [
          [
            "在秀姨陪同下先回應米米的需求，再用熟悉的話安撫她",
            "米米靠過來，聽見句尾時抬頭看你。",
            1
          ],
          [
            "等她跟讀完再回應",
            "她繼續伸手，你還需要先接住她的需求。",
            0
          ],
          [
            "一次試三句新詞，看她記住哪個",
            "新詞太多，你改用她平時聽慣的一句。",
            0
          ]
        ]
      ],
      [
        "配對家庭的時間",
        "爸爸早班，通常是奶奶接孩子。爸爸每天能陪米米睡前五分鐘。",
        [
          [
            "請爸爸固定在接送時練習",
            "爸爸想學，但他平日很少接得到孩子。",
            0
          ],
          [
            "把一個熟悉的句子放進爸爸每天的睡前時間",
            "爸爸找到每天能做的時段，隔天回來和你對話。",
            1
          ],
          [
            "讓爸爸有空時隨機選一句",
            "父女有了幾次練習，米米還不太熟悉這個用法。",
            0
          ]
        ]
      ],
      [
        "和奶奶交接",
        "奶奶平常也有一句自己的招呼。她想知道兩句能不能一起用。",
        [
          [
            "規定全家都先背同一句",
            "家人知道你的版本，但奶奶需要花時間改掉熟悉的說法。",
            0
          ],
          [
            "把練習留在托育時間",
            "你和米米繼續練習，家庭還沒找到可以接續的做法。",
            0
          ],
          [
            "請奶奶示範家裡那句，再和爸爸各用熟悉的話",
            "米米在接送和睡前都聽到家人的招呼。",
            1
          ]
        ]
      ]
    ]
  },
  "adult": {
    "name": "成人族語教學",
    "icon": 8,
    "tag": "成人共學班・排練一通電話",
    "skill": 1,
    "endings": [
      "完成成人班試講",
      "學員把練習用在家裡"
    ],
    "endingText": [
      "阿岑帶著今天練過的句子回家。下次來上課，他還可以練怎麼接住外婆的回答。",
      "阿岑在門口撥出電話。隔週他帶著外婆教他的回法回來，也陪新同學練了一遍。"
    ],
    "steps": [
      [
        "設定今晚能做到的目標",
        "阿岑想問外婆週末能不能一起吃飯。他讀得懂教材，還沒試過用族語打電話。",
        [
          [
            "先挑他今晚要說的開場和邀約",
            "阿岑把目標縮到真的能在電話裡用的兩句。",
            1
          ],
          [
            "先把整課的詞都背完",
            "他認得更多詞，但仍在猶豫電話第一句怎麼開口。",
            0
          ],
          [
            "把練習改成一份單字筆試",
            "你知道他會讀哪些詞，還不知道他能否把它們說出口。",
            0
          ]
        ]
      ],
      [
        "接住意外回答",
        "同桌扮外婆，回了一句「那天有事，改晚一點」。阿岑只聽到「有事」。",
        [
          [
            "告訴他答案，再換下一題",
            "這一輪過去了，他還沒試過怎麼自己問回去。",
            0
          ],
          [
            "教他請對方重說，再讓同桌換一種回答",
            "阿岑問回去，也試著確認新的時間。",
            1
          ],
          [
            "請他照原稿把自己的句子讀完",
            "他把原稿讀完，對話沒有接到改時間的問題。",
            0
          ]
        ]
      ],
      [
        "讓學員決定怎麼試",
        "要下課了。阿岑把手機拿出來，還有一點緊張。",
        [
          [
            "代他打這通電話",
            "你順利問到了時間，阿岑還在等自己開口的機會。",
            0
          ],
          [
            "給他兩個提示，讓他決定什麼時候打",
            "阿岑把提示卡收進口袋，走出教室後自己試了一次。",
            1
          ],
          [
            "把全班叫來看他打電話",
            "阿岑把手機放回口袋，想先找一個安靜的地方。",
            0
          ]
        ]
      ]
    ]
  },
  "research": {
    "name": "語言學研究",
    "icon": 9,
    "tag": "畢業專題・整理可分享的語料",
    "skill": 2,
    "endings": [
      "完成研究見習",
      "交付說話者確認的專題"
    ],
    "endingText": [
      "你完成初步紀錄，把材料留在原先同意的範圍內，下一步會再請提供者核對。",
      "你把確認過的逐字稿交回說話者手上。共學時，只有同意分享的片段被播出。"
    ],
    "steps": [
      [
        "整理錄音用途",
        "林阿姨同意讓社區共學使用她的一段聲音。秀姨只同意讓你私下聽。",
        [
          [
            "把同意範圍分開記錄，只把第一段列入候選",
            "你為兩段材料各自記下用途，秀姨的聲音留在原先同意的範圍內。",
            1
          ],
          [
            "兩段都留在私人筆記，暫不選共學材料",
            "你先留住了紀錄，這次還需要找可供共學的例子。",
            0
          ],
          [
            "先只整理自己的筆記，之後再確認用途",
            "筆記整理好了，仍需回頭詢問哪些部分可以用。",
            0
          ]
        ]
      ],
      [
        "補上說話的情境",
        "兩位說話者用不同的稱呼。你要在研究筆記寫下什麼？",
        [
          [
            "只記出現次數較多的說法",
            "這份紀錄有次數，還缺了誰在什麼場合對誰說。",
            0
          ],
          [
            "分別問對誰說、什麼場合會用",
            "你發現其中一句是在向小孩介紹親人時才會說。",
            1
          ],
          [
            "只保留兩句的華語意思",
            "你保存了大意，還需要補回實際使用的場合。",
            0
          ]
        ]
      ],
      [
        "把逐字稿交回去",
        "一段逐字稿整理好了，說話者說有一個例句需要改。",
        [
          [
            "改寫例句，請她確認文字與可分享片段",
            "她補上使用場合，親自選了共學時願意播放的一小段。",
            1
          ],
          [
            "保留逐字稿作為未確認草稿",
            "草稿留在工作資料裡，這次先做口頭報告。",
            0
          ],
          [
            "先展示你自己做的流程圖",
            "聽眾了解你的做法，語料仍等提供者核對。",
            0
          ]
        ]
      ]
    ]
  }
};

const graduationDirections = [
  ['teaching', '族語教學', '完成情境挑戰與試教', 4],
  ['outreach', '語推人員', '長者訪談、族語家庭訪視與雙語語料整理', 5],
  ...Object.entries(careerPractices).map(([id, practice]) => [id, practice.name, practice.tag, practice.icon]),
];
const graduationBadges = [
  ['advanced', '獨立試教'], ['guided', '協同試教'],
  ['outreach-recurring', '完成語推畢業任務'], ['outreach-pilot', '完成初步推廣訪查'],
  ...Object.entries(careerPractices).flatMap(([id, practice]) => [
    [id + '-guided', practice.endings[0]], [id + '-advanced', practice.endings[1]],
  ]),
];
const albumSize = Object.keys(paths).length * (graduationBadges.length + graduationDirections.length);

function directionView() {
  const cards = graduationDirections.map(([id, name, description]) =>
    button(`${icon(careerIcons[id])}<span class="activity-copy"><strong>${mandarinMode ? careerTitle(id) : name}</strong><small>${storyCopy(description)}</small></span>`, 'direction', id, 'activity')).join('');
  return `${banner('22 歲・畢業任務', '選擇畢業方向')}<section class="panel activity-list">${cards}</section>`;
}

const observationApproaches = {
  preschool: { step: 1, option: ['用手勢觀察筆記做圖卡，請阿樂選好後再接話',
    '阿樂先指著圖卡，接著說出自己想再喝一點。同伴拿起水壺，等他說完才倒水。', 1] },
  caregiver: { step: 1, option: ['用家庭交接小卡，把爸爸的練習排進睡前',
    '你和爸爸在小卡寫下睡前會說的招呼，奶奶也知道接送時可以接哪一句。', 1] },
  adult: { step: 1, option: ['請阿岑用重聽提示卡確認改到幾點',
    '阿岑挑了「請再說一次」，把聽到的時間重述一遍，同桌聽完點點頭。', 1] },
  research: { step: 0, option: ['用錄音使用紀錄表逐段核對兩人的同意範圍',
    '你把可供共學的一小段標出來，並在秀姨那一列保留「僅供私下聽」的紀錄。', 1] },
};

function practiceChoices() {
  const index = game.practice?.index;
  const choices = careerPractices[game.direction]?.steps[index]?.[2];
  const approach = observationApproaches[game.direction];
  if (!approach || index !== approach.step || game.observation !== game.direction) return choices;
  return [...choices, approach.option];
}

function practiceView() {
  const task = careerPractices[game.direction];
  const attempt = game.practice;
  const [title, situation] = task.steps[attempt.index];
  const choices = practiceChoices();
  const answered = attempt.answer !== null;
  const cards = choices.map(([label], i) => `<button type="button" class="answer${attempt.answer === i ? ' right' : ''}"
    data-action="practice-answer" data-value="${i}" ${answered ? 'disabled' : ''}><b>${'ABCD'[i]}</b><span>${storyCopy(label)}</span></button>`).join('');
  const memory = selectedMemory();
  return `${banner('22 歲・' + (mandarinMode ? careerTitle(game.direction) : task.name), storyCopy(title))}
    <section class="panel challenge-meta"><div><strong>任務 ${attempt.index + 1}／${task.steps.length}</strong><strong>完成要點 ${attempt.score}／${task.steps.length}</strong></div>
      <progress max="${task.steps.length}" value="${attempt.index + Number(answered)}" aria-label="畢業任務進度"></progress></section>
    <section class="panel preview">${icon(careerIcons[game.direction])}<div><p>${storyCopy(situation)}</p>
      ${memory ? `<small>童年紀錄・${memory.material}</small>` : ''}</div></section>
    <div class="lesson-list answers">${cards}</div>
    ${answered ? `<div class="feedback" role="status" tabindex="-1"><p>${storyCopy(choices[attempt.answer][1])}</p></div>
      <div class="actions">${button(attempt.index + 1 === task.steps.length ? '查看畢業成果 →' : '下一步 →', 'practice-next', '', 'primary')}</div>` : ''}`;
}

function answerPractice(index) {
  const attempt = game.practice;
  const choice = practiceChoices()?.[index];
  if (!choice || attempt.answer !== null || game.ending) return;
  attempt.answer = index;
  if (choice === observationApproaches[game.direction]?.option) attempt.usedObservation = true;
  attempt.score += choice[2];
  save();
  render('play', 'result');
  gameAudio.play(choice[2] ? 'correct' : 'tap');
}

function advancePractice() {
  const task = careerPractices[game.direction];
  const attempt = game.practice;
  if (!attempt || attempt.answer === null || game.ending) return;
  if (attempt.index === task.steps.length - 1) {
    const prepared = game.stats[task.skill] >= 22;
    const outcome = attempt.score === task.steps.length || (attempt.score >= 2 && prepared) ? 'advanced' : 'guided';
    recordGraduation(outcome, `${game.route}-${game.direction}-${outcome}`);
    return;
  }
  attempt.index++;
  attempt.answer = null;
  save();
  render('play');
}

function practiceEndingView() {
  const task = careerPractices[game.direction];
  const index = Number(game.ending === 'advanced');
  const attempt = game.practice;
  const observationResponse = attempt.usedObservation ? observationApproaches[game.direction]?.option[1] : '';
  return `${banner('22 歲・' + (mandarinMode ? careerTitle(game.direction) : task.name), storyCopy(task.endings[index]))}
    <section class="panel ending">${icon(careerIcons[game.direction])}<h2>${escapeText(game.name)}，畢業了！</h2>
      <p>${storyCopy(task.endingText[index])}</p>
      ${observationResponse ? `<div class="memory-note">${icon(observationIcons[game.direction])}<div><strong>${observations[game.direction].reward}</strong><p>${observationResponse}</p></div></div>` : ''}
      <p>完成 ${attempt.score}／${task.steps.length} 個任務要點。準備能力・${statLabel(task.skill)} ${game.stats[task.skill]}</p>
      ${graduationActions()}</section>`;
}
