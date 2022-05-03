const Command = require('../../structures/Command');
const { list } = require('../../util/Util');
const modes = ['закодировать', 'декодировать'];

module.exports = class BinaryCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'binary',
			group: 'текстовая',
			memberName: 'binary',
			description: 'Конвертирует в бинарный код.',
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
					prompt: 'Какой текст ты хочешь конвертировать в бинарный код?',
					type: 'string',
					validate: text => {
						if (this.binary(text).length < 2000) return true;
						return 'Текст слишком большой.';
					}
				}
			]
		});
	}

	run(msg, { mode, text }) { // eslint-disable-line consistent-return
		if (mode === 'закодировать') return msg.say(this.binary(text));
		else if (mode === 'декодировать') return msg.say(this.unbinary(text));
	}

	binary(text) {
		return text.split('').map(str => {
			const converted = str.charCodeAt(0).toString(2);
			return converted.padStart(8, '0');
		}).join(' ');
	}

	unbinary(text) {
		return text.split(' ').map(str => String.fromCharCode(Number.parseInt(str, 2))).join('');
	}
};
