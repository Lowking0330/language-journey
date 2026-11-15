const lecturerTrukuPhrases = Object.fromEntries([
  [1603, 'Hciaw su kari hug?', 16],
  [1604, 'Iq wa!', 16],
  [1610, 'Strung ta siida da!', null],
  [583004, 'Niqan jiyax su sayang hug?', 36902],
  [583007, 'Niqan daun mu ka sayang. Pxal da wa.', 36902],
  [583008, 'Niqan jiyax su ka saman hug? babaw kndeaxan mowsa ku miing sunan.', 36902],
  [583009, 'Iq, tgaun misu sapah.', 36902],
  [892909, 'Pprngaw ta babaw kndaxan saman hug?', 63618],
  [892910, 'Duwa! strung ta inu?', 63618],
].map(([id, indigenous, lesson]) => [id, {
  indigenous,
  ...(lesson ? { url: lesson === 16 ? 'https://web.klokah.tw/extension/con_practice/index.php?d=33&l=16&view=dialogue'
    : `https://web.klokah.tw/text/read.php?tid=${lesson}` } : {}),
  file: id === 583009 ? 'truku-release/583009-v2.flac' : `truku-release/${id}.flac`,
}]));

const lecturerPractice = {
  city: [
    { title: '電話找不到人', prompt: '下班後，阿岑模擬打電話請人轉告。聽他說，再選出電話另一端該做的事。', audio: 1603, options: [['確認明天在哪裡見面', 26], ['幫他留言', 24], ['先掛電話', 29]], order: [1], review: [1603], translations: ['可以幫我留言嗎？'], result: '阿岑聽見對方準備記下來，才知道自己的話有被聽懂。' },
    { title: '留言要怎麼接', prompt: '兩位學員輪流扮演來電和接聽的人。把請對方留言、答應幫忙兩句排好。', options: [1604, 1603], order: [1, 0], review: [1603, 1604], translations: ['可以幫我留言嗎？', '可以。'], sequence: true, result: '兩人把電話接完，第二輪交換角色，阿岑改當接電話的人。' },
    { title: '下班後是幾時見', prompt: '聽學員傳來的語音，把他提出的見面時段記在行事曆上。', audio: 892909, options: [['今天下午', 24], ['明天早上', 27], ['明天下午', 26]], order: [2], review: [892909], translations: ['我和您約明天下午好嗎？'], result: '阿岑用自己的話確認時間。搭檔看了一眼行事曆，點了點頭。' },
    { title: '確認地點再出發', prompt: '對方才說了見面時間。選一句表示可以、再問在哪裡碰面。', audio: 892909, options: [892910, 1603, 1610], order: [0], review: [892909, 892910], translations: ['我和您約明天下午好嗎？', '可以，我們約哪裡見面？'], result: '班上的新學員把時間和地點分開記，這一回兩項都問清楚了。' },
    { title: '把邀約排成一段話', prompt: '阿岑要帶新人練一通邀約電話。先提議時間，再確認地點，最後用告別句收尾。', options: [1610, 892910, 892909], order: [2, 1, 0], review: [892909, 892910, 1610], sequence: true, result: '阿岑用手指著下一張卡，等新人把話說完，再換他接電話。' },
    { title: '今晚換他自己打', prompt: '阿岑打給家人，時間地點都確認好了。從三張卡找出適合在掛電話前說的一句。', options: [1603, 1610, 583004], order: [1], review: [1610], translations: ['那到時候見了。'], result: '阿岑放下手機，說明晚想自己再打一次。這次他沒有等你先開口。' },
  ],
  home: [
    { title: '問家人今天有沒有空', prompt: '阿岑想約長輩見面。聽完他的第一句，再選出這一句要先確認的事。', audio: 583004, options: [['今天有沒有空', 24], ['明天要在哪裡見面', 26], ['能不能幫忙留言', 27]], order: [0], review: [583004], translations: ['你今天有空嗎？'], result: '你把這個問題記在練習卡上。阿岑試著把它用在自己的來電。' },
    { title: '今天不方便就改天', prompt: '聽完兩段，再選出對方今天為什麼約不成。', audio: 583004, replyAudio: 583007, options: [['他在家等阿岑', 29], ['他今天有事，改天再約', 24], ['他答應明天下午見', 26]], order: [1], review: [583004, 583007], translations: ['你今天有空嗎？', '我今天有事不在家。改天吧。'], result: '阿岑聽出對方是想改天，他留住話筒，準備接著問另一個時間。' },
    { title: '把時間改到明天', prompt: '長輩今天有事。挑一句問他明天有沒有空，並提議下午去找他。', audio: 583007, options: [583009, 1603, 583008], order: [2], review: [583007, 583008], translations: ['我今天有事不在家。改天吧。', '那你明天有空嗎？我下午去找你。'], result: '阿岑用新時間接了下去。搭檔把「明天下午」圈了起來。' },
    { title: '聽完再寫地址欄', prompt: '聽台詞，選出對方到時要在哪裡等阿岑。', audio: 583009, options: [['在家裡', 19], ['在學校門口', 20], ['在郵局前面', 26]], order: [0], review: [583009], translations: ['可以，我在家等你。'], result: '阿岑把「在家」寫進約訪卡，再和同桌核對一次。' },
    { title: '請阿岑帶著排一通電話', prompt: '新人把改約的台詞順序打亂了。依序排出今天有事、提議明天下午、在家等。', options: [583009, 583008, 583007], order: [2, 1, 0], review: [583007, 583008, 583009], sequence: true, result: '阿岑讓新人自己排完，再和他各讀一個角色。' },
    { title: '把最後一句留給阿岑', prompt: '阿岑真的打給長輩了。長輩說在家等他，選一句能把這通電話收好。', audio: 583009, options: [583004, 1610, 1603], order: [1], review: [1610], translations: ['那到時候見了。'], result: '阿岑掛斷電話，笑著把明天下午寫在行事曆上。' },
  ],
};
