import {
	Connection,
	Contact,
	Tag,
	ContactTag,
	EComCustomer,
	EComOrder,
} from './classes'

import acState from './state'

import {
	getContactProps,
	getCustomerProps,
	getOrderProps,
	getTagProps,
	getContactTagProps,
	logger
} from './utils'

const init = async (
	{ serviceName, serviceLogoUrl, proxyUrl, origin, host },
	{ proxyDevUrl, devOrigin, isDevMode, isLogging },
	{ acceptsMarketing, color, text, hasFullImageUrl, addAbandonedTag },
	{ abandonOffset },
	{ clearAutomations }
) => {
	
	logger(`config initializing.....`)
	logger(`acState PRE: `, acState.state)
	acState.init(
		{ serviceName, serviceLogoUrl, proxyUrl, origin, host },
		{ proxyDevUrl, devOrigin, isDevMode, isLogging },
		{ acceptsMarketing, color, text, hasFullImageUrl, addAbandonedTag },
		{ abandonOffset },
		{ clearAutomations }
	)
	logger(`acState POST: `, acState.state)
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
	logger(`Accepts Marketing: `, acceptsMarketing)
	logger(`preInfo preFetchData: `, preFetchData)
	logger(`preInfo info: `, info)
	
	const sendData = async () => { 
		try {

			// init an active campaign connection
			let acConnection = new Connection()
			acConnection = await acConnection.init()
			logger(`acConnection: `, acConnection)
			if (!acConnection) return info

			// init an active campaign contact
			let acContact = new Contact(
				getContactProps(info)
			)
			acContact = await acContact.init()
			logger(`acContact: `, acContact)
			if (!acContact) return info
			
			// attaches an abandoned tag to the contact
			if(acState.state.pluginConfig.addAbandonedTag) {
				// Creates / retrieves abandoned tag
				let acAbandonedTag = new Tag(
					getTagProps(`${acState.state.config.serviceName}-abandoned-order`, `contact`, `Abandoned cart tag.`)
				)
				acAbandonedTag = await acAbandonedTag.init()
				if(!acAbandonedTag) return info

				// Attaches / retrieves contact abandoned tag
				let acContactAbandonedTag = new ContactTag(
					getContactTagProps(acContact, acAbandonedTag)
				)
				acContactAbandonedTag = await acContactAbandonedTag.init()
				if(!acContactAbandonedTag) return info
			}

			// init an active campaign e-commerce customer
			let acCustomer = new EComCustomer(
				getCustomerProps(info, acConnection, acceptsMarketing)
			)
			acCustomer = await acCustomer.init()
			logger(`acCustomer: `, acCustomer)
			if (!acCustomer) return info

			// init an active campaign e-commerce order
			let acOrder = new EComOrder(
				getOrderProps(info, acConnection, acCustomer)
			)
			acOrder = await acOrder.createAbandonedOrder()
			logger(`acOrder: `, acOrder)
			if (!acOrder) return info

		} catch (ex) {
			console.error(`ZygoteAC Error!: `, ex)
		}
	}

	// dont `await`, let it run in the background
	sendData()

	logger(`acState on info completed: `, acState.state)

	return info
}

export { preInfo, init }