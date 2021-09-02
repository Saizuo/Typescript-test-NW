import { BushCommand, BushMessage, BushSlashMessage } from '@lib';
import { MessageActionRow, MessageButton } from 'discord.js';
import packageDotJSON from '../../../package.json';

export default class LinksCommand extends BushCommand {
	public constructor() {
		super('links', {
			aliases: ['links', 'invite', 'support'],
			category: 'info',
			description: {
				content: 'Sends bot links',
				usage: 'links',
				examples: ['links']
			},
			ratelimit: 4,
			cooldown: 4000,
			clientPermissions: ['SEND_MESSAGES'],
			slash: true
		});
	}

	public override async exec(message: BushMessage | BushSlashMessage): Promise<unknown> {
		if (client.config.isDevelopment) return await message.util.reply(`${util.emojis.error} The dev bot cannot be invited.`);
		const ButtonRow = new MessageActionRow().addComponents(
			new MessageButton({
				style: 'LINK',
				label: 'Invite Me',
				url: `https://discord.com/api/oauth2/authorize?client_id=${
					client.user!.id
				}&permissions=2147483647&scope=bot%20applications.commands`
			}),
			new MessageButton({
				style: 'LINK',
				label: 'Support Server',
				url: client.config.supportGuild.invite
			}),
			new MessageButton({
				style: 'LINK',
				label: 'GitHub',
				url: packageDotJSON.repository
			})
		);
		return await message.util.reply({ content: '\u200B', components: [ButtonRow] });
	}
}
