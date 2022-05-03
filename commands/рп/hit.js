const Command = require('../../structures/Command');

module.exports = class HitWithShovelCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'hit',
			group: 'рп',
			memberName: 'hit',
			description: 'Ударить пользователя.',
			args: [
				{
					key: 'user',
					prompt: 'Кого ты хочешь ударить?',
					type: 'user'
				}
			]
		});
	}

	async run(msg, { user }) {
		return msg.say(`_**${msg.author.username}** ударил **${user.username}**._ >:)`);
	}
};
