export function saveDiary(tg, renderDiary) {
  const date = document.getElementById('diary-date').value;
  const timeVal = document.getElementById('diary-time').value;
  const text = document.getElementById('diary-text').value.trim();
  if (!text) return tg.showAlert('Введите текст заметки');
  if (!date) return tg.showAlert('Укажите дату');
  // Сохраняем локально для отображения
  const entries = JSON.parse(localStorage.getItem('diary') || '[]');
  const id = Date.now();
  entries.unshift({ date, time: timeVal, text, id });
  localStorage.setItem('diary', JSON.stringify(entries));
  document.getElementById('diary-text').value = '';
  renderDiary();
  // Если указано время — отправляем напоминание боту
  if (timeVal) {
    const remind_at = Math.floor(new Date(`${date}T${timeVal}:00`).getTime() / 1000);
    const now = Math.floor(Date.now() / 1000);
    if (remind_at > now) {
      tg.sendData(JSON.stringify({
        action: 'diary',
        sub: 'add_reminder',
        text: text,
        remind_at: remind_at
      }));
    } else {
      tg.showAlert('⚠️ Указанное время уже прошло. Заметка сохранена без напоминания.');
    }
  }
}

export function renderDiary() {
  const entries = JSON.parse(localStorage.getItem('diary') || '[]');
  const list = document.getElementById('diary-list');
  if (!entries.length) {
    list.innerHTML = '<div style="color:#888;text-align:center;">Заметок пока нет</div>';
    return;
  }
  list.innerHTML = entries.map(e =>
    `<div style="padding:8px;border-radius:8px;border:1px solid #333;background:#0d0d1f;">
      <div style="color:#00f0ff;font-size:12px;">${e.date || '—'} ${e.time ? '🔔 ' + e.time : ''}</div>
      <div style="color:#fff;margin-top:4px;">${e.text}</div>
      <button onclick="deleteDiary(${e.id})"
        style="margin-top:6px;padding:3px 10px;border-radius:6px;background:transparent;border:1px solid #f00;color:#f00;cursor:pointer;font-size:12px;">
        Удалить
      </button>
    </div>`
  ).join('');
}

export function deleteDiary(id, renderDiary) {
  let entries = JSON.parse(localStorage.getItem('diary') || '[]');
  entries = entries.filter(e => e.id !== id);
  localStorage.setItem('diary', JSON.stringify(entries));
  renderDiary();
}
