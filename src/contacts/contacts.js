import fetch from 'isomorphic-fetch'
import { getFirstName, getLastName,createContactObj } from '../utils/dataFormatter'
import { postACItem } from '../utils/requests'


const createContact = info => {
    let contact = createContactObj(info.infoEmail, getFirstName(info.infoName), getLastName(info.infoName), info.infoPhone)
    postACItem(`contacts`, contact)
}

// TODO: create get contact function
const getContact = () => {}

// TODO: create the contact handling function to be called instead on postInfo
const handleContact = () => {}

export { createContact, getContact, handleContact }