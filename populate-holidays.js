require('dotenv').config();
const { pool } = require('./database');

// Holiday data for all languages and channels
const holidays = [
  // Traditional Chinese holidays (lunar calendar) - #chinese channel
  {
    name: 'Chinese New Year',
    calendar_type: 'lunar',
    month: 1,
    day: 1,
    language: 'zh-TW',
    channel_id: '1537357850194481223',
    greeting_message: '🎊 新年快樂！恭喜發財！\n\n祝您在新的一年裡萬事如意，心想事成，闔家平安！',
    gif_keyword: 'chinese new year'
  },
  {
    name: 'Lantern Festival',
    calendar_type: 'lunar',
    month: 1,
    day: 15,
    language: 'zh-TW',
    channel_id: '1537357850194481223',
    greeting_message: '🏮 元宵節快樂！\n\n願您闔家團圓，幸福美滿！',
    gif_keyword: 'lantern festival'
  },
  {
    name: 'Dragon Boat Festival',
    calendar_type: 'lunar',
    month: 5,
    day: 5,
    language: 'zh-TW',
    channel_id: '1537357850194481223',
    greeting_message: '🐉 端午節安康！\n\n祝您平安健康，萬事順利！',
    gif_keyword: 'dragon boat festival'
  },
  {
    name: 'Mid-Autumn Festival',
    calendar_type: 'lunar',
    month: 8,
    day: 15,
    language: 'zh-TW',
    channel_id: '1537357850194481223',
    greeting_message: '🥮 中秋節快樂！\n\n祝您月圓人團圓，闔家幸福美滿！',
    gif_keyword: 'mid autumn festival'
  },

  // Taiwan solar calendar holidays - #chinese channel
  {
    name: 'National Day',
    calendar_type: 'solar',
    month: 10,
    day: 10,
    language: 'zh-TW',
    channel_id: '1537357850194481223',
    greeting_message: '🇹🇼 國慶日快樂！\n\n祝福台灣繁榮昌盛，國泰民安！',
    gif_keyword: 'taiwan celebration'
  },

  // Tagalog holidays - #tagalog channel
  {
    name: 'Independence Day',
    calendar_type: 'solar',
    month: 6,
    day: 12,
    language: 'tl',
    channel_id: '1537356474626613258',
    greeting_message: '🇵🇭 Maligayang Araw ng Kalayaan!\n\nMabuhay ang Pilipinas! Pagpalain nawa tayo ng kalayaan at kapayapaan!',
    gif_keyword: 'philippines independence'
  },
  {
    name: 'Rizal Day',
    calendar_type: 'solar',
    month: 12,
    day: 30,
    language: 'tl',
    channel_id: '1537356474626613258',
    greeting_message: '📚 Maligayang Araw ng Rizal!\n\nAlalahanin natin ang mga aral at sakripisyo ni Jose Rizal para sa ating bayan!',
    gif_keyword: 'philippines hero'
  },
  {
    name: 'New Year',
    calendar_type: 'solar',
    month: 1,
    day: 1,
    language: 'tl',
    channel_id: '1537356474626613258',
    greeting_message: '🎊 Maligayang Bagong Taon!\n\nNawa\'y puno ng pagpapala at tagumpay ang bagong taon para sa inyo!',
    gif_keyword: 'happy new year'
  },
  {
    name: 'Christmas',
    calendar_type: 'solar',
    month: 12,
    day: 25,
    language: 'tl',
    channel_id: '1537356474626613258',
    greeting_message: '🎄 Maligayang Pasko!\n\nNawa\'y mapuno ng pagmamahal at saya ang inyong mga puso sa panahon ng Pasko!',
    gif_keyword: 'merry christmas'
  },

  // Bisaya/Cebuano holidays - #bisaya channel
  {
    name: 'Independence Day',
    calendar_type: 'solar',
    month: 6,
    day: 12,
    language: 'ceb',
    channel_id: '1537489419005599864',
    greeting_message: '🇵🇭 Malipayong Adlaw sa Kagawasan!\n\nMabuhay ang Pilipinas! Hinaot nga mapuno ta sa kalayaan ug kalinaw!',
    gif_keyword: 'philippines independence'
  },
  {
    name: 'Rizal Day',
    calendar_type: 'solar',
    month: 12,
    day: 30,
    language: 'ceb',
    channel_id: '1537489419005599864',
    greeting_message: '📚 Malipayong Adlaw ni Rizal!\n\nHandurawon nato ang mga leksyon ug sakripisyo ni Jose Rizal alang sa atong nasud!',
    gif_keyword: 'philippines hero'
  },
  {
    name: 'New Year',
    calendar_type: 'solar',
    month: 1,
    day: 1,
    language: 'ceb',
    channel_id: '1537489419005599864',
    greeting_message: '🎊 Malipayong Bag-ong Tuig!\n\nHinaot nga puno sa panalangin ug kalampusan ang bag-ong tuig alang kaninyo!',
    gif_keyword: 'happy new year'
  },
  {
    name: 'Christmas',
    calendar_type: 'solar',
    month: 12,
    day: 25,
    language: 'ceb',
    channel_id: '1537489419005599864',
    greeting_message: '🎄 Malipayong Pasko!\n\nHinaot nga mapuno sa gugma ug kalipay ang inyong mga kasingkasing niining panahon sa Pasko!',
    gif_keyword: 'merry christmas'
  },

  // Indonesian holidays - #indonesian channel
  {
    name: 'Independence Day',
    calendar_type: 'solar',
    month: 8,
    day: 17,
    language: 'id',
    channel_id: '1537356888390377542',
    greeting_message: '🇮🇩 Selamat Hari Kemerdekaan Indonesia!\n\nMerdeka! Semoga Indonesia selalu jaya dan sejahtera!',
    gif_keyword: 'indonesia independence'
  },
  {
    name: 'New Year',
    calendar_type: 'solar',
    month: 1,
    day: 1,
    language: 'id',
    channel_id: '1537356888390377542',
    greeting_message: '🎊 Selamat Tahun Baru!\n\nSemoga tahun baru membawa kebahagiaan dan kesuksesan untuk Anda!',
    gif_keyword: 'happy new year'
  },
  {
    name: 'Christmas',
    calendar_type: 'solar',
    month: 12,
    day: 25,
    language: 'id',
    channel_id: '1537356888390377542',
    greeting_message: '🎄 Selamat Natal!\n\nSemoga kasih dan sukacita memenuhi hati Anda di musim Natal ini!',
    gif_keyword: 'merry christmas'
  },

  // Universal holidays in English - #general channel
  {
    name: 'New Year',
    calendar_type: 'solar',
    month: 1,
    day: 1,
    language: 'en',
    channel_id: '1537339415238541363',
    greeting_message: '🎊 Happy New Year!\n\nWishing you a year filled with happiness, success, and wonderful memories!',
    gif_keyword: 'happy new year celebration'
  },
  {
    name: 'Valentine\'s Day',
    calendar_type: 'solar',
    month: 2,
    day: 14,
    language: 'en',
    channel_id: '1537339415238541363',
    greeting_message: '💝 Happy Valentine\'s Day!\n\nSpread love and kindness to everyone around you today!',
    gif_keyword: 'happy valentines day'
  },
  {
    name: 'Easter',
    calendar_type: 'solar',
    month: 4,
    day: 20,
    language: 'en',
    channel_id: '1537339415238541363',
    greeting_message: '🐰 Happy Easter!\n\nMay this Easter bring joy, hope, and renewal to your life!',
    gif_keyword: 'happy easter'
  },
  {
    name: 'Halloween',
    calendar_type: 'solar',
    month: 10,
    day: 31,
    language: 'en',
    channel_id: '1537339415238541363',
    greeting_message: '🎃 Happy Halloween!\n\nHave a spook-tacular Halloween filled with treats and fun!',
    gif_keyword: 'happy halloween'
  },
  {
    name: 'Thanksgiving',
    calendar_type: 'solar',
    month: 11,
    day: 28,
    language: 'en',
    channel_id: '1537339415238541363',
    greeting_message: '🦃 Happy Thanksgiving!\n\nGrateful for this amazing community. Wishing you a day filled with warmth and joy!',
    gif_keyword: 'happy thanksgiving'
  },
  {
    name: 'Christmas',
    calendar_type: 'solar',
    month: 12,
    day: 25,
    language: 'en',
    channel_id: '1537339415238541363',
    greeting_message: '🎄 Merry Christmas!\n\nMay your Christmas be filled with love, laughter, and precious moments with loved ones!',
    gif_keyword: 'merry christmas'
  },
  {
    name: 'Christmas Eve',
    calendar_type: 'solar',
    month: 12,
    day: 24,
    language: 'en',
    channel_id: '1537339415238541363',
    greeting_message: '🌟 Happy Christmas Eve!\n\nThe magic is in the air! Wishing you a wonderful Christmas Eve!',
    gif_keyword: 'christmas eve'
  }
];

async function populateHolidays() {
  const client = await pool.connect();

  try {
    console.log('🎉 Starting to populate holidays...');

    for (const holiday of holidays) {
      await client.query(`
        INSERT INTO holidays (name, calendar_type, month, day, language, channel_id, greeting_message, gif_keyword)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (name, language)
        DO UPDATE SET
          calendar_type = EXCLUDED.calendar_type,
          month = EXCLUDED.month,
          day = EXCLUDED.day,
          channel_id = EXCLUDED.channel_id,
          greeting_message = EXCLUDED.greeting_message,
          gif_keyword = EXCLUDED.gif_keyword
      `, [
        holiday.name,
        holiday.calendar_type,
        holiday.month,
        holiday.day,
        holiday.language,
        holiday.channel_id,
        holiday.greeting_message,
        holiday.gif_keyword
      ]);

      console.log(`✅ Added/Updated: ${holiday.name} (${holiday.language})`);
    }

    console.log(`\n🎊 Successfully populated ${holidays.length} holidays!`);
    console.log('\nSummary:');
    console.log('- Traditional Chinese (Lunar): 4 holidays');
    console.log('- Taiwan (Solar): 1 holiday');
    console.log('- Tagalog: 4 holidays');
    console.log('- Bisaya/Cebuano: 4 holidays');
    console.log('- Indonesian: 3 holidays');
    console.log('- English (Universal): 7 holidays');
    console.log('\nTotal: 23 holidays across 5 languages');
  } catch (error) {
    console.error('❌ Error populating holidays:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

// Run the population script
populateHolidays();
