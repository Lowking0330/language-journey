// Mandarin dialogue and exercises use their own text and audio bank.
const mandarinPhraseBank = {
  101: ['照片裡那位男生是誰？', 'boy'], 102: ['他是我叔叔。', 'player'],
  103: ['照片裡那位女生是誰？', 'boy'], 104: ['她是我姊姊。', 'player'],
  105: ['合照裡那個小孩是誰？', 'boy'], 106: ['他是我弟弟。', 'player'],
  111: ['你要去哪裡？', 'boy'], 112: ['我要去菜園種菜。', 'player'],
  113: ['你把工具放在哪裡？', 'boy'], 114: ['我放在犁耙旁邊。', 'player'],
  115: ['郵局離學校近嗎？', 'boy'], 116: ['很近，走路就會到。', 'player'],
  121: ['你平常和哪些家人一起住？', 'player'], 122: ['請問學校在哪裡？', 'player'],
  453746: ['大家好，我們開始上課吧！', 'teacher'], 453747: ['起立，敬禮！', 'boy'],
  453748: ['老師好！', 'boy'], 453749: ['請坐下。', 'teacher'],
  453751: ['你聽懂我剛才說的話嗎？', 'teacher'], 453752: ['老師，我沒聽清楚，可以再說一次嗎？', 'boy'],
  453754: ['看這張圖。等我說完，你再試一次。', 'teacher'], 453765: ['可以借我橡皮擦嗎？', 'boy'],
  453882: ['我今天忘了帶便當。', 'boy'], 453883: ['要不要一起吃我的便當？', 'boy'],
  453903: ['等一下，我還沒掃完這裡。', 'teacher'], 582743: ['你先走，我等一下去找你。', 'teacher'],
  1036834: ['大家來吃飯了！', 'boy'], 1036835: ['好，我來了。', 'girl'],
  1036918: ['來，我們牽手一起走！', 'boy'], 1036920: ['好，我們走吧。', 'girl'],
  1036922: ['你們看，那裡是什麼？', 'boy'], 1036852: ['我想畫畫，可以給我一張紙嗎？', 'girl'],
  1036857: ['哇，你畫得真好！', 'teacher'],
  1000064: ['我起床了！', 'girl'], 1000065: ['快來吃早餐囉！', 'family'],
  1000070: ['該去刷牙囉！', 'family'], 1000071: ['好，我現在就去刷牙。', 'girl'],
  1000072: ['記得每一顆牙都要刷乾淨。', 'family'], 1036814: ['來，準備洗澡了。', 'family'],
  1036931: ['把你手上的東西放進書包吧。', 'family'],
  1603: ['可以幫我留個話嗎？', 'man'], 1604: ['好，我幫你記下來。', 'teacher'],
  1610: ['好，到時候見！', 'man'], 583004: ['你今天有空嗎？', 'man'],
  583007: ['我今天有事不在家。我們改天吧。', 'elder-woman'],
  583008: ['那你明天有空嗎？我下午去找你。', 'man'], 583009: ['好，我在家等你。', 'elder-woman'],
  892909: ['約明天下午見面，可以嗎？', 'man'], 892910: ['好啊，那我們在哪裡碰面？', 'teacher'],
  583010: ['請問我可以錄音嗎？我想把這段話記下來。', 'teacher'], 583011: ['好啊，沒有問題。', 'elder-woman'],
  583016: ['謝謝你願意讓我訪問。', 'teacher'],
  892921: ['你很會織布，是誰教你的？', 'teacher'], 892922: ['是我奶奶。她是我們部落最會織布的人。', 'elder-woman'],
  892923: ['你怎麼會想學織布呢？', 'teacher'], 892924: ['織布是我們的文化，我想讓它繼續傳下去。', 'elder-woman'],
  552810: ['學校離火車站近嗎？', 'teacher'],
  'ending': ['恭喜你過關，我們一起加油！', 'elder-man'],
};

function mandarinPhraseFile(id, current) {
  const entry = mandarinPhraseBank[id];
  if (!entry) return;
  const [, voice] = entry;
  let role = voice === 'player' ? current.avatar === 'girl' ? 'girl' : 'boy'
    : voice === 'family' ? current.route === 'home' ? 'elder-woman' : 'man' : voice;
  if (id === '453752' && current.chapter === 2) role = current.avatar === 'girl' ? 'girl' : 'boy';
  if (id === '113' && current.direction === 'research') role = 'elder-man';
  return `mandarin/line-${id}-${role}.flac`;
}

function playMandarinLesson(...ids) {
  const files = ids.map(id => mandarinPhraseFile(String(id), game));
  if (mandarinMode && files.length && files.every(Boolean)) playVoiceFiles(files);
}

function mandarinListeningButton(id, label) {
  return button(label, 'mandarin-lesson-audio', id);
}

function mandarinTranscript(id, label) {
  return `${mandarinListeningButton(id, label)}<details class="clue-transcript"><summary>查看文字線索</summary><p>「${mandarinPhraseBank[id][0]}」</p></details>`;
}

const mandarinCareerTitles = {
  teaching: '語言與文化老師', outreach: '語言推廣人員', preschool: '教保員', caregiver: '一般型保母',
  adult: '成人語言講師', research: '語言學研究與教學',
};

function careerTitle(id) {
  return (mandarinMode ? mandarinCareerTitles : careerTitles)[id];
}

function storyCopy(text) {
  if (!mandarinMode) return text;
  return text.replaceAll('核對中文譯文', '核對訪談摘要')
    .replaceAll('太魯閣語原文和中文譯文', '錄音逐字稿和訪談摘要')
    .replaceAll('把原句與中文譯文並排留下', '把原句和摘要並排留下')
    .replaceAll('確認後把兩種文字放在同一筆資料', '確認後把原句和摘要放在同一筆資料')
    .replaceAll('把問句和回答各自對上中文', '把問句和回答各自對上錄音')
    .replaceAll('中文譯文', '對話摘要').replaceAll('中文卡', '摘要卡').replaceAll('走訪會說族語的家庭', '走訪使用生活語句的家庭')
    .replaceAll('太魯閣語', '華語').replaceAll('族語力', '表達力')
    .replaceAll('族語家庭', '家庭').replaceAll('族語老師', '語言與文化老師')
    .replaceAll('族語保母', '保母').replaceAll('族語教保', '教保')
    .replaceAll('族語教學', '語言與文化教學').replaceAll('族語試教', '語言與文化試教')
    .replaceAll('族語', '華語').replaceAll('雙語草稿', '錄音對照草稿')
    .replaceAll('雙語稿', '錄音對照稿').replaceAll('雙語資料', '錄音對照資料').replaceAll('雙語語料', '訪談語料')
    .replaceAll('雙語翻譯', '摘要整理');
}
