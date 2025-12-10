// src/telegram.js  ← NEW CORRECT VERSION (2025)

let webApp = null;

if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
  webApp = window.Telegram.WebApp;
  webApp.ready();           // ← correct
  webApp.expand();          // ← correct
  console.log('Telegram WebApp initialized correctly');
} else {
  console.warn('Running outside Telegram – using fallback mode');
}

export { webApp };