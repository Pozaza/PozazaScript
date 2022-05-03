const Command = require('../../structures/Command');
const { delay } = require('../../util/Util');
const frames = [
  '⋙_',
  '⋙',
  '⋙_',
  '⋙',
  '⋙_',
  '⋙',
  '⋙В',
  '⋙Вз',
  '⋙Взл',
  '⋙Взло',
  '⋙Взлом',
  '⋙Взлома',
  '⋙Взломай',
  '⋙Взломай _',
  '⋙Взломай п',
  '⋙Взломай пе',
  '⋙Взломай пен',
  '⋙Взломай пент',
  '⋙Взломай пента',
  '⋙Взломай пентаг',
  '⋙Взломай пентаго',
  '⋙Взломай пентагон',
  '⋙Взломай пентагон_',
  '⋙Взломай пентагон',
  '⋙Взломай пентагон_',
  'Нет',
  'Нет лол',
  'Нет лол >:)'
];

module.exports = class TableflipCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'hack-pentagon',
			group: 'анимации',
			memberName: 'hack-pentagon',
			description: 'Ломаем пентагон))'
		});
	}

	async run(msg) {
		const message = await msg.say('⋙');
		for (const frame of frames) {
			await delay(900);
			await message.edit(frame);
		}
		return message;
	}
};