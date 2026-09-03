// Holiday templates for different languages/regions
// Each server can choose which templates to install

const HOLIDAY_TEMPLATES = {
  'zh-TW': {
    name: 'Traditional Chinese (Taiwan/Hong Kong)',
    description: 'Chinese holidays with lunar calendar support',
    holidays: [
      {
        name: 'Chinese New Year',
        calendar_type: 'lunar',
        month: 1,
        day: 1,
        greeting_message: '🎊 新年快樂！恭喜發財！\n\n祝您在新的一年裡萬事如意，心想事成，闔家平安！',
        gif_keyword: 'chinese new year'
      },
      {
        name: 'Lantern Festival',
        calendar_type: 'lunar',
        month: 1,
        day: 15,
        greeting_message: '🏮 元宵節快樂！\n\n願您闔家團圓，幸福美滿！',
        gif_keyword: 'lantern festival'
      },
      {
        name: 'Dragon Boat Festival',
        calendar_type: 'lunar',
        month: 5,
        day: 5,
        greeting_message: '🐉 端午節安康！\n\n祝您平安健康，萬事順利！',
        gif_keyword: 'dragon boat festival'
      },
      {
        name: 'Mid-Autumn Festival',
        calendar_type: 'lunar',
        month: 8,
        day: 15,
        greeting_message: '🥮 中秋節快樂！\n\n祝您月圓人團圓，闔家幸福美滿！',
        gif_keyword: 'mid autumn festival'
      },
      {
        name: 'National Day',
        calendar_type: 'solar',
        month: 10,
        day: 10,
        greeting_message: '🇹🇼 國慶日快樂！\n\n祝福台灣繁榮昌盛，國泰民安！',
        gif_keyword: 'taiwan celebration'
      }
    ]
  },

  'tl': {
    name: 'Tagalog (Philippines)',
    description: 'Philippines holidays in Tagalog',
    holidays: [
      {
        name: 'Independence Day',
        calendar_type: 'solar',
        month: 6,
        day: 12,
        greeting_message: '🇵🇭 Maligayang Araw ng Kalayaan!\n\nMabuhay ang Pilipinas! Pagpalain nawa tayo ng kalayaan at kapayapaan!',
        gif_keyword: 'philippines independence'
      },
      {
        name: 'Rizal Day',
        calendar_type: 'solar',
        month: 12,
        day: 30,
        greeting_message: '📚 Maligayang Araw ng Rizal!\n\nAlalahanin natin ang mga aral at sakripisyo ni Jose Rizal para sa ating bayan!',
        gif_keyword: 'philippines hero'
      },
      {
        name: 'New Year',
        calendar_type: 'solar',
        month: 1,
        day: 1,
        greeting_message: '🎊 Maligayang Bagong Taon!\n\nNawa\'y puno ng pagpapala at tagumpay ang bagong taon para sa inyo!',
        gif_keyword: 'happy new year'
      },
      {
        name: 'Christmas',
        calendar_type: 'solar',
        month: 12,
        day: 25,
        greeting_message: '🎄 Maligayang Pasko!\n\nNawa\'y mapuno ng pagmamahal at saya ang inyong mga puso sa panahon ng Pasko!',
        gif_keyword: 'merry christmas'
      }
    ]
  },

  'ceb': {
    name: 'Bisaya/Cebuano (Philippines)',
    description: 'Philippines holidays in Bisaya/Cebuano',
    holidays: [
      {
        name: 'Independence Day',
        calendar_type: 'solar',
        month: 6,
        day: 12,
        greeting_message: '🇵🇭 Malipayong Adlaw sa Kagawasan!\n\nMabuhay ang Pilipinas! Hinaot nga mapuno ta sa kalayaan ug kalinaw!',
        gif_keyword: 'philippines independence'
      },
      {
        name: 'Rizal Day',
        calendar_type: 'solar',
        month: 12,
        day: 30,
        greeting_message: '📚 Malipayong Adlaw ni Rizal!\n\nHandurawon nato ang mga leksyon ug sakripisyo ni Jose Rizal alang sa atong nasud!',
        gif_keyword: 'philippines hero'
      },
      {
        name: 'New Year',
        calendar_type: 'solar',
        month: 1,
        day: 1,
        greeting_message: '🎊 Malipayong Bag-ong Tuig!\n\nHinaot nga puno sa panalangin ug kalampusan ang bag-ong tuig alang kaninyo!',
        gif_keyword: 'happy new year'
      },
      {
        name: 'Christmas',
        calendar_type: 'solar',
        month: 12,
        day: 25,
        greeting_message: '🎄 Malipayong Pasko!\n\nHinaot nga mapuno sa gugma ug kalipay ang inyong mga kasingkasing niining panahon sa Pasko!',
        gif_keyword: 'merry christmas'
      }
    ]
  },

  'id': {
    name: 'Indonesian',
    description: 'Indonesia holidays',
    holidays: [
      {
        name: 'Independence Day',
        calendar_type: 'solar',
        month: 8,
        day: 17,
        greeting_message: '🇮🇩 Selamat Hari Kemerdekaan Indonesia!\n\nMerdeka! Semoga Indonesia selalu jaya dan sejahtera!',
        gif_keyword: 'indonesia independence'
      },
      {
        name: 'New Year',
        calendar_type: 'solar',
        month: 1,
        day: 1,
        greeting_message: '🎊 Selamat Tahun Baru!\n\nSemoga tahun baru membawa kebahagiaan dan kesuksesan untuk Anda!',
        gif_keyword: 'happy new year'
      },
      {
        name: 'Christmas',
        calendar_type: 'solar',
        month: 12,
        day: 25,
        greeting_message: '🎄 Selamat Natal!\n\nSemoga kasih dan sukacita memenuhi hati Anda di musim Natal ini!',
        gif_keyword: 'merry christmas'
      }
    ]
  },

  'en': {
    name: 'English (Universal)',
    description: 'Universal holidays in English',
    holidays: [
      {
        name: 'New Year',
        calendar_type: 'solar',
        month: 1,
        day: 1,
        greeting_message: '🎊 Happy New Year!\n\nWishing you a year filled with happiness, success, and wonderful memories!',
        gif_keyword: 'happy new year celebration'
      },
      {
        name: 'Valentine\'s Day',
        calendar_type: 'solar',
        month: 2,
        day: 14,
        greeting_message: '💝 Happy Valentine\'s Day!\n\nSpread love and kindness to everyone around you today!',
        gif_keyword: 'happy valentines day'
      },
      {
        name: 'Easter',
        calendar_type: 'solar',
        month: 4,
        day: 20,
        greeting_message: '🐰 Happy Easter!\n\nMay this Easter bring joy, hope, and renewal to your life!',
        gif_keyword: 'happy easter'
      },
      {
        name: 'Halloween',
        calendar_type: 'solar',
        month: 10,
        day: 31,
        greeting_message: '🎃 Happy Halloween!\n\nHave a spook-tacular Halloween filled with treats and fun!',
        gif_keyword: 'happy halloween'
      },
      {
        name: 'Thanksgiving',
        calendar_type: 'solar',
        month: 11,
        day: 28,
        greeting_message: '🦃 Happy Thanksgiving!\n\nGrateful for this amazing community. Wishing you a day filled with warmth and joy!',
        gif_keyword: 'happy thanksgiving'
      },
      {
        name: 'Christmas Eve',
        calendar_type: 'solar',
        month: 12,
        day: 24,
        greeting_message: '🌟 Happy Christmas Eve!\n\nThe magic is in the air! Wishing you a wonderful Christmas Eve!',
        gif_keyword: 'christmas eve'
      },
      {
        name: 'Christmas',
        calendar_type: 'solar',
        month: 12,
        day: 25,
        greeting_message: '🎄 Merry Christmas!\n\nMay your Christmas be filled with love, laughter, and precious moments with loved ones!',
        gif_keyword: 'merry christmas'
      }
    ]
  }
};

// Get all available template languages
function getAvailableTemplates() {
  return Object.keys(HOLIDAY_TEMPLATES).map(key => ({
    code: key,
    name: HOLIDAY_TEMPLATES[key].name,
    description: HOLIDAY_TEMPLATES[key].description,
    count: HOLIDAY_TEMPLATES[key].holidays.length
  }));
}

// Get holidays from a specific template
function getTemplateHolidays(languageCode) {
  return HOLIDAY_TEMPLATES[languageCode]?.holidays || [];
}

// Get template info
function getTemplateInfo(languageCode) {
  return HOLIDAY_TEMPLATES[languageCode] || null;
}

module.exports = {
  HOLIDAY_TEMPLATES,
  getAvailableTemplates,
  getTemplateHolidays,
  getTemplateInfo
};
