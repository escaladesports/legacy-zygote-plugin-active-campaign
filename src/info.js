import { getAllConnections, getFilteredConnections, createConnection } from './connection'
import { createConnectionObj } from './utils/dataFormatter'


const postInfo = async ({response, info, preFetchData}) => {
    
    await getAllConnections()

    await createConnection(createConnectionObj())

    await getFilteredConnections(`externalid`, `test555`)
    
    return response
}

export { postInfo }