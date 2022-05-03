const Command = require('../../structures/Command');
const { hash } = require('../../util/Util');

module.exports = class SHA256Command extends Command {
	constructor(client) {
		super(client, {
			name: 'sha256',
			aliases: ['sha256-hash'],
			group: 'текстовая',
			memberName: 'sha256',
			description: 'Создаёт хэш с конвертером sha256.',
			args: [
				{
					key: 'text',
					prompt: 'Укажи свой текст:',
					type: 'string'
				}
			]
		});
	}

	run(msg, { text }) {
		return msg.say(hash(text, 'sha256'));
	}
};
