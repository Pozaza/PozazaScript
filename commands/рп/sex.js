const Command = require('../../structures/Command');

module.exports = class SexCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'sex',
			group: 'рп',
			memberName: 'sex',
			description: 'Заняться любовью',
			args: [
				{
					key: 'user',
					prompt: 'С кем ты хочешь заняться любовью?',
					type: 'user'
				}
			]
		});
	}

	async run(msg, { user }) {
			return msg.say(`_**${msg.author.username}** занялся любовью с **${user.username}**!_ о_0`);
	}
};
