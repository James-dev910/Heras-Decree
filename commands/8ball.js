const { SlashCommandBuilder } = require('discord.js');

// Classic Magic 8 Ball answers (20 responses)
const ANSWERS = [
  // Positive answers (10)
  { text: 'It is certain.', emoji: '✅', type: 'positive' },
  { text: 'It is decidedly so.', emoji: '✅', type: 'positive' },
  { text: 'Without a doubt.', emoji: '✅', type: 'positive' },
  { text: 'Yes definitely.', emoji: '✅', type: 'positive' },
  { text: 'You may rely on it.', emoji: '✅', type: 'positive' },
  { text: 'As I see it, yes.', emoji: '✨', type: 'positive' },
  { text: 'Most likely.', emoji: '✨', type: 'positive' },
  { text: 'Outlook good.', emoji: '✨', type: 'positive' },
  { text: 'Yes.', emoji: '✅', type: 'positive' },
  { text: 'Signs point to yes.', emoji: '✨', type: 'positive' },

  // Neutral/uncertain answers (5)
  { text: 'Reply hazy, try again.', emoji: '🤔', type: 'neutral' },
  { text: 'Ask again later.', emoji: '🤔', type: 'neutral' },
  { text: 'Better not tell you now.', emoji: '🤔', type: 'neutral' },
  { text: 'Cannot predict now.', emoji: '🤔', type: 'neutral' },
  { text: 'Concentrate and ask again.', emoji: '🤔', type: 'neutral' },

  // Negative answers (5)
  { text: "Don't count on it.", emoji: '❌', type: 'negative' },
  { text: 'My reply is no.', emoji: '❌', type: 'negative' },
  { text: 'My sources say no.', emoji: '❌', type: 'negative' },
  { text: 'Outlook not so good.', emoji: '⚠️', type: 'negative' },
  { text: 'Very doubtful.', emoji: '❌', type: 'negative' },
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('Ask the Magic 8 Ball a yes/no question')
    .addStringOption(option =>
      option
        .setName('question')
        .setDescription('Your yes/no question')
        .setRequired(true)
        .setMaxLength(200)
    ),

  async handle8ball(interaction) {
    const question = interaction.options.getString('question');

    // Validate question ends with "?"
    if (!question.trim().endsWith('?')) {
      await interaction.reply({
        content: '❓ Please ask a question ending with "?"',
        ephemeral: true
      });
      return;
    }

    // Show thinking animation
    await interaction.reply({
      content: '🔮 *The Magic 8 Ball is thinking...*'
    });

    // Wait 1.5 seconds for dramatic effect
    setTimeout(async () => {
      // Randomly select an answer
      const answer = ANSWERS[Math.floor(Math.random() * ANSWERS.length)];

      // Format the response
      const response = `🔮 **The Magic 8 Ball says...**

${answer.emoji} **"${answer.text}"**

💭 Your question: *${question}*`;

      await interaction.editReply({
        content: response
      });
    }, 1500);
  }
};
