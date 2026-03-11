let shCredentialsSaved = false;

export function shSetStatus(msg) {
  document.getElementById('sh-status').textContent = msg;
  setTimeout(() => { document.getElementById('sh-status').textContent = ''; }, 3000);
}

export function shSaveCredentials(tg) {
  const clientId = document.getElementById('sh-client-id').value.trim();
  const clientSecret = document.getElementById('sh-client-secret').value.trim();
  const region = document.getElementById('sh-region').value;
  if (!clientId || !clientSecret) {
    tg.showAlert('Заполните Client ID и Client Secret');
    return;
  }
  tg.sendData(JSON.stringify({
    action: 'smart_home',
    sub: 'save_credentials',
    client_id: clientId,
    client_secret: clientSecret,
    region: region
  }));
  shCredentialsSaved = true;
  document.getElementById('sh-form').style.display = 'none';
  document.getElementById('sh-devices').style.display = 'block';
  shSetStatus('✅ Данные отправлены боту');
}

export function shLoadDevices(tg) {
  document.getElementById('sh-devices-list').innerHTML = '<div style="color:#888;text-align:center;">Загрузка...</div>';
  tg.sendData(JSON.stringify({ action: 'smart_home', sub: 'get_devices' }));
}

export function shToggle(tg, deviceId, state) {
  tg.sendData(JSON.stringify({
    action: 'smart_home',
    sub: 'toggle',
    device_id: deviceId,
    state: state
  }));
  shSetStatus(state ? '🟢 Включаю...' : '⚫ Выключаю...');
}

export function shSetBrightness(tg, deviceId, value) {
  tg.sendData(JSON.stringify({
    action: 'smart_home',
    sub: 'brightness',
    device_id: deviceId,
    value: value
  }));
  shSetStatus(`💡 Яркость: ${value}`);
}

export function shDeleteCredentials(tg) {
  tg.showPopup({
    title: 'Удалить данные?',
    message: 'Tuya credentials будут удалены из бота.',
    buttons: [
      { id: 'confirm', type: 'destructive', text: 'Удалить' },
      { id: 'cancel', type: 'cancel', text: 'Отмена' }
    ]
  }, (btnId) => {
    if (btnId === 'confirm') {
      tg.sendData(JSON.stringify({ action: 'smart_home', sub: 'delete_credentials' }));
      document.getElementById('sh-form').style.display = 'block';
      document.getElementById('sh-devices').style.display = 'none';
      document.getElementById('sh-client-id').value = '';
      document.getElementById('sh-client-secret').value = '';
    }
  });
}

export function getShCredentialsSaved() {
  return shCredentialsSaved;
}
