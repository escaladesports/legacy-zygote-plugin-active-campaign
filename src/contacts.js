import {
	getFirstName,
	getLastName,
	createContactObj
} from './utils/dataFormatter'
import { postACItem } from './utils/requests'


/* const upsertContact = async (info) => {
	console.log(`attempting to create contact`)
	let contact = createContactObj(info.infoEmail, getFirstName(info.infoName), getLastName(info.infoName), info.infoPhone)
	return await postACItem(`contact/sync`, contact)
} */

const createContact = async () => {
	let contactItem = createContactObj(
		info.infoEmail,
		getFirstName(info.infoName),
		getLastName(info.infoName),
		info.infoPhone
	)
	
	let contact = await postACItem(`contacts`, contactItem)
	return contact ? contact.contact : null
}

const getContactByEmail = async (info) => {
	let filter = [
		{ filter: `email`, value: info.infoEmail }
	]
	let data = await getFilteredACItem(`contacts`, filter)
	return data
		&& data.contacts
		&& data.contacts.length
		? data.contacts[0] : null
}

const handleContact = async (info) => {
	// Check connection
	console.log(`attempting to get contact`)
	let contact = await getContactByEmail(info)
	console.log(`contact: `, contact)
	// if we dont have a connection - create one
	contact = contact ? contact : await createContact()
	console.log(`contact final: `, connectionid)
	return contact
}

export { handleContact }