const careerMapStops = {
  teaching: [225, 58, '陪孩子在教室裡放心開口。'],
  outreach: [156, 132, '跟長者確認哪些錄音可以留下。'],
  preschool: [213, 180, '讓孩子把一句族語帶進遊戲。'],
  caregiver: [137, 235, '讓接送和家裡都接得上話。'],
  adult: [184, 270, '陪學員把一句邀約用在電話裡。'],
  research: [150, 321, '整理一段訪談，再和說話的人核對。'],
};
const careerMapStarts = { city: [74, 130], home: [288, 238] };
let selectedMapCareer;
let careerMapReturn = 'home';
let careerMapMilestone = 0;

function finishedMapCareers() {
  return Object.keys(careerMapStops).filter(id => Object.keys(paths).some(route => album.includes(`${route}-career-${id}`)));
}

function rememberCareerOrigin() {
  if (!Array.isArray(game.careerOriginStats) || game.careerOriginStats.length !== attributes.length ||
      !game.careerOriginStats.every(Number.isFinite)) game.careerOriginStats = [...game.stats];
}

function rememberCareerEnding(id) {
  const finished = finishedMapCareers();
  const count = finished.length + Number(!finished.includes(id));
  if (count > finished.length && [2, 4, 6].includes(count)) careerMapMilestone = count;
  game.relayEndings ??= {};
  game.relayEndings[id] = game.career.choices.at(-1);
}

function startGraduationDirection(direction) {
  game.direction = direction;
  if (Object.hasOwn(careerPractices, direction)) game.practice = { index: 0, answer: null, score: 0 };
  if (direction === 'outreach') {
    game.outreach = newOutreachPlan();
    game.outreachStoryVersion = 2;
  }
  save();
  render('play');
}

function careerMapAlbumEntry() {
  return `<div class="panel relay-album">${icon(26)}<div><h2>職涯體驗 ${finishedMapCareers().length}／6</h2>
    ${button('打開職涯接力地圖', 'career-map')}</div></div>`;
}

function careerRelayInvites() {
  const finished = finishedMapCareers();
  const next = Object.keys(careerMapStops).filter(id => !finished.includes(id)).slice(0, 2);
  return `<section class="panel relay-invites"><h2>職涯接力・${finished.length}／6</h2>
    ${next.map(id => button(`${icon(careerIcons[id])}<span><strong>${careerTitle(id)}</strong><small>${careerMapStops[id][2]}</small></span>`, 'career-map', id, 'relay-invite')).join('')}
    ${button(finished.length === 6 ? '查看點亮的地圖' : '查看完整地圖 →', 'career-map', '', 'primary')}</section>`;
}

function careerMapView() {
  const finished = finishedMapCareers();
  const currentRoute = game?.route;
  const active = selectedMapCareer;
  const complete = finished.length === 6;
  const journeyReady = Boolean(game?.ending);
  const canSwitch = journeyReady && (!game.career || Boolean(completedCareerBadge(game)));
  const invitations = Object.keys(careerMapStops);
  const nodes = invitations.map(id => {
    const [x, y] = careerMapStops[id];
    const done = finished.includes(id);
    return `<button type="button" class="relay-pin${done ? ' is-lit' : ''}" data-action="career-map-select" data-value="${id}"
      style="--x:${x / 3.6}%;--y:${y / 4}%" aria-pressed="${id === active}" aria-label="${careerTitle(id)}，${done ? '已體驗' : '待體驗'}">
      ${icon(careerIcons[id])}${done ? '<b aria-hidden="true">✓</b>' : ''}</button>`;
  }).join('');
  const starts = Object.entries(careerMapStarts).map(([id, [x, y]]) => `<div class="relay-start${id === currentRoute ? ' is-active' : ''}"
      style="--x:${x / 3.6}%;--y:${y / 4}%">${icon(paths[id].icon)}<span>${paths[id].name}</span></div>`).join('');
  const roads = Object.entries(careerMapStops).map(([id, [x, y]]) => Object.entries(careerMapStarts).map(([route, [sx, sy]]) => {
    const lit = album.includes(`${route}-career-${id}`);
    if (!lit && route !== (currentRoute ?? 'city')) return '';
    const bend = route === 'city' ? 102 : 252;
    return `<path class="relay-road${lit ? ' is-lit' : ''}" d="M${sx},${sy} Q${bend},${y} ${x},${y}"/>`;
  }).join('')).join('');
  const lastChoice = active && game?.relayEndings?.[active];
  const savedEnding = lastChoice === 0 || lastChoice === 1;
  const matchingRoute = active && (album.includes(`${currentRoute}-career-${active}`)
    ? currentRoute : Object.keys(paths).find(id => album.includes(`${id}-career-${active}`)));
  const invitation = active ? `<section class="panel relay-detail" aria-live="polite"><h2>${careerTitle(active)}</h2><p>${careerMapStops[active][2]}</p>
    ${matchingRoute ? `<details><summary>回看${paths[matchingRoute].name}職涯結局</summary>
      ${savedEnding && matchingRoute === currentRoute ? `<p>${careerStories[active].rounds.at(-1)[2 + lastChoice][1]}</p>` : ''}
      <p>${careerStories[active].closing[matchingRoute === 'city' ? 0 : 1]}</p></details>` : ''}
    ${canSwitch ? button(finished.includes(active) ? '再走一次這條職涯 →' : '接棒・前往畢業分流 →', 'career-map-start', active, 'primary')
      : `<p>${journeyReady ? '完成目前的職涯後，就可以接棒。' : '先完成第一次畢業分流，就能沿用同一角色接棒。'}</p>`}</section>` : '';
  return `${banner(`職涯體驗 ${finished.length}／6`, '職涯接力地圖')}
    <section class="relay-map${careerMapMilestone ? ' has-milestone' : ''}" aria-label="台灣輪廓與六種職涯">
      <svg class="relay-island" viewBox="0 0 360 400" aria-hidden="true">
        <defs>
          <linearGradient id="relay-land" x2="0" y2="1"><stop stop-color="#f0e3a7"/><stop offset="1" stop-color="#a6c88c"/></linearGradient>
          <!-- Taiwan main island outline simplified from Natural Earth 1:50m. -->
          <path id="relay-shape" d="M191,304 180,330 174,379 165,375 159,367 158,354 149,332 123,312 115,294 107,266 100,254 99,248 106,221 104,207 105,194 153,105 174,79 194,46 225,33 234,23 240,20 248,20 257,30 273,38 278,44 280,52 273,61 270,68 271,99 262,126 252,143 250,151 236,218 229,245 219,267 205,288Z"/>
          <clipPath id="relay-clip"><use href="#relay-shape"/></clipPath>
        </defs>
        <use href="#relay-shape" class="relay-coast"/>
        <g clip-path="url(#relay-clip)" class="relay-terrain">
          <path d="M264,47 Q249,113 223,162 T192,266 T163,365"/>
          <path d="M277,59 Q259,126 233,170 T203,277 T172,371"/>
          <path d="M249,42 Q229,101 206,153 T177,250 T151,345"/>
          <path d="M230,52 Q210,112 187,152 T164,239 T144,327"/>
        </g>
        <g>${roads}</g>
      </svg>
      ${starts}${nodes}
      ${complete ? '<p class="relay-finale">語你成長</p>' : ''}
    </section>
    ${invitation}
    <div class="actions">${button('返回上一頁', 'career-map-back')}</div>`;
}

const careerMapActions = {
  'career-map': id => {
    if (mandarinMode) return;
    careerMapReturn = screen;
    selectedMapCareer = Object.hasOwn(careerMapStops, id) ? id : undefined;
    render('careerMap');
    if (careerMapMilestone) careerMapMilestone = 0;
  },
  'career-map-select': id => {
    if (mandarinMode || screen !== 'careerMap' || !Object.hasOwn(careerMapStops, id)) return;
    selectedMapCareer = id;
    render('careerMap', 'none');
    main.querySelector('.relay-detail h2')?.scrollIntoView({ block: 'nearest' });
    main.querySelector('.relay-pin[aria-pressed="true"]')?.focus({ preventScroll: true });
  },
  'career-map-back': () => {
    if (screen === 'careerMap') render(careerMapReturn);
  },
  'career-map-start': id => {
    if (mandarinMode || screen !== 'careerMap' || !game?.ending || (game.career && !completedCareerBadge(game)) ||
        !Object.hasOwn(careerMapStops, id)) return;
    rememberCareerOrigin();
    if ((game.direction ?? 'teaching') === 'teaching' && game.teacherPracticeDone?.includes(1)) game.teacherDialogueCompleted = true;
    delete game.ending;
    delete game.direction;
    delete game.focus;
    delete game.trial;
    delete game.practice;
    delete game.outreach;
    delete game.outreachStoryVersion;
    delete game.epilogueChoice;
    delete game.career;
    for (const field of Object.keys(game)) {
      if (field.endsWith('PracticeDone') || field.endsWith('PracticeStep')) delete game[field];
    }
    game.stats = [...game.careerOriginStats];
    game.chapter = chapters.length;
    startGraduationDirection(id);
  },
};
