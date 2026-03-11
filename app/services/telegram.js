export const tg = Telegram.WebApp;

export function initTelegram() {
  tg.ready();
  tg.ready();
  // requestFullscreen для новых версий Telegram
  if (tg.requestFullscreen) {
    tg.requestFullscreen();
  } else {
    setTimeout(() => tg.expand(), 100);
  }
  tg.onEvent('viewportChanged', function() {
    if (!tg.isExpanded) {
      tg.expand();
    }
  });
  setTimeout(() => {
    tg.expand();
  }, 100);
  tg.onEvent('viewportChanged', function() {
    if (!tg.isExpanded) {
      tg.expand();
    }
  });
  tg.MainButton.hide();
}
