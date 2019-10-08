import { ActiveCampaignConnection } from './connection'
import { ActiveCampaignContact } from './contacts'
import { ActiveCampaignEComCustomer } from './eComCustomer'
import { ActiveCampaignEComOrder } from './eComOrder'
import activeCampaignState from '../state'

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
	// If user selects the opt in for marketing send `1` else send `0`
	const acceptsMarketing = activeCampaignState.state.acceptsMarketing ? `1` : `0`
	console.log(`Accepts Marketing: `, acceptsMarketing)
	
	try {	

		// init an active campaign connection
		let acConnection = new ActiveCampaignConnection()
		acConnection = await acConnection.init()
		console.log(`acConnection: `, acConnection)
		if (!acConnection) return info

		// init an active campaign contact
		let acContact = new ActiveCampaignContact(
			getContactProps(info)
		)
		acContact = await acContact.init()
		console.log(`acContact: `, acContact)
		if (!acContact) return info

		// init an active campaign e-commerce customer
		let acCustomer = new ActiveCampaignEComCustomer(
			getCustomerProps(info, acConnection, acceptsMarketing)
		)
		acCustomer = await acCustomer.init()
		console.log(`acCustomer: `, acCustomer)
		if (!acCustomer) return info

		// init an active campaign e-commerce order
		let acOrder = new ActiveCampaignEComOrder(
			getOrderProps(info, acConnection, acCustomer)
		)
		acOrder = await acOrder.createAbandonedOrder()
		console.log(`acOrder: `, acOrder)
		if (!acOrder) return info

	} catch (ex) {
		console.error(`Error!: `, ex)
	}
	return info
}

export { preInfo }