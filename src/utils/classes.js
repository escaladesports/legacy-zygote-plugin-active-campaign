import { serviceName, serviceLogoUrl } from './config'
import { createConnection, getConnectionByHostUrl } from '../connection'
import { createContact, getContactByEmail } from '../contacts'

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

export class ActiveCampaignContact {
	email
	firstName
	lastName
	phone

	constructor(email = ``, firstName = ``, lastName = ``, phone = ``) {
		this.externalid = hostUrl
		this.name = hostUrl
		this.linkUrl = serviceUrl
	}

	requestJson = () => {
		return {
			contact: {
				email: this.email,
				firstName: this.firstName,
				lastName: this.lastName,
				phone: this.phone
			}
		}
	}

	static init = async (info) => {
		console.log(`ActiveCampaignContact.init running...`)
		let acItem
		await getContactByEmail(info)
			.then(itemJson => acItem = itemJson)
		
		if (!acItem) {
			await createContact(info)
				.then(itemJson => acItem = itemJson)
		}
		console.log(`ActiveCampaignContact.init returning: `, acItem)
		return acItem
	}
} 
