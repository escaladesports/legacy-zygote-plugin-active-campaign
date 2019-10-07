import { getFilteredACItem, postACItem } from './utils/requests'

const createEcomCustomer = async (info, connectionId, acceptsMarketing) => {
	console.log(`createEcomCustomer running...`)

	let eComCustomer
	await postACItem(`ecomCustomers`,
		new ActiveCampaignEComCustomer(
			connectionId,
			info.infoEmail,
			info.infoEmail,
			acceptsMarketing
		).requestJson()
	)
		.then(response => eComCustomer = response ? response.ecomCustomer : null)

	console.log(`createEcomCustomer returning: `, eComCustomer)
	return eComCustomer
}

const getEComCustomerByEmail = async (email, connectionId) => {
	console.log(`getEComCustomerByEmail running...`)

	let eComCustomer
	await getFilteredACItem(`ecomCustomers`, [
		{ filter: `connectionid`, value: connectionId },
		{ filter: `email`, value: email }
	])
		.then(itemJson => eComCustomer = itemJson)

	console.log(`getEComCustomerByEmail returning: `, eComCustomer)
	return eComCustomer
}

const ActiveCampaignEComCustomer = (connectionId, externalId = ``, email = ``, acceptsMarketing = `0`) => {
	this.connectionid = connectionId
	this.externalid = externalId
	this.email = email
	this.acceptsMarketing = acceptsMarketing // TODO: update to allow the opt in on form
}

ActiveCampaignEComCustomer.prototype.requestJson = function () {
	return {
		ecomCustomer: {
			...this
		}
	}
}

ActiveCampaignEComCustomer.init = async function (info) {
	console.log(`ActiveCampaignEComCustomer.init running...`)
	let acItem
	await getEComCustomerByEmail(info.infoEmail, connectionId)
		.then(itemJson => acItem = itemJson)

	if (!acItem) {
		await createEcomCustomer(info, connectionId, acceptsMarketing)
			.then(itemJson => acItem = itemJson)
	}
	console.log(`ActiveCampaignEComCustomer.init returning: `, acItem)
	return acItem
}

export {
	ActiveCampaignEComCustomer,
	getEComCustomerByEmail,
	createEcomCustomer
} 