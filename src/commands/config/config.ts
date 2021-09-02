import { BushCommand, BushMessage, BushSlashMessage, GuildSettings, guildSettingsObj, settingsArr } from '@lib';
import { ArgumentOptions, Flag } from 'discord-akairo';
import {
	Channel,
	Formatters,
	Message,
	MessageActionRow,
	MessageButton,
	MessageComponentInteraction,
	MessageEmbed,
	MessageOptions,
	MessageSelectMenu,
	Role
} from 'discord.js';
import _ from 'lodash';

export default class SettingsCommand extends BushCommand {
	public constructor() {
		super('config', {
			aliases: ['config', 'settings', 'setting', 'configure'],
			category: 'config',
			description: {
				content: 'Configure server settings.',
				usage: `settings (${settingsArr.map((s) => `\`${s}\``).join(', ')}) (${['view', 'set', 'add', 'remove'].map(
					(s) => `\`${s}\``
				)})`,
				examples: ['settings', 'config prefix set -']
			},
			slash: true,
			slashOptions: settingsArr.map((setting) => {
				return {
					name: _.snakeCase(setting),
					description: `Manage the server's ${guildSettingsObj[setting].name.toLowerCase()}`,
					type: 'SUB_COMMAND_GROUP',
					options: guildSettingsObj[setting].type.includes('-array')
						? [
								{
									name: 'view',
									description: `View the server's ${guildSettingsObj[setting].name.toLowerCase()}.`,
									type: 'SUB_COMMAND'
								},
								{
									name: 'add',
									description: `Add a value to the server's ${guildSettingsObj[setting].name.toLowerCase()}.`,
									type: 'SUB_COMMAND',
									options: [
										{
											name: 'value',
											description: `What would you like to add to the server's ${guildSettingsObj[
												setting
											].name.toLowerCase()}?'`,
											type: guildSettingsObj[setting].type.replace('-array', '').toUpperCase() as 'ROLE' | 'STRING' | 'CHANNEL',
											required: true
										}
									]
								},
								{
									name: 'remove',
									description: `Remove a value from the server's ${guildSettingsObj[setting].name.toLowerCase()}.`,
									type: 'SUB_COMMAND',
									options: [
										{
											name: 'value',
											description: `What would you like to remove from the server's ${guildSettingsObj[
												setting
											].name.toLowerCase()}?'`,
											type: guildSettingsObj[setting].type.replace('-array', '').toUpperCase() as 'ROLE' | 'STRING' | 'CHANNEL',
											required: true
										}
									]
								}
						  ]
						: [
								{
									name: 'view',
									description: `View the server's ${guildSettingsObj[setting].name.toLowerCase()}.`,
									type: 'SUB_COMMAND'
								},
								{
									name: 'set',
									description: `Set the server's ${guildSettingsObj[setting].name.toLowerCase()}.`,
									type: 'SUB_COMMAND',
									options: [
										{
											name: 'value',
											description: `What would you like to set the server's ${guildSettingsObj[
												setting
											].name.toLowerCase()} to?'`,
											type: guildSettingsObj[setting].type.toUpperCase() as 'ROLE' | 'STRING' | 'CHANNEL',
											required: true
										}
									]
								}
						  ]
				};
			}),
			slashGuilds: ['516977525906341928', '812400566235430912'],
			channel: 'guild',
			clientPermissions: ['SEND_MESSAGES'],
			userPermissions: ['SEND_MESSAGES', 'MANAGE_GUILD'],
			ownerOnly: true
		});
	}

	// I make very readable code :)
	*args(message: BushMessage): IterableIterator<ArgumentOptions | Flag> {
		const optional = message.util.parsed!.alias === 'settings';
		const setting = yield {
			id: 'setting',
			type: settingsArr,
			prompt: {
				start: `What setting would you like to see or change? You can choose one of the following: ${settingsArr
					.map((s) => `\`${s}\``)
					.join(', ')}`,
				retry: `{error} Choose one of the following settings: ${settingsArr.map((s) => `\`${s}\``).join(', ')}`,
				optional
			}
		};

		const actionType = setting
			? guildSettingsObj[setting as unknown as GuildSettings]?.type.includes('-array')
				? ['view', 'add', 'remove']
				: ['view', 'set']
			: undefined;

		const action = setting
			? yield {
					id: 'action',
					type: actionType,
					prompt: {
						start: `Would you like to ${util.oxford(
							actionType!.map((a) => `\`${a}\``),
							'or'
						)} the \`${setting}\` setting?`,
						retry: `{error} Choose one of the following actions to perform on the ${setting} setting: ${util.oxford(
							actionType!.map((a) => `\`${a}\``),
							'or'
						)}`,
						optional
					}
			  }
			: undefined;

		const valueType =
			setting && action && action !== 'view'
				? (guildSettingsObj[setting as unknown as GuildSettings].type.replace('-array', '') as 'string' | 'channel' | 'role')
				: undefined;
		const grammar =
			setting && action && action !== 'view'
				? (action as unknown as 'add' | 'remove' | 'set') === 'add'
					? `to the ${setting} setting`
					: (action as unknown as 'remove' | 'set') === 'remove'
					? `from the ${setting} setting`
					: `the ${setting} setting to`
				: undefined;

		const value =
			setting && action && action !== 'view'
				? yield {
						id: 'value',
						type: valueType,
						match: 'restContent',
						prompt: {
							start: `What would you like to ${action} ${grammar}?`,
							retry: `{error} You must choose a ${valueType === 'string' ? 'value' : valueType} to ${action} ${grammar}.`,
							optional
						}
				  }
				: undefined;

		return { setting, action, value };
	}

	public override async exec(
		message: BushMessage | BushSlashMessage,
		args: {
			setting?: GuildSettings;
			subcommandGroup?: GuildSettings;
			action?: 'view' | 'add' | 'remove' | 'set';
			subcommand?: 'view' | 'add' | 'remove' | 'set';
			value: string | Channel | Role;
		}
	): Promise<unknown> {
		if (!message.guild) return await message.util.reply(`${util.emojis.error} This command can only be used in servers.`);
		if (!message.member?.permissions.has('MANAGE_GUILD'))
			return await message.util.reply(
				`${util.emojis.error} You must have the **MANAGE_GUILD** permissions to run this command.`
			);
		const setting = message.util.isSlash ? (_.camelCase(args.subcommandGroup)! as GuildSettings) : args.setting!;
		const action = message.util.isSlash ? args.subcommand! : args.action!;
		const value = args.value;

		let msg;

		if (!setting || action === 'view') {
			const messageOptions = await this.generateMessageOptions(message, setting ?? undefined);
			msg = (await message.util.reply(messageOptions)) as Message;
		} else {
			const parseVal = (val: string | Channel | Role) => {
				if (val instanceof Channel || val instanceof Role) {
					return val.id;
				}
				return val;
			};

			if (!value)
				return await message.util.reply(
					`${util.emojis.error} You must choose a value to ${action} ${
						(action as unknown as 'add' | 'remove' | 'set') === 'add'
							? `to the ${setting} setting`
							: (action as unknown as 'remove' | 'set') === 'remove'
							? `from the ${setting} setting`
							: `the ${setting} setting to`
					}`
				);
			switch (action) {
				case 'add':
				case 'remove': {
					const existing = (await message.guild.getSetting(setting)) as string[];
					const updated = util.addOrRemoveFromArray('add', existing, parseVal(value));
					await message.guild.setSetting(setting, updated);
					const messageOptions = await this.generateMessageOptions(message, setting);
					msg = (await message.util.reply(messageOptions)) as Message;
					break;
				}
				case 'set': {
					await message.guild.setSetting(setting, parseVal(value));
					const messageOptions = await this.generateMessageOptions(message, setting);
					msg = (await message.util.reply(messageOptions)) as Message;
					break;
				}
			}
		}
		const collector = msg.createMessageComponentCollector({
			channel: message.channel ?? undefined,
			guild: message.guild,
			message: message as Message,
			time: 300_000
		});

		collector.on('collect', async (interaction: MessageComponentInteraction) => {
			if (interaction.user.id === message.author.id || client.config.owners.includes(interaction.user.id)) {
				if (!message.guild) throw new Error('message.guild is null');
				switch (interaction.customId) {
					case 'command_settingsSel': {
						if (!interaction.isSelectMenu()) return;

						return interaction.update(
							await this.generateMessageOptions(message, interaction.values[0] as keyof typeof guildSettingsObj)
						);
					}
					case 'command_settingsBack': {
						if (!interaction.isButton()) return;

						return interaction.update(await this.generateMessageOptions(message));
					}
				}
			} else {
				return await interaction?.deferUpdate().catch(() => undefined);
			}
		});
	}

	public async generateMessageOptions(
		message: BushMessage | BushSlashMessage,
		setting?: undefined | keyof typeof guildSettingsObj
	): Promise<MessageOptions> {
		if (!message.guild) throw new Error('message.guild is null');
		const settingsEmbed = new MessageEmbed().setColor(util.colors.default);
		if (!setting) {
			settingsEmbed.setTitle(`${message.guild!.name}'s Settings`);
			const desc = settingsArr.map((s) => `:wrench: **${guildSettingsObj[s].name}**`).join('\n');
			settingsEmbed.setDescription(desc);

			const selMenu = new MessageActionRow().addComponents(
				new MessageSelectMenu()
					.addOptions(
						...settingsArr.map((s) => ({
							label: guildSettingsObj[s].name,
							value: s,
							description: guildSettingsObj[s].description
						}))
					)
					.setPlaceholder('Select A Setting to View')
					.setMaxValues(1)
					.setMinValues(1)
					.setCustomId('command_settingsSel')
			);
			return { embeds: [settingsEmbed], components: [selMenu] };
		} else {
			settingsEmbed.setTitle(guildSettingsObj[setting].name);
			const generateCurrentValue = async (
				type: 'string' | 'channel' | 'channel-array' | 'role' | 'role-array'
			): Promise<string> => {
				const feat = await message.guild!.getSetting(setting);

				switch (type.replace('-array', '') as 'string' | 'channel' | 'role') {
					case 'string': {
						return Array.isArray(feat)
							? feat.length
								? feat.map((feat) => util.discord.escapeInlineCode(util.inspectAndRedact(feat))).join('\n')
								: '[Empty Array]'
							: feat !== null
							? util.discord.escapeInlineCode(util.inspectAndRedact(feat))
							: '[No Value Set]';
					}
					case 'channel': {
						return Array.isArray(feat)
							? feat.length
								? feat.map((feat) => `<#${feat}>`).join('\n')
								: '[Empty Array]'
							: `<#${feat}>`;
					}
					case 'role': {
						return Array.isArray(feat)
							? feat.length
								? feat.map((feat) => `<@&${feat}>`).join('\n')
								: '[Empty Array]'
							: `<@&${feat}>`;
					}
				}
			};

			const components = new MessageActionRow().addComponents(
				new MessageButton().setStyle('PRIMARY').setCustomId('command_settingsBack').setLabel('Back')
			);
			settingsEmbed.setDescription(
				`${Formatters.italic(guildSettingsObj[setting].description)}\n\n**Type**: ${guildSettingsObj[setting].type}`
			);

			settingsEmbed.setFooter(
				`Run "${
					message.util.isSlash
						? '/'
						: client.config.isDevelopment
						? 'dev '
						: message.util.parsed?.prefix ?? client.config.prefix
				}${message.util.parsed?.alias ?? 'config'} ${setting} ${
					guildSettingsObj[setting].type.includes('-array') ? 'add/remove' : 'set'
				} <value>" to set this setting.`
			);
			settingsEmbed.addField(
				'value',
				(await generateCurrentValue(
					guildSettingsObj[setting].type as 'string' | 'channel' | 'channel-array' | 'role' | 'role-array'
				)) || '[No Value Set]'
			);
			return { embeds: [settingsEmbed], components: [components] };
		}
	}
}
