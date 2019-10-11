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

const init = async ({ serviceName, serviceLogoUrl, proxyUrl }) => {
	console.log(`config init`)
	await acState.setState({
		config: {
			serviceName: serviceName || acState.state.config.serviceName,
			serviceLogoUrl: serviceLogoUrl || acState.state.config.serviceLogoUrl,
			proxyUrl: proxyUrl || acState.state.config.proxyUrl
		}
	})
	console.log(`config: `, acState.state.config)
	try {
		// init an active campaign connection
		// this saves time during checkout
		await new Connection().init()
	} catch (e) {
		console.error(`ZygoteAC Error!: `, e)
	}
}

const preInfo = async ({ preFetchData, info }) => {

	// If user selects the opt in for marketing send `1` else send `0`
	const acceptsMarketing = acState.state.acceptsMarketing ? `1` : `0`
	console.log(`Accepts Marketing: `, acceptsMarketing)
	
	try {	

		// init an active campaign connection
		let acConnection = await new Connection().init()
		console.log(`acConnection: `, acConnection)
		if (!acConnection) return info

		// init an active campaign contact
		let acContact =
			await new Contact(
				getContactProps(info)
			).init()
		console.log(`acContact: `, acContact)
		if (!acContact) return info

		// init an active campaign e-commerce customer
		let acCustomer =
			await new EComCustomer(
				getCustomerProps(info, acConnection, acceptsMarketing)
			).init()
		console.log(`acCustomer: `, acCustomer)
		if (!acCustomer) return info

		// init an active campaign e-commerce order
		let acOrder =
			await new EComOrder(
				getOrderProps(info, acConnection, acCustomer)
			).createAbandonedOrder()
		console.log(`acOrder: `, acOrder)
		if (!acOrder) return info

	} catch (ex) {
		console.error(`ZygoteAC Error!: `, ex)
	}
	return info
}

export { preInfo, init }