const backupDialog = document.querySelector('#save-backup');
const backupMode = document.querySelector('#backup-mode');
const backupStatus = document.querySelector('#backup-status');
const backupFile = document.querySelector('#backup-file');
const backupApply = document.querySelector('#backup-apply');
let pendingBackup;
let backupSelection = 0;

function backupStorageKey(mode) {
  return mode === 'mandarin' ? 'language-journey-mandarin' : 'language-graduation-preview-1';
}

function clearPendingBackup() {
  backupSelection++;
  pendingBackup = null;
  backupApply.hidden = true;
  backupFile.value = '';
  backupStatus.textContent = '';
}

function openSaveBackup() {
  clearPendingBackup();
  backupMode.value = mandarinMode ? 'mandarin' : 'bilingual';
  backupMode.disabled = requestedMode === 'mandarin' || requestedMode === 'bilingual';
  document.querySelector('#backup-scope').textContent = '備份旅程進度和結局圖鑑。雙語版也包含成長手帳。';
  backupDialog.showModal();
}

function downloadSaveBackup() {
  clearPendingBackup();
  try {
    const mode = backupMode.value;
    const save = JSON.parse(localStorage.getItem(backupStorageKey(mode)));
    if (!save) {
      backupStatus.textContent = '這個版本目前沒有可匯出的紀錄。';
      return;
    }
    if (mode === 'bilingual') save.notebook = mergeTrukuNotebook(save.notebook, save.game);
    const file = { format: 'language-journey-save', version: 1, mode, save };
    const url = URL.createObjectURL(new Blob([JSON.stringify(file, null, 2)], { type: 'application/json' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `族語の夢-${mode}-${new Date().toISOString().slice(0, 10)}.json`;
    backupDialog.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
    backupStatus.textContent = '已送出下載，可在手機的下載資料夾找存檔。';
  } catch {
    backupStatus.textContent = '讀取存檔失敗，請再試一次。';
  }
}

function validateBackup(data, mode) {
  const invalid = () => { throw new Error('存檔內容有誤，請選擇本遊戲匯出的 JSON 檔。'); };
  const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);
  const between = (value, min, max) => Number.isInteger(value) && value >= min && value <= max;
  function checkValue(value, depth = 0) {
    if (depth > 10) invalid();
    if (typeof value === 'string' && (value.length > 2000 || /[<>"&]/.test(value))) invalid();
    if (typeof value === 'number' && !Number.isFinite(value)) invalid();
    if (Array.isArray(value)) value.forEach(item => checkValue(item, depth + 1));
    if (record(value)) {
      for (const [name, field] of Object.entries(value)) {
        if (['__proto__', 'prototype', 'constructor'].includes(name)) invalid();
        checkValue(field, depth + 1);
      }
    }
  }
  if (!record(data) || data.format !== 'language-journey-save' || data.version !== 1 || !record(data.save)) invalid();
  if (data.mode !== mode) throw new Error('這份存檔屬於另一個版本，請切換到對應版本再匯入。');
  const save = data.save;
  const journey = save.game;
  const validBadges = Object.keys(paths).flatMap(routeId => [
    ...graduationBadges.map(([id]) => `${routeId}-${id}`),
    ...Object.keys(careerTitles).map(id => `${routeId}-career-${id}`),
  ]);
  if (!Array.isArray(save.album) || !save.album.every(id => validBadges.includes(id))) invalid();
  if (journey !== null) {
    if (!record(journey) || !Object.hasOwn(paths, journey.route) || typeof journey.name !== 'string' || journey.name.length > 18 ||
        !between(journey.chapter, 0, chapters.length) || !between(journey.turn, 0, turnsPerChapter) ||
        !Array.isArray(journey.stats) || journey.stats.length !== attributes.length || !journey.stats.every(Number.isFinite) ||
        (journey.avatar !== undefined && !['boy', 'girl'].includes(journey.avatar)) ||
        (journey.direction !== undefined && !Object.hasOwn(careerStories, journey.direction))) invalid();
    const { name, ...fields } = journey;
    checkValue(fields);
    if (journey.career) {
      const { index, choices } = journey.career;
      const count = careerStories[journey.direction ?? 'teaching'].rounds.length;
      if (!between(index, 0, count) || !Array.isArray(choices) || !between(choices.length, index, Math.min(count, index + 1)) ||
          !choices.every(choice => between(choice, 0, 1))) invalid();
    }
    if (journey.feedback && (!record(journey.feedback) || typeof journey.feedback.name !== 'string' ||
        typeof journey.feedback.text !== 'string' || !Array.isArray(journey.feedback.effect) ||
        !journey.feedback.effect.every(Number.isFinite))) invalid();
    if (journey.truku && (!between(journey.truku.index, 0, trukuStories[journey.route].scenes.length) ||
        !Array.isArray(journey.truku.collected) || !journey.truku.collected.every(id => Object.hasOwn(trukuPhrases, id)))) invalid();
    if (journey.memory !== undefined && !Object.hasOwn(turningPoints[journey.route].options, journey.memory)) invalid();
    if (journey.matchPending && !Array.isArray(journey.schoolMatch?.matched)) invalid();
    if (journey.trial && (!between(journey.trial.index, 0, trials[journey.route].length) ||
        !between(journey.trial.score, 0, 30) || !between(journey.trial.seconds, 0, 30))) invalid();
    if (journey.practice && (!Object.hasOwn(careerPractices, journey.direction) ||
        !between(journey.practice.index, 0, careerPractices[journey.direction].steps.length))) invalid();
    if (journey.outreach && (!Array.isArray(journey.outreach.steps) ||
        !between(journey.outreach.steps.length, 0, journey.ending ? outreachStages.length : outreachStages.length - 1) ||
        !between(journey.outreach.budget, 0, outreachBudget))) invalid();
  }
  return {
    game: journey,
    album: [...new Set(save.album)],
    newAlbumBadges: Array.isArray(save.newAlbumBadges) ? save.newAlbumBadges.filter(id => save.album.includes(id)) : [],
    ...(mode === 'bilingual' ? { notebook: mergeTrukuNotebook(save.notebook, journey) } : {}),
  };
}

async function previewSaveBackup() {
  const file = backupFile.files[0];
  clearPendingBackup();
  if (!file) return;
  const selection = backupSelection;
  const mode = backupMode.value;
  try {
    if (file.size > 256 * 1024) throw new Error('存檔太大，請選擇本遊戲匯出的 JSON 檔。');
    let data;
    try { data = JSON.parse(await file.text()); }
    catch { throw new Error('無法讀取這份 JSON 存檔。'); }
    if (!backupDialog.open || selection !== backupSelection) return;
    const save = validateBackup(data, mode);
    pendingBackup = { mode, save };
    const profile = save.game ? `${save.game.name || '小禾'}・${paths[save.game.route].name}` : '無進行中的旅程';
    backupStatus.textContent = `${profile}，備份內有 ${save.album.length} 個徽章。匯入會取代目前旅程進度，${mode === 'bilingual' ? '手帳和圖鑑' : '圖鑑'}會合併。`;
    backupApply.hidden = false;
  } catch (error) {
    if (selection === backupSelection) backupStatus.textContent = error.message;
  }
}

function importSaveBackup() {
  if (!pendingBackup) return;
  const { mode, save } = pendingBackup;
  const target = backupStorageKey(mode);
  try {
    const previous = JSON.parse(localStorage.getItem(target));
    save.album = [...new Set([...(previous?.album ?? []), ...save.album])];
    save.newAlbumBadges = [...new Set([...(previous?.newAlbumBadges ?? []), ...save.newAlbumBadges])];
    if (mode === 'bilingual') save.notebook = mergeTrukuNotebook(save.notebook, previous?.game, previous?.notebook);
    localStorage.setItem(target, JSON.stringify(save));
  } catch {
    backupStatus.textContent = '無法儲存匯入的紀錄，原有資料仍在。';
    return;
  }
  location.assign(`?mode=${mode}&imported=1`);
}

if (backupDialog) {
  backupDialog.addEventListener('close', clearPendingBackup);
  backupMode.addEventListener('change', clearPendingBackup);
  backupFile.addEventListener('change', previewSaveBackup);
  backupApply.addEventListener('click', importSaveBackup);
  document.querySelector('#backup-download').addEventListener('click', downloadSaveBackup);
  document.querySelector('#backup-select').addEventListener('click', () => backupFile.click());
  document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(location.search);
    if (!params.has('imported')) return;
    params.delete('imported');
    history.replaceState(null, '', `?${params}`);
    openSaveBackup();
    backupStatus.textContent = '匯入完成。關閉後即可繼續旅程。';
  });
}
