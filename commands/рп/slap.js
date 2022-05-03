const Command = require('../../structures/Command');

module.exports = class SlapCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'slap',
			group: 'рп',
			memberName: 'slap',
			description: 'Дать пощёчину пользователю',
			args: [
				{
					key: 'user',
					prompt: 'Кому хочешь дать пощёчину?',
					type: 'user'
				}
			]
		});
	}

	async run(msg, { user }) {
			return msg.say(`_**${msg.author.username}** дал пощёчину **${user.username}**._`);
	}
};
