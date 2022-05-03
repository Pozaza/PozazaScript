const Command = require('../../structures/Command');

module.exports = class ShipNameCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ship-name',
			group: 'текстовая',
			memberName: 'ship-name',
			description: 'Связывает два имени.',
			args: [
				{
					key: 'start',
					label: 'start name',
					prompt: 'Какое начальное имя должно быть?',
					type: 'string',
					max: 500,
					parse: start => start.toLowerCase()
				},
				{
					key: 'end',
					label: 'end name',
					prompt: 'Какое конечное имя?',
					type: 'string',
					max: 500,
					parse: end => end.toLowerCase()
				}
			]
		});
	}

	run(msg, { start, end }) {
		return msg.say(`${start.slice(0, Math.floor(start.length / 2))}${end.slice(Math.floor(end.length / 2))}`);
	}
};
