const Command = require('../../structures/Command');
const { list, base64 } = require('../../util/Util');
const modes = ['закодировать', 'декодировать'];

module.exports = class Base64Command extends Command {
	constructor(client) {
		super(client, {
			name: 'base64',
			aliases: ['base-64'],
			group: 'текстовая',
			memberName: 'base64',
			description: 'Конвертирует текст в base64 код',
			details: `**Режимы**: ${modes.join(', ')}`,
			args: [
				{
					key: 'mode',
					prompt: `Ты хочешь ${list(modes, 'или')}?`,
					type: 'string',
					oneOf: modes,
					parse: mode => mode.toLowerCase()
				},
				{
					key: 'text',
					prompt: 'Что хочешь конвертировать?',
					type: 'string',
					validate: text => {
						if (base64(text).length < 2000) return true;
						return 'Текст слишком большой.';
					}
				}
			]
		});
	}

	run(msg, { mode, text }) {
		const converted = base64(text, mode);
		if (!converted) return msg.reply('Некорректный выбор.');
		return msg.say(converted);
	}
};
