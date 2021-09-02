/* eslint-disable @typescript-eslint/no-unused-vars */
import { GuildMember, Partialize, Role } from 'discord.js';
import { RawGuildMemberData } from 'discord.js/typings/rawDataTypes';
import { ModLogType } from '../../models/ModLog';
import { BushClient, BushUserResolvable } from '../discord-akairo/BushClient';
import { BushGuild } from './BushGuild';
import { BushRole } from './BushRole';
import { BushUser } from './BushUser';

interface BushPunishmentOptions {
	reason?: string | null;
	moderator?: BushUserResolvable;
}

interface BushTimedPunishmentOptions extends BushPunishmentOptions {
	duration?: number;
}

interface AddRoleOptions extends BushTimedPunishmentOptions {
	role: BushRole | Role;
	addToModlog: boolean;
}

interface RemoveRoleOptions extends BushTimedPunishmentOptions {
	role: BushRole | Role;
	addToModlog: boolean;
}

type PunishmentResponse = 'success' | 'error creating modlog entry' | 'failed to dm';

type WarnResponse = PunishmentResponse;

type AddRoleResponse =
	| PunishmentResponse
	| 'user hierarchy'
	| 'role managed'
	| 'client hierarchy'
	| 'error creating role entry'
	| 'error adding role';

type RemoveRoleResponse =
	| PunishmentResponse
	| 'user hierarchy'
	| 'role managed'
	| 'client hierarchy'
	| 'error removing role entry'
	| 'error removing role';

type MuteResponse =
	| PunishmentResponse
	| 'missing permissions'
	| 'no mute role'
	| 'invalid mute role'
	| 'mute role not manageable'
	| 'error giving mute role'
	| 'error creating mute entry';

type UnmuteResponse =
	| PunishmentResponse
	| 'missing permissions'
	| 'no mute role'
	| 'invalid mute role'
	| 'mute role not manageable'
	| 'error removing mute role'
	| 'error removing mute entry';

type KickResponse = PunishmentResponse | 'missing permissions' | 'error kicking';

interface BushBanOptions extends BushTimedPunishmentOptions {
	deleteDays?: number;
}

type BanResponse = PunishmentResponse | 'missing permissions' | 'error creating ban entry' | 'error banning';

export type PartialBushGuildMember = Partialize<
	BushGuildMember,
	'joinedAt' | 'joinedTimestamp',
	'user' | 'warn' | 'addRole' | 'removeRole' | 'mute' | 'unmute' | 'bushKick' | 'bushBan' | 'isOwner' | 'isSuperUser'
>;

export class BushGuildMember extends GuildMember {
	public declare readonly client: BushClient;
	public declare guild: BushGuild;
	public declare user: BushUser;
	public constructor(client: BushClient, data: RawGuildMemberData, guild: BushGuild) {
		super(client, data, guild);
	}

	public async warn(options: BushPunishmentOptions): Promise<{ result: WarnResponse | null; caseNum: number | null }> {
		const moderator = (await util.resolveNonCachedUser(options.moderator ?? this.guild.me))!;

		// add modlog entry
		const result = await util.createModLogEntry(
			{
				type: ModLogType.WARN,
				user: this,
				moderator: moderator.id,
				reason: options.reason,
				guild: this.guild
			},
			true
		);
		if (!result || !result.log) return { result: 'error creating modlog entry', caseNum: null };

		// dm user
		const ending = await this.guild.getSetting('punishmentEnding');
		const dmSuccess = await this.send({
			content: `You have been warned in **${this.guild.name}** for **${options.reason ?? 'No reason provided'}**.${
				ending ? `\n\n${ending}` : ''
			}`
		}).catch(() => false);

		if (!dmSuccess) return { result: 'failed to dm', caseNum: result.caseNum };

		return { result: 'success', caseNum: result.caseNum };
	}

	public async addRole(options: AddRoleOptions): Promise<AddRoleResponse> {
		client.console.debug(`addRole: ${options.role.name}`);
		const ifShouldAddRole = this.#checkIfShouldAddRole(options.role);
		if (ifShouldAddRole !== true) return ifShouldAddRole;

		const moderator = (await util.resolveNonCachedUser(options.moderator ?? this.guild.me))!;

		if (options.addToModlog || options.duration) {
			const { log: modlog } = options.addToModlog
				? await util.createModLogEntry({
						type: options.duration ? ModLogType.TEMP_PUNISHMENT_ROLE : ModLogType.PERM_PUNISHMENT_ROLE,
						guild: this.guild,
						moderator: moderator.id,
						user: this,
						reason: 'N/A'
				  })
				: { log: null };

			if (!modlog && options.addToModlog) return 'error creating modlog entry';

			if (options.addToModlog || options.duration) {
				client.console.debug('got to punishment');
				const punishmentEntrySuccess = await util.createPunishmentEntry({
					type: 'role',
					user: this,
					guild: this.guild,
					modlog: modlog?.id ?? undefined,
					duration: options.duration,
					extraInfo: options.role.id
				});
				if (!punishmentEntrySuccess) return 'error creating role entry';
			}
		}

		const removeRoleSuccess = await this.roles.add(options.role, `${moderator.tag}`);
		if (!removeRoleSuccess) return 'error adding role';

		return 'success';
	}

	public async removeRole(options: RemoveRoleOptions): Promise<RemoveRoleResponse> {
		client.console.debug(`removeRole: ${options.role.name}`);
		const ifShouldAddRole = this.#checkIfShouldAddRole(options.role);
		if (ifShouldAddRole !== true) return ifShouldAddRole;

		const moderator = (await util.resolveNonCachedUser(options.moderator ?? this.guild.me))!;

		if (options.addToModlog) {
			const { log: modlog } = await util.createModLogEntry({
				type: ModLogType.PERM_PUNISHMENT_ROLE,
				guild: this.guild,
				moderator: moderator.id,
				user: this,
				reason: 'N/A'
			});

			if (!modlog) return 'error creating modlog entry';

			const punishmentEntrySuccess = await util.removePunishmentEntry({
				type: 'role',
				user: this,
				guild: this.guild
			});

			if (!punishmentEntrySuccess) return 'error removing role entry';
		}

		const removeRoleSuccess = await this.roles.remove(options.role, `${moderator.tag}`);
		if (!removeRoleSuccess) return 'error removing role';

		return 'success';
	}

	#checkIfShouldAddRole(role: BushRole | Role): true | 'user hierarchy' | 'role managed' | 'client hierarchy' {
		if (this.roles.highest.position <= role.position && this.guild.ownerId !== this.id) {
			return 'user hierarchy';
		} else if (role.managed) {
			return 'role managed';
		} else if (this.guild.me!.roles.highest.position <= role.position) {
			return 'client hierarchy';
		}
		return true;
	}

	public async mute(options: BushTimedPunishmentOptions): Promise<MuteResponse> {
		// checks
		if (!this.guild.me!.permissions.has('MANAGE_ROLES')) return 'missing permissions';
		const muteRoleID = await this.guild.getSetting('muteRole');
		if (!muteRoleID) return 'no mute role';
		const muteRole = this.guild.roles.cache.get(muteRoleID);
		if (!muteRole) return 'invalid mute role';
		if (muteRole.position >= this.guild.me!.roles.highest.position || muteRole.managed) return 'mute role not manageable';

		const moderator = (await util.resolveNonCachedUser(options.moderator ?? this.guild.me))!;

		// add role
		const muteSuccess = await this.roles
			.add(muteRole, `[Mute] ${moderator.tag} | ${options.reason ?? 'No reason provided.'}`)
			.catch(async (e) => {
				await client.console.warn('muteRoleAddError', e);
				client.console.debug(e);
				return false;
			});
		if (!muteSuccess) return 'error giving mute role';

		// add modlog entry
		const { log: modlog } = await util.createModLogEntry({
			type: options.duration ? ModLogType.TEMP_MUTE : ModLogType.PERM_MUTE,
			user: this,
			moderator: moderator.id,
			reason: options.reason,
			duration: options.duration,
			guild: this.guild
		});

		if (!modlog) return 'error creating modlog entry';

		// add punishment entry so they can be unmuted later
		const punishmentEntrySuccess = await util.createPunishmentEntry({
			type: 'mute',
			user: this,
			guild: this.guild,
			duration: options.duration,
			modlog: modlog.id
		});

		if (!punishmentEntrySuccess) return 'error creating mute entry';

		// dm user
		const ending = await this.guild.getSetting('punishmentEnding');
		const dmSuccess = await this.send({
			content: `You have been muted ${
				options.duration ? 'for ' + util.humanizeDuration(options.duration) : 'permanently'
			} in **${this.guild.name}** for **${options.reason ?? 'No reason provided'}**.${ending ? `\n\n${ending}` : ''}`
		}).catch(() => false);

		if (!dmSuccess) return 'failed to dm';

		return 'success';
	}

	public async unmute(options: BushPunishmentOptions): Promise<UnmuteResponse> {
		//checks
		if (!this.guild.me!.permissions.has('MANAGE_ROLES')) return 'missing permissions';
		const muteRoleID = await this.guild.getSetting('muteRole');
		if (!muteRoleID) return 'no mute role';
		const muteRole = this.guild.roles.cache.get(muteRoleID);
		if (!muteRole) return 'invalid mute role';
		if (muteRole.position >= this.guild.me!.roles.highest.position || muteRole.managed) return 'mute role not manageable';

		const moderator = (await util.resolveNonCachedUser(options.moderator ?? this.guild.me))!;

		//remove role
		const muteSuccess = await this.roles
			.remove(muteRole, `[Unmute] ${moderator.tag} | ${options.reason ?? 'No reason provided.'}`)
			.catch(async (e) => {
				await client.console.warn('muteRoleAddError', e?.stack || e);
				return false;
			});
		if (!muteSuccess) return 'error removing mute role';

		//remove modlog entry
		const { log: modlog } = await util.createModLogEntry({
			type: ModLogType.UNMUTE,
			user: this,
			moderator: moderator.id,
			reason: options.reason,
			guild: this.guild
		});

		if (!modlog) return 'error creating modlog entry';

		// remove mute entry
		const removePunishmentEntrySuccess = await util.removePunishmentEntry({
			type: 'mute',
			user: this,
			guild: this.guild
		});

		if (!removePunishmentEntrySuccess) return 'error removing mute entry';

		//dm user
		const dmSuccess = await this.send({
			content: `You have been unmuted in **${this.guild.name}** because **${options.reason ?? 'No reason provided'}**.`
		}).catch(() => false);

		if (!dmSuccess) return 'failed to dm';

		return 'success';
	}

	public async bushKick(options: BushPunishmentOptions): Promise<KickResponse> {
		// checks
		if (!this.guild.me?.permissions.has('KICK_MEMBERS') || !this.kickable) return 'missing permissions';

		const moderator = (await util.resolveNonCachedUser(options.moderator ?? this.guild.me))!;

		// dm user
		const ending = await this.guild.getSetting('punishmentEnding');
		const dmSuccess = await this.send({
			content: `You have been kicked from **${this.guild.name}** for **${options.reason ?? 'No reason provided'}**.${
				ending ? `\n\n${ending}` : ''
			}`
		}).catch(() => false);

		// kick
		const kickSuccess = await this.kick(`${moderator?.tag} | ${options.reason ?? 'No reason provided.'}`).catch(() => false);
		if (!kickSuccess) return 'error kicking';

		// add modlog entry
		const { log: modlog } = await util.createModLogEntry({
			type: ModLogType.KICK,
			user: this,
			moderator: moderator.id,
			reason: options.reason,
			guild: this.guild
		});
		if (!modlog) return 'error creating modlog entry';
		if (!dmSuccess) return 'failed to dm';
		return 'success';
	}

	public async bushBan(options: BushBanOptions): Promise<BanResponse> {
		// checks
		if (!this.guild.me!.permissions.has('BAN_MEMBERS') || !this.bannable) return 'missing permissions';

		const moderator = (await util.resolveNonCachedUser(options.moderator ?? this.guild.me))!;

		// dm user
		const ending = await this.guild.getSetting('punishmentEnding');
		const dmSuccess = await this.send({
			content: `You have been banned ${
				options?.duration ? 'for ' + util.humanizeDuration(options.duration) : 'permanently'
			} from **${this.guild.name}** for **${options.reason ?? 'No reason provided'}**.${ending ? `\n\n${ending}` : ''}`
		}).catch(() => false);

		// ban
		const banSuccess = await this.ban({
			reason: `${moderator.tag} | ${options.reason ?? 'No reason provided.'}`,
			days: options.deleteDays
		}).catch(() => false);
		if (!banSuccess) return 'error banning';

		// add modlog entry
		const { log: modlog } = await util.createModLogEntry({
			type: options.duration ? ModLogType.TEMP_BAN : ModLogType.PERM_BAN,
			user: this,
			moderator: moderator.id,
			reason: options.reason,
			duration: options.duration,
			guild: this.guild
		});
		if (!modlog) return 'error creating modlog entry';

		// add punishment entry so they can be unbanned later
		const punishmentEntrySuccess = await util.createPunishmentEntry({
			type: 'ban',
			user: this,
			guild: this.guild,
			duration: options.duration,
			modlog: modlog.id
		});
		if (!punishmentEntrySuccess) return 'error creating ban entry';

		if (!dmSuccess) return 'failed to dm';
		return 'success';
	}

	public get isOwner(): boolean {
		return client.isOwner(this);
	}

	public get isSuperUser(): boolean {
		return client.isSuperUser(this);
	}
}
