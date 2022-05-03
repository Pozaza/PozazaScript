const Command = require('../../structures/Command');
const { hash } = require('../../util/Util');

module.exports = class MD5Command extends Command {
	constructor(client) {
		super(client, {
			name: 'md5',
			aliases: ['md5-hash'],
			group: 'текстовая',
			memberName: 'md5',
			description: 'Кодирует текст в md5 (но обратно не конвертирует!).',
			args: [
				{
					key: 'text',
					prompt: 'Введи свой текст:',
					type: 'string'
				}
			]
		});
	}

	run(msg, { text }) {
		return msg.say(hash(text, 'md5'));
	}
};
