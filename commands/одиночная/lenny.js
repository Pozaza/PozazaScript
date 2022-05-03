const Command = require('../../structures/Command');

module.exports = class LennyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'lenny',
			group: 'одиночная',
			memberName: 'lenny',
			description: '( ͡° ͜ʖ ͡°)'
		});
	}

	run(msg) {
		return msg.say('( ͡° ͜ʖ ͡°) ты что-то хотел?');
	}
};
