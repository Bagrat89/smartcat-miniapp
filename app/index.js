import { tg, initTelegram } from './services/telegram.js';
import { initButtonHandlers } from './ui/buttons.js';
import { showPage, goBack } from './features/navigation.js';
import { shSaveCredentials, shLoadDevices, shToggle, shSetBrightness, shDeleteCredentials } from './features/smarthome.js';
import { convertCrypto, loadCryptoRates } from './features/crypto.js';
import { saveDiary, renderDiary, deleteDiary } from './features/diary.js';
import { generateQR, translateText } from './features/tools.js';

initTelegram();

const boundShowPage = (pageId) => showPage(pageId, loadCryptoRates, renderDiary);
const boundGoBack = () => goBack(tg);

initButtonHandlers(tg, {
  showPage: boundShowPage,
  goBack: boundGoBack
});

window.shSaveCredentials = () => shSaveCredentials(tg);
window.shLoadDevices = () => shLoadDevices(tg);
window.shToggle = (deviceId, state) => shToggle(tg, deviceId, state);
window.shSetBrightness = (deviceId, value) => shSetBrightness(tg, deviceId, value);
window.shDeleteCredentials = () => shDeleteCredentials(tg);
window.convertCrypto = convertCrypto;
window.saveDiary = () => saveDiary(tg, renderDiary);
window.deleteDiary = (id) => deleteDiary(id, renderDiary);
window.generateQR = () => generateQR(tg);
window.translateText = () => translateText(tg);
