const Command = require('../../structures/Command');

module.exports = class URLEncodeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'url-encode',
			aliases: ['encode-url', 'encode-uri', 'uri-encode', 'encode-uri-component'],
			group: 'текстовая',
			memberName: 'url-encode',
			description: 'Конвертирует текст в правильный для браузера',
			args: [
				{
					key: 'text',
					prompt: 'Введи текст:',
					type: 'string',
					validate: text => {
						if (encodeURIComponent(text).length < 2000) return true;
						return 'Текст слишком большой.';
					}
				}
			]
		});
	}

	run(msg, { text }) {
		return msg.say(encodeURIComponent(text));
	}
};
