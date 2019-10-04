import { getFirstName, getLastName, createContactObj } from './utils/dataFormatter'
import { postACItem } from './utils/requests'


const createContact = async (info) => {
    let contact = createContactObj(info.infoEmail, getFirstName(info.infoName), getLastName(info.infoName), info.infoPhone)
    return await postACItem(`contact/sync`, contact)
}


export { createContact }