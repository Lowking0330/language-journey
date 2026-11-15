const researchTrukuPhrases = Object.fromEntries([
  [583010, 'Tduwa ku meangal kari mangal ka sunan hug? kmspatas mu.', 36902],
  [583011, 'Iq, tduwa.', 36902],
  [583016, 'Mhuway su balay, sruwa su psiling knan.', 36902],
  [892921, 'Mkla su bi tminun, Ima ka cmisa sunan.', 63618],
  [892922, 'Payi mu, hiya ka mkla bi tminun alang nami.', 63618],
  [892923, 'Ma su kmsluhay tminun?', 63618],
  [892924, 'Tminun o kndsan nami, ptlutut ku kndsan.', 63618],
  [552810, 'Dalih bi ka hnthyaqan pyaan tdruy ni ptasan hug?', 35515],
].map(([id, indigenous, lesson]) => [id, {
  indigenous, url: `https://web.klokah.tw/text/read.php?tid=${lesson}`, file: id === 892923 ? 'truku-release/892923-v2.flac' : `truku-release/${id}.flac`,
}]));

const researchPractice = {
  city: [
    { title: '訪談前先確認可以錄音', prompt: '林阿姨準備談她怎麼學織布。從原文選出能先詢問錄音意願的完整句子。她對公開播放另有自己的決定。', options: [892921, 583010, 583016], order: [1], review: [583010, 583011], translations: ['請問我可以錄音嗎？我想做紀錄。', '好啊，沒有問題。'], result: '林阿姨同意錄音。你記下這次的許可，等她聽過片段再談能否公開。' },
    { title: '比對訪談者問的是哪件事', prompt: '同一場訪談有兩段提問。兩段都談織布。聽完後，依播放順序選出兩段問話的標籤。', audio: 892921, replyAudio: 892923, audioLabels: ['▶ 聽第一段', '▶ 聽第二段'], options: [['學習動機', 27], ['傳授者', 5], ['見面地點', 26]], order: [1, 0], review: [892921, 892923], result: '兩段都談織布，但你標出了兩個不同的問題。回查時能分別找到傳授者和學習動機。' },
    { title: '查找文化傳承的例句', prompt: '學生正在找能說明「為什麼想學織布」的回答。聽問題，從整句資料卡找出談延續文化的那一筆。', audio: 892923, options: [892922, 116, 892924], order: [2], review: [892923, 892924], translations: ['你怎麼會想要學織布？', '織布是我們的文化，我想要讓文化延續。'], result: '你把原句、譯意和提問一起留在資料卡上，學生知道它出現在哪段談話。' },
    { title: '把聲音連回正確的逐字稿', prompt: '林阿姨請你重聽回答。從三張完整原句選出錄音裡實際說的那一筆。', audio: 892922, options: [892922, 892924, 104], order: [0], review: [892922], translations: ['是我的奶奶，她是我們部落最會織布的人。'], result: '你對回原句，也把「奶奶教我」和另一段談文化的答覆分開。' },
    { title: '共讀材料交出去之前', prompt: '林阿姨核准了「織布是我們的文化」這一段供共讀。選出可交給學生的版本。', options: [['整份未確認錄音', 24], ['說話者確認的片段、原文與出處', 25], ['只有譯文的未確認草稿', 27]], order: [1], review: [892924], result: '你把確認過的原文和來源留在同一頁，也照林阿姨的決定保留其他段落。' },
    { title: '把提問交給下一位學生', prompt: '新人想做一張共讀卡。先放「是誰教你織布」的問句，再放說話者的完整回應。', options: [892922, 892923, 892921], order: [2, 0], review: [892921, 892922], sequence: true, result: '新人把問和答一起聽完，跟林阿姨約好先把共讀卡拿回來給她看。' },
  ],
  home: [
    { title: '分開記錄與分享的範圍', prompt: '長者同意把舊路故事錄下來，這次只留給家人。先選他現在同意的用途，再標上日後公開前要做的事。', options: [['公開前再向說話者確認', 25], ['現在就上傳整段錄音', 24], ['留給家人聽', 19]], order: [2, 0], review: [], result: '你把兩項記在不同欄位。長者看完，才點頭讓訪談繼續。' },
    { title: '分辨問位置和問距離', prompt: '先聽兩個太魯閣語問句。依播放順序選出它們各自在問什麼。', audio: 122, replyAudio: 552810, audioLabels: ['▶ 聽第一句', '▶ 聽第二句'], options: [['學校和車站近不近', 24], ['學校在哪裡', 20], ['要不要去菜園', 14]], order: [1, 0], review: [122, 552810], translations: ['學校在哪裡？', '學校離車站很近嗎？'], result: '同樣談到學校，你把詢問地點和詢問距離分開記。' },
    { title: '同樣問遠近，地點不同', prompt: '先聽一個教材問句。下列哪個完整原句也是在問兩地遠近，但另一個地點是郵局？', audio: 552810, options: [122, 111, 115], order: [2], review: [552810, 115], translations: ['學校離車站很近嗎？', '郵局離學校近嗎？'], result: '你把兩個例句並排，讓學生看見相似的問法出現在不同地點組合。' },
    { title: '重聽長者說的那一筆', prompt: '學生分不清錄音是在問去哪裡，還是在問把東西放哪裡。聽完，找出和錄音對得上的逐字稿。', audio: 113, options: [122, 113, 111], order: [1], review: [113, 114], translations: ['你放在哪裡呢？', '放在犁耙旁邊。'], result: '你把筆記接回工具位置那段，讓學生重聽對方怎麼回答。' },
    { title: '請說話者先看過資料卡', prompt: '阿青畫了新版手繪圖，林阿姨想先確認地點和她的說法。選出適合請她核對的材料。', options: [['對過錄音的草稿、原文和手繪圖', 26], ['只留改寫後的族語', 25], ['直接寄出未核對的片段', 24]], order: [0], review: [114], result: '林阿姨把圖拉近，補上她小時候走過的那條路。你把補充和教材例句分開記好。' },
    { title: '在訪談尾聲道謝', prompt: '年輕人依長者的意思把資料放回桌上。選出訪談結束時適合謝謝對方的一整句。', options: [583010, 583016, 892921], order: [1], review: [583016], translations: ['謝謝你讓我訪問。'], result: '年輕人說完沒有急著收東西。林阿姨指向窗外那個轉角，準備接著講。' },
  ],
};
