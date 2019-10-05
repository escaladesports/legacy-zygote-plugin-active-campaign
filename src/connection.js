import { getFilteredACItem, postACItem } from './utils/requests'
import { serviceName, serviceLogoUrl } from './utils/config'

export const createConnection = async () => {
	console.log(`createConnection running...`)

	let connection
	await postACItem(`connections`,
		new ActiveCampaignConnection().requestJson()
	)
		.then(response => connection = response ? response.connection : null)

	console.log(`createConnection returning: `, connection)
	return connection
}

export const getConnectionByHostUrl = async () => {
	console.log(`getConnectionByHostUrl running...`)
	
	let connection
	await getFilteredACItem(`connections`, [
		{ filter: `externalid`, value: window.location.host }
	])
		.then(itemJson => connection = itemJson)

	console.log(`getConnectionByHostUrl returning: `, connection)
	return connection
}

export class ActiveCampaignConnection {
	service = serviceName
	externalid
	name
	logoUrl = serviceLogoUrl
	linkUrl

	constructor(hostUrl = window.location.host, serviceUrl = window.location.origin) {
		this.externalid = hostUrl
		this.name = hostUrl
		this.linkUrl = serviceUrl
	}

	requestJson = () => {
		return {
			connection: {
				...this
			}
		}
	}

	static init = async (info) => {
		console.log(`ActiveCampaignConnection.init running...`)
		
		let acItem
		await getConnectionByHostUrl()
			.then(itemJson => acItem = itemJson)

		if (!acItem) {
			await createConnection()
				.then(itemJson => acItem = itemJson)
		}
		console.log(`ActiveCampaignConnection.init returning: `, acItem)
		return acItem
	}
}