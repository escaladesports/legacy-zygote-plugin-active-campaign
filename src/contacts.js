import { getFirstName, getLastName } from './utils/dataFormatter'
import { postACItem, getFilteredACItem } from './utils/requests'


/* const upsertContact = async (info) => {
	console.log(`attempting to create contact`)
	let contact = createContactObj(info.infoEmail, getFirstName(info.infoName), getLastName(info.infoName), info.infoPhone)
	return await postACItem(`contact/sync`, contact)
} */

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

	/* let contactItem = createContactObj(
		info.infoEmail,
		getFirstName(info.infoName),
		getLastName(info.infoName),
		info.infoPhone
	)
	
	let contact = await postACItem(`contacts`, contactItem)
	return contact ? contact.contact : null */
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


	/* let filter = [
		{ filter: `email`, value: info.infoEmail }
	]
	let data = await getFilteredACItem(`contacts`, filter)
	return data
		&& data.contacts
		&& data.contacts.length
		? data.contacts[0] : null */
}

/* const handleContact = async (info) => {
	// Check connection
	console.log(`attempting to get contact`)
	let contact = await getContactByEmail(info)
	console.log(`contact: `, contact)
	// if we dont have a connection - create one
	contact = contact ? contact : await createContact(info)
	console.log(`contact final: `, contact)
	return contact
}

export { handleContact } */