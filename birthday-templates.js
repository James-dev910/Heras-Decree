// Birthday greeting templates for different languages
// Each language has 5 different template versions to choose from

const BIRTHDAY_TEMPLATES = {
  'zh-TW': {
    name: 'Traditional Chinese',
    templates: [
      {
        id: 1,
        name: '經典祝福',
        message: `🎈 祝你生日快樂！

願你在新的一歲裡：
✨ 心想事成，萬事如意
🌟 身體健康，笑口常開
🎯 事業順利，步步高升
💝 幸福美滿，快樂無限

May all your dreams come true! 🎁`
      },
      {
        id: 2,
        name: '溫馨祝福',
        message: `🎂 生日快樂！

在這特別的日子裡：
🌸 願你笑容常在，快樂永駐
🎵 願你夢想成真，前程似錦
🌈 願你平安健康，歲歲年年
💖 願你幸福滿滿，好運連連

祝你有個美好的一天！✨`
      },
      {
        id: 3,
        name: '簡約祝福',
        message: `🎉 Happy Birthday! 生日快樂！

🎈 祝福你：
• 開心每一天
• 健康又平安
• 夢想都實現
• 生活更美滿

願今天的歡樂陪伴你一整年！🎁`
      },
      {
        id: 4,
        name: '詩意祝福',
        message: `🌟 生日快樂！

🎂 在你生命中的這一天
願陽光為你燦爛
願鮮花為你綻放
願歡笑與你相伴

✨ 祝福你：
前程似錦，未來可期
歲月靜好，幸福安康

💝 Happy Birthday!`
      },
      {
        id: 5,
        name: '活力祝福',
        message: `🎊 生日快樂！Let's Celebrate! 🎊

🎉 今天是你的大日子！
🎈 願你：
⚡ 充滿活力與熱情
🌟 閃耀如星光般耀眼
🚀 勇敢追夢，無所畏懼
💪 越來越棒，越來越好

Let's make this year the best one yet! 🎁✨`
      }
    ],
    gifKeyword: 'happy birthday celebration'
  },

  'en-US': {
    name: 'English',
    templates: [
      {
        id: 1,
        name: 'Classic',
        message: `🎈 Wishing you the happiest of birthdays!

May your special day be filled with:
✨ Joy and laughter
🌟 Love and happiness
🎯 Amazing surprises
💝 Wonderful memories

Here's to another fantastic year ahead! 🎁`
      },
      {
        id: 2,
        name: 'Warm Wishes',
        message: `🎂 Happy Birthday!

On this special day:
🌸 May your smile shine bright
🎵 May your dreams take flight
🌈 May your heart feel light
💖 May everything go right

Wishing you a wonderful day filled with love! ✨`
      },
      {
        id: 3,
        name: 'Simple & Sweet',
        message: `🎉 Happy Birthday!

🎈 Wishing you:
• Happiness every day
• Health in every way
• Dreams that come true
• Adventures brand new

Hope your birthday is as amazing as you are! 🎁`
      },
      {
        id: 4,
        name: 'Poetic',
        message: `🌟 Happy Birthday!

🎂 On this day you were born
A star began to shine
May your path be bright and warm
And happiness be thine

✨ Wishing you:
Success in all you do
Joy in every moment
And dreams that do come true

💝 Celebrate big today!`
      },
      {
        id: 5,
        name: 'Energetic',
        message: `🎊 Happy Birthday! Let's Party! 🎊

🎉 It's YOUR special day!
🎈 May you be:
⚡ Full of energy and passion
🌟 Shining like a superstar
🚀 Bold and fearless
💪 Stronger and better

Let's make this year LEGENDARY! 🎁✨`
      }
    ],
    gifKeyword: 'happy birthday party'
  },

  'tl': {
    name: 'Tagalog',
    templates: [
      {
        id: 1,
        name: 'Klasiko',
        message: `🎈 Maligayang Kaarawan!

Nawa'y puno ng:
✨ Kasiyahan at tawa
🌟 Pagmamahal at kaligayahan
🎯 Mga sorpresa
💝 Masasayang alaala

Maligayang bati sa iyong espesyal na araw! 🎁`
      },
      {
        id: 2,
        name: 'Mainit na Pagbati',
        message: `🎂 Maligayang Bati sa Iyong Kaarawan!

Sa espesyal mong araw:
🌸 Nawa'y laging masaya
🎵 Nawa'y magtagumpay
🌈 Nawa'y malusog
💖 Nawa'y mapuno ng pagmamahal

Pagpalain ka nawa! ✨`
      },
      {
        id: 3,
        name: 'Simple',
        message: `🎉 Happy Birthday!

🎈 Para sa iyo:
• Kaligayahan araw-araw
• Kalusugan palagi
• Mga pangarap na natutupad
• Mga bagong karanasan

Sana'y special ang iyong araw! 🎁`
      },
      {
        id: 4,
        name: 'Makata',
        message: `🌟 Maligayang Kaarawan!

🎂 Sa araw na ito
Ipinanganak ang isang bituin
Nawa'y laging maliwanag
Ang iyong landas

✨ Nawa'y:
Magtagumpay ka sa lahat
Maging masaya lagi
At matupad ang pangarap

💝 Celebrate!`
      },
      {
        id: 5,
        name: 'Masigla',
        message: `🎊 Maligayang Kaarawan! Party Na! 🎊

🎉 Ito ang IYONG araw!
🎈 Nawa'y:
⚡ Puno ng sigla at lakas
🌟 Kumikinang na parang bituin
🚀 Matapang at walang takot
💪 Lumalakas pa

Gawing LEGENDARY ang taong ito! 🎁✨`
      }
    ],
    gifKeyword: 'happy birthday'
  },

  'id': {
    name: 'Indonesian',
    templates: [
      {
        id: 1,
        name: 'Klasik',
        message: `🎈 Selamat Ulang Tahun!

Semoga hari istimewamu dipenuhi dengan:
✨ Kegembiraan dan tawa
🌟 Cinta dan kebahagiaan
🎯 Kejutan yang menakjubkan
💝 Kenangan indah

Semoga tahun depan penuh berkah! 🎁`
      },
      {
        id: 2,
        name: 'Hangat',
        message: `🎂 Selamat Ulang Tahun!

Di hari spesialmu:
🌸 Semoga selalu tersenyum
🎵 Semoga mimpi terwujud
🌈 Semoga sehat selalu
💖 Semoga dipenuhi kasih sayang

Selamat merayakan! ✨`
      },
      {
        id: 3,
        name: 'Sederhana',
        message: `🎉 Selamat Ulang Tahun!

🎈 Untuk Anda:
• Kebahagiaan setiap hari
• Kesehatan selalu
• Mimpi yang terwujud
• Petualangan baru

Semoga harimu istimewa! 🎁`
      },
      {
        id: 4,
        name: 'Puitis',
        message: `🌟 Selamat Ulang Tahun!

🎂 Di hari kelahiranmu
Bintang mulai bersinar
Semoga jalanmu cerah
Dan kebahagiaan selalu ada

✨ Semoga:
Sukses dalam semua hal
Bahagia di setiap saat
Dan mimpi menjadi nyata

💝 Rayakan dengan meriah!`
      },
      {
        id: 5,
        name: 'Energik',
        message: `🎊 Selamat Ulang Tahun! Mari Berpesta! 🎊

🎉 Ini hari ISTIMEWAMU!
🎈 Semoga kamu:
⚡ Penuh energi dan semangat
🌟 Bersinar seperti bintang
🚀 Berani dan tanpa takut
💪 Semakin kuat dan hebat

Mari buat tahun ini LUAR BIASA! 🎁✨`
      }
    ],
    gifKeyword: 'happy birthday'
  },

  'ko': {
    name: 'Korean',
    templates: [
      {
        id: 1,
        name: '클래식',
        message: `🎈 생일 축하합니다!

특별한 날이 가득하기를:
✨ 기쁨과 웃음
🌟 사랑과 행복
🎯 놀라운 선물
💝 아름다운 추억

멋진 한 해가 되시길 바랍니다! 🎁`
      },
      {
        id: 2,
        name: '따뜻한',
        message: `🎂 생일 축하해요!

오늘 이 특별한 날:
🌸 항상 웃음 가득하길
🎵 꿈이 이루어지길
🌈 건강하시길
💖 사랑 가득하길

행복한 하루 보내세요! ✨`
      },
      {
        id: 3,
        name: '심플',
        message: `🎉 생일 축하합니다!

🎈 당신을 위해:
• 매일 행복하세요
• 항상 건강하세요
• 꿈이 이루어지길
• 새로운 모험들

멋진 생일 보내세요! 🎁`
      },
      {
        id: 4,
        name: '시적인',
        message: `🌟 생일 축하합니다!

🎂 당신이 태어난 이 날
별이 빛나기 시작했죠
당신의 길이 밝고
행복이 가득하길

✨ 기원합니다:
모든 일에 성공을
매 순간 기쁨을
그리고 꿈이 현실로

💝 축하합니다!`
      },
      {
        id: 5,
        name: '활기찬',
        message: `🎊 생일 축하합니다! 파티하자! 🎊

🎉 오늘은 당신의 날!
🎈 당신이:
⚡ 열정과 에너지로 가득
🌟 슈퍼스타처럼 빛나길
🚀 대담하고 두려움 없이
💪 더 강하고 멋지게

올해를 전설로 만들어요! 🎁✨`
      }
    ],
    gifKeyword: 'happy birthday'
  },

  'ja': {
    name: 'Japanese',
    templates: [
      {
        id: 1,
        name: 'クラシック',
        message: `🎈 お誕生日おめでとうございます！

素敵な一日になりますように：
✨ 喜びと笑顔
🌟 愛と幸せ
🎯 素晴らしいサプライズ
💝 最高の思い出

素晴らしい一年になりますように！ 🎁`
      },
      {
        id: 2,
        name: 'あたたかい',
        message: `🎂 お誕生日おめでとうございます！

この特別な日に：
🌸 笑顔いっぱいでありますように
🎵 夢が叶いますように
🌈 健康でありますように
💖 愛に満たされますように

素敵な一日をお過ごしください！ ✨`
      },
      {
        id: 3,
        name: 'シンプル',
        message: `🎉 お誕生日おめでとう！

🎈 あなたへ：
• 毎日が幸せでありますように
• いつも健康でいてください
• 夢が叶いますように
• 新しい冒険を

素晴らしい誕生日を！ 🎁`
      },
      {
        id: 4,
        name: '詩的',
        message: `🌟 お誕生日おめでとうございます！

🎂 あなたが生まれた日
星が輝き始めました
あなたの道が明るく
幸せに満ちますように

✨ 願います：
全てにおいて成功を
全ての瞬間に喜びを
そして夢が現実に

💝 お祝いしましょう！`
      },
      {
        id: 5,
        name: 'エネルギッシュ',
        message: `🎊 お誕生日おめでとう！パーティーだ！🎊

🎉 今日は君の特別な日！
🎈 あなたが：
⚡ エネルギーと情熱で満ちている
🌟 スーパースターのように輝く
🚀 大胆で恐れ知らず
💪 もっと強く素晴らしく

今年を伝説にしよう！ 🎁✨`
      }
    ],
    gifKeyword: 'happy birthday'
  },

  'es-ES': {
    name: 'Spanish',
    templates: [
      {
        id: 1,
        name: 'Clásico',
        message: `🎈 ¡Feliz Cumpleaños!

Que tu día especial esté lleno de:
✨ Alegría y risas
🌟 Amor y felicidad
🎯 Sorpresas increíbles
💝 Recuerdos maravillosos

¡Que tengas un año fantástico por delante! 🎁`
      },
      {
        id: 2,
        name: 'Cálido',
        message: `🎂 ¡Feliz Cumpleaños!

En este día especial:
🌸 Que siempre sonrías
🎵 Que tus sueños se cumplan
🌈 Que estés saludable
💖 Que estés lleno de amor

¡Que tengas un día maravilloso! ✨`
      },
      {
        id: 3,
        name: 'Simple',
        message: `🎉 ¡Feliz Cumpleaños!

🎈 Para ti:
• Felicidad cada día
• Salud siempre
• Sueños cumplidos
• Nuevas aventuras

¡Que tu día sea especial! 🎁`
      },
      {
        id: 4,
        name: 'Poético',
        message: `🌟 ¡Feliz Cumpleaños!

🎂 En el día que naciste
Una estrella comenzó a brillar
Que tu camino sea luminoso
Y la felicidad te acompañe

✨ Deseo que:
Tengas éxito en todo
Alegría en cada momento
Y que tus sueños se hagan realidad

💝 ¡Celebra a lo grande!`
      },
      {
        id: 5,
        name: 'Enérgico',
        message: `🎊 ¡Feliz Cumpleaños! ¡A Celebrar! 🎊

🎉 ¡Es TU día especial!
🎈 Que seas:
⚡ Lleno de energía y pasión
🌟 Brillante como una estrella
🚀 Audaz y sin miedo
💪 Más fuerte y mejor

¡Hagamos de este año algo LEGENDARIO! 🎁✨`
      }
    ],
    gifKeyword: 'happy birthday'
  },

  'de': {
    name: 'German',
    templates: [
      {
        id: 1,
        name: 'Klassisch',
        message: `🎈 Alles Gute zum Geburtstag!

Möge dein besonderer Tag erfüllt sein mit:
✨ Freude und Lachen
🌟 Liebe und Glück
🎯 Tollen Überraschungen
💝 Wunderbaren Erinnerungen

Auf ein fantastisches Jahr! 🎁`
      },
      {
        id: 2,
        name: 'Herzlich',
        message: `🎂 Herzlichen Glückwunsch zum Geburtstag!

An diesem besonderen Tag:
🌸 Mögest du immer lächeln
🎵 Mögen deine Träume wahr werden
🌈 Mögest du gesund sein
💖 Mögest du voller Liebe sein

Hab einen wundervollen Tag! ✨`
      },
      {
        id: 3,
        name: 'Einfach',
        message: `🎉 Alles Gute zum Geburtstag!

🎈 Für dich:
• Glück jeden Tag
• Gesundheit immer
• Träume werden wahr
• Neue Abenteuer

Hab einen tollen Geburtstag! 🎁`
      },
      {
        id: 4,
        name: 'Poetisch',
        message: `🌟 Alles Gute zum Geburtstag!

🎂 An dem Tag, als du geboren wurdest
Begann ein Stern zu leuchten
Möge dein Weg hell sein
Und Glück dich begleiten

✨ Ich wünsche dir:
Erfolg in allem
Freude in jedem Moment
Und dass deine Träume wahr werden

💝 Feiere groß!`
      },
      {
        id: 5,
        name: 'Energisch',
        message: `🎊 Alles Gute zum Geburtstag! Lass uns feiern! 🎊

🎉 Es ist DEIN besonderer Tag!
🎈 Mögest du:
⚡ Voller Energie und Leidenschaft sein
🌟 Wie ein Superstar strahlen
🚀 Mutig und furchtlos sein
💪 Stärker und besser werden

Lass uns dieses Jahr LEGENDÄR machen! 🎁✨`
      }
    ],
    gifKeyword: 'happy birthday'
  },

  'th': {
    name: 'Thai',
    templates: [
      {
        id: 1,
        name: 'คลาสสิก',
        message: `🎈 สุขสันต์วันเกิด!

ขอให้วันพิเศษของคุณเต็มไปด้วย:
✨ ความสุขและเสียงหัวเราะ
🌟 ความรักและความสุข
🎯 ความประหลาดใจที่ยอดเยี่ยม
💝 ความทรงจำที่ดี

ขอให้มีปีที่ยอดเยี่ยมข้างหน้า! 🎁`
      },
      {
        id: 2,
        name: 'อบอุ่น',
        message: `🎂 สุขสันต์วันเกิด!

ในวันพิเศษนี้:
🌸 ขอให้ยิ้มแย้มเสมอ
🎵 ขอให้ฝันเป็นจริง
🌈 ขอให้แข็งแรง
💖 ขอให้เต็มไปด้วยความรัก

ขอให้มีวันที่วิเศษ! ✨`
      },
      {
        id: 3,
        name: 'เรียบง่าย',
        message: `🎉 สุขสันต์วันเกิด!

🎈 สำหรับคุณ:
• ความสุขทุกวัน
• สุขภาพดีเสมอ
• ฝันเป็นจริง
• การผจญภัยใหม่ๆ

ขอให้วันของคุณพิเศษ! 🎁`
      },
      {
        id: 4,
        name: 'กวี',
        message: `🌟 สุขสันต์วันเกิด!

🎂 ในวันที่คุณเกิด
ดาวเริ่มส่องแสง
ขอให้เส้นทางของคุณสว่าง
และความสุขอยู่กับคุณ

✨ ขออวยพร:
ประสบความสำเร็จในทุกสิ่ง
มีความสุขในทุกช่วงเวลา
และฝันเป็นจริง

💝 ฉลองกันเถอะ!`
      },
      {
        id: 5,
        name: 'มีพลัง',
        message: `🎊 สุขสันต์วันเกิด! มาปาร์ตี้กัน! 🎊

🎉 วันนี้เป็นวันของคุณ!
🎈 ขอให้คุณ:
⚡ เต็มไปด้วยพลังและความกระตือรือร้น
🌟 เปล่งประกายเหมือนดารา
🚀 กล้าหาญและไม่กลัว
💪 แข็งแกร่งและดีขึ้น

มาทำให้ปีนี้เป็นปีที่ยอดเยี่ยม! 🎁✨`
      }
    ],
    gifKeyword: 'happy birthday'
  }
};

// Get template by language code and template ID
function getBirthdayTemplate(languageCode, templateId = 1) {
  const lang = BIRTHDAY_TEMPLATES[languageCode] || BIRTHDAY_TEMPLATES['en-US'];
  const template = lang.templates.find(t => t.id === templateId) || lang.templates[0];

  return {
    ...template,
    gifKeyword: lang.gifKeyword,
    languageName: lang.name
  };
}

// Get all templates for a language
function getAllTemplatesForLanguage(languageCode) {
  const lang = BIRTHDAY_TEMPLATES[languageCode] || BIRTHDAY_TEMPLATES['en-US'];
  return lang.templates.map(t => ({
    id: t.id,
    name: t.name,
    preview: t.message.substring(0, 100) + '...'
  }));
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
  getAllTemplatesForLanguage,
  getAvailableLanguages
};
