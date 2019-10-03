import { createConnectionObj } from './utils/dataFormatter'
import { getFilteredACItem, postACItem } from './utils/requests'


const createConnection = async () => {
    let connection = createConnectionObj(window.location.host, window.location.origin)
    return await postACItem(`connections`, connection)
        .then(res => {
            return res.connection.id
        })
}

const getConnectionByExternalId = async () => {
    let filter = [{
        filter: `externalid`,
        value: window.location.host
    }]
    return await getFilteredACItem(`connections`, filter)
                    .then(res => {
                        if(res.connection) {
                            return res[0].externalid
                        }
                    })
}

export { createConnection, getConnectionByExternalId }