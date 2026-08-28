const translations = {
  // 繁體中文
  'zh-TW': {
    notification: {
      title: '即將在 **5 分鐘後** 開始！',
      startTime: '⏰ 開始時間',
      utcTime: 'UTC 時間',
      localTime: '你的時間',
      footer: '🛡️ 準備好迎接戰鬥！'
    }
  },
  // English
  'en-US': {
    notification: {
      title: 'starts in **5 minutes**!',
      startTime: '⏰ Start Time',
      utcTime: 'UTC Time',
      localTime: 'Your Time',
      footer: '🛡️ Get ready for the battle!'
    }
  },
  // Tagalog
  'tl': {
    notification: {
      title: 'magsisimula sa **5 minuto**!',
      startTime: '⏰ Oras ng Pagsisimula',
      utcTime: 'UTC Oras',
      localTime: 'Iyong Oras',
      footer: '🛡️ Maghanda para sa labanan!'
    }
  },
  // Indonesian
  'id': {
    notification: {
      title: 'dimulai dalam **5 menit**!',
      startTime: '⏰ Waktu Mulai',
      utcTime: 'Waktu UTC',
      localTime: 'Waktu Anda',
      footer: '🛡️ Bersiaplah untuk pertempuran!'
    }
  },
  // Korean
  'ko': {
    notification: {
      title: '**5분 후** 시작됩니다!',
      startTime: '⏰ 시작 시간',
      utcTime: 'UTC 시간',
      localTime: '현지 시간',
      footer: '🛡️ 전투 준비!'
    }
  },
  // Japanese
  'ja': {
    notification: {
      title: '**5分後**に開始します！',
      startTime: '⏰ 開始時間',
      utcTime: 'UTC時間',
      localTime: 'あなたの時間',
      footer: '🛡️ 戦闘の準備を！'
    }
  },
  // Thai
  'th': {
    notification: {
      title: 'เริ่มใน **5 นาที**!',
      startTime: '⏰ เวลาเริ่มต้น',
      utcTime: 'เวลา UTC',
      localTime: 'เวลาของคุณ',
      footer: '🛡️ เตรียมพร้อมสำหรับการต่อสู้!'
    }
  },
  // Spanish
  'es-ES': {
    notification: {
      title: '¡comienza en **5 minutos**!',
      startTime: '⏰ Hora de Inicio',
      utcTime: 'Hora UTC',
      localTime: 'Tu Hora',
      footer: '🛡️ ¡Prepárate para la batalla!'
    }
  },
  // German
  'de': {
    notification: {
      title: 'beginnt in **5 Minuten**!',
      startTime: '⏰ Startzeit',
      utcTime: 'UTC-Zeit',
      localTime: 'Deine Zeit',
      footer: '🛡️ Mach dich bereit für den Kampf!'
    }
  }
};

// Language names for /language command
const languageNames = {
  'zh-TW': '🇹🇼 繁體中文',
  'en-US': '🇺🇸 English',
  'tl': '🇵🇭 Tagalog',
  'id': '🇮🇩 Indonesia',
  'ko': '🇰🇷 한국어',
  'ja': '🇯🇵 日本語',
  'th': '🇹🇭 ไทย',
  'es-ES': '🇪🇸 Español',
  'de': '🇩🇪 Deutsch'
};

// Map Discord locales to our supported languages
function mapDiscordLocale(discordLocale) {
  const localeMap = {
    'zh-TW': 'zh-TW',
    'zh-CN': 'zh-TW', // Use Traditional Chinese for Simplified Chinese users
    'en-US': 'en-US',
    'en-GB': 'en-US',
    'tl': 'tl',
    'id': 'id',
    'ko': 'ko',
    'ja': 'ja',
    'th': 'th',
    'es-ES': 'es-ES',
    'de': 'de'
  };

  return localeMap[discordLocale] || 'en-US'; // Default to English
}

// Get translation
function getTranslation(locale, key) {
  const lang = translations[locale] || translations['en-US'];
  const keys = key.split('.');
  let result = lang;

  for (const k of keys) {
    result = result[k];
    if (!result) return key; // Return key if translation not found
  }

  return result;
}

module.exports = {
  translations,
  languageNames,
  mapDiscordLocale,
  getTranslation
};
