import { createConnection, getConnectionByExternalId } from './connection'
import { createContact } from './contacts/contacts'
import { createEcomCus } from './eComOrder/eComOrder'


const postInfo = async ({response, info, preFetchData}) => {

    // Check connection
    let connectionid = getConnectionByExternalId()

    // Create one if we dont have one
    if (!connectionid) {
        connectionid = createConnection()
    }

    // Create/Update the contact
    // TODO: Update to handleContact
    createContact(info)

    // Handle the eComCustomer
    // Check to see if we have a customer with that email and connect id
    // return the customer object
    // TODO: handle the accept marketing once the checkbox is added
    let eComCustomer = handleEcomCus(connectionid, `0`,info)
    
    // Create the abandoned eComOrder

    return response
}

export { postInfo }