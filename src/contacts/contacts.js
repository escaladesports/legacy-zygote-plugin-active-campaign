import fetch from 'isomorphic-fetch'

// GET all contacts
const getAllContacts = async () => {
    return await fetch( `/api/3/contacts`, {
        method: `GET`
    })
    .then(res => console.log(`getAllContacts res: `, res))
}

// POST new contacts
const createContact = async (data) => {
    return await fetch(`/api/3/contacts`, {
        method: `POST`,
        body: JSON.stringify(data)
    })
    .then(res => console.log(`createContacts res: `, res))
}

export { getAllContacts, createContact }