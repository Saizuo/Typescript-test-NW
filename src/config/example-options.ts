import { Config } from '../lib/utils/Config';

export default new Config({
	credentials: {
		token: 'ODUxNDU1NzEwOTE5MjYyMzA4.YL4h7A._xhABtLvUz1lTayei5Wu6p0pv60',
		betaToken: '[TOKEN]',
		devToken: '[TOKEN]',
		hypixelApiKey: '[API_KEY]',
		wolframAlphaAppId: '[APP_ID]'
	},
	environment: 'development',
	owners: [
		'532177714203852800', //Saizuo
		'778521105610309632' //Razik
	],
	prefix: '-',
	channels: {
		log: '1000000000000000',
		error: '1000000000000000',
		dm: '1000000000000000'
	},
	db: {
		host: 'localhost',
		port: 5432,
		username: '[USER_NAME]',
		password: '[PASSWORD]'
	},
	logging: {
		db: false,
		verbose: false,
		info: true
	},
	supportGuild: {
		id: '812400566235430912',
		invite: 'https://discord.gg/mWtDmq6XcB'
	}
});
