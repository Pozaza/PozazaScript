const Command = require('../../structures/Command');

module.exports = class HiCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'hi',
			aliases: ['hello', 'hey', 'hoi', 'hola'],
			group: 'одиночная',
			memberName: 'hi',
			description: 'Привет?'
		});
	}

	async run(msg) {
		try {
			await msg.react('👋');
		} catch (err) {
			return msg.reply('Прива!');
		}
	}
};
