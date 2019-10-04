import { handleConnection } from './connection'
import { createContact } from './contacts'
import { handleEcomCus } from './eComCustomer'
import { createAbandonedOrder } from './eComOrder'


const postInfo = async ({response, info, preFetchData}) => {

    // Check connection
    let connectionid = handleConnection()

    // create the contact
    createContact(info)

    let eComCustomer = handleEcomCus(connectionid, `0`,info)
    
    // Create the abandoned eComOrder
    createAbandonedOrder(info, connectionid, eComCustomer.id)

    return response
}

export { postInfo }