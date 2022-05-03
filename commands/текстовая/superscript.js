const Command = require('../../structures/Command');
const { letterTrans } = require('custom-translate');
const dictionary = require('../../assets/json/superscript');

module.exports = class SuperscriptCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'superscript',
			aliases: ['tiny-text', 'small-text'],
			group: 'текстовая',
			memberName: 'superscript',
			description: 'Конвертирует текст в маленький.',
			args: [
				{
					key: 'text',
					prompt: 'Введи текст:',
					type: 'string'
				}
			]
		});
	}

	run(msg, { text }) {
		return msg.say(letterTrans(text, dictionary));
	}
};
