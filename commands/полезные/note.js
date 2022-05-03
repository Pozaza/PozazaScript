const Command = require('../../structures/Command');
const Database = require("@replit/database");
const db = new Database()
const modes = ['show', 'write', 'delete'];

module.exports = class BanCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'note',
			group: 'полезные',
			memberName: 'note',
			description: 'Сохранить заметку. (Можно сохранить только одну)',
      guildOnly: true,
      details: `**Режимы**: ${modes.join(', ')}`,
			throttling: {
				usages: 1,
				duration: 3
			},
			args: [
        {
					key: 'type',
					prompt: 'Показать или записать, а может удалить? <show/write/delete>',
					type: 'string',
          min: 4,
          max: 6
				},
        {
					key: 'text',
					prompt: 'Текст заметки.',
					type: 'string',
          min: 1,
          max: 1985,
          default: ''
				}
			]
		});
	}

	async run(msg, { text , type }) {
    if (type == "write" && !text)
    {
      msg.reply("Введи текст заметки!");
    }

    else if (type == "write" && text != "") {
      db.set(`${msg.author.id}`, `${text}`).then(() => {msg.reply("Заметка успешно сохранена. (Показать: pnote show)")});
    };

    if (type == "show") {
      db.get(`${msg.author.id}`).then(value => {
        if (!value) msg.reply(`У вас нету заметки..`);
        else msg.reply(`Ваша заметка: ${value}`)
      });
    };

    if (type == "delete") {
      db.get(`${msg.author.id}`).then(value => {
        if (value == null) msg.reply(`У вас нету заметки..`);
        else db.delete(`${msg.author.id}`).then(() => {msg.reply(`Заметка успешно удалена!`)});
      });
    };
	}
};