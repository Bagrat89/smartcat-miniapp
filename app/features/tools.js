export function generateQR(tg) {
  const text = document.getElementById('qr-input').value.trim();
  if (!text) return tg.showAlert('Введите текст или ссылку');
  const container = document.getElementById('qr-result');
  container.innerHTML = '';
  const img = document.createElement('img');
  img.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;
  img.style = 'border-radius:8px;border:2px solid #00f0ff;';
  container.appendChild(img);
}

export async function translateText(tg) {
  const text = document.getElementById('trans-input').value.trim();
  const source = document.getElementById('trans-from').value;
  const target = document.getElementById('trans-to').value;
  const result = document.getElementById('trans-result');
  if (!text) return tg.showAlert('Введите текст для перевода');
  result.textContent = 'Перевод...';
  try {
    const langpair = `${source === 'auto' ? 'ru' : source}|${target}`;
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langpair}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.responseStatus === 200) {
      result.textContent = data.responseData.translatedText;
    } else {
      result.textContent = 'Ошибка перевода. Попробуйте позже.';
    }
  } catch {
    result.textContent = 'Сервис недоступен. Попробуйте позже.';
  }
}
