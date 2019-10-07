import { getFilteredACItem, postACItem } from './utils/requests'
import { serviceName, serviceLogoUrl } from './utils/config'

const ActiveCampaignConnection = function (hostUrl = window.location.host, serviceUrl = window.location.origin) {
	this.externalid = hostUrl
	this.name = hostUrl
	this.linkUrl = serviceUrl
	this.service = serviceName
	this.logoUrl = serviceLogoUrl
}

ActiveCampaignConnection.prototype.requestJson = function () {
	return {
		connection: {
			...this
		}
	}
}

ActiveCampaignConnection.prototype.init = async function (info) {
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

ActiveCampaignConnection.prototype.getConnectionByHostUrl = async function () {
	console.log(`getConnectionByHostUrl running...`)

	let connection
	await getFilteredACItem(`connections`, [
		{ filter: `externalid`, value: window.location.host }
	])
		.then(itemJson => connection = itemJson)

	console.log(`getConnectionByHostUrl returning: `, connection)
	return connection
}

ActiveCampaignConnection.prototype.createConnection = async function () {
	console.log(`createConnection running...`)

	let connection
	await postACItem(`connections`,
		this.requestJson()
	)
		.then(response => connection = response ? response.connection : null)

	console.log(`createConnection returning: `, connection)
	return connection
}

export { 
	ActiveCampaignConnection,
	getConnectionByHostUrl,
	createConnection
} 