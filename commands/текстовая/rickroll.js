const Command = require('../../structures/Command');

module.exports = class LatlmesCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'rickroll',
			group: 'текстовая',
			memberName: 'rickroll',
			description: 'Создаёт фейк-ссылку, которая ведёт на мем с Рикроллом)',
			args: [
				{
					key: 'section',
					prompt: 'Напиши текст, который будет в оглавлении.',
					type: 'string',
					max: 100,
					parse: query => encodeURIComponent(query.replace(/ /g, '-').toLowerCase())
				},
				{
					key: 'query',
					prompt: 'Как должна называться часть ссылки?',
					type: 'string',
					max: 500,
					parse: query => encodeURIComponent(query.replace(/ /g, '-').toLowerCase())
				}
			]
		});
	}

	run(msg, { section, query }) {
		return msg.say(`http://www.latlmes.com/${section}/${query}-1`);
	}
};
