require('dotenv').config();
const path = require('path');
const { CommandoClient } = require('discord.js-commando');
const client = new CommandoClient({
  commandPrefix: process.env.XIAO_PREFIX,
  owner: process.env.OWNERS,
  disableEveryone: true,
  unknownCommandResponse: false,
  nonCommandEditable: true
});
const express = require("express")
const app = express()
require('discord-buttons')(client);

client.registry
  .registerDefaultTypes()
  .registerTypesIn(path.join(__dirname, 'types'))
  .registerGroups([
    ['полезные', 'Полезные'],
    ['рандом', 'Рандомный выбор'],
    ['одиночная', 'Одиночная команда'],
    ['игры', 'Игры'],
    ['текстовая', 'Текстовая категория'],
    ['админ-команды', 'Команды для админа'],
    ['рп', 'РП'],
    ['анимации', 'Анимации'],
  ])
  .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
  console.log(`[ГОТОВ] Залогинился как: ${client.user.tag} / (${client.user.id})`);
  client.user.setActivity({ type: "PLAYING", name: `${client.guilds.cache.size} сервера <phelp>` });
	client.user.setStatus('idle');
});

client.on('disconnect', event => {
  console.error(`[ВЫКЛЮЧИЛСЯ] Выключился с кодом: ${event.code}.`);
  process.exit(0);
});

client.on('commandRun', command => console.log(`> ${command.memberName}`));

client.on("guildCreate", guild => {  const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
  channel.send(`<:Pozaza_yay:849355690303815680> Спасибо что пригласил меня на свой сервер!\nЕсли хочешь, можешь меня поддержать материально: https://www.donationalerts.com/r/pozaza\nИли можешь меня поддержать морально: https://discord.gg/KwP76hS\n:partying_face: развлекайся)`);
	client.user.setActivity({ type: "PLAYING", name: `${client.guilds.cache.size} сервера <phelp>` });
})

client.login(process.env.XIAO_TOKEN);

app.get("/", (req, res) => {
  res.send("hello!")
})

app.listen(5000, () => {
  console.log("project ready!")
})