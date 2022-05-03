const Command = require('../../structures/Command');

module.exports = class ReverseCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'reverse',
			group: 'текстовая',
			memberName: 'reverse',
			description: '?тевирП',
			args: [
				{
					key: 'text',
					prompt: 'Введи свой текст',
					type: 'string'
				}
			]
		});
	}

	run(msg, { text }) {
		return msg.say(text.split('').reverse().join(''));
	}
};
