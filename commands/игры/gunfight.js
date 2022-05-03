const Command = require('../../structures/Command');
const { delay, randomRange, verify } = require('../../util/Util');
const words = ['огонь', 'пли', 'банг'];

module.exports = class GunfightCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'gunfight',
			aliases: ['western-gunfight'],
			group: 'игры',
			memberName: 'gunfight',
			description: 'Учавствуйте в перестрелке с игроком!',
			guildOnly: true,
			args: [
				{
					key: 'opponent',
					prompt: 'С каким пользователем ты хочешь сражаться?',
					type: 'user'
				}
			]
		});

		this.fighting = new Set();
	}

	async run(msg, { opponent }) {
		if (opponent.bot) return msg.reply('Боты не могут стреляться! (логично)');
		if (opponent.id === msg.author.id) return msg.reply('Ты не можешь сражаться сам с собой ._.');
		if (this.fighting.has(msg.channel.id)) return msg.reply('Только одна игра может идти в канале.');
		this.fighting.add(msg.channel.id);
		try {
			await msg.say(`${opponent}, ты принимаешь вызов?`);
			const verification = await verify(msg.channel, opponent);
			if (!verification) {
				this.fighting.delete(msg.channel.id);
				return msg.say('Оппонент отказался..');
			}
			await msg.say('Приготовьтесь...');
			await delay(randomRange(1000, 30000));
			const word = words[Math.floor(Math.random() * words.length)];
			await msg.say(`НАПИШИ \`${word.toUpperCase()}\`, ВПЕРЁД!`);
			const filter = res => [opponent.id, msg.author.id].includes(res.author.id) && res.content.toLowerCase() === word;
			const winner = await msg.channel.awaitMessages(filter, {
				max: 1,
				time: 30000
			});
			this.fighting.delete(msg.channel.id);
			if (!winner.size) return msg.say('Оу.. Кажется никто не выйграл.');
			return msg.say(`Победитель - ${winner.first().author}!`);
		} catch (err) {
			this.fighting.delete(msg.channel.id);
			throw err;
		}
	}
};
