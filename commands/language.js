const { SlashCommandBuilder } = require('discord.js');
const { setUserLanguage, getUserLanguage } = require('../user-preferences');
const { languageNames } = require('../i18n');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('language')
    .setDescription('Set your preferred language for notifications')
    .addStringOption(option =>
      option
        .setName('lang')
        .setDescription('Select your preferred language')
        .setRequired(true)
        .addChoices(
          { name: '🇹🇼 繁體中文', value: 'zh-TW' },
          { name: '🇺🇸 English', value: 'en-US' },
          { name: '🇵🇭 Tagalog', value: 'tl' },
          { name: '🇮🇩 Indonesia', value: 'id' },
          { name: '🇰🇷 한국어', value: 'ko' },
          { name: '🇯🇵 日本語', value: 'ja' },
          { name: '🇹🇭 ไทย', value: 'th' },
          { name: '🇪🇸 Español', value: 'es-ES' },
          { name: '🇩🇪 Deutsch', value: 'de' }
        )
    ),

  async handleLanguage(interaction) {
    const language = interaction.options.getString('lang');
    const guildId = interaction.guildId;
    const userId = interaction.user.id;

    setUserLanguage(guildId, userId, language);

    const languageName = languageNames[language];

    const messages = {
      'zh-TW': `✅ 語言設定已更新為：${languageName}\n📝 所有通知訊息現在會以此語言顯示\n💡 你可以隨時使用 /language 更改語言設定`,
      'en-US': `✅ Language setting updated to: ${languageName}\n📝 All notification messages will now be displayed in this language\n💡 You can change your language anytime using /language`,
      'tl': `✅ Na-update na ang setting ng wika sa: ${languageName}\n📝 Ang lahat ng notification ay ipapakita na sa wikang ito\n💡 Maaari mong baguhin ang iyong wika anumang oras gamit ang /language`,
      'id': `✅ Pengaturan bahasa diperbarui ke: ${languageName}\n📝 Semua pesan notifikasi sekarang akan ditampilkan dalam bahasa ini\n💡 Anda dapat mengubah bahasa Anda kapan saja menggunakan /language`,
      'ko': `✅ 언어 설정이 업데이트되었습니다: ${languageName}\n📝 모든 알림 메시지가 이제 이 언어로 표시됩니다\n💡 /language 명령어로 언제든지 언어를 변경할 수 있습니다`,
      'ja': `✅ 言語設定が更新されました: ${languageName}\n📝 すべての通知メッセージがこの言語で表示されます\n💡 /language コマンドでいつでも言語を変更できます`,
      'th': `✅ อัปเดตการตั้งค่าภาษาเป็น: ${languageName}\n📝 ข้อความแจ้งเตือนทั้งหมดจะแสดงในภาษานี้\n💡 คุณสามารถเปลี่ยนภาษาได้ทุกเมื่อโดยใช้ /language`,
      'es-ES': `✅ Configuración de idioma actualizada a: ${languageName}\n📝 Todos los mensajes de notificación se mostrarán en este idioma\n💡 Puedes cambiar tu idioma en cualquier momento usando /language`,
      'de': `✅ Spracheinstellung aktualisiert auf: ${languageName}\n📝 Alle Benachrichtigungen werden nun in dieser Sprache angezeigt\n💡 Du kannst deine Sprache jederzeit mit /language ändern`
    };

    const message = messages[language] || messages['en-US'];

    await interaction.reply({ content: message, ephemeral: true });
  }
};
