import { getFirstName, getLastName, createContactObj } from './utils/dataFormatter'
import { postACItem } from './utils/requests'


const upsertContact = async (info) => {
	console.log(`attempting to create contact`)
	let contact = createContactObj(info.infoEmail, getFirstName(info.infoName), getLastName(info.infoName), info.infoPhone)
	return await postACItem(`contact/sync`, contact)
}

export { upsertContact }