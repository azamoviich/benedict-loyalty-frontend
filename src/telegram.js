import { init, useThemeParams, useViewport } from '@telegram-apps/sdk';

let webApp = null;

try {
  webApp = init();
  webApp.ready();
  webApp.expand(); // full screen
} catch (e) {
  console.warn('Not inside Telegram WebApp');
}

export { webApp };