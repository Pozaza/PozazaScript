const Command = require('../../structures/Command');

module.exports = class DivorceCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'divorce',
			group: 'рп',
			memberName: 'divorce',
			description: 'Развестись с кем-то.',
			args: [
				{
					key: 'user',
					prompt: 'С кем хочешь развестись?',
					type: 'user'
				}
			]
		});
	}

	async run(msg, { user }) {
			return msg.say(`_**${msg.author.username}** развёлся с **${user.username}**!_ **F**`);
	}
};
