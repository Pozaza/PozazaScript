const Command = require('../../structures/Command');
const { delay } = require('../../util/Util');
const frames = [
	'[Инициализация.]',
	'[Инициализация..]',
  '[Инициализация...]',
  '[Инициализация]',
  '[Инициализация.]',
	'[Инициализация..]',
  '[Инициализация...]',
  'Взламываю тебя [...........] 0%',
  'Взламываю тебя [...........] 1%',
  'Взламываю тебя [...........] 5%',
  'Взламываю тебя [I..........] 10%',
  'Взламываю тебя [III........] 22%',
  'Взламываю тебя [IIIIIIII...] 75%',
  'Взламываю тебя [IIIIIIIII..] 87%',
  'Взламываю тебя [IIIIIIIII..] 89%',
  'Взламываю тебя [IIIIIIIIII.] 90%',
  'Взламываю тебя [IIIIIIIIII.] 92%',
  'Взламываю тебя [IIIIIIIIIII] 97%',
  'Успешно стырил у тебя все деньги с банка >:3'
];

module.exports = class TableflipCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'hack',
			group: 'анимации',
			memberName: 'hack',
			description: 'Анимация взлома.'
		});
	}

	async run(msg) {
		const message = await msg.say('[Инициализация]');
		for (const frame of frames) {
			await delay(900);
			await message.edit(frame);
		}
		return message;
	}
};
