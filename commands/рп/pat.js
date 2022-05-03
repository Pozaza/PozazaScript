const Command = require('../../structures/Command');

module.exports = class PatCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'pat',
			group: 'рп',
			memberName: 'pat',
			description: 'Погладить пользователя. :D',
			args: [
				{
					key: 'user',
					prompt: 'Кого хочешь погладить? :D',
					type: 'user'
				}
			]
		});
	}

	async run(msg, { user }) {
			return msg.say(`_**${msg.author.username}** погладил **${user.username}**._ :D`);
	}
};
