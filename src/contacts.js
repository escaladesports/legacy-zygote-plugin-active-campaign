import { postACItem, getFilteredACItem } from './utils/requests'

function ActiveCampaignContact (props = {}) {
	this.email = props.email || ''
	this.firstName = props.firstName || ''
	this.lastName = props.lastName || ''
	this.phone = props.phone || ''
}

ActiveCampaignContact.prototype.requestJson = () => {
	return {
		contact: {
			...this
		}
	}
}

ActiveCampaignContact.prototype.getContactByEmail = async () => {
	console.log(`getContactByEmail running...`)

	let contact
	await getFilteredACItem(`contacts`, [
		{ filter: `email`, value: this.email }
	])
		.then(itemJson => contact = itemJson)

	console.log(`getContactByEmail returning: `, contact)
	return contact
}

ActiveCampaignContact.prototype.createContact = async () => {
	console.log(`createContact running...`)

	let contact
	await postACItem(`contacts`,
		this.requestJson()
	)
		.then(response => contact = response ? response.contact : null)

	console.log(`createContact returning: `, contact)
	return contact
}

ActiveCampaignContact.prototype.init = async () => {
	console.log(`ActiveCampaignContact.init running...`)

	let acItem
	await this.getContactByEmail()
		.then(itemJson => acItem = itemJson)

	if (!acItem) {
		await this.createContact()
			.then(itemJson => acItem = itemJson)
	}
	console.log(`ActiveCampaignContact.init returning: `, acItem)
	return acItem
}

export {
	ActiveCampaignContact
} 