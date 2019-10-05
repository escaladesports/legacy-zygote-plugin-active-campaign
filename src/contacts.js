import { getFirstName, getLastName } from './utils/dataFormatter'
import { postACItem, getFilteredACItem } from './utils/requests'

export const createContact = async (info) => {
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

export const getContactByEmail = async (info) => {
	console.log(`getContactByEmail running...`)

	let contact
	await getFilteredACItem(`contacts`, [
		{ filter: `email`, value: info.infoEmail }
	])
		.then(itemJson => contact = itemJson)

	console.log(`getContactByEmail returning: `, contact)
	return contact
}

export class ActiveCampaignContact {
	email = ``
	firstName = ``
	lastName = ``
	phone = ``

	constructor(email = ``, firstName = ``, lastName = ``, phone = ``) {
		this.email = email
		this.firstName = firstName
		this.lastName = lastName
		this.phone = phone
	}

	requestJson = () => {
		return {
			contact: {
				...this
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