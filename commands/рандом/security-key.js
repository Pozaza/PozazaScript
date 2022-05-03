const Command = require('../../structures/Command');
const crypto = require('crypto');

module.exports = class SecurityKeyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'security-key',
			aliases: ['crypto', 'random-bytes'],
			group: 'рандом',
			memberName: 'security-key',
			description: 'Создаёт рандомный секретный ключ.'
		});
	}

	run(msg) {
		return msg.say(crypto.randomBytes(15).toString('hex'));
	}
};
