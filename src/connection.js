import { ActiveCampaignConnection } from './utils/classes'
import { getFilteredACItem, postACItem } from './utils/requests'


export const createConnection = async () => {
	let connection
	await postACItem(`connections`,
		new ActiveCampaignConnection().requestJson()
	)
		.then(response => connection = response ? response.connection : null)

	return connection
}

export const getConnectionByHostUrl = async () => {
	let connection
	await getFilteredACItem(`connections`, [
		{ filter: `externalid`, value: window.location.host }
	])
		.then(itemJson => connection = itemJson)

	return connection



	/* let filter = [{
		filter: `externalid`,
		value: window.location.host
	}]

	let data = await getFilteredACItem(`connections`, filter)

	if (data.connections.length) return data.connections[0].id
	return null */
}
/*
export const handleConnection = async () => {

	let connection
	await getConnectionByHostUrl()
		.then(connectionJson => connection = connectionJson)
	
	if (!connection) {
		await createConnection()
			.then(connectionJson => connection = connectionJson)
	}

	return connection


 
	// Check connection
	console.log(`attempting to get connectionid`)
	let connectionid = await getConnectionByExternalId()
	console.log(`connectionid: `, connectionid)
	// if we dont have a connection - create one
	connectionid = connectionid ? connectionid : await createConnection()
	console.log(`connectionid final: `, connectionid)

	return connectionid 
}
*/

/* export { createConnection, getConnectionByExternalId, handleConnection } */