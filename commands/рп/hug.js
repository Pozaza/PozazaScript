const Command = require('../../structures/Command');
const { randomFromImgurAlbum } = require('../../util/Util');

module.exports = class CuddleCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'hug',
			group: 'рп',
			memberName: 'hug',
			description: 'Обнять пользователя :3',
			args: [
				{
					key: 'user',
					prompt: 'Кого ты хочешь обнять? :3',
					type: 'user'
				}
			]
		});
	}

	async run(msg, { user }) {
		return msg.say(`_**${msg.author.username}** обнял **${user.username}**_ :3`);
	}
};
