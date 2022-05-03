const Command = require('../../structures/Command');
const { stripIndents } = require('common-tags');
const opinions = ['👍', '👎'];

module.exports = class OpinionCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'opinion',
			group: 'рандом',
			memberName: 'opinion',
			description: 'Делает выбор между вариантами.',
			args: [
				{
					key: 'question',
					prompt: 'Между чем мне выбрать?',
					type: 'string',
					max: 1950
				}
			]
		});
	}

	run(msg, { question }) {
		return msg.say(stripIndents`
			${question}
			${opinions[Math.floor(Math.random() * opinions.length)]}
		`);
	}
};
