import { createEcomCusObj } from './utils/dataFormatter'
import { getFilteredACItem, postACItem } from './utils/requests'


const createEcomCus = async (connectionid, acceptsMarketing, info) => {
	let customerItem = createEcomCusObj(connectionid, info.infoEmail, info.infoEmail, acceptsMarketing)
	let customer = await postACItem(`ecomCustomers`, customerItem)
	return customer ? customer.ecomCustomer : null
}

const getEcomCus = async (connectionid, email) => {
	// filters for getting customer
	let filters = [
		{ filter: `connectionid`, value: connectionid },
		{ filter: `email`, value: email }
	]

	let customerList = await getFilteredACItem(`ecomCustomers`, filters)

	return customerList
		&& customerList.ecomCustomers
		&& customerList.ecomCustomers.length
		? customerList.ecomCustomers[0] : null
}

// Always returns a customer resource
const handleEcomCus = async (connectionid, acceptsMarketing, info) => {
	// try get customer
	console.log(`attempting to get customer`)
	let eComCustomer = await getEcomCus(connectionid, info.infoEmail)
	console.log(`eComCustomer: `, eComCustomer)
	eComCustomer = eComCustomer ? eComCustomer : await createEcomCus(connectionid, acceptsMarketing, info)
	console.log(`eComCustomer final: `, eComCustomer)
	return eComCustomer
}

export { createEcomCus, getEcomCus, handleEcomCus }