const Command = require('../../structures/Command');
const faces = ['(・`ω´・)', ';;w;;', 'owo', 'UwU', '>w<', '^w^'];

module.exports = class OwOCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'owo',
			group: 'текстовая',
			memberName: 'owo',
			description: 'OwO.',
			args: [
				{
					key: 'text',
					prompt: 'Введи свой текст OwO:',
					type: 'string',
					validate: text => {
						if (this.owo(text).length < 2000) return true;
						return 'Текст слишком большой.';
					}
				}
			]
		});
	}

	run(msg, { text }) {
		return msg.say(this.owo(text));
	}

	owo(text) {
		return text
			.replace(/(?:ш|с)/g, 'ф')
			.replace(/(?:Ш|С)/g, 'Ф')
      .replace(/(?:л|р|ж)/g, 'в')
      .replace(/(?:Л|Р|Ж)/g, 'В')
			.replace(/люблю/g, 'любвю')
			.replace(/!+/g, ` ${faces[Math.floor(Math.random() * faces.length)]} `)
			.trim();
	}
};
