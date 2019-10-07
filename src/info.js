import { ActiveCampaignConnection } from './connection'
import { ActiveCampaignContact } from './contacts'
import { ActiveCampaignEComCustomer } from './eComCustomer'
import { ActiveCampaignEComOrder } from './eComOrder'
// import { ActiveCampaignStore } from './order'
import {
	getContactProps,
	getCustomerProps,
	getOrderProps
} from './utils/dataFormatter'


/*
	Notes:
	* `init` means to get or create an object in Active Campaign
	* `acceptsMarketing` still needs to be sent in from the cart
*/


const preInfo = async ({ preFetchData, info }) => {

	const acceptsMarketing = `1`
	console.log(`info: `, info)

	try {	

		// init an active campaign connection
		const acConnection = await new ActiveCampaignConnection().init()
		console.log(`acConnection: `, acConnection)
		if (!acConnection) return info

		// init an active campaign contact
		const acContact =
			await new ActiveCampaignContact(
				getContactProps(info)
			).init()
		console.log(`acContact: `, acContact)
		if (!acContact) return info

		// init an active campaign e-commerce customer
		const acCustomer =
			await new ActiveCampaignEComCustomer(
				getCustomerProps(info, acConnection, acceptsMarketing)
			).init()
		console.log(`acCustomer: `, acCustomer)
		if (!acCustomer) return info

		// init an active campaign e-commerce order
		const acOrder =
			await new ActiveCampaignEComOrder(
				getOrderProps(info, acConnection, acCustomer)
			).createAbandonedOrder()
		console.log(`acOrder: `, acOrder)
		if (!acOrder) return info

		// ActiveCampaignStore.setCurrentOrder(acOrder)
	} catch (ex) {
		console.log(`Error!: `, ex)
	}

	info.activeCampaignData = { order: 'testme' }

	console.log(`info final: `, info)
	return info
}

export { preInfo }