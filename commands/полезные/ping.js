const Command = require('../../structures/Command');
const { stripIndents } = require('common-tags');

module.exports = class PingCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ping',
			aliases: ['pong', 'ping-pong'],
			group: 'полезные',
			memberName: 'ping',
			description: 'Проверяет пинг бота.',
			guarded: true
		});
	}

	async run(msg) {
		const message = await msg.say('Проверяю пинг..');
		const ping = Math.round(message.createdTimestamp - msg.createdTimestamp);
		return message.edit(stripIndents`
			🏓 П${'о'.repeat(Math.ceil(ping / 100))}нг \`${ping}ms\``);
	}
};
