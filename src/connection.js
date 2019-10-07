import { getFilteredACItem, postACItem } from './utils/requests'
import { serviceName, serviceLogoUrl } from './utils/config'

function ActiveCampaignConnection (props = {}) {
	this.externalid = props.externalid || window.location.host
	this.name = props.name || window.location.host
	this.linkUrl = props.linkUrl || window.location.origin
	this.service = props.service || serviceName
	this.logoUrl = props.logoUrl || serviceLogoUrl
}

ActiveCampaignConnection.prototype.requestJson = () => {
	return {
		connection: {
			...this
		}
	}
}

ActiveCampaignConnection.prototype.getConnectionByHostUrl = async () => {
	console.log(`getConnectionByHostUrl running...`)

	let connection
	await getFilteredACItem(`connections`, [
		{ filter: `externalid`, value: window.location.host }
	])
		.then(itemJson => connection = itemJson)

	console.log(`getConnectionByHostUrl returning: `, connection)
	return connection
}

ActiveCampaignConnection.prototype.createConnection = async () => {
	console.log(`createConnection running...`)

	let connection
	await postACItem(`connections`,
		this.requestJson()
	)
		.then(response => connection = response ? response.connection : null)

	console.log(`createConnection returning: `, connection)
	return connection
}

ActiveCampaignConnection.prototype.init = async () => {
	console.log(`ActiveCampaignConnection.init running...`)

	let acItem
	await this.getConnectionByHostUrl()
		.then(itemJson => acItem = itemJson)

	if (!acItem) {
		await this.createConnection()
			.then(itemJson => acItem = itemJson)
	}
	console.log(`ActiveCampaignConnection.init returning: `, acItem)
	return acItem
}

export { 
	ActiveCampaignConnection
} 