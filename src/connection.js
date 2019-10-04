import { createConnectionObj } from './utils/dataFormatter'
import { getFilteredACItem, postACItem } from './utils/requests'


const createConnection = async () => {
    let connectionItem = createConnectionObj(window.location.host, window.location.origin)
    
    let connection = await postACItem(`connections`, connectionItem)
    
    return connection.id
}

const getConnectionByExternalId = async () => {
    let filter = [{
        filter: `externalid`,
        value: window.location.host
    }]

    let data = await getFilteredACItem(`connections`, filter)

    if (data.connections.length) return data.connections[0].externalid
    return null
}

const handleConnection = () => {
    // Check connection
    let connectionid = getConnectionByExternalId()
    // if we dont have a connection - create one
    connectionid = connectionid ? connectionid : createConnection()

    return connectionid
}

export { createConnection, getConnectionByExternalId, handleConnection }