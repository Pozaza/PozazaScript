const Command = require('../../structures/Command');

module.exports = class RepeatCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'repeat',
			group: 'текстовая',
			memberName: 'repeat',
			description: 'Повтор текста Повтор текста Повтор текста Повтор текста',
			args: [
				{
					key: 'amount',
					prompt: 'Сколько раз нужно повторить весь текст?',
					type: 'integer',
					min: 1,
					max: 2000
				},
				{
					key: 'text',
					prompt: 'Введи текст:',
					type: 'string',
					validate: text => {
						if (!text.includes('@everyone') && !text.includes('@here')) return true;
						return 'Нельзя вставлять в команду упоминания everyone и here!';
					}
				}
			]
		});
	}

	run(msg, { amount, text }) {
		return msg.say(' ' + text.repeat(amount).substr(0, 2000) + ' ');
	}
};
