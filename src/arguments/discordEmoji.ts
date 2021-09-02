import { Snowflake } from 'discord-api-types';
import { BushArgumentTypeCaster } from '../lib';

export const discordEmojiTypeCaster: BushArgumentTypeCaster = (_, phrase): { name: string; id: Snowflake } | null => {
	if (!phrase) return null;
	const validEmoji: RegExpExecArray | null = client.consts.regex.discordEmoji.exec(phrase);
	if (!validEmoji || !validEmoji.groups) return null;
	return { name: validEmoji.groups.name, id: validEmoji.groups.id };
};
