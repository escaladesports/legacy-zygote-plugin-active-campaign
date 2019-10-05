import { ActiveCampaignConnection } from './connection'
import { ActiveCampaignContact } from './contacts'
import { ActiveCampaignEComCustomer } from './eComCustomer'
import { createAbandonedOrder } from './eComOrder'
import { ActiveCampaignStore } from './order'


const preInfo = async ({ preFetchData, info }) => {

	try {
		console.log(`info: `, info)

		/*
		Notes:
			* `init` means to get or create an object in Active Campaign
		 	* `acceptsMarketing` still needs to be sent in from the cart
		*/
		const acceptsMarketing = `1`

		// init an active campaign connection
		const acConnection = await ActiveCampaignConnection.init()
		console.log(`acConnection: `, acConnection)
		if (!acConnection) return info

		// init an active campaign contact
		const acContact = await ActiveCampaignContact.init(info)
		console.log(`acContact: `, acContact)
		if (!acContact) return info

		// init an active campaign e-commerce customer
		const acCustomer = await ActiveCampaignEComCustomer.init(
			info,
			acConnection.id,
			acceptsMarketing
		)
		console.log(`acCustomer: `, acCustomer)
		if (!acCustomer) return info

		// init an active campaign e-commerce order
		const acOrder = await createAbandonedOrder(
			info,
			acConnection.id,
			acCustomer.id
		)
		console.log(`acOrder: `, acOrder)
		if (!acOrder) return info

		ActiveCampaignStore.setCurrentOrder(acOrder)
	} catch (ex) {
		console.log(`Error!: `, ex)
	}

	info.activeCampaignData = { order: 'testme' }

	console.log(`info final: `, info)
	return info
}

export { preInfo }