const Command = require('../../structures/Command');
const { delay } = require('../../util/Util');
const frames = [
  '⍓',
  '⍄',
  '⍌',
  '⍃',
  '⍓',
  '⍄',
  '⍌',
  'Всё.'
];

module.exports = class TableflipCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'spin',
			group: 'анимации',
			memberName: 'spin',
			description: 'Ю спин ми райт нау бэби райт нау'
		});
	}

	async run(msg) {
		const message = await msg.say('⍃');
		for (const frame of frames) {
			await delay(900);
			await message.edit(frame);
		}
		return message;
	}
};
