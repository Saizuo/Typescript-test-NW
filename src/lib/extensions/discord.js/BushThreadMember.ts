/* eslint-disable @typescript-eslint/ban-types */
import { ThreadMember } from 'discord.js';
import { RawThreadMemberData } from 'discord.js/typings/rawDataTypes';
import { BushGuildMember } from './BushGuildMember';
import { BushThreadChannel } from './BushThreadChannel';
import { BushUser } from './BushUser';

export class BushThreadMember extends ThreadMember {
	public declare readonly guildMember: BushGuildMember | null;
	public declare readonly user: BushUser | null;
	public declare thread: BushThreadChannel;
	public constructor(thread: BushThreadChannel, data?: RawThreadMemberData) {
		super(thread, data);
	}
}
