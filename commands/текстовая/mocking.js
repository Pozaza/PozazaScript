const Command = require('../../structures/Command');
const { MOCKING_EMOJI_ID } = process.env;

module.exports = class MockingCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'mocking',
			aliases: ['mock'],
			group: 'текстовая',
			memberName: 'mocking',
			description: 'ДеЛаЕт ТеКсТ тАкИм.',
			clientPermissions: ['USE_EXTERNAL_EMOJIS'],
			args: [
				{
					key: 'text',
					prompt: 'ВвЕдИ тЕкСт:',
					type: 'string',
					max: 1950,
					parse: text => text.toLowerCase().split('')
				}
			]
		});
	}

	run(msg, { text }) {
		for (let i = 0; i < text.length; i += Math.floor(Math.random() * 4)) text[i] = text[i].toUpperCase();
		return msg.say(`${text.join('')}`);
	}
};