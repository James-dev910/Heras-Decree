// Birthday greeting templates for different languages

const BIRTHDAY_TEMPLATES = {
  'zh-TW': {
    name: 'Traditional Chinese',
    defaultMessage: `🎈 祝你生日快樂！

願你在新的一歲裡：
✨ 心想事成，萬事如意
🌟 身體健康，笑口常開
🎯 事業順利，步步高升
💝 幸福美滿，快樂無限

May all your dreams come true! 🎁`,
    gifKeyword: 'happy birthday celebration'
  },

  'en-US': {
    name: 'English',
    defaultMessage: `🎈 Wishing you the happiest of birthdays!

May your special day be filled with:
✨ Joy and laughter
🌟 Love and happiness
🎯 Amazing surprises
💝 Wonderful memories

Here's to another fantastic year ahead! 🎁`,
    gifKeyword: 'happy birthday party'
  },

  'tl': {
    name: 'Tagalog',
    defaultMessage: `🎈 Maligayang Kaarawan!

Nawa'y puno ng:
✨ Kasiyahan at tawa
🌟 Pagmamahal at kaligayahan
🎯 Mga sorpresa
💝 Masasayang alaala

Maligayang bati sa iyong espesyal na araw! 🎁`,
    gifKeyword: 'happy birthday'
  },

  'id': {
    name: 'Indonesian',
    defaultMessage: `🎈 Selamat Ulang Tahun!

Semoga hari istimewamu dipenuhi dengan:
✨ Kegembiraan dan tawa
🌟 Cinta dan kebahagiaan
🎯 Kejutan yang menakjubkan
💝 Kenangan indah

Semoga tahun depan penuh berkah! 🎁`,
    gifKeyword: 'happy birthday'
  },

  'ko': {
    name: 'Korean',
    defaultMessage: `🎈 생일 축하합니다!

특별한 날이 가득하기를:
✨ 기쁨과 웃음
🌟 사랑과 행복
🎯 놀라운 선물
💝 아름다운 추억

멋진 한 해가 되시길 바랍니다! 🎁`,
    gifKeyword: 'happy birthday'
  },

  'ja': {
    name: 'Japanese',
    defaultMessage: `🎈 お誕生日おめでとうございます！

素敵な一日になりますように：
✨ 喜びと笑顔
🌟 愛と幸せ
🎯 素晴らしいサプライズ
💝 最高の思い出

素晴らしい一年になりますように！ 🎁`,
    gifKeyword: 'happy birthday'
  },

  'es-ES': {
    name: 'Spanish',
    defaultMessage: `🎈 ¡Feliz Cumpleaños!

Que tu día especial esté lleno de:
✨ Alegría y risas
🌟 Amor y felicidad
🎯 Sorpresas increíbles
💝 Recuerdos maravillosos

¡Que tengas un año fantástico por delante! 🎁`,
    gifKeyword: 'happy birthday'
  },

  'de': {
    name: 'German',
    defaultMessage: `🎈 Alles Gute zum Geburtstag!

Möge dein besonderer Tag erfüllt sein mit:
✨ Freude und Lachen
🌟 Liebe und Glück
🎯 Tollen Überraschungen
💝 Wunderbaren Erinnerungen

Auf ein fantastisches Jahr! 🎁`,
    gifKeyword: 'happy birthday'
  },

  'th': {
    name: 'Thai',
    defaultMessage: `🎈 สุขสันต์วันเกิด!

ขอให้วันพิเศษของคุณเต็มไปด้วย:
✨ ความสุขและเสียงหัวเราะ
🌟 ความรักและความสุข
🎯 ความประหลาดใจที่ยอดเยี่ยม
💝 ความทรงจำที่ดี

ขอให้มีปีที่ยอดเยี่ยมข้างหน้า! 🎁`,
    gifKeyword: 'happy birthday'
  }
};

// Get template by language code
function getBirthdayTemplate(languageCode) {
  return BIRTHDAY_TEMPLATES[languageCode] || BIRTHDAY_TEMPLATES['en-US'];
}

// Get all available languages
function getAvailableLanguages() {
  return Object.keys(BIRTHDAY_TEMPLATES).map(key => ({
    code: key,
    name: BIRTHDAY_TEMPLATES[key].name
  }));
}

module.exports = {
  BIRTHDAY_TEMPLATES,
  getBirthdayTemplate,
  getAvailableLanguages
};
