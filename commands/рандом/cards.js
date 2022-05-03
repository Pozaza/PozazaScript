const Command = require('../../structures/Command');
const { shuffle } = require('../../util/Util');
const suits = ['♣', '♥', '♦', '♠'];
const faces = ['Валет', 'Королева', 'Король'];

module.exports = class DrawCardsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'cards',
			aliases: ['card-hand', 'draw-hand'],
			group: 'рандом',
			memberName: 'cards',
			description: 'Показывает рандомные карты.',
			args: [
				{
					key: 'amount',
					label: 'hand size',
					prompt: 'Сколько карт?',
					type: 'integer',
					max: 10,
					min: 1
				},
				{
					key: 'jokers',
					prompt: 'Должны ли быть тут джокеры?',
					type: 'boolean',
					default: false
				}
			]
		});

		this.deck = null;
	}

	run(msg, { amount, jokers }) {
		if (!this.deck) this.deck = this.generateDeck();
		let cards = this.deck;
		if (!jokers) cards = cards.filter(card => !card.includes('Джокер'));
		return msg.reply(shuffle(cards).slice(0, amount).join('\n'));
	}

	generateDeck() {
		const deck = [];
		for (const suit of suits) {
			deck.push(`${suit} Туз`);
			for (let i = 2; i <= 10; i++) deck.push(`${suit} ${i}`);
			for (const face of faces) deck.push(`${suit} ${face}`);
		}
		deck.push('⭐ Джокер');
		deck.push('⭐ Джокер');
		return deck;
	}
};
