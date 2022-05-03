const Command = require('../../structures/Command');

module.exports = class PatCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'save',
			group: 'рп',
			memberName: 'save',
			description: 'Спасти пользователя 😌',
			args: [
				{
					key: 'user',
					prompt: 'Кого хочешь спасти? ☺️',
					type: 'user'
				}
			]
		});
	}

	async run(msg, { user }) {
			return msg.say(`_**${msg.author.username}** спас **${user.username}**.._ ☺️`);
	}
};
