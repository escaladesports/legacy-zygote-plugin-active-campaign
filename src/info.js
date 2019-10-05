import { handleConnection } from './connection'
import { handleContact } from './contacts'
import { handleEcomCus } from './eComCustomer'
import { createAbandonedOrder } from './eComOrder'
import { setCurrentOrder } from './order'

import { ActiveCampaignConnection } from './utils/classes'


const preInfo = async ({ preFetchData, info }) => {

	try {
		console.log(`info: `, info)
		// Check connection
		let activeCampaignConnection = await ActiveCampaignConnection.initConnection()
		console.log(`activeCampaignConnection: `, activeCampaignConnection)
		if (!activeCampaignConnection) return info

		// create the contact
		/* let contact = await handleContact(info)
		console.log(`contact handled: `, contact)
		if (!contact) return info

		let eComCustomer = await handleEcomCus(connectionid, `0`, info)
		console.log(`eComCustomer has run`)
		if (!eComCustomer) return info

		// Create the abandoned eComOrder
		let eComOrder = await createAbandonedOrder(info, connectionid, eComCustomer.id)
		console.log(`createAbandonedOrder has run`)
		if (!eComOrder) return info 

		setCurrentOrder(eComOrder) */
	} catch (ex) {
		console.log(`Error!: `, ex)
	}

	info.activeCampaignData = { order: 'testme' }

	console.log(`info final: `, info)
	return info
}

export { preInfo }