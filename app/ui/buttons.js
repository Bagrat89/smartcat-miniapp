export function initButtonHandlers(tg, handlers) {
  const { goBack, showPage } = handlers;

  document.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;

      if (action === 'back') {
        goBack();

      } else if (action === 'go-to-bot') {
        tg.close(); setTimeout(() => { window.open('https://t.me/Alicesmartcat_bot', '_blank'); }, 200);

      } else if (action === 'go-to-features') {
        showPage('features');

      } else if (action === 'go-to-apk') {
        tg.openLink('https://smartcat-miniapp.vercel.app/apk.html');

      } else if (action === 'go-to-game') {
        tg.openLink('https://smartcat-miniapp.vercel.app/game.html');

      } else if (action === 'go-to-market') {
        showPage('market');

      } else if (action === 'go-to-stickers') {
        tg.openTelegramLink('https://t.me/addstickers/AliceSmartCat');

      } else if (action === 'go-to-socials') {
        showPage('socials');

      } else if (action === 'go-to-donate') {
        showPage('donate');

      } else if (action === 'go-to-services') {
        showPage('services');

      } else if (action === 'go-to-partners') {
        showPage('partners');

      } else if (action === 'go-to-payment') {
        const product = btn.dataset.product;
        const title = product === 'alice' ? 'Алиса ИИ безлимит' : 'Личный ИИ бот';
        document.getElementById('payment-title').textContent = 'Оплата: ' + title;
        showPage('payment');

      } else if (action === 'pay-crypto') {
        tg.showAlert('Крипто оплата — скоро будет доступна! Напиши нам в поддержку.');

      } else if (action === 'pay-card') {
        tg.showAlert('Оплата картой — скоро будет доступна! Напиши нам в поддержку.');

      } else if (action === 'pay-stars') {
        tg.showAlert('Оплата Telegram Stars — скоро будет доступна!');

      // ─── Особые функции ───────────────────────────────────────

      } else if (action === 'feature-img-gen') {
        tg.showPopup({
          title: '🖼️ Генерация картинки',
          message: 'Бот попросит описание — напишите что хотите сгенерировать',
          buttons: [
            { id: 'confirm', type: 'default', text: 'Открыть в боте' },
            { id: 'cancel', type: 'cancel', text: 'Отмена' }
          ]
        }, (btnId) => {
          if (btnId === 'confirm') {
            tg.openTelegramLink('https://t.me/Alicesmartcat_bot?start=feature-img-gen');
            setTimeout(() => { tg.close(); }, 400);
          }
        });

      } else if (action === 'feature-photo-editor') {
        tg.showPopup({
          title: '✂️ Редактор фото',
          message: 'Бот попросит отправить фото для редактирования',
          buttons: [
            { id: 'confirm', type: 'default', text: 'Открыть в боте' },
            { id: 'cancel', type: 'cancel', text: 'Отмена' }
          ]
        }, (btnId) => {
          if (btnId === 'confirm') {
            tg.openTelegramLink('https://t.me/Alicesmartcat_bot?start=feature-photo-editor');
            setTimeout(() => { tg.close(); }, 400);
          }
        });

      } else if (action === 'feature-ocr') {
        tg.showPopup({
          title: '🔍 Анализ фото / OCR',
          message: 'Бот попросит отправить фото — распознает текст на нём',
          buttons: [
            { id: 'confirm', type: 'default', text: 'Открыть в боте' },
            { id: 'cancel', type: 'cancel', text: 'Отмена' }
          ]
        }, (btnId) => {
          if (btnId === 'confirm') {
            tg.openTelegramLink('https://t.me/Alicesmartcat_bot?start=feature-ocr');
            setTimeout(() => { tg.close(); }, 400);
          }
        });

      } else if (action === 'feature-video') {
        tg.showPopup({
          title: '🎥 Скачать видео',
          message: 'Бот попросит ссылку — поддерживается YouTube и TikTok',
          buttons: [
            { id: 'confirm', type: 'default', text: 'Открыть в боте' },
            { id: 'cancel', type: 'cancel', text: 'Отмена' }
          ]
        }, (btnId) => {
          if (btnId === 'confirm') {
            tg.openTelegramLink('https://t.me/Alicesmartcat_bot?start=feature-video');
            setTimeout(() => { tg.close(); }, 400);
          }
        });

      } else if (action === 'feature-crypto') {
        showPage('crypto');

      } else if (action === 'feature-smarthome') {
        showPage('smarthome');

      } else if (action === 'feature-diary') {
        showPage('diary');

      } else if (action === 'feature-qr') {
        showPage('qr');

      } else if (action === 'feature-translator') {
        showPage('translator');

      } else if (action === 'feature-pdf') {
        tg.showPopup({
          title: '📄 Конвертер файлов',
          message: 'Бот попросит отправить файл — поддерживается PDF↔Word и JPG→PDF',
          buttons: [
            { id: 'confirm', type: 'default', text: 'Открыть в боте' },
            { id: 'cancel', type: 'cancel', text: 'Отмена' }
          ]
        }, (btnId) => {
          if (btnId === 'confirm') {
            tg.openTelegramLink('https://t.me/Alicesmartcat_bot?start=feature-pdf');
            setTimeout(() => { tg.close(); }, 400);
          }
        });

      } else if (action === 'feature-summarize') {
        tg.showPopup({
          title: '📰 Суммаризация статьи',
          message: 'Бот попросит ссылку на статью — пришлёт краткое содержание',
          buttons: [
            { id: 'confirm', type: 'default', text: 'Открыть в боте' },
            { id: 'cancel', type: 'cancel', text: 'Отмена' }
          ]
        }, (btnId) => {
          if (btnId === 'confirm') {
            tg.openTelegramLink('https://t.me/Alicesmartcat_bot?start=feature-summarize');
            setTimeout(() => { tg.close(); }, 400);
          }
        });

      // ─────────────────────────────────────────────────────────
      }
    });
  });

  // Переключение языка (заглушка)
  document.querySelector('.lang-switch').addEventListener('click', () => {
    tg.showAlert('Переключение языка в разработке');
  });
}
