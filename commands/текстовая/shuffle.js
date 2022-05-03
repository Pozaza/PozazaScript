const Command = require('../../structures/Command');
const { shuffle } = require('../../util/Util');

module.exports = class ShuffleCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'shuffle',
			group: 'текстовая',
			memberName: 'shuffle',
			description: 'Взбивает миксером текст.',
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
		return msg.say(shuffle(text.split('')).join(''));
	}
};
