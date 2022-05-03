const Command = require('../../structures/Command');
const { MessageButton, MessageActionRow } = require('discord-buttons');
const choices = ['камень', 'ножницы', 'бумага'];

module.exports = class RockPaperScissorsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'rps',
			aliases: ['rps'],
			group: 'игры',
			memberName: 'rps',
			description: 'Камень.. Ножницы.. Бумага!'
		});
	}

	async run(msg) {
    const row = await new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setStyle('gray')
          .setEmoji('🪨')
          .setID('rock'),

        new MessageButton()
          .setStyle('red')
          .setEmoji('✂')
          .setID('scissors'),

        new MessageButton()
          .setStyle('green')
          .setEmoji('📰')
          .setID('paper')
      );
      let messge = await msg.say(`**Выбирай:**`, { components: [row] });
		const response = choices[Math.floor(Math.random() * choices.length)];
    const choise = await messge.awaitButtons((button) => button.clicker.user.id === msg.author.id, { max: 1, time: 10000 });
    if(!choise.size) {
      await messge.edit(`*Это правда такой трудный выбор?..*\n(пользователь слишком долго думал)`, null);
    } 
    else {
      await choise.first().reply.defer();
      switch (choise.first().id) {
        case 'rock':
          if (response === 'камень') {
            await messge.edit(`${msg.author} **выбрал:** 🪨`, null);
            let timer = await new Promise(promise => {setTimeout(promise, 1000)});
            await messge.edit(`${msg.author} **выбрал:** 🪨\n**Я выбрал:** 🪨`, null);
            timer = await new Promise(promise => {setTimeout(promise, 500)});
            await messge.edit(`${msg.author} **выбрал:** 🪨\n**Я выбрал:** 🪨\n\n__Победитель - ничья..__`, null);
          }
			    else if (response === 'бумага') {
            await messge.edit(`${msg.author} **выбрал:** 🪨`, null);
            let timer = await new Promise(promise => {setTimeout(promise, 1000)});
            await messge.edit(`${msg.author} **выбрал:** 🪨\n**Я выбрал:** 📰`, null);
            timer = await new Promise(promise => {setTimeout(promise, 500)});
            await messge.edit(`${msg.author} **выбрал:** 🪨\n**Я выбрал:** 📰\n\n__Победитель - я!__`, null);
          }
			    else if (response === 'ножницы') {
            await messge.edit(`${msg.author} **выбрал:** 🪨`, null);
            let timer = await new Promise(promise => {setTimeout(promise, 1000)});
            await messge.edit(`${msg.author} **выбрал:** 🪨\n**Я выбрал:** ✂`, null);
            timer = await new Promise(promise => {setTimeout(promise, 500)});
            await messge.edit(`${msg.author} **выбрал:** 🪨\n**Я выбрал:** ✂\n\n__Победитель - ${msg.author}!__`, null);
          }
        break
        case 'scissors':
          if (response === 'камень') {
            await messge.edit(`${msg.author} **выбрал:** ✂`, null);
            let timer = await new Promise(promise => {setTimeout(promise, 1000)});
            await messge.edit(`${msg.author} **выбрал:** ✂\n**Я выбрал:** 🪨`, null);
            timer = await new Promise(promise => {setTimeout(promise, 500)});
            await messge.edit(`${msg.author} **выбрал:** ✂\n**Я выбрал:** 🪨\n\n__Победитель - я!__`, null);
          }
			    else if (response === 'бумага') {
            await messge.edit(`${msg.author} **выбрал:** ✂`, null);
            let timer = await new Promise(promise => {setTimeout(promise, 1000)});
            await messge.edit(`${msg.author} **выбрал:** ✂\n**Я выбрал:** 📰`, null);
            timer = await new Promise(promise => {setTimeout(promise, 500)});
            await messge.edit(`${msg.author} **выбрал:** ✂\n**Я выбрал:** 📰\n\n__Победитель - ${msg.author}!__`, null);
          }
			    else if (response === 'ножницы') {
            await messge.edit(`${msg.author} **выбрал:** ✂`, null);
            let timer = await new Promise(promise => {setTimeout(promise, 1000)});
            await messge.edit(`${msg.author} **выбрал:** ✂\n**Я выбрал:** ✂`, null);
            timer = await new Promise(promise => {setTimeout(promise, 500)});
            await messge.edit(`${msg.author} **выбрал:** ✂\n**Я выбрал:** ✂\n\n__Победитель - ничья..__`, null);
          }
        break
        case 'paper':
          if (response === 'камень') {
            await messge.edit(`${msg.author} **выбрал:** 📰`, null);
            let timer = await new Promise(promise => {setTimeout(promise, 1000)});
            await messge.edit(`${msg.author} **выбрал:** 📰\n**Я выбрал:** 🪨`, null);
            timer = await new Promise(promise => {setTimeout(promise, 500)});
            await messge.edit(`${msg.author} **выбрал:** 📰\n**Я выбрал:** 🪨\n\n__Победитель - ${msg.author}!__`, null);
          }
			    else if (response === 'бумага') {
            await messge.edit(`${msg.author} **выбрал:** 📰`, null);
            let timer = await new Promise(promise => {setTimeout(promise, 1000)});
            await messge.edit(`${msg.author} **выбрал:** 📰\n**Я выбрал:** 📰`, null);
            timer = await new Promise(promise => {setTimeout(promise, 500)});
            await messge.edit(`${msg.author} **выбрал:** 📰\n**Я выбрал:** 📰\n\n__Победитель - ничья..__`, null);
          }
			    else if (response === 'ножницы') {
            await messge.edit(`${msg.author} **выбрал:** 📰`, null);
            let timer = await new Promise(promise => {setTimeout(promise, 1000)});
            await messge.edit(`${msg.author} **выбрал:** 📰\n**Я выбрал:** ✂`, null);
            timer = await new Promise(promise => {setTimeout(promise, 500)});
            await messge.edit(`${msg.author} **выбрал:** 📰\n**Я выбрал:** ✂\n\n__Победитель - я!__`, null);
          }
        break
      }
    }
	}
};
