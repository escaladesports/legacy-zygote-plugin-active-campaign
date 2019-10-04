import { handleConnection } from './connection'
import { createContact } from './contacts'
import { handleEcomCus } from './eComCustomer'
import { createAbandonedOrder } from './eComOrder'


const preInfo = async ({ preFetchData, info }) => {

    try {
        // Check connection
        let connectionid = await handleConnection()
        console.log(`connection handled: `, connectionid)
        if (!connectionid) return info

        // create the contact
        await createContact(info)
        console.log(`createContact has run`)

        let eComCustomer = await handleEcomCus(connectionid, `0`, info)
        console.log(`eComCustomer has run`)
        if (!eComCustomer) return info
    
        // Create the abandoned eComOrder
        await createAbandonedOrder(info, connectionid, eComCustomer.id)
        console.log(`createAbandonedOrder has run`)
    } catch (ex) {
        console.log(`Error!: `, ex)
    } 

    return info
}

export { preInfo }