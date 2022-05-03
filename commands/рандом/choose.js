const Command = require('../../structures/Command');

module.exports = class ChooseCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'choose',
			aliases: ['pick'],
			group: 'рандом',
			memberName: 'choose',
			description: 'Выбирает между твоими вариантами.',
			args: [
				{
					key: 'choices',
					prompt: 'Какие у меня есть варианты для выбора?',
					type: 'string',
					infinite: true,
					max: 1950
				}
			]
		});
	}

	run(msg, { choices }) {
		return msg.say(`Я выбираю... это: ${choices[Math.floor(Math.random() * choices.length)]}.`);
	}
};
