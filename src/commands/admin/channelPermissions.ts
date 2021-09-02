import { GuildMember, MessageEmbed, Role } from 'discord.js';
import { BushCommand, BushMessage } from '../../lib';

export default class ChannelPermissionsCommand extends BushCommand {
	public constructor() {
		super('channelPermissions', {
			aliases: ['channelperms', 'cperms', 'cperm', 'chanperms', 'chanperm', 'channelpermissions'],
			category: 'admin',
			typing: true,
			description: {
				content: 'Use to mass change the channel ',
				usage: 'ChannelPerms <role_id> <perm> <state>',
				examples: ['ChannelPerms 783794633129197589 read_messages deny']
			},
			args: [
				{
					id: 'target',
					customType: util.arg.union('member', 'member'),
					prompt: {
						start: 'What user/role would you like to change?',
						retry: 'Invalid response. What user/role would you like to change?'
					}
				},
				{
					id: 'permission',
					type: 'permission',
					prompt: {
						start: 'What permission would you like to change?',
						retry: '{error} Choose a valid permission.'
					}
				},
				{
					id: 'state',
					customType: [
						['true', '1', 'yes', 'enable', 'allow'],
						['false', '0', 'no', 'disable', 'disallow', 'deny'],
						['neutral', 'remove', 'none']
					],
					prompt: {
						start: 'What should that permission be set to?',
						retry: '{error} Set the state to either `enable`, `disable`, or `remove`.'
					}
				}
			],
			ratelimit: 4,
			cooldown: 4000,
			clientPermissions: ['MANAGE_CHANNELS', 'SEND_MESSAGES'],
			userPermissions: ['ADMINISTRATOR'],
			channel: 'guild'
		});
	}

	public override async exec(
		message: BushMessage,
		{
			target,
			permission,
			state
		}: {
			target: Role | GuildMember;
			permission: string;
			state: 'true' | 'false' | 'neutral';
		}
	): Promise<unknown> {
		const failedChannels = [];
		for (const channel of message.guild!.channels.cache.values()) {
			try {
				if (channel.isThread()) return;
				if (channel.permissionsLocked) return;
				const permissionState = state === 'true' ? true : state === 'false' ? false : null;
				await channel.permissionOverwrites.create(
					target.id,
					{ [permission]: permissionState },
					{ reason: 'Changing overwrites for mass channel perms command' }
				);
			} catch (e) {
				client.console.debug(e.stack);
				failedChannels.push(channel);
			}
		}
		const failure = failedChannels.map((e) => `<#${e.id}>`).join(' ');
		if (failure.length > 2000) {
			const paginate: MessageEmbed[] = [];
			for (let i = 0; i < failure.length; i += 2000) {
				paginate.push(new MessageEmbed().setDescription(failure.substring(i, Math.min(failure.length, i + 2000))));
			}
			const normalMessage = `Finished changing perms! Failed channels:`;
			return await client.util.buttonPaginate(message, paginate, normalMessage);
		} else {
			return await message.util.reply({
				content: `Finished changing perms! Failed channels:`,
				embeds: [{ description: failure }]
			});
		}
	}
}
