import { handleConnection } from './connection'
import { upsertContact } from './contacts'
import { handleEcomCus } from './eComCustomer'
import { createAbandonedOrder } from './eComOrder'


const preInfo = async ({ preFetchData, info }) => {

	try {
		console.log(`info: `, info)
		// Check connection
		let connectionid = await handleConnection()
		console.log(`connection handled: `, connectionid)
		if (!connectionid) return info

		// create the contact
		let contact = await upsertContact(info)
		console.log(`upsertContact has run`)
		console.log(`contact final: `, eComCustomer)
		if (!contact) return info

		let eComCustomer = await handleEcomCus(connectionid, `0`, info)
		console.log(`eComCustomer has run`)
		if (!eComCustomer) return info

		// Create the abandoned eComOrder
		let eComOrder = await createAbandonedOrder(info, connectionid, eComCustomer.id)
		console.log(`createAbandonedOrder has run`)
		if (!eComOrder) return info
	} catch (ex) {
		console.log(`Error!: `, ex)
	}

	console.log(`info final: `, info)
	return info
}

export { preInfo }