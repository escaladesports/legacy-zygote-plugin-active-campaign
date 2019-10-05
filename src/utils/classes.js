import { serviceName, serviceLogoUrl } from './config'
import { createConnection, getConnectionByHostUrl } from '../connection'

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
				service: this.service,
				externalid: this.externalid,
				name: this.name,
				logoUrl: this.logoUrl,
				linkUrl: this.linkUrl
			}
		}
	}

	static initConnection = async () => {
		let connection
		await getConnectionByHostUrl()
			.then(connectionJson => connection = connectionJson)
		if (!connection) {
			await createConnection()
				.then(connectionJson => connection = connectionJson)
		}
		return connection
	}
} 
