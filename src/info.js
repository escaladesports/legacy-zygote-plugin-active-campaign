import { getAllConnections, getFilteredConnections, createConnection } from './connection'
import { createContact } from './contacts/contacts'
import { createConnectionObj, getFirstName, getLastName, createEcomCusObj } from './utils/dataFormatter'
import { createEcomCus } from './eComOrder/eComOrder'


const postInfo = async ({response, info, preFetchData}) => {
    
    getAllConnections()

    createConnection(createConnectionObj())

    getFilteredConnections(`externalid`, `test555`)
    
    // 1. Handle contact and customer data
        // a. Create the contact
            // createContacts()
        // b. Create the eComCustomer
    



    // > Test implementation
    let connectionid = null
    // Check connections
    getFilteredConnections(`externalid`, window.location.hostname) // default siteid is hostname
        .then(res => {
            console.log(`getFilteredConnections: `, res)
            // If we have a connection for this store
            if(res.connections.length){
                connectionid = res.connections[0].id
            // if we do not have a connection for this store
            } else {
                createConnection(createConnectionObj(window.location.hostname, window.location.origin))
                    .then(res => {
                        console.log(`createConnection: `, createConnection)
                        connectionid = res.connections[0].id
                    })
            }
        })
    
    // Customer contact
    createContact(createContactObj(info.infoEmail, getFirstName(info.infoName), getLastName(info.infoName), info.infoPhone))
        .then(res => {
            console.log(`createContact: `, res)
        })
    
    createEcomCus(createEcomCusObj(connectionid, ``, info.infoEmail, `0`))
        .then(res => {
            console.log(`createEcomCus: `, res)
        })

    // CREATE THE ORDER WITH THE FLAGGED STUFF
        // createEcomOrder

    // < Test implementation

    return response
}

export { postInfo }