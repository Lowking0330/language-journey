const observationIcons = { community: 42, preschool: 43, teaching: 28, caregiver: 44, adult: 45, research: 46 };

const observations = {
  community: {
    name: '跟語推人員走訪社區', art: 5, reward: '族語家庭訪視筆記',
    preview: '畢業訪視時，可以用筆記核對家人用語，少花 1 點準備時間。',
    story: {
      city: '你跟阿予走訪一戶族語家庭。家長說，自己和孩子通常在晚飯時用太魯閣語。你記下用語的對象和場合，請家人確認。',
      home: '你跟阿青拜訪熟悉舊路的長者。長者願意錄下常走的路，另外兩段只想聊聊。你請他確認同意錄音的範圍。',
    },
  },
  preschool: {
    name: '到幼兒園觀察族語活動', art: 6, reward: '手勢觀察筆記',
    preview: '將來帶教保活動時，可以用圖卡讓孩子接話。',
    story: {
      city: '你在都會幼兒園看到一個孩子指著杯子。教保員把杯子和「再一點」的圖卡放在一起，等孩子先指，再試一句。',
      home: '你跟教保員進到家鄉的幼兒園。孩子指著水壺，你看見教保員蹲下來，用杯子和圖卡陪孩子輪流表達。',
    },
  },
  teaching: {
    name: '跟族語老師進班觀課', art: 4, reward: '同伴互問教案',
    preview: '畢業試教時，可以帶一輪有提示的同伴問答。',
    story: {
      city: '佳芸老師請學生用相片問同桌家裡怎麼稱呼親人。她先讓兩人小聲試，再換搭檔。你記下兩輪問答的步驟。',
      home: '佳芸老師用學校旁的路口帶學生練問路。學生先指路，再換手用族語問方向。你把這個做法寫成小教案。',
    },
  },
  caregiver: {
    name: '跟資深族語保母看接送交接', art: 7, reward: '家庭交接小卡',
    preview: '托育任務中，可以幫家人挑一個每天做得到的練習時段。',
    story: {
      city: '你跟資深族語保母秀姨看家人來接孩子。爸爸下班晚，照顧者便把今天用過的問句和睡前建議寫在一張小卡上。',
      home: '你在家鄉跟秀姨見習，看她和家人交換孩子今天聽懂的話。家人把自己常用的招呼也補上小卡。',
    },
  },
  adult: {
    name: '旁聽成人族語共學班', art: 8, reward: '重聽提示卡',
    preview: '成人教學任務中，可以讓學員練習主動確認漏聽的內容。',
    story: {
      city: '晚班學員用電話練習約時間。有人漏聽時，講師讓他挑一張提示卡問回去，再換一個人接電話。',
      home: '共學班有人想用族語約家人吃飯。講師請同伴故意改時間，讓學員用提示卡把改動問清楚。',
    },
  },
  research: {
    name: '跟語言研究團隊整理資料', art: 9, reward: '錄音使用紀錄表',
    preview: '研究專題中，可以直接用表格確認哪些錄音可供共學。',
    story: {
      city: '研究團隊在共學教室示範怎麼記錄錄音用途。你看到同意課堂播放的人，也可以保留是否同意公開的決定。',
      home: '你跟研究團隊回到社區，請說話者逐段確認哪些錄音可以分享。你抄下表格上的用途和核對欄位。',
    },
  },
};

function observationView() {
  const picked = observations[game.observation];
  const options = Object.entries(observations).map(([id, item]) =>
    button(`${icon(observationIcons[id])}<span class="activity-copy"><strong>${storyCopy(item.name)}</strong><small>${storyCopy(item.preview)}</small></span>`,
      'choose-observation', id, 'activity')).join('');
  return `${banner('15–18 歲・職涯見習', '你想跟誰見習一天？')}
    <section class="panel">
      ${picked ? `<div class="memory-note" tabindex="-1">${icon(observationIcons[game.observation])}<div><strong class="reward-token">取得${storyCopy(picked.reward)}</strong>
        <p>${storyCopy(picked.story[game.route])}</p><small>${storyCopy(picked.preview)}</small></div></div>`
        : `<p>${storyCopy('學校安排了一天校外見習。挑一個地方，看看大家怎麼在工作裡用族語。')}</p>
          <div class="lesson-list">${options}</div>`}
    </section>
    ${picked ? `<div class="actions">${button('前往 19–22 歲 →', 'advance', '', 'primary')}</div>` : ''}`;
}
