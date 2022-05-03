const Command = require('../../structures/Command');
const { delay } = require('../../util/Util');
const frames = [
	'(-°□°)-  ┬─┬',
	'(╯°□°)╯    ]',
	'(╯°□°)╯  ︵  ┻━┻',
	'(╯°□°)╯       [',
	'(╯°□°)╯           ┬─┬',
  '(-°□°)-           ┬─┬',
  '(\\0_0)\\           ┬─┬'
];

module.exports = class TableflipCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'tableflip',
			aliases: ['a-tableflip', 'tableflip-animated', 'tableflip-a'],
			group: 'анимации',
			memberName: 'tableflip',
			description: 'Анимация бросания стола! :)'
		});
	}

	async run(msg) {
		const message = await msg.say('(\\\°□°)\\  ┬─┬');
		for (const frame of frames) {
			await delay(900);
			await message.edit(frame);
		}
		return message;
	}
};
