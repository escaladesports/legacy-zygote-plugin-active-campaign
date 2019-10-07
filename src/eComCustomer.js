import { getFilteredACItem, postACItem } from './utils/requests'

const ActiveCampaignEComCustomer = function (props = {}) {
	this.connectionid = props.connectionid || ''
	this.externalid = props.externalid || ''
	this.email = props.email || ''
	// TODO: update to allow the opt in on form
	this.acceptsMarketing = props.acceptsMarketing || `0`
}

ActiveCampaignEComCustomer.prototype.requestJson = function () {
	return {
		ecomCustomer: {
			...this
		}
	}
}

ActiveCampaignEComCustomer.prototype.getEComCustomerByEmail = async function () {
	console.log(`getEComCustomerByEmail running...`)

	let eComCustomer
	await getFilteredACItem(`ecomCustomers`, [
		{ filter: `connectionid`, value: this.connectionid },
		{ filter: `email`, value: this.email }
	])
		.then(itemJson => eComCustomer = itemJson)

	console.log(`getEComCustomerByEmail returning: `, eComCustomer)
	return eComCustomer
}

ActiveCampaignEComCustomer.prototype.createEcomCustomer = async function () {
	console.log(`createEcomCustomer running...`)

	let eComCustomer
	await postACItem(`ecomCustomers`,
		this.requestJson()
	)
		.then(response => eComCustomer = response ? response.ecomCustomer : null)

	console.log(`createEcomCustomer returning: `, eComCustomer)
	return eComCustomer
}

ActiveCampaignEComCustomer.prototype.init = async function (info, connectionId, acceptsMarketing) {
	console.log(`ActiveCampaignEComCustomer.init running...`)
	let acItem
	await this.getEComCustomerByEmail()
		.then(itemJson => acItem = itemJson)

	if (!acItem) {
		await this.createEcomCustomer()
			.then(itemJson => acItem = itemJson)
	}
	console.log(`ActiveCampaignEComCustomer.init returning: `, acItem)
	return acItem
}

export {
	ActiveCampaignEComCustomer
} 