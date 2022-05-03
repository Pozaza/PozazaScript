const Command = require('../../structures/Command');

module.exports = class PollCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'poll',
			aliases: ['pl'],
			group: 'одиночная',
			memberName: 'poll',
			description: 'Полл',
			args: [
				{
					key: 'messageID',
					prompt: 'Введи айди сообщения',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { messageID }) {
		let channel = await msg.guild.channels.cache.get('959847129126428712');
		console.log(channel.name);
		await channel.messages.fetch(messageID).then(async m => {
			await setTimeout(async () => {
				await m.react("👍");
				await m.react("👎");
			}, 2500)
		}).catch(e => console.log(e));
	}
};
