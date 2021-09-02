interface bushColors {
	default: '#1FD8F1';
	error: '#EF4947';
	warn: '#FEBA12';
	success: '#3BB681';
	info: '#3B78FF';
	red: '#ff0000';
	blue: '#0055ff';
	aqua: '#00bbff';
	purple: '#8400ff';
	blurple: '#5440cd';
	pink: '#ff00e6';
	green: '#00ff1e';
	darkGreen: '#008f11';
	gold: '#b59400';
	yellow: '#ffff00';
	white: '#ffffff';
	gray: '#a6a6a6';
	lightGray: '#cfcfcf';
	darkGray: '#7a7a7a';
	black: '#000000';
	orange: '#E86100';
}

export type PronounCode =
	| 'unspecified'
	| 'hh'
	| 'hi'
	| 'hs'
	| 'ht'
	| 'ih'
	| 'ii'
	| 'is'
	| 'it'
	| 'shh'
	| 'sh'
	| 'si'
	| 'st'
	| 'th'
	| 'ti'
	| 'ts'
	| 'tt'
	| 'any'
	| 'other'
	| 'ask'
	| 'avoid';
export type Pronoun =
	| 'Unspecified'
	| 'He/Him'
	| 'He/It'
	| 'He/She'
	| 'He/They'
	| 'It/Him'
	| 'It/Its'
	| 'It/She'
	| 'It/They'
	| 'She/He'
	| 'She/Her'
	| 'She/It'
	| 'She/They'
	| 'They/He'
	| 'They/It'
	| 'They/She'
	| 'They/Them'
	| 'Any pronouns'
	| 'Other pronouns'
	| 'Ask me my pronouns'
	| 'Avoid pronouns, use my name';

export class BushConstants {
	public static emojis = {
		success: '<:success:837109864101707807>',
		warn: '<:warn:848726900876247050>',
		error: '<:error:837123021016924261>',
		successFull: '<:success_full:850118767576088646>',
		warnFull: '<:warn_full:850118767391539312>',
		errorFull: '<:error_full:850118767295201350>',
		mad: '<:mad:783046135392239626>',
		join: '<:join:850198029809614858>',
		leave: '<:leave:850198048205307919>',
		loading: '<a:Loading:853419254619963392>',
		offlineCircle: '<:offline:787550565382750239>',
		dndCircle: '<:dnd:787550487633330176>',
		idleCircle: '<:idle:787550520956551218>',
		onlineCircle: '<:online:787550449435803658>',
		cross: '<:cross:878319362539421777>',
		check: '<:check:878320135297961995>'
	};

	public static colors: bushColors = {
		default: '#1FD8F1',
		error: '#EF4947',
		warn: '#FEBA12',
		success: '#3BB681',
		info: '#3B78FF',
		red: '#ff0000',
		blue: '#0055ff',
		aqua: '#00bbff',
		purple: '#8400ff',
		blurple: '#5440cd',
		pink: '#ff00e6',
		green: '#00ff1e',
		darkGreen: '#008f11',
		gold: '#b59400',
		yellow: '#ffff00',
		white: '#ffffff',
		gray: '#a6a6a6',
		lightGray: '#cfcfcf',
		darkGray: '#7a7a7a',
		black: '#000000',
		orange: '#E86100'
	};

	// Somewhat stolen from @Mzato0001
	public static TimeUnits: { [key: string]: { match: RegExp; value: number } } = {
		milliseconds: {
			match: / (?:(?<milliseconds>-?(?:\d+)?\.?\d+) *(?:milliseconds?|msecs?|ms))/im,
			value: 1
		},
		seconds: {
			match: / (?:(?<seconds>-?(?:\d+)?\.?\d+) *(?:seconds?|secs?|s))/im,
			value: 1000
		},
		minutes: {
			match: / (?:(?<minutes>-?(?:\d+)?\.?\d+) *(?:minutes?|mins?))/im,
			value: 1000 * 60
		},
		hours: {
			match: / (?:(?<hours>-?(?:\d+)?\.?\d+) *(?:hours?|hrs?|h))/im,
			value: 1000 * 60 * 60
		},
		days: {
			match: / (?:(?<days>-?(?:\d+)?\.?\d+) *(?:days?|d))/im,
			value: 1000 * 60 * 60 * 24
		},
		weeks: {
			match: / (?:(?<weeks>-?(?:\d+)?\.?\d+) *(?:weeks?|w))/im,
			value: 1000 * 60 * 60 * 24 * 7
		},
		months: {
			match: / (?:(?<months>-?(?:\d+)?\.?\d+) *(?:months?|mon|mo?))/im,
			value: 1000 * 60 * 60 * 24 * 30.4375 // average of days in months including leap years
		},
		years: {
			match: / (?:(?<years>-?(?:\d+)?\.?\d+) *(?:years?|y))/im,
			value: 1000 * 60 * 60 * 24 * 365.25 //leap years
		}
	};

	public static regex = {
		snowflake: /\d{15,21}/im,
		// eslint-disable-next-line no-useless-escape
		discordEmoji: /<a?:(?<name>[a-zA-Z0-9\_]+):(?<id>\d{15,21})>/im
	};

	public static pronounMapping: { [x in PronounCode]: Pronoun } = {
		unspecified: 'Unspecified',
		hh: 'He/Him',
		hi: 'He/It',
		hs: 'He/She',
		ht: 'He/They',
		ih: 'It/Him',
		ii: 'It/Its',
		is: 'It/She',
		it: 'It/They',
		shh: 'She/He',
		sh: 'She/Her',
		si: 'She/It',
		st: 'She/They',
		th: 'They/He',
		ti: 'They/It',
		ts: 'They/She',
		tt: 'They/Them',
		any: 'Any pronouns',
		other: 'Other pronouns',
		ask: 'Ask me my pronouns',
		avoid: 'Avoid pronouns, use my name'
	};

	/** A bunch of mappings */
	public static mappings = {
		guilds: {
			bush: '516977525906341928',
			tree: '767448775450820639',
			staff: '784597260465995796',
			space_ship: '717176538717749358',
			sbr: '839287012409999391'
		},

		permissions: {
			CREATE_INSTANT_INVITE: { name: 'Create Invite', important: false },
			KICK_MEMBERS: { name: 'Kick Members', important: true },
			BAN_MEMBERS: { name: 'Ban Members', important: true },
			ADMINISTRATOR: { name: 'Administrator', important: true },
			MANAGE_CHANNELS: { name: 'Manage Channels', important: true },
			MANAGE_GUILD: { name: 'Manage Server', important: true },
			ADD_REACTIONS: { name: 'Add Reactions', important: false },
			VIEW_AUDIT_LOG: { name: 'View Audit Log', important: true },
			PRIORITY_SPEAKER: { name: 'Priority Speaker', important: true },
			STREAM: { name: 'Video', important: false },
			VIEW_CHANNEL: { name: 'View Channel', important: false },
			SEND_MESSAGES: { name: 'Send Messages', important: false },
			SEND_TTS_MESSAGES: { name: 'Send Text-to-Speech Messages', important: true },
			MANAGE_MESSAGES: { name: 'Manage Messages', important: true },
			EMBED_LINKS: { name: 'Embed Links', important: false },
			ATTACH_FILES: { name: 'Attach Files', important: false },
			READ_MESSAGE_HISTORY: { name: 'Read Message History', important: false },
			MENTION_EVERYONE: { name: 'Mention @\u200Beveryone, @\u200Bhere, and All Roles', important: true }, // name has a zero-width space to prevent accidents
			USE_EXTERNAL_EMOJIS: { name: 'Use External Emoji', important: false },
			VIEW_GUILD_INSIGHTS: { name: 'View Server Insights', important: true },
			CONNECT: { name: 'Connect', important: false },
			SPEAK: { name: 'Speak', important: false },
			MUTE_MEMBERS: { name: 'Mute Members', important: true },
			DEAFEN_MEMBERS: { name: 'Deafen Members', important: true },
			MOVE_MEMBERS: { name: 'Move Members', important: true },
			USE_VAD: { name: 'Use Voice Activity', important: false },
			CHANGE_NICKNAME: { name: 'Change Nickname', important: false },
			MANAGE_NICKNAMES: { name: 'Change Nicknames', important: true },
			MANAGE_ROLES: { name: 'Manage Roles', important: true },
			MANAGE_WEBHOOKS: { name: 'Manage Webhooks', important: true },
			MANAGE_EMOJIS: { name: 'Manage Emojis', important: true },
			USE_APPLICATION_COMMANDS: { name: 'Use Slash Commands', important: false },
			REQUEST_TO_SPEAK: { name: 'Request to Speak', important: false },
			USE_PUBLIC_THREADS: { name: 'Use public Threads', important: false },
			USE_PRIVATE_THREADS: { name: 'Use Private Threads', important: false },
			MANAGE_THREADS: { name: 'Manage Threads', important: true }
		},

		// prettier-ignore
		features: {
			VERIFIED: { name: 'Verified', important: true, emoji: '<:verified:850795049817473066>', weight: 0 },
			PARTNERED: { name: 'Partnered', important: true, emoji: '<:partneredServer:850794851955507240>', weight: 1 },
			MORE_STICKERS: { name: 'More Stickers', important: true, emoji: null, weight: 2 },
			MORE_EMOJI: { name: 'More Emoji', important: true, emoji: '<:moreEmoji:850786853497602080>', weight: 3 },
			FEATURABLE: { name: 'Featurable', important: true, emoji: '<:featurable:850786776372084756>', weight: 4 },
			RELAY_ENABLED: { name: 'Relay Enabled', important: true, emoji: '<:relayEnabled:850790531441229834>', weight: 5 },
			DISCOVERABLE: { name: 'Discoverable', important: true, emoji: '<:discoverable:850786735360966656>', weight: 6 },
			ENABLED_DISCOVERABLE_BEFORE: { name: 'Enabled Discovery Before', important: false, emoji: '<:enabledDiscoverableBefore:850786754670624828>', weight: 7 },
			MONETIZATION_ENABLED: { name: 'Monetization Enabled', important: true, emoji: null, weight: 8 },
			TICKETED_EVENTS_ENABLED: { name: 'Ticketed Events Enabled', important: true, emoji: null, weight: 9 },
			PREVIEW_ENABLED: { name: 'Preview Enabled', important: true, emoji: '<:previewEnabled:850790508266913823>', weight: 10 },
			COMMERCE: { name: 'Store Channels', important: true, emoji: '<:storeChannels:850786692432396338>', weight: 11 },
			VANITY_URL: { name: 'Vanity URL', important: false, emoji: '<:vanityURL:850790553079644160>', weight: 12 },
			VIP_REGIONS: { name: 'VIP Regions', important: false, emoji: '<:VIPRegions:850794697496854538>', weight: 13 },
			ANIMATED_ICON: { name: 'Animated Icon', important: false, emoji: '<:animatedIcon:850774498071412746>', weight: 14 },
			BANNER: { name: 'Banner', important: false, emoji: '<:banner:850786673150787614>', weight: 15 },
			INVITE_SPLASH: { name: 'Invite Splash', important: false, emoji: '<:inviteSplash:850786798246559754>', weight: 16 },
			PRIVATE_THREADS: { name: 'Private Threads', important: false, emoji: '<:privateThreads:869763711894700093>', weight: 17 },
			THREE_DAY_THREAD_ARCHIVE: { name: 'Three Day Thread Archive', important: false, emoji: '<:threeDayThreadArchive:869767841652564008>', weight: 19 },
			SEVEN_DAY_THREAD_ARCHIVE: { name: 'Seven Day Thread Archive', important: false, emoji: '<:sevenDayThreadArchive:869767896123998288>', weight: 20 },
			ROLE_ICONS: { name: 'Role Icons', important: false, emoji: '<:roleIcons:876993381929222175>', weight: 21 },
			NEWS: { name: 'Announcement Channels', important: false, emoji: '<:announcementChannels:850790491796013067>', weight: 22 },
			MEMBER_VERIFICATION_GATE_ENABLED: { name: 'Membership Verification Gate', important: false, emoji: '<:memberVerificationGateEnabled:850786829984858212>', weight: 23 },
			WELCOME_SCREEN_ENABLED: { name: 'Welcome Screen Enabled', important: false, emoji: '<:welcomeScreenEnabled:850790575875817504>', weight: 24 },
			COMMUNITY: { name: 'Community', important: false, emoji: '<:community:850786714271875094>', weight: 25 },
			THREADS_ENABLED: {name: 'Threads Enabled', important: false, emoji: '<:threadsEnabled:869756035345317919>', weight: 26 },
			THREADS_ENABLED_TESTING: {name: 'Threads Enabled Testing', important: false, emoji: null, weight: 27 },
		},

		regions: {
			'automatic': ':united_nations: Automatic',
			'brazil': ':flag_br: Brazil',
			'europe': ':flag_eu: Europe',
			'hongkong': ':flag_hk: Hongkong',
			'india': ':flag_in: India',
			'japan': ':flag_jp: Japan',
			'russia': ':flag_ru: Russia',
			'singapore': ':flag_sg: Singapore',
			'southafrica': ':flag_za: South Africa',
			'sydney': ':flag_au: Sydney',
			'us-central': ':flag_us: US Central',
			'us-east': ':flag_us: US East',
			'us-south': ':flag_us: US South',
			'us-west': ':flag_us: US West'
		},

		otherEmojis: {
			SERVER_BOOSTER_1: '<:serverBooster1:848740052091142145>',
			SERVER_BOOSTER_2: '<:serverBooster2:848740090506510388>',
			SERVER_BOOSTER_3: '<:serverBooster3:848740124992077835>',
			SERVER_BOOSTER_6: '<:serverBooster6:848740155245461514>',
			SERVER_BOOSTER_9: '<:serverBooster9:848740188846030889>',
			SERVER_BOOSTER_12: '<:serverBooster12:848740304365551668>',
			SERVER_BOOSTER_15: '<:serverBooster15:848740354890137680>',
			SERVER_BOOSTER_18: '<:serverBooster18:848740402886606868>',
			SERVER_BOOSTER_24: '<:serverBooster24:848740444628320256>',
			NITRO: '<:nitro:848740498054971432>',
			BOOSTER: '<:booster:848747775020892200>',
			OWNER: '<:owner:848746439311753286>',
			ADMIN: '<:admin:848963914628333598>',
			SUPERUSER: '<:superUser:848947986326224926>',
			DEVELOPER: '<:developer:848954538111139871>',
			BUSH_VERIFIED: '<:verfied:853360152090771497>',
			BOOST_1: '<:boostitle:853363736679940127>',
			BOOST_2: '<:boostitle:853363752728789075>',
			BOOST_3: '<:boostitle:853363769132056627>',
			TEXT: '<:text:853375537791893524>',
			NEWS: '<:announcements:853375553531674644>',
			VOICE: '<:voice:853375566735212584>',
			STAGE: '<:stage:853375583521210468>',
			STORE: '<:store:853375601175691266>',
			CATEGORY: '<:category:853375615260819476>',
			THREAD: '<:thread:865033845753249813>'
		},

		userFlags: {
			DISCORD_EMPLOYEE: '<:discordEmployee:848742947826434079>',
			PARTNERED_SERVER_OWNER: '<:partneredServerOwner:848743051593777152>',
			HYPESQUAD_EVENTS: '<:hypeSquadEvents:848743108283072553>',
			BUGHUNTER_LEVEL_1: '<:bugHunter:848743239850393640>',
			HOUSE_BRAVERY: '<:hypeSquadBravery:848742910563844127>',
			HOUSE_BRILLIANCE: '<:hypeSquadBrilliance:848742840649646101>',
			HOUSE_BALANCE: '<:hypeSquadBalance:848742877537370133>',
			EARLY_SUPPORTER: '<:earlySupporter:848741030102171648>',
			TEAM_USER: 'TEAM_USER',
			SYSTEM: 'SYSTEM',
			BUGHUNTER_LEVEL_2: '<:bugHunterGold:848743283080822794>',
			VERIFIED_BOT: 'VERIFIED_BOT',
			EARLY_VERIFIED_BOT_DEVELOPER: '<:earlyVerifiedBotDeveloper:848741079875846174>',
			DISCORD_CERTIFIED_MODERATOR: '<:discordCertifiedModerator:877224285901582366>'
		},

		status: {
			online: '<:online:848937141639577690>',
			idle: '<:idle:848937158261211146>',
			dnd: '<:dnd:848937173780135986>',
			offline: '<:offline:848939387277672448>',
			streaming: '<:streaming:848937187479519242>'
		},

		maybeNitroDiscrims: ['1111', '2222', '3333', '4444', '5555', '6666', '6969', '7777', '8888', '9999'],

		// prettier-ignore
		capes: [
			/* supporter capes */
			{ name: 'patreon1', index: 0, purchasable: true },
			{ name: 'patreon2', index: 1, purchasable: true },
			{ name: 'fade', custom: 'https://raw.githubusercontent.com/NotEnoughUpdates/capes/master/fade.gif', index: 2, purchasable: true },
			{ name: 'lava', custom: 'https://raw.githubusercontent.com/NotEnoughUpdates/capes/master/lava.gif', index: 3, purchasable: true },
			{ name: 'mcworld', custom: 'https://raw.githubusercontent.com/NotEnoughUpdates/capes/master/mcworld_compressed.gif', index: 4, purchasable: true },
			{ name: 'negative', custom: 'https://raw.githubusercontent.com/NotEnoughUpdates/capes/master/negative_compressed.gif', index: 5, purchasable: true },
			{ name: 'space', custom: 'https://raw.githubusercontent.com/NotEnoughUpdates/capes/master/space_compressed.gif', index: 6, purchasable: true },
			{ name: 'void', custom: 'https://raw.githubusercontent.com/NotEnoughUpdates/capes/master/void.gif', index: 7, purchasable: true },
			{ name: 'tunnel', custom: 'https://raw.githubusercontent.com/NotEnoughUpdates/capes/master/tunnel.gif', index: 8, purchasable: true },
			/* Staff capes */
			{ name: 'contrib', index: 9 },
			{ name: 'mbstaff', index: 10 },
			{ name: 'ironmoon', index: 11 },
			{ name: 'gravy', index: 12 },
			{ name: 'nullzee', index: 13 },
			/* partner capes */
			{ name: 'thebakery', index: 14 },
			{ name: 'dsm', index: 15 },
			{ name: 'packshq', index: 16 },
			{ name: 'furf', index: 17 },
			{ name: 'skytils', index: 18 },
			{ name: 'sbp', index: 19 },
			{ name: 'subreddit_light', index: 20 },
			{ name: 'subreddit_dark', index: 21 },
			{name : 'skyclient', index: 22 },
			/* streamer capes */
			{ name: 'alexxoffi', index: 23 },
			{ name: 'jakethybro', index: 24 },
			{ name: 'krusty', index: 25 },
			{ name: 'krusty_day', index: 26 },
			{ name: 'krusty_night', index: 27 },
			{ name: 'krusty_sunset', index: 28 },
			{ name: 'soldier', index: 29 },
			{ name: 'zera', index: 30 },
		],
		roleMap: [
			{ name: '*', id: '792453550768390194' },
			{ name: 'Admin Perms', id: '746541309853958186' },
			{ name: 'Sr. Moderator', id: '782803470205190164' },
			{ name: 'Moderator', id: '737308259823910992' },
			{ name: 'Helper', id: '737440116230062091' },
			{ name: 'Trial Helper', id: '783537091946479636' },
			{ name: 'Contributor', id: '694431057532944425' },
			{ name: 'Giveaway Donor', id: '784212110263451649' },
			{ name: 'Giveaway (200m)', id: '810267756426690601' },
			{ name: 'Giveaway (100m)', id: '801444430522613802' },
			{ name: 'Giveaway (50m)', id: '787497512981757982' },
			{ name: 'Giveaway (25m)', id: '787497515771232267' },
			{ name: 'Giveaway (10m)', id: '787497518241153025' },
			{ name: 'Giveaway (5m)', id: '787497519768403989' },
			{ name: 'Giveaway (1m)', id: '787497521084891166' },
			{ name: 'Suggester', id: '811922322767609877' },
			{ name: 'Partner', id: '767324547312779274' },
			{ name: 'Level Locked', id: '784248899044769792' },
			{ name: 'No Files', id: '786421005039173633' },
			{ name: 'No Reactions', id: '786421270924361789' },
			{ name: 'No Links', id: '786421269356740658' },
			{ name: 'No Bots', id: '786804858765312030' },
			{ name: 'No VC', id: '788850482554208267' },
			{ name: 'No Giveaways', id: '808265422334984203' },
			{ name: 'No Support', id: '790247359824396319' },
			{ name: 'DJ', id: '782619038403919902' }
		],
		roleWhitelist: {
			'Partner': ['*', 'Admin Perms', 'Sr. Moderator', 'Moderator'],
			'Suggester': ['*', 'Admin Perms', 'Sr. Moderator', 'Moderator', 'Helper', 'Trial Helper', 'Contributor'],
			'Level Locked': ['*', 'Admin Perms', 'Sr. Moderator', 'Moderator'],
			'No Files': ['*', 'Admin Perms', 'Sr. Moderator', 'Moderator'],
			'No Reactions': ['*', 'Admin Perms', 'Sr. Moderator', 'Moderator'],
			'No Links': ['*', 'Admin Perms', 'Sr. Moderator', 'Moderator'],
			'No Bots': ['*', 'Admin Perms', 'Sr. Moderator', 'Moderator'],
			'No VC': ['*', 'Admin Perms', 'Sr. Moderator', 'Moderator'],
			'No Giveaways': ['*', 'Admin Perms', 'Sr. Moderator', 'Moderator', 'Helper'],
			'No Support': ['*', 'Admin Perms', 'Sr. Moderator', 'Moderator'],
			'Giveaway Donor': ['*', 'Admin Perms', 'Sr. Moderator', 'Moderator'],
			'Giveaway (200m)': ['*', 'Admin Perms', 'Sr. Moderator', 'Moderator'],
			'Giveaway (100m)': ['*', 'Admin Perms', 'Sr. Moderator', 'Moderator'],
			'Giveaway (50m)': ['*', 'Admin Perms', 'Sr. Moderator', 'Moderator'],
			'Giveaway (25m)': ['*', 'Admin Perms', 'Sr. Moderator', 'Moderator'],
			'Giveaway (10m)': ['*', 'Admin Perms', 'Sr. Moderator', 'Moderator'],
			'Giveaway (5m)': ['*', 'Admin Perms', 'Sr. Moderator', 'Moderator'],
			'Giveaway (1m)': ['*', 'Admin Perms', 'Sr. Moderator', 'Moderator'],
			'DJ': ['*', 'Admin Perms', 'Sr. Moderator', 'Moderator']
		}
	};

	public static ArgumentMatches = {
		PHRASE: 'phrase',
		FLAG: 'flag',
		OPTION: 'option',
		REST: 'rest',
		SEPARATE: 'separate',
		TEXT: 'text',
		CONTENT: 'content',
		REST_CONTENT: 'restContent',
		NONE: 'none'
	};

	public static ArgumentTypes = {
		STRING: 'string',
		LOWERCASE: 'lowercase',
		UPPERCASE: 'uppercase',
		CHAR_CODES: 'charCodes',
		NUMBER: 'number',
		INTEGER: 'integer',
		BIGINT: 'bigint',
		EMOJINT: 'emojint',
		URL: 'url',
		DATE: 'date',
		COLOR: 'color',
		USER: 'user',
		USERS: 'users',
		MEMBER: 'member',
		MEMBERS: 'members',
		RELEVANT: 'relevant',
		RELEVANTS: 'relevants',
		CHANNEL: 'channel',
		CHANNELS: 'channels',
		TEXT_CHANNEL: 'textChannel',
		TEXT_CHANNELS: 'textChannels',
		VOICE_CHANNEL: 'voiceChannel',
		VOICE_CHANNELS: 'voiceChannels',
		CATEGORY_CHANNEL: 'categoryChannel',
		CATEGORY_CHANNELS: 'categoryChannels',
		NEWS_CHANNEL: 'newsChannel',
		NEWS_CHANNELS: 'newsChannels',
		STORE_CHANNEL: 'storeChannel',
		STORE_CHANNELS: 'storeChannels',
		ROLE: 'role',
		ROLES: 'roles',
		EMOJI: 'emoji',
		EMOJIS: 'emojis',
		GUILD: 'guild',
		GUILDS: 'guilds',
		MESSAGE: 'message',
		GUILD_MESSAGE: 'guildMessage',
		RELEVANT_MESSAGE: 'relevantMessage',
		INVITE: 'invite',
		MEMBER_MENTION: 'memberMention',
		CHANNEL_MENTION: 'channelMention',
		ROLE_MENTION: 'roleMention',
		EMOJI_MENTION: 'emojiMention',
		COMMAND_ALIAS: 'commandAlias',
		COMMAND: 'command',
		INHIBITOR: 'inhibitor',
		LISTENER: 'listener'
	};

	public static BlockedReasons = {
		CLIENT: 'client',
		BOT: 'bot',
		OWNER: 'owner',
		SUPER_USER: 'superUser',
		GUILD: 'guild',
		DM: 'dm',
		AUTHOR_NOT_FOUND: 'authorNotFound',
		DISABLED_GUILD: 'disabledGuild',
		DISABLED_GLOBAL: 'disabledGlobal',
		ROLE_BLACKLIST: 'roleBlacklist',
		USER_GUILD_BLACKLIST: 'userGuildBlacklist',
		USER_GLOBAL_BLACKLIST: 'userGlobalBlacklist',
		RESTRICTED_GUILD: 'restrictedGuild',
		CHANNEL_GUILD_BLACKLIST: 'channelGuildBlacklist',
		CHANNEL_GLOBAL_BLACKLIST: 'channelGlobalBlacklist',
		RESTRICTED_CHANNEL: 'restrictedChannel'
	};

	public static CommandHandlerEvents = {
		MESSAGE_BLOCKED: 'messageBlocked',
		MESSAGE_INVALID: 'messageInvalid',
		COMMAND_BLOCKED: 'commandBlocked',
		COMMAND_STARTED: 'commandStarted',
		COMMAND_FINISHED: 'commandFinished',
		COMMAND_CANCELLED: 'commandCancelled',
		COMMAND_LOCKED: 'commandLocked',
		COMMAND_INVALID: 'commandInvalid',
		COMMAND_LOCKED_NSFW: 'commandLockedNsfw',
		MISSING_PERMISSIONS: 'missingPermissions',
		COOLDOWN: 'cooldown',
		IN_PROMPT: 'inPrompt',
		ERROR: 'error',
		SLASH_ERROR: 'slashError',
		SLASH_BLOCKED: 'slashCommandBlocked',
		SLASH_STARTED: 'slashStarted',
		SLASH_FINISHED: 'slashFinished',
		SLASH_NOT_FOUND: 'slashNotFound',
		SLASH_MISSING_PERMISSIONS: 'slashMissingPermissions'
	};

	public static moulberryBushRoleMap = [
		{ name: '*', id: '792453550768390194' },
		{ name: 'Admin Perms', id: '746541309853958186' },
		{ name: 'Sr. Moderator', id: '782803470205190164' },
		{ name: 'Moderator', id: '737308259823910992' },
		{ name: 'Helper', id: '737440116230062091' },
		{ name: 'Trial Helper', id: '783537091946479636' },
		{ name: 'Contributor', id: '694431057532944425' },
		{ name: 'Giveaway Donor', id: '784212110263451649' },
		{ name: 'Giveaway (200m)', id: '810267756426690601' },
		{ name: 'Giveaway (100m)', id: '801444430522613802' },
		{ name: 'Giveaway (50m)', id: '787497512981757982' },
		{ name: 'Giveaway (25m)', id: '787497515771232267' },
		{ name: 'Giveaway (10m)', id: '787497518241153025' },
		{ name: 'Giveaway (5m)', id: '787497519768403989' },
		{ name: 'Giveaway (1m)', id: '787497521084891166' },
		{ name: 'Suggester', id: '811922322767609877' },
		{ name: 'Partner', id: '767324547312779274' },
		{ name: 'Level Locked', id: '784248899044769792' },
		{ name: 'No Files', id: '786421005039173633' },
		{ name: 'No Reactions', id: '786421270924361789' },
		{ name: 'No Links', id: '786421269356740658' },
		{ name: 'No Bots', id: '786804858765312030' },
		{ name: 'No VC', id: '788850482554208267' },
		{ name: 'No Giveaways', id: '808265422334984203' },
		{ name: 'No Support', id: '790247359824396319' }
	];
}
