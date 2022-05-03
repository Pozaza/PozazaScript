const Command = require('../../structures/Command');
const sides = ['орёл', 'решка'];

module.exports = class CoinCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'coin',
			aliases: ['coin-flip', 'flip'],
			group: 'рандом',
			memberName: 'coin',
			description: 'Кидает монетку'
		});
	}

	run(msg) {
		return msg.say(`Выпала сторона: ${sides[Math.floor(Math.random() * sides.length)]}.`);
	}
};
