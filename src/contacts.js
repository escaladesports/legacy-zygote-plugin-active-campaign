import { getFirstName, getLastName } from './utils/dataFormatter'
import { postACItem, getFilteredACItem } from './utils/requests'

const createContact = async (info) => {
	console.log(`createContact running...`)

	let contact
	await postACItem(`contacts`,
		new ActiveCampaignContact(
			info.infoEmail,
			getFirstName(info.infoName),
			getLastName(info.infoName),
			info.infoPhone
		).requestJson()
	)
		.then(response => contact = response ? response.contact : null)

	console.log(`createContact returning: `, contact)
	return contact
}

const getContactByEmail = async (info) => {
	console.log(`getContactByEmail running...`)

	let contact
	await getFilteredACItem(`contacts`, [
		{ filter: `email`, value: info.infoEmail }
	])
		.then(itemJson => contact = itemJson)

	console.log(`getContactByEmail returning: `, contact)
	return contact
}

const ActiveCampaignContact = function (email = '', firstName = '', lastName = '', phone = '') {
	this.email = props.email
	this.firstName = props.firstName
	this.lastName = props.lastName
	this.phone = props.phone
}

ActiveCampaignContact.prototype.requestJson = function () {
	return {
		contact: {
			...this
		}
	}
}

ActiveCampaignContact.init = async function (info) {
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

export {
	ActiveCampaignContact,
	getContactByEmail,
	createContact
} 