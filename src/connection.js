import { createConnectionObj } from './utils/dataFormatter'
import { getFilteredACItem, postACItem } from './utils/requests'


const createConnection = async () => {
	let connectionItem = createConnectionObj(window.location.host, window.location.origin)

	let connection = await postACItem(`connections`, connectionItem)

	return connection ? connection.id : null
}

const getConnectionByExternalId = async () => {
	let filter = [{
		filter: `externalid`,
		value: window.location.host
	}]

	let data = await getFilteredACItem(`connections`, filter)

	if (data.connections.length) return data.connections[0].id
	return null
}

const handleConnection = async () => {
	// Check connection
	console.log(`attempting to get connectionid`)
	let connectionid = await getConnectionByExternalId()
	console.log(`connectionid: `, connectionid)
	// if we dont have a connection - create one
	connectionid = connectionid ? connectionid : await createConnection()
	console.log(`connectionid final: `, connectionid)

	return connectionid
}

export { createConnection, getConnectionByExternalId, handleConnection }