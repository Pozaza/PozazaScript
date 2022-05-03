const Command = require('../../structures/Command');

module.exports = class ReverseCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'gay',
			group: 'одиночная',
			memberName: 'gay',
			description: '♂ gay ♂',
			args: [
				{
					key: 'text',
					prompt: '♂ Введи свой текст ♂',
					type: 'string'
				}
			]
		});
	}

	run(msg, { text }) {
		return msg.say(`♂ ${text} ♂`);
	}
};
