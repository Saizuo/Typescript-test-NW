import { StageInstance } from 'discord.js';
import { RawStageInstanceData } from 'discord.js/typings/rawDataTypes';
import { BushClient } from '../discord-akairo/BushClient';
import { BushGuild } from './BushGuild';
import { BushStageChannel } from './BushStageChannel';

export class BushStageInstance extends StageInstance {
	public declare readonly client: BushClient;
	public declare readonly channel: BushStageChannel | null;
	public declare readonly guild: BushGuild | null;
	public constructor(client: BushClient, data: RawStageInstanceData, channel: BushStageChannel) {
		super(client, data, channel);
	}
}
