let historyStack = ['main'];

export function showPage(pageId, loadCryptoRates, renderDiary) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  historyStack.push(pageId);
  if (pageId === 'crypto') loadCryptoRates();
  if (pageId === 'diary') {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('diary-date').value = today;
    renderDiary();
  }
}

export function goBack(tg) {
  if (historyStack.length > 1) {
    historyStack.pop();
    const prev = historyStack[historyStack.length - 1];
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(prev).classList.add('active');
  } else {
    tg.close();
  }
}
