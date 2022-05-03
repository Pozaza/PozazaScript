const Command = require('../../structures/Command');

module.exports = class HexCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'hex',
			aliases: ['hexidecimal'],
			group: 'текстовая',
			memberName: 'hex',
			description: 'Конвертирует текст в hex.',
			args: [
				{
					key: 'text',
					prompt: 'Введи текст:',
					type: 'string',
					validate: text => {
						if (Buffer.from(text).toString('hex').length < 2000) return true;
						return 'Текст слишком большой.';
					}
				}
			]
		});
	}

	run(msg, { text }) {
		return msg.say(Buffer.from(text).toString('hex'));
	}
};
