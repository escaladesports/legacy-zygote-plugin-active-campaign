import {
	Connection,
	Contact,
	EComCustomer,
	EComOrder
} from './classes'
import acState from '../state'

import {
	getContactProps,
	getCustomerProps,
	getOrderProps
} from './utils'

const init = async (
	{ serviceName, serviceLogoUrl, proxyUrl, origin, host },
	{ proxyDevUrl, isDevMode },
	{ acceptsMarketing, color, text },
	{ abandonOffset }
) => {
	
	console.log(`config initializing.....`)
	acState.init((
		{ serviceName, serviceLogoUrl, proxyUrl, origin, host },
		{ proxyDevUrl, isDevMode },
		{ acceptsMarketing, color, text },
		{ abandonOffset }
	))
	console.log(`acState: `, acState.state)
	try {
		// init an active campaign connection
		// this saves time during checkout
		let acConnection = new Connection()
		acConnection = await acConnection.init()
	} catch (e) {
		console.error(`ZygoteAC Error!: `, e)
	}
}

const preInfo = async ({ preFetchData, info }) => {

	// If user selects the opt in for marketing send `1` else send `0`
	const acceptsMarketing = acState.state.pluginConfig.acceptsMarketing ? `1` : `0`
	console.log(`Accepts Marketing: `, acceptsMarketing)
	
	const sendData = async () => { 
		try {

			// init an active campaign connection
			let acConnection = new Connection()
			acConnection = await acConnection.init()
			console.log(`acConnection: `, acConnection)
			if (!acConnection) return info

			// init an active campaign contact
			let acContact = new Contact(
				getContactProps(info)
			)
			acContact = await acContact.init()
			console.log(`acContact: `, acContact)
			if (!acContact) return info

			// init an active campaign e-commerce customer
			let acCustomer = new EComCustomer(
				getCustomerProps(info, acConnection, acceptsMarketing)
			)
			acCustomer = await acCustomer.init()
			console.log(`acCustomer: `, acCustomer)
			if (!acCustomer) return info

			// init an active campaign e-commerce order
			let acOrder = new EComOrder(
				getOrderProps(info, acConnection, acCustomer)
			)
			acOrder = await acOrder.createAbandonedOrder()
			console.log(`acOrder: `, acOrder)
			if (!acOrder) return info

		} catch (ex) {
			console.error(`ZygoteAC Error!: `, ex)
		}
	}

	// dont `await`, let it run in the background
	sendData()
	
	return info
}

/* export { preInfo, init } */
export { preInfo, init }