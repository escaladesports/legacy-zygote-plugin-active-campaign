import { getAllConnections, getFilteredConnections, createConnection } from './connection'
import { createConnectionObj } from './utils/dataFormatter'

const preInfo = async ({response, info, preFetchData}) => {
    
    await getAllConnections()

    await createConnection(createConnectionObj())
    
    await testCreateConnectionJSON(createConnectionObj())

    await getFilteredConnections(`externalid`, `test555`)
    
    return response
}

const postInfo = async ({response, info, preFetchData}) => {
    
    await getAllConnections()

    await createConnection(createConnectionObj())

    await testCreateConnectionJSON(createConnectionObj())

    await getFilteredConnections(`externalid`, `test555`)
    
    return response
}

export { preInfo, postInfo }