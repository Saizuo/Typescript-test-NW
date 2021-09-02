import { BushListener, BushMessage } from '@lib';
// @ts-expect-error: ts doesn't recognize json5
import _badLinks from '@root/lib/badlinks'; // Stolen from https://github.com/nacrt/SkyblockClient-REPO/blob/main/files/scamlinks.json
// @ts-expect-error: ts doesn't recognize json5
import _badLinksSecret from '@root/lib/badlinks-secret'; // shhhh
// @ts-expect-error: ts doesn't recognize json5
import badWords from '@root/lib/badwords';
import { MessageEmbed, TextChannel } from 'discord.js';
import { BushClientEvents } from '../../lib/extensions/discord.js/BushClientEvents';

export default class AutomodMessageCreateListener extends BushListener {
	public constructor() {
		super('automodCreate', {
			emitter: 'client',
			event: 'messageCreate',
			category: 'message'
		});
	}

	public override async exec(...[message]: BushClientEvents['messageCreate']): Promise<unknown> {
		return await AutomodMessageCreateListener.automod(message);
	}

	public static async automod(message: BushMessage): Promise<unknown> {
		if (message.channel.type === 'DM' || !message.guild) return;
		if (!(await message.guild.hasFeature('automod'))) return;
		/* await message.guild.getSetting('autoModPhases'); */
		const badLinks: { [key: string]: number } = {};
		let temp = _badLinks;
		if (_badLinksSecret) temp = temp.concat(_badLinksSecret);

		temp.forEach((link: string) => {
			badLinks[link] = 3;
		});

		const wordMap = { ...badWords, ...badLinks };
		const wordKeys = Object.keys(wordMap);
		const offences: { [key: string]: number } = {};

		const cleanMessageContent = message.content?.toLowerCase().replace(/ /g, '');
		wordKeys.forEach((word) => {
			const cleanWord = word.toLowerCase().replace(/ /g, '');

			if (cleanMessageContent.includes(cleanWord)) {
				if (cleanWord === 'whore' && !message.content?.toLowerCase().includes(cleanWord)) return;
				if (!offences[word]) offences[word] = wordMap[word as keyof typeof wordMap];
			}
		});
		if (!Object.keys(offences)?.length) return;

		const highestOffence = Object.values(offences).sort((a, b) => b - a)[0];

		switch (highestOffence) {
			case 0: {
				void message.delete().catch(() => {});
				break;
			}
			case 1: {
				void message.delete().catch(() => {});
				void message.member?.warn({
					moderator: message.guild.me!,
					reason: '[AutoMod] blacklisted word'
				});

				break;
			}
			case 2: {
				void message.delete().catch(() => {});
				void message.member?.mute({
					moderator: message.guild.me!,
					reason: '[AutoMod] blacklisted word',
					duration: 900_000 // 15 minutes
				});
				break;
			}
			case 3: {
				void message.delete().catch(() => {});
				void message.member?.mute({
					moderator: message.guild.me!,
					reason: '[AutoMod] blacklisted word',
					duration: 0 // perm
				});
				break;
			}
		}

		void client.console.info(
			'autoMod',
			`Severity <<${highestOffence}>> action performed on <<${message.author.tag}>> (<<${message.author.id}>>) in <<#${message.channel.name}>> in <<${message.guild.name}>>`
		);

		const color =
			highestOffence === 0
				? util.colors.lightGray
				: highestOffence === 1
				? util.colors.yellow
				: highestOffence === 2
				? util.colors.orange
				: util.colors.red;
		// TODO: remove hard coded value
		void (message.guild.channels.cache.get('783088333055066212') as TextChannel).send({
			embeds: [
				new MessageEmbed()
					.setTitle(`[Severity ${highestOffence}] Automod Action Performed`)
					.setDescription(
						`**User:** ${message.author} (${message.author.tag})\n**Sent From**: <#${message.channel.id}> [Jump to context](${
							message.url
						})\n**Blacklisted Words:** ${util.surroundArray(Object.keys(offences), '`').join(', ')}`
					)
					.addField('Message Content', `${await util.codeblock(message.content, 1024)}`)
					.setColor(color)
					.setTimestamp()
			]
		});
	}
}
