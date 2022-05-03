const Command = require('../../structures/Command');
const { stripIndents } = require('common-tags');
const { randomRange } = require('../../util/Util');
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = class BattleCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'battle',
      aliases: ['fight', 'dungeon-fight'],
      group: 'игры',
      memberName: 'battle',
      description: 'Сразись со мной! (или с другим участником) >:)',
      args: [
        {
          key: 'opponent',
          prompt: 'С каким игроком ты хочешь сразиться?',
          type: 'user',
          default: () => this.client.user
        }
      ]
    });

    this.fighting = new Set();
  }

  async run(msg, { opponent }) {
    const row = await new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setStyle('red')
          .setEmoji('⚔')
          .setID('attack'),

        new MessageButton()
          .setStyle('red')
          .setEmoji('💥')
          .setID('crit'),

        new MessageButton()
          .setStyle('red')
          .setEmoji('🧪')
          .setID('poison'),

        new MessageButton()
          .setStyle('blurple')
          .setEmoji('🛡')
          .setID('shield')
      );

    const row2 = await new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setStyle('blurple')
          .setEmoji('🧎‍♂️')
          .setID('dodgee'),

        new MessageButton()
          .setStyle('green')
          .setEmoji('🩹')
          .setID('heal'),

        new MessageButton()
          .setStyle('green')
          .setEmoji('🍷')
          .setID('potion'),

        new MessageButton()
          .setStyle('gray')
          .setEmoji('🏃')
          .setID('run'),
      );

    const row3 = await new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setStyle('green')
          .setLabel('Да')
          .setID('success'),

        new MessageButton()
          .setStyle('red')
          .setLabel('Нет')
          .setID('fail'),
      );

    if (opponent.id === msg.author.id) return msg.reply('Ты не можешь сражаться с самим собой <:What_The:855191667371933716>');
    if (this.fighting.has(msg.channel.id)) return msg.reply('Только один бой может быть в канале 🛑');
    this.fighting.add(msg.channel.id);
    try {
      if (!opponent.bot) {
        let verificationMessage = await msg.say(`🗡 ${opponent}**, ты принимаешь запрос?**`, { components: [row3]});
        const verification = await verificationMessage.awaitButtons((button) => button.clicker.user.id === opponent.id, { max: 1, time: 15000 });
        if(!verification.size) {
          this.fighting.delete(msg.channel.id);
          return await verificationMessage.edit(`*Нет ответа..*`, null);
        } 
        else {
          await verification.first().reply.defer();
          switch (verification.first().id) {
            case 'success':
                verificationMessage.delete();
                break
            case 'fail':
                this.fighting.delete(msg.channel.id);
                return await verificationMessage.edit(`*Оппонент отказался..*`, null);
                break
          }
        }
      }
      let userHP = 750;
      let oppoHP = 750;
      let userTurn = false;
      let dodge = false;

      let startMessage = true;

      let steps = 0;

      let poisonPlayer = false;
      let poisonOpponent = false;
      let guardPlayer = false;
      let guardOpponent = false;
      let playerTime = 0;
      let opponentTime = 0;

      const reset = () => {
        userTurn = !userTurn;
        if (playerTime == 0) guardPlayer = false;
        else playerTime -= 1;
        if (opponentTime == 0) guardOpponent = false;
        else opponentTime -= 1;
      };
      const shield = (userShield = true) => {
        if (userShield && playerTime == 0) {
          guardPlayer = true;
          playerTime = 4
        } else if (!userShield && opponentTime == 0) {
          guardOpponent = true;
          opponentTime = 4
        }
      }
      const dodgee = (sus = true) => {
        if (sus && dodge) dodge = false;
      };
      const dealDamage = damage => {
        if (userTurn) oppoHP -= damage;
        else userHP -= damage;
      };
      const healHp = heal => {
        if (userTurn) userHP += heal;
        else oppoHP += heal;
      };
      const poisonDeal = () => {
        if (userTurn) poisonOpponent = true;
        else poisonPlayer = true;
      };
      const poisonRemove = () => {
        if (userTurn) poisonPlayer = false;
        else poisonOpponent = false;
      };
      const poisonDamage = () => {
        if (poisonOpponent) oppoHP -= 15;
        if (poisonPlayer) userHP -= 15;
      };
      const forfeit = () => {
        if (userTurn) userHP = 0;
        else oppoHP = 0;
      };

      // Игра
      while (userHP > 0 && oppoHP > 0) {
        if (startMessage) await msg.say('⚔ **Дуэль в Подземелье** ⚔\n__Удачи!__');
        startMessage = false;
        const user = userTurn ? msg.author : opponent;
        let choice;
        if (!opponent.bot || (opponent.bot && userTurn)) {
          let messge = await msg.say(stripIndents`
						__${user}, твой ход!__\n
						👤**${msg.author.username}**: __**${userHP}**__ ${((userHP < 600 && userHP > 300) ? ":mending_heart:" : (userHP <= 300 ? ":broken_heart:" : "❤"))} ${(poisonPlayer ? "\`🧪\`" : "")} ${(guardPlayer ? "\`🛡️\`" : "")}\n👤**${opponent.username}**: __**${oppoHP}**__ ${((oppoHP < 600 && oppoHP > 300) ? ":mending_heart:" : (oppoHP <= 300 ? ":broken_heart:" : "❤"))} ${(poisonOpponent ? "\`🧪\`" : "")} ${(guardOpponent ? "\`🛡️\`" : "")}`, { components: [row, row2] });

          const action = await messge.awaitButtons((button) => button.clicker.user.id === user.id, { max: 1, time: 10000 }).then(async b => {
            await b.first().reply.defer();
            switch (b.first().id) {
              case 'attack':
                choice = 'атака';
                break
              case 'shield':
                choice = 'щит';
                break
              case 'crit':
                choice = 'крит';
                break
              case 'run':
                choice = 'сбежать';
                break
              case 'heal':
                choice = 'лечиться';
                break
              case 'poison':
                choice = 'отравить';
                break
              case 'potion':
                choice = 'эликсир';
                break
              case 'dodgee':
                choice = 'увернуться';
                break
            }
            await messge.edit(`__Ход ${user}__, **№${steps}**\n**Выбрано: \`${(choice == `атака` ? `⚔️` : (choice == `щит` ? `🛡️` : (choice == `крит` ? `💥` : (choice == `сбежать` ? `🏃‍♂️` : (choice == `лечиться` ? `🩹` : (choice == `отравить` ? `🧪` : (choice == `эликсир` ? `🍷` : `🧎‍♂️`)))))))}\`**\n\n**——————————————**\n👤**${msg.author.username}**: __**${userHP}**__ ${((userHP < 600 && userHP > 300) ? ":mending_heart:" : (userHP <= 300 ? ":broken_heart:" : "❤"))} ${(poisonPlayer ? "\`🧪\`" : "")} ${(guardPlayer ? "\`🛡️\`" : "")}\n👤**${opponent.username}**: __**${oppoHP}**__ ${((oppoHP < 600 && oppoHP > 300) ? ":mending_heart:" : (oppoHP <= 300 ? ":broken_heart:" : "❤"))} ${(poisonOpponent ? "\`🧪\`" : "")} ${(guardOpponent ? "\`🛡️\`" : "")}\n**——————————————**`, null);
          }).catch(async () => {
            await msg.say(`${user} *пропустил свой ход..*`);
            await messge.edit(`👤**${msg.author.username}**: __**${userHP}**__ ${((userHP < 600 && userHP > 300) ? ":mending_heart:" : (userHP <= 300 ? ":broken_heart:" : "❤"))} ${(poisonPlayer ? "\`🧪\`" : "")} ${(guardPlayer ? "\`🛡️\`" : "")}\n👤**${opponent.username}**: __**${oppoHP}**__ ${((oppoHP < 600 && oppoHP > 300) ? ":mending_heart:" : (oppoHP <= 300 ? ":broken_heart:" : "❤"))} ${(poisonOpponent ? "\`🧪\`" : "")} ${(guardOpponent ? "\`🛡️\`" : "")}\n**——————————————**`, null);
            poisonDamage();
            dodgee();
            reset();
            steps++;
          });
        } else {
          if (oppoHP <= 150) {
            if (poisonOpponent) choice = 'эликсир';
            else choice = 'лечиться';
          } else if ((userHP / 1.75) > oppoHP) {
            const rando = Math.random() < 0.5;
            if (poisonOpponent) {
              if (rando) choice = 'эликсир';
              else choice = 'лечиться'
            }
            else if (!poisonPlayer) {
              if (!rando) choice = 'отравить';
              else choice = 'атака'
            }
            else if (!poisonOpponent && poisonPlayer) {
              if (rando) choice = 'лечиться';
              else choice = 'атака'
            }
          } else {
            const choices = ['атака', 'щит', 'крит', 'лечиться', 'отравить', 'увернуться'];
            const choices2 = ['атака', 'щит', 'крит', 'лечиться', 'увернуться'];
            if (poisonOpponent) choice = 'эликсир';
            else if (!poisonPlayer) choice = choices[Math.floor(Math.random() * choices.length)];
            else if (poisonPlayer) choice = choices2[Math.floor(Math.random() * choices.length)];
          }
        }
        if (choice === 'атака') {
          const damage = Math.floor(Math.random() * (userTurn ? (guardOpponent ? 50 : 125) : (guardPlayer ? 50 : 125))) + 1;
          const random = Math.random() < 0.5;
          if (dodge) {
            if (random) {
              msg.say(`↝ ${user} *не смог попасть по противнику*`);
            } else {
              await msg.say(`⚔️ ${user} *атаковал* **\`-${damage}❤\`**`);
              dealDamage(damage);
            }
          }
          else {
            await msg.say(`⚔️ ${user} *атаковал* **\`-${damage}❤\`**`);
            dealDamage(damage);
          }
          dodgee();
          poisonDamage();
          reset();
          steps++;
        } else if (choice === 'щит') {
          await msg.say(`🛡️ ${user} *защитился*`);
          shield(userTurn);
          poisonDamage();
          dodgee();
          reset(false);
          steps++;
        } else if (choice === 'увернуться') {
          await msg.say(`🧎‍♂️ ${user} *приготовился уворачиваться*`);
          dodge = true;
          poisonDamage();
          reset();
        } else if (choice === 'лечиться') {
          const heal = Math.floor(Math.random() * 125) + 1;
          if ((userHP > 1000 && userTurn) || (oppoHP > 1000 && !userTurn)) { msg.say('**Достигнут максимальный порог ❤!**') }
          else {
            await msg.say(`🩹 ${user} *полечился* **\`+${heal}❤\`**`);
            healHp(heal);
            poisonDamage();
            dodgee();
            reset();
            steps++;
          }
        } else if (choice === 'эликсир') {
          if (poisonPlayer && userTurn) {
            await msg.say(`🍷 ${user} *выпил эликсир*`);
            poisonRemove();
            dodgee();
            reset();
            steps++;
          } else if (!poisonPlayer && userTurn) msg.say(`**У вас нет отравления!**`)
          else if (poisonOpponent && !userTurn) {
            await msg.say(`🍷 ${user} *выпил эликсир*`);
            poisonRemove();
            dodgee();
            reset();
            steps++;
          } else if (!poisonOpponent && !userTurn) msg.say(`**У вас нет отравления!**`)
        } else if (choice === 'отравить') {
          if (!poisonOpponent && userTurn) {
            await msg.say(`🧪 ${user} *отравил противника*`);
            poisonDeal();
            dodgee();
            reset();
            steps++;
          } else if (!poisonPlayer && !userTurn) {
            await msg.say(`🧪 ${user} *отравил противника*`);
            poisonDeal();
            dodgee();
            reset();
            steps++;
          } else if (poisonOpponent && userTurn) {
            msg.say(`**Противник уже отравлён!**`);
          } else if (poisonPlayer && !userTurn) {
            msg.say(`**Противник уже отравлён!**`);
          }
        } else if (choice === 'крит') {
          const miss = Math.floor(Math.random() * 5);
          if (!miss) {
            const damage = randomRange(userTurn ? (guardOpponent ? 100 : 175) : (guardPlayer ? 100 : 175), userTurn ? (guardOpponent ? 175 : 250) : (guardPlayer ? 175 : 250));
            await msg.say(`💥 ${user} *нанёс критический удар!* **\`-${damage}❤\`**`);
            dealDamage(damage);
          } else {
            await msg.say(`↝ ${user} *промахнулся..*`);
          }
          poisonDamage();
          dodgee();
          reset();
          steps++;
        } else if (choice === 'сбежать') {
          await msg.say(`🏃‍♂️ ${user} *признал своё поражение..*`);
          forfeit();
          steps++;
          break;
        }
      }
      this.fighting.delete(msg.channel.id);
      const winner = userHP > oppoHP ? msg.author : opponent;
      const messages = ["Найс", "Кул", "ГГ", "Хорош", "ееее", "Хорошо сыграли", "Ещё катку?", "ок", "Ебой", "ыыы", "Гуд гейм", ":)", "Ничоси", "ля", "Могёшь", ".", "ладно.", "<:Da:802954217190326312>", "<:Oxyeti_Ne_Vixyeti:889208289575964702>", "<:Strange_Cat:761627017988145202>"];
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      if (winner.bot) msg.say(`**Матч окончен!**\nПобедитель: ${winner}! 🎊\nХаха, я умнее тебя! У меня памяти 16 мегабайт!`);
      else msg.say(`**Матч окончен!**\nПобедитель: ${winner}! 🎊`);
      msg.say(`Рандомный комментарий от меня: ${randomMessage}`);
      return;
    } catch (err) {
      this.fighting.delete(msg.channel.id);
      throw err;
    }
  }
};