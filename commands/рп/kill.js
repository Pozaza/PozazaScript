const Command = require('../../structures/Command');

module.exports = class KillCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'kill',
			group: 'рп',
			memberName: 'kill',
			description: 'Уничтожает пользователя.',
			args: [
				{
					key: 'user',
					prompt: 'Кого ты хочешь уничтожить?',
					type: 'user'
				}
			]
		});
	}

	async run(msg, { user }) {
		return msg.say(`_**${msg.author.username}** уничтожил **${user.username}**._`);
	}
};
