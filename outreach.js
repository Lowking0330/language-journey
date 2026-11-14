const outreachStages = [
  {
    title: '安排長者訪談',
    choices: [
      ['先確認訪談時間、主題與錄音用途', 3, 2, '長者挑了想說的主題，也說明哪些段落可以錄下來。'],
      ['與長者先約短訪，見面再逐項確認', 2, 1, '你留下充裕的時間向長者確認錄音與使用方式。'],
      ['先請家人引介，這次只談訪談意願', 1, 0, '你只記下聯絡安排，等長者有意願再進行採集。'],
    ],
  },
  {
    title: '記下族語家庭怎麼用',
    choices: [
      ['跟家人分別確認用語的場合和對象', 3, 2, '家庭成員分別說明平常何時使用這句話，你把差異記了下來。'],
      ['和家人一起記下一個生活情境', 2, 1, '你記下說話的人、對象和當時在做什麼。'],
      ['請家人先選想分享的一句', 1, 0, '家人挑出一句平常會說的話，其他內容先留在家裡。'],
    ],
  },
  {
    title: '整理標註與雙語草稿',
    choices: [
      ['同步核對錄音、逐字稿與中文譯文', 2, 2, '你把逐字稿和中文譯文並排，請說話者確認意思與可使用範圍。'],
      ['先標記片段與情境，再約時間校對譯文', 2, 1, '你整理出對照草稿，並把待校對的部分標清楚。'],
      ['先交回訪談清單，保留待確認欄位', 1, 0, '你把已確認與待核對的資料標開，方便下一次回訪。'],
    ],
  },
];

const outreachBudget = 6;

function outreachChoices() {
  const step = game.outreach.steps.length;
  const choices = outreachStages[step]?.choices;
  if (step !== 1 || game.observation !== 'community') return choices;
  const [[, , score, response], ...others] = choices;
  return [['用訪視筆記核對家庭成員與用語情境', 2, score, response], ...others];
}

function outreachView() {
  const plan = game.outreach;
  const { title } = outreachStages[plan.steps.length];
  const choices = outreachChoices();
  const remaining = outreachStages.length - plan.steps.length - 1;
  const options = choices.map(([label, cost], index) =>
    `<button type="button" class="lesson" data-action="outreach-step" data-value="${index}" ${plan.budget < cost + remaining ? 'disabled' : ''}>${storyCopy(label)}・${cost} 點</button>`).join('');
  const context = game.route === 'city'
    ? '阿瑩介紹一戶住在都會的族語家庭。你要訪問長者，記錄家人平常怎麼使用太魯閣語。'
    : '阿青帶你拜訪熟悉舊路的長者。你要記錄沿路的故事，以及家人談起這段路時怎麼使用太魯閣語。';
  return `${banner('22 歲・語推人員', storyCopy(title))}
    <section class="panel challenge-meta"><div><strong>訪談計畫 ${plan.steps.length + 1}／${outreachStages.length}</strong><strong>準備時間 ${plan.budget}／${outreachBudget} 點</strong></div>
      <progress max="${outreachBudget}" value="${plan.budget}" aria-label="剩餘準備時間"></progress></section>
    <section class="panel"><p>${storyCopy(context)}</p><p class="trial-rule">每個後續步驟至少要保留 1 點準備時間。</p>
      ${plan.feedback ? `<div class="feedback event-icon" role="status">${icon(observationIcons.community)}<p>${storyCopy(plan.feedback)}</p></div>` : ''}
      ${plan.steps.length === 1 && game.observation === 'community' ? '<p class="trial-rule">見習的訪視筆記可以節省 1 點準備時間。</p>' : ''}
      <div class="lesson-list">${options}</div></section>`;
}

function selectOutreachStep(index) {
  const plan = game.outreach;
  if (!plan || game.ending) return;
  const choice = outreachChoices()?.[index];
  if (!choice) return;
  const [, cost, score, response] = choice;
  const remaining = outreachStages.length - plan.steps.length - 1;
  if (plan.budget < cost + remaining) return;
  plan.budget -= cost;
  plan.reach += score;
  plan.steps.push(index);
  plan.feedback = response;
  if (remaining === 0) {
    const readiness = game.stats.slice(1).filter(value => value >= 22).length;
    const result = plan.reach + readiness >= 6 ? 'recurring' : 'pilot';
    recordGraduation(result, `${game.route}-outreach-${result}`);
    return;
  }
  save();
  render('play');
  gameAudio.play('gain');
}

function outreachEndingView() {
  const plan = game.outreach;
  const complete = game.ending === 'recurring';
  const title = plan.version !== 2 ? '完成語言推廣畢業任務' : complete ? '完成訪談與語料整理' : '完成初步訪查';
  const next = complete ? '你帶著初次整理的資料，準備接手更多家庭訪視。' : '你把待回訪的項目記了下來，接著從一段訪談開始。';
  return `${banner('22 歲・語推人員畢業去向', title)}
    <section class="panel ending">${icon(careerIcons.outreach)}<h2>${escapeText(game.name)}，畢業了！</h2>
      ${plan.version === 2 ? `<p>${storyCopy(plan.feedback)}</p>` : ''}<p>${next}</p>
      ${graduationActions()}
    </section>`;
}

function newOutreachPlan() {
  return { version: 2, budget: outreachBudget, reach: 0, steps: [] };
}

function migrateOutreach(current) {
  if (current?.direction !== 'outreach') return;
  if (!current.ending && current.outreach?.version !== 2) current.outreach = newOutreachPlan();
  if (current.outreachStoryVersion === 2) return;
  current.outreachStoryVersion = 2;
  delete current.outreachPracticeStep;
  const index = current.career?.index;
  if (Number.isInteger(index) && index < careerStories.outreach.rounds.length) {
    // Keep finished rounds and clear the current decision, which belongs to the old scene.
    current.career.choices = current.career.choices.slice(0, index);
    current.outreachPracticeDone = (current.outreachPracticeDone ?? []).filter(round => round <= index);
  } else if (!current.career) {
    delete current.epilogueChoice;
    delete current.outreachPracticeDone;
  }
}
