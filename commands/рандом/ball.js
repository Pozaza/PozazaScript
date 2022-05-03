const Command = require('../../structures/Command');
const answers = require('../../assets/json/magic-conch');

module.exports = class MagicConchCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ball',
			aliases: ['ball','8ball', 'шар'],
			group: 'рандом',
			memberName: 'ball',
			description: 'Банальный вопрос - очевидный ответ',
			args: [
				{
					key: 'question',
					prompt: 'Что ты хочешь спросить?',
					type: 'string',
					max: 1000
				}
			]
		});
	}

	run(msg, { question }) {
		return msg.say(`\`- "${question}"\`\n\n**- ${answers[Math.floor(Math.random() * answers.length)]}**`);
	}
};
