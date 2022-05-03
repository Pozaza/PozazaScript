const Command = require('../../structures/Command');

module.exports = class MarryCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'marry',
			group: 'рп',
			memberName: 'marry',
			description: 'Пожениться с кем-то.',
			args: [
				{
					key: 'user',
					prompt: 'С кем хочешь пожениться?',
					type: 'user'
				}
			]
		});
	}

	async run(msg, { user }) {
			return msg.say(`_**${msg.author.username}** женится на **${user.username}**!_`);
	}
};
