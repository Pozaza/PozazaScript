const Command = require('../../structures/Command');

module.exports = class KissCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'kiss',
			group: 'рп',
			memberName: 'kiss',
			description: 'Целует пользователя. :*',
			args: [
				{
					key: 'user',
					prompt: 'Кого хочешь поцеловать? :*',
					type: 'user'
				}
			]
		});
	}

	async run(msg, { user }) {
			return msg.say(`_**${msg.author.username}** целует **${user.username}**._ :*`);
	}
};
