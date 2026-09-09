// Birthday greeting templates for different languages
// Each language has 8 different template versions to choose from

const BIRTHDAY_TEMPLATES = {
  'zh-TW': {
    name: 'Traditional Chinese',
    templates: [
      {
        id: 1,
        name: 'Classic',
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
        name: 'Warm Wishes',
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
        name: 'Simple & Sweet',
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
        name: 'PWL Alert - Level Up',
        message: `🎉 PWL 生日警報！🎂

🚨 @BirthdayPerson 等級提升了！
+1 歲，距離成為古董又近了一步 💀😂

生日快樂！🥳
願你的運氣爆棚，部隊全活，敵人全滅！🔥`
      },
      {
        id: 5,
        name: 'PWL Alert - Stats Update',
        message: `🎂 PWL 生日警報！🚨

大家一起說：生日快樂 @BirthdayPerson！🎉

你獲得了：
• 年齡 +1
• 智慧 +0 😂
• 自信 +100

願你抽卡必出金，部隊不陣亡，敵人好Rally！🔥

🥳 享受你的生日，傳奇玩家！`
      },
      {
        id: 6,
        name: 'PWL Alert - Survival',
        message: `🎉 PWL 生日警報！🎂

🚨 @BirthdayPerson 又存活了一年！

請送上禮物、蛋糕，最好還有資源包 😂
願你的運氣無敵，敵人都是菜雞 🔥

🥳 生日快樂，傳奇！`
      },
      {
        id: 7,
        name: 'PWL Alert - Achievement',
        message: `🎂 PWL 生日警報！🎉

🏆 成就解鎖：@BirthdayPerson 完成了又一年！

新屬性：
• 年齡：+1 ⬆️
• 智慧：存疑 😂
• 帥氣度：滿等 🔥

生日快樂！願你的戰利品都是傳說級！🎁`
      },
      {
        id: 8,
        name: 'PWL Alert - Boss Battle',
        message: `🎉 PWL 生日警報！🎂

⚔️ @BirthdayPerson 擊敗了生日魔王！🐉

勝利獎勵：
• +1 年經驗值
• +無限蛋糕 🍰
• +傳奇稱號 🌟

GG！生日快樂，冠軍！🏆`
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
        name: 'PWL Alert - Level Up',
        message: `🎉 PWL BIRTHDAY ALERT! 🎂

🚨 @BirthdayPerson has leveled up!
+1 year older, +1 year closer to becoming an ancient relic. 💀😂

Happy Birthday! 🥳
May your RNG be blessed, your troops survive, and your enemies burn! 🔥`
      },
      {
        id: 5,
        name: 'PWL Alert - Stats Update',
        message: `🎂 PWL BIRTHDAY ALERT! 🚨

Everyone say HAPPY BIRTHDAY to @BirthdayPerson! 🎉

You've gained:
• Age: +1
• Wisdom: +0 😂
• Confidence: +100

May your pulls be lucky, your troops be safe, and your enemies stay rallyable. 🔥

🥳 Enjoy your day, Birthday Legend!`
      },
      {
        id: 6,
        name: 'PWL Alert - Survival',
        message: `🎉 PWL BIRTHDAY ALERT! 🎂

🚨 @BirthdayPerson has survived another year!

Please send gifts, cake, and preferably RSS. 😂
May your RNG be cracked and your enemies be weak. 🔥

🥳 Happy Birthday, legend!`
      },
      {
        id: 7,
        name: 'PWL Alert - Achievement',
        message: `🎂 PWL BIRTHDAY ALERT! 🎉

🏆 ACHIEVEMENT UNLOCKED: @BirthdayPerson completed another year!

New Stats:
• Age: +1 ⬆️
• Wisdom: Debatable 😂
• Coolness: MAX LEVEL 🔥

Happy Birthday! May your loot be legendary! 🎁`
      },
      {
        id: 8,
        name: 'PWL Alert - Boss Battle',
        message: `🎉 PWL BIRTHDAY ALERT! 🎂

⚔️ @BirthdayPerson has defeated the BIRTHDAY BOSS! 🐉

Victory Rewards:
• +1 Year Experience
• +Infinite Cake 🍰
• +Legendary Status 🌟

GG! Happy Birthday, champion! 🏆`
      }
    ],
    gifKeyword: 'happy birthday party'
  },

  'tl': {
    name: 'Tagalog',
    templates: [
      {
        id: 1,
        name: 'Classic',
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
        name: 'Warm Wishes',
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
        name: 'Simple & Sweet',
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
        name: 'PWL Alert - Level Up',
        message: `🎉 PWL BIRTHDAY ALERT! 🎂

🚨 Nag-level up si @BirthdayPerson!
+1 taon na mas matanda, +1 taon papalapit sa ancient relic 💀😂

Happy Birthday! 🥳
Sana blessed ang RNG mo, ligtas troops mo, at masunog enemies mo! 🔥`
      },
      {
        id: 5,
        name: 'PWL Alert - Stats Update',
        message: `🎂 PWL BIRTHDAY ALERT! 🚨

Sabay-sabay: HAPPY BIRTHDAY kay @BirthdayPerson! 🎉

Nakuha mo:
• Age: +1
• Wisdom: +0 😂
• Confidence: +100

Sana lucky pulls mo, safe troops mo, at rallyable enemies mo! 🔥

🥳 Enjoy ang birthday mo, Legend!`
      },
      {
        id: 6,
        name: 'PWL Alert - Survival',
        message: `🎉 PWL BIRTHDAY ALERT! 🎂

🚨 Nakaligtas si @BirthdayPerson ng isa pang taon!

Paki-send ng gifts, cake, at mas better kung may RSS 😂
Sana cracked RNG mo at mahina enemies mo 🔥

🥳 Happy Birthday, legend!`
      },
      {
        id: 7,
        name: 'PWL Alert - Achievement',
        message: `🎂 PWL BIRTHDAY ALERT! 🎉

🏆 ACHIEVEMENT UNLOCKED: Natapos ni @BirthdayPerson ang isa pang taon!

Bagong Stats:
• Age: +1 ⬆️
• Wisdom: Questionable 😂
• Coolness: MAX LEVEL 🔥

Happy Birthday! Sana legendary loot mo! 🎁`
      },
      {
        id: 8,
        name: 'PWL Alert - Boss Battle',
        message: `🎉 PWL BIRTHDAY ALERT! 🎂

⚔️ Tinalo ni @BirthdayPerson ang BIRTHDAY BOSS! 🐉

Victory Rewards:
• +1 Year Experience
• +Infinite Cake 🍰
• +Legendary Status 🌟

GG! Happy Birthday, champion! 🏆`
      }
    ],
    gifKeyword: 'happy birthday'
  },

  'id': {
    name: 'Indonesian',
    templates: [
      {
        id: 1,
        name: 'Classic',
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
        name: 'Warm Wishes',
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
        name: 'Simple & Sweet',
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
        name: 'PWL Alert - Level Up',
        message: `🎉 PWL BIRTHDAY ALERT! 🎂

🚨 @BirthdayPerson naik level!
+1 tahun lebih tua, +1 tahun lebih dekat jadi barang antik 💀😂

Happy Birthday! 🥳
Semoga RNG kamu blessed, pasukan selamat, musuh terbakar! 🔥`
      },
      {
        id: 5,
        name: 'PWL Alert - Stats Update',
        message: `🎂 PWL BIRTHDAY ALERT! 🚨

Semua ucapkan HAPPY BIRTHDAY untuk @BirthdayPerson! 🎉

Kamu dapat:
• Umur: +1
• Kebijaksanaan: +0 😂
• Percaya Diri: +100

Semoga gacha beruntung, pasukan aman, musuh gampang di-rally! 🔥

🥳 Nikmati harimu, Birthday Legend!`
      },
      {
        id: 6,
        name: 'PWL Alert - Survival',
        message: `🎉 PWL BIRTHDAY ALERT! 🎂

🚨 @BirthdayPerson bertahan satu tahun lagi!

Tolong kirim hadiah, kue, dan lebih baik RSS 😂
Semoga RNG kamu pecah dan musuh lemah 🔥

🥳 Happy Birthday, legend!`
      },
      {
        id: 7,
        name: 'PWL Alert - Achievement',
        message: `🎂 PWL BIRTHDAY ALERT! 🎉

🏆 ACHIEVEMENT UNLOCKED: @BirthdayPerson menyelesaikan tahun lagi!

Stats Baru:
• Umur: +1 ⬆️
• Kebijaksanaan: Diragukan 😂
• Keren-nya: MAX LEVEL 🔥

Happy Birthday! Semoga loot legendary! 🎁`
      },
      {
        id: 8,
        name: 'PWL Alert - Boss Battle',
        message: `🎉 PWL BIRTHDAY ALERT! 🎂

⚔️ @BirthdayPerson mengalahkan BIRTHDAY BOSS! 🐉

Hadiah Kemenangan:
• +1 Tahun Pengalaman
• +Kue Tak Terbatas 🍰
• +Status Legendaris 🌟

GG! Happy Birthday, juara! 🏆`
      }
    ],
    gifKeyword: 'happy birthday'
  },

  'ko': {
    name: 'Korean',
    templates: [
      {
        id: 1,
        name: 'Classic',
        message: `🎈 생일 축하합니다!

특별한 날이 가득하길:
✨ 기쁨과 웃음
🌟 사랑과 행복
🎯 놀라운 선물
💝 아름다운 추억

멋진 한 해가 되길 바랍니다! 🎁`
      },
      {
        id: 2,
        name: 'Warm Wishes',
        message: `🎂 생일 축하해요!

이 특별한 날에:
🌸 웃음이 가득하고
🎵 꿈이 이루어지고
🌈 마음이 가벼워지고
💖 모든 것이 잘 되길

사랑 가득한 하루 보내세요! ✨`
      },
      {
        id: 3,
        name: 'Simple & Sweet',
        message: `🎉 생일 축하합니다!

🎈 당신을 위한 축복:
• 매일 행복
• 항상 건강
• 이루어지는 꿈
• 새로운 모험

당신만큼 멋진 생일 보내세요! 🎁`
      },
      {
        id: 4,
        name: 'PWL Alert - Level Up',
        message: `🎉 PWL 생일 알림! 🎂

🚨 @BirthdayPerson 레벨업!
+1살 더 늙음, +1살 고대 유물에 가까워짐 💀😂

생일 축하해! 🥳
행운이 가득하고, 부대는 생존하고, 적은 불타길! 🔥`
      },
      {
        id: 5,
        name: 'PWL Alert - Stats Update',
        message: `🎂 PWL 생일 알림! 🚨

모두 함께: @BirthdayPerson 생일 축하해! 🎉

획득한 스탯:
• 나이: +1
• 지혜: +0 😂
• 자신감: +100

뽑기 운 좋고, 부대 안전하고, 적은 랠리 가능하길! 🔥

🥳 즐거운 생일 보내, 전설이여!`
      },
      {
        id: 6,
        name: 'PWL Alert - Survival',
        message: `🎉 PWL 생일 알림! 🎂

🚨 @BirthdayPerson이 또 한 해를 생존했다!

선물, 케이크, 그리고 가능하면 자원도 보내주세요 😂
행운 터지고 적은 약하길 🔥

🥳 생일 축하해, 전설!`
      },
      {
        id: 7,
        name: 'PWL Alert - Achievement',
        message: `🎂 PWL 생일 알림! 🎉

🏆 업적 달성: @BirthdayPerson이 한 해를 완료했다!

새 스탯:
• 나이: +1 ⬆️
• 지혜: 의문 😂
• 멋짐: 만렙 🔥

생일 축하! 전설 아이템 득템하길! 🎁`
      },
      {
        id: 8,
        name: 'PWL Alert - Boss Battle',
        message: `🎉 PWL 생일 알림! 🎂

⚔️ @BirthdayPerson이 생일 보스를 격파했다! 🐉

승리 보상:
• +1년 경험치
• +무한 케이크 🍰
• +전설 칭호 🌟

GG! 생일 축하, 챔피언! 🏆`
      }
    ],
    gifKeyword: 'happy birthday'
  },

  'ja': {
    name: 'Japanese',
    templates: [
      {
        id: 1,
        name: 'Classic',
        message: `🎈 お誕生日おめでとうございます！

特別な日が満たされますように：
✨ 喜びと笑顔
🌟 愛と幸せ
🎯 素晴らしい驚き
💝 大切な思い出

素敵な一年になりますように！🎁`
      },
      {
        id: 2,
        name: 'Warm Wishes',
        message: `🎂 お誕生日おめでとう！

この特別な日に：
🌸 笑顔が輝きますように
🎵 夢が叶いますように
🌈 心が軽くなりますように
💖 全てが上手くいきますように

愛に満ちた素敵な一日を！✨`
      },
      {
        id: 3,
        name: 'Simple & Sweet',
        message: `🎉 お誕生日おめでとう！

🎈 あなたへの祝福：
• 毎日幸せ
• いつも健康
• 叶う夢
• 新しい冒険

あなたのような素敵な誕生日を！🎁`
      },
      {
        id: 4,
        name: 'PWL Alert - Level Up',
        message: `🎉 PWL 誕生日アラート！🎂

🚨 @BirthdayPersonがレベルアップ！
+1歳年上、+1歳古代遺物に接近 💀😂

ハッピーバースデー！🥳
運が祝福され、部隊が生き残り、敵が燃えますように！🔥`
      },
      {
        id: 5,
        name: 'PWL Alert - Stats Update',
        message: `🎂 PWL 誕生日アラート！🚨

みんなで：@BirthdayPersonお誕生日おめでとう！🎉

獲得したステータス：
• 年齢：+1
• 知恵：+0 😂
• 自信：+100

ガチャ運良く、部隊安全、敵はラリー可能に！🔥

🥳 楽しい誕生日を、レジェンド！`
      },
      {
        id: 6,
        name: 'PWL Alert - Survival',
        message: `🎉 PWL 誕生日アラート！🎂

🚨 @BirthdayPersonがまた一年生き延びた！

プレゼント、ケーキ、できれば資源も送ってください 😂
運が爆発して敵が弱くなりますように 🔥

🥳 ハッピーバースデー、レジェンド！`
      },
      {
        id: 7,
        name: 'PWL Alert - Achievement',
        message: `🎂 PWL 誕生日アラート！🎉

🏆 実績解除：@BirthdayPersonがまた一年完了！

新ステータス：
• 年齢：+1 ⬆️
• 知恵：不明 😂
• カッコよさ：最大レベル 🔥

ハッピーバースデー！伝説の戦利品を！🎁`
      },
      {
        id: 8,
        name: 'PWL Alert - Boss Battle',
        message: `🎉 PWL 誕生日アラート！🎂

⚔️ @BirthdayPersonが誕生日ボスを倒した！🐉

勝利報酬：
• +1年の経験値
• +無限ケーキ 🍰
• +伝説の称号 🌟

GG！ハッピーバースデー、チャンピオン！🏆`
      }
    ],
    gifKeyword: 'happy birthday'
  },

  'es-ES': {
    name: 'Spanish',
    templates: [
      {
        id: 1,
        name: 'Classic',
        message: `🎈 ¡Feliz cumpleaños!

Que tu día especial esté lleno de:
✨ Alegría y risas
🌟 Amor y felicidad
🎯 Sorpresas increíbles
💝 Recuerdos maravillosos

¡Por un año fantástico por delante! 🎁`
      },
      {
        id: 2,
        name: 'Warm Wishes',
        message: `🎂 ¡Feliz cumpleaños!

En este día especial:
🌸 Que tu sonrisa brille
🎵 Que tus sueños vuelen
🌈 Que tu corazón sea ligero
💖 Que todo salga bien

¡Te deseo un día lleno de amor! ✨`
      },
      {
        id: 3,
        name: 'Simple & Sweet',
        message: `🎉 ¡Feliz cumpleaños!

🎈 Te deseo:
• Felicidad cada día
• Salud siempre
• Sueños que se hacen realidad
• Aventuras nuevas

¡Espero que tu cumpleaños sea tan increíble como tú! 🎁`
      },
      {
        id: 4,
        name: 'PWL Alert - Level Up',
        message: `🎉 ¡ALERTA DE CUMPLEAÑOS PWL! 🎂

🚨 ¡@BirthdayPerson subió de nivel!
+1 año más viejo, +1 año más cerca de ser una reliquia 💀😂

¡Feliz cumpleaños! 🥳
¡Que tu RNG sea bendecido, tus tropas sobrevivan y tus enemigos ardan! 🔥`
      },
      {
        id: 5,
        name: 'PWL Alert - Stats Update',
        message: `🎂 ¡ALERTA DE CUMPLEAÑOS PWL! 🚨

¡Todos digan FELIZ CUMPLEAÑOS a @BirthdayPerson! 🎉

Has ganado:
• Edad: +1
• Sabiduría: +0 😂
• Confianza: +100

¡Que tus pulls sean afortunados, tus tropas seguras y tus enemigos ralleable! 🔥

🥳 ¡Disfruta tu día, Leyenda de Cumpleaños!`
      },
      {
        id: 6,
        name: 'PWL Alert - Survival',
        message: `🎉 ¡ALERTA DE CUMPLEAÑOS PWL! 🎂

🚨 ¡@BirthdayPerson sobrevivió otro año!

Por favor envíen regalos, pastel, y preferiblemente RSS 😂
Que tu RNG sea perfecto y tus enemigos débiles 🔥

🥳 ¡Feliz cumpleaños, leyenda!`
      },
      {
        id: 7,
        name: 'PWL Alert - Achievement',
        message: `🎂 ¡ALERTA DE CUMPLEAÑOS PWL! 🎉

🏆 LOGRO DESBLOQUEADO: ¡@BirthdayPerson completó otro año!

Nuevas Stats:
• Edad: +1 ⬆️
• Sabiduría: Discutible 😂
• Genialidad: NIVEL MÁXIMO 🔥

¡Feliz cumpleaños! ¡Que tu botín sea legendario! 🎁`
      },
      {
        id: 8,
        name: 'PWL Alert - Boss Battle',
        message: `🎉 ¡ALERTA DE CUMPLEAÑOS PWL! 🎂

⚔️ ¡@BirthdayPerson derrotó al JEFE DE CUMPLEAÑOS! 🐉

Recompensas de Victoria:
• +1 Año de Experiencia
• +Pastel Infinito 🍰
• +Estado Legendario 🌟

¡GG! ¡Feliz cumpleaños, campeón! 🏆`
      }
    ],
    gifKeyword: 'happy birthday'
  },

  'de': {
    name: 'German',
    templates: [
      {
        id: 1,
        name: 'Classic',
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
        name: 'Warm Wishes',
        message: `🎂 Herzlichen Glückwunsch zum Geburtstag!

An diesem besonderen Tag:
🌸 Möge dein Lächeln hell strahlen
🎵 Mögen deine Träume fliegen
🌈 Möge dein Herz leicht sein
💖 Möge alles gut gehen

Einen wundervollen Tag voller Liebe! ✨`
      },
      {
        id: 3,
        name: 'Simple & Sweet',
        message: `🎉 Alles Gute zum Geburtstag!

🎈 Ich wünsche dir:
• Glück jeden Tag
• Gesundheit immer
• Träume die wahr werden
• Neue Abenteuer

Ich hoffe, dein Geburtstag ist so großartig wie du! 🎁`
      },
      {
        id: 4,
        name: 'PWL Alert - Level Up',
        message: `🎉 PWL GEBURTSTAGS-ALARM! 🎂

🚨 @BirthdayPerson ist aufgestiegen!
+1 Jahr älter, +1 Jahr näher am antiken Relikt 💀😂

Alles Gute zum Geburtstag! 🥳
Möge dein RNG gesegnet sein, deine Truppen überleben und deine Feinde brennen! 🔥`
      },
      {
        id: 5,
        name: 'PWL Alert - Stats Update',
        message: `🎂 PWL GEBURTSTAGS-ALARM! 🚨

Alle sagen ALLES GUTE ZUM GEBURTSTAG zu @BirthdayPerson! 🎉

Du hast gewonnen:
• Alter: +1
• Weisheit: +0 😂
• Selbstvertrauen: +100

Mögen deine Pulls glücklich sein, deine Truppen sicher und deine Feinde rallyfähig! 🔥

🥳 Genieße deinen Tag, Geburtstags-Legende!`
      },
      {
        id: 6,
        name: 'PWL Alert - Survival',
        message: `🎉 PWL GEBURTSTAGS-ALARM! 🎂

🚨 @BirthdayPerson hat ein weiteres Jahr überlebt!

Bitte sendet Geschenke, Kuchen und vorzugsweise RSS 😂
Möge dein RNG perfekt sein und deine Feinde schwach 🔥

🥳 Alles Gute zum Geburtstag, Legende!`
      },
      {
        id: 7,
        name: 'PWL Alert - Achievement',
        message: `🎂 PWL GEBURTSTAGS-ALARM! 🎉

🏆 ERFOLG FREIGESCHALTET: @BirthdayPerson hat ein weiteres Jahr abgeschlossen!

Neue Stats:
• Alter: +1 ⬆️
• Weisheit: Fraglich 😂
• Coolness: MAX LEVEL 🔥

Alles Gute zum Geburtstag! Möge deine Beute legendär sein! 🎁`
      },
      {
        id: 8,
        name: 'PWL Alert - Boss Battle',
        message: `🎉 PWL GEBURTSTAGS-ALARM! 🎂

⚔️ @BirthdayPerson hat den GEBURTSTAGS-BOSS besiegt! 🐉

Siegesbelohnungen:
• +1 Jahr Erfahrung
• +Unendlicher Kuchen 🍰
• +Legendärer Status 🌟

GG! Alles Gute zum Geburtstag, Champion! 🏆`
      }
    ],
    gifKeyword: 'happy birthday'
  },

  'th': {
    name: 'Thai',
    templates: [
      {
        id: 1,
        name: 'Classic',
        message: `🎈 สุขสันต์วันเกิด!

ขอให้วันพิเศษของคุณเต็มไปด้วย:
✨ ความสุขและเสียงหัวเราะ
🌟 ความรักและความสุข
🎯 เซอร์ไพรส์ที่น่าทึ่ง
💝 ความทรงจำที่วิเศษ

ขอให้ปีหน้ายอดเยี่ยม! 🎁`
      },
      {
        id: 2,
        name: 'Warm Wishes',
        message: `🎂 สุขสันต์วันเกิด!

ในวันพิเศษนี้:
🌸 ขอให้รอยยิ้มสดใส
🎵 ขอให้ความฝันเป็นจริง
🌈 ขอให้หัวใจเบาสบาย
💖 ขอให้ทุกอย่างเป็นไปด้วยดี

ขอให้มีวันที่เต็มไปด้วยความรัก! ✨`
      },
      {
        id: 3,
        name: 'Simple & Sweet',
        message: `🎉 สุขสันต์วันเกิด!

🎈 ขออวยพร:
• ความสุขทุกวัน
• สุขภาพแข็งแรง
• ความฝันเป็นจริง
• การผจญภัยใหม่

ขอให้วันเกิดของคุณยอดเยี่ยมเหมือนตัวคุณ! 🎁`
      },
      {
        id: 4,
        name: 'PWL Alert - Level Up',
        message: `🎉 แจ้งเตือนวันเกิด PWL! 🎂

🚨 @BirthdayPerson เลเวลอัพแล้ว!
+1 ปีแก่ขึ้น +1 ปีใกล้เป็นของโบราณ 💀😂

สุขสันต์วันเกิด! 🥳
ขอให้ RNG เจริญ ทหารรอด ศัตรูไหม้! 🔥`
      },
      {
        id: 5,
        name: 'PWL Alert - Stats Update',
        message: `🎂 แจ้งเตือนวันเกิด PWL! 🚨

ทุกคนพูดพร้อมกัน: สุขสันต์วันเกิด @BirthdayPerson! 🎉

คุณได้รับ:
• อายุ: +1
• ภูมิปัญญา: +0 😂
• ความมั่นใจ: +100

ขอให้สุ่มโชคดี ทหารปลอดภัย ศัตรู rally ได้! 🔥

🥳 สนุกกับวันของคุณ ตำนานวันเกิด!`
      },
      {
        id: 6,
        name: 'PWL Alert - Survival',
        message: `🎉 แจ้งเตือนวันเกิด PWL! 🎂

🚨 @BirthdayPerson รอดชีวิตอีกหนึ่งปี!

กรุณาส่งของขวัญ เค้ก และดีที่สุดคือ RSS 😂
ขอให้ RNG แตก ศัตรูอ่อนแอ 🔥

🥳 สุขสันต์วันเกิด ตำนาน!`
      },
      {
        id: 7,
        name: 'PWL Alert - Achievement',
        message: `🎂 แจ้งเตือนวันเกิด PWL! 🎉

🏆 ปลดล็อกความสำเร็จ: @BirthdayPerson ผ่านไปอีกหนึ่งปี!

สถิติใหม่:
• อายุ: +1 ⬆️
• ภูมิปัญญา: น่าสงสัย 😂
• ความเท่: เต็มเลเวล 🔥

สุขสันต์วันเกิด! ขอให้ได้ของตำนาน! 🎁`
      },
      {
        id: 8,
        name: 'PWL Alert - Boss Battle',
        message: `🎉 แจ้งเตือนวันเกิด PWL! 🎂

⚔️ @BirthdayPerson เอาชนะบอสวันเกิดแล้ว! 🐉

รางวัลชัยชนะ:
• +1 ปีประสบการณ์
• +เค้กไม่จำกัด 🍰
• +สถานะตำนาน 🌟

GG! สุขสันต์วันเกิด แชมป์! 🏆`
      }
    ],
    gifKeyword: 'happy birthday'
  }
};

// Get a specific birthday template
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
