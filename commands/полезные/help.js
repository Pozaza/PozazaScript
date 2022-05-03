const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = class HelpCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'help',
			aliases: ['commands', 'command-list'],
			group: 'полезные',
			memberName: 'help',
			description: 'Показывает список команд (логично).',
			guarded: true,
			args: [
				{
					key: 'command',
					prompt: 'Какую комманду ты хочешь изучить?',
					type: 'command',
					default: ''
				}
			]
		});
	}

	async run(msg, { command }) {
		if (!command) {
			const embed = new MessageEmbed()
				.setTitle('Список команд:')
				.setDescription(`Используй ${msg.usage('<команда>')} чтобы посмотреть подробную информацию о команде.`)
				.setColor(0x00AE86)
				.setFooter(`${this.client.registry.commands.size} команд всего.`);
			for (const group of this.client.registry.groups.values()) {
				embed.addField(`❯ ${group.name}`, group.commands.map(cmd => cmd.name).join(', ') || 'None');
			}
			try {
				const msgs = [];
				msgs.push(await msg.direct({ embed }));
				if (msg.channel.type !== 'dm') msgs.push(await msg.say('📬 Выслал тебе список команд в личку.'));
				return msgs;
			} catch (err) {
				return msg.reply('И как я тебе отправлю список команд? Ты отключил личные сообщения! >:(');
			}
		}
		return msg.say(stripIndents`
			**Команда:** __${command.name}__${command.guildOnly ? ' (используется только на серверах)' : ''}
			**Описание:** ${command.description}${command.details ? `\n_${command.details}_` : ''}
			**Формат**: ${msg.anyUsage(`${command.name}`)}
			**Сокращённое использование**: ${command.aliases.join(', ') || 'None'}
		`);
	}
};
