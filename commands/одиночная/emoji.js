const Discord = require("discord.js");
const { parse } = require("twemoji-parser");
const { MessageEmbed } = require("discord.js");
const Command = require('../../structures/Command');

module.exports = class ReverseCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'emoji',
			group: 'одиночная',
			memberName: 'emoji',
			description: 'Конвертирует эмодзи сервера в png/gif',
			args: [
				{
					key: 'emoji',
					prompt: 'Отправь корректное эмодзи.',
					type: 'string'
				}
			]
		});
	}

	run(message, { emoji }) {
    if (!emoji) return message.channel.send(`Введи эмодзи!`);

    let customemoji = Discord.Util.parseEmoji(emoji);

    if (customemoji.id) {
      const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
        customemoji.animated ? "gif" : "png"
      }`;
      
      const Added = new MessageEmbed()
        .setTitle(`Эмодзи конвертер`)
        .setColor(`GREEN`)
        .addField('Ссылка:', `(${Link})`)
        .setImage(Link);
      return message.channel.send(Added);
    } else {
      let CheckEmoji = parse(emoji, { assetType: "png" });
      if (!CheckEmoji[0])
        return message.channel.send(`Введи корректное эмодзи!`);
      message.channel.send(
        `Ты можешь использовать обычные эмодзи без добавления на сервер!`
      );
    }
	}
};
