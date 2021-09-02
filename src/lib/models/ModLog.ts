import { Snowflake } from 'discord.js';
import { DataTypes, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { BaseModel } from './BaseModel';
import { NEVER_USED } from './__helpers';

export enum ModLogType {
	PERM_BAN = 'PERM_BAN',
	TEMP_BAN = 'TEMP_BAN',
	UNBAN = 'UNBAN',
	KICK = 'KICK',
	PERM_MUTE = 'PERM_MUTE',
	TEMP_MUTE = 'TEMP_MUTE',
	UNMUTE = 'UNMUTE',
	WARN = 'WARN',
	PERM_PUNISHMENT_ROLE = 'PERM_PUNISHMENT_ROLE',
	TEMP_PUNISHMENT_ROLE = 'TEMP_PUNISHMENT_ROLE',
	REMOVE_PUNISHMENT_ROLE = 'REMOVE_PUNISHMENT_ROLE',
	PERM_CHANNEL_BLOCK = 'PERM_CHANNEL_BLOCK',
	TEMP_CHANNEL_BLOCK = 'TEMP_CHANNEL_BLOCK',
	CHANNEL_UNBLOCK = 'CHANNEL_UNBLOCK'
}

export interface ModLogModel {
	id: string;
	type: ModLogType;
	user: Snowflake;
	moderator: Snowflake;
	reason: string | null;
	duration: number | null;
	guild: Snowflake;
	evidence: string;
}

export interface ModLogModelCreationAttributes {
	id?: string;
	type: ModLogType;
	user: Snowflake;
	moderator: Snowflake;
	reason?: string | null;
	duration?: number;
	guild: Snowflake;
	evidence?: string;
}

export class ModLog extends BaseModel<ModLogModel, ModLogModelCreationAttributes> implements ModLogModel {
	/**
	 * The primary key of the modlog entry.
	 */
	public get id(): string {
		throw new Error(NEVER_USED);
	}
	public set id(_: string) {
		throw new Error(NEVER_USED);
	}

	/**
	 * The type of punishment.
	 */
	public get type(): ModLogType {
		throw new Error(NEVER_USED);
	}
	public set type(_: ModLogType) {
		throw new Error(NEVER_USED);
	}

	/**
	 * The user being punished.
	 */
	public get user(): Snowflake {
		throw new Error(NEVER_USED);
	}
	public set user(_: Snowflake) {
		throw new Error(NEVER_USED);
	}

	/**
	 * The user carrying out the punishment.
	 */
	public get moderator(): Snowflake {
		throw new Error(NEVER_USED);
	}
	public set moderator(_: Snowflake) {
		throw new Error(NEVER_USED);
	}

	/**
	 * The reason the user is getting punished
	 */
	public get reason(): string | null {
		throw new Error(NEVER_USED);
	}
	public set reason(_: string | null) {
		throw new Error(NEVER_USED);
	}

	/**
	 * The amount of time the user is getting punished for.
	 */
	public get duration(): number | null {
		throw new Error(NEVER_USED);
	}
	public set duration(_: number | null) {
		throw new Error(NEVER_USED);
	}

	/**
	 * The guild the user is getting punished in.
	 */
	public get guild(): Snowflake {
		throw new Error(NEVER_USED);
	}
	public set guild(_: Snowflake) {
		throw new Error(NEVER_USED);
	}

	/**
	 * Evidence of what the user is getting punished for.
	 */
	public get evidence(): string {
		throw new Error(NEVER_USED);
	}
	public set evidence(_: string) {
		throw new Error(NEVER_USED);
	}

	public static initModel(sequelize: Sequelize): void {
		ModLog.init(
			{
				id: {
					type: DataTypes.STRING,
					primaryKey: true,
					allowNull: false,
					defaultValue: uuidv4
				},
				type: {
					type: DataTypes.STRING, //# This is not an enum because of a sequelize issue: https://github.com/sequelize/sequelize/issues/2554
					allowNull: false
				},
				user: {
					type: DataTypes.STRING,
					allowNull: false
				},
				moderator: {
					type: DataTypes.STRING,
					allowNull: false
				},
				duration: {
					type: DataTypes.STRING,
					allowNull: true
				},
				reason: {
					type: DataTypes.TEXT,
					allowNull: true
				},
				guild: {
					type: DataTypes.STRING,
					references: {
						model: 'Guilds',
						key: 'id'
					}
				},
				evidence: {
					type: DataTypes.TEXT,
					allowNull: true
				}
			},
			{ sequelize: sequelize }
		);
	}
}
