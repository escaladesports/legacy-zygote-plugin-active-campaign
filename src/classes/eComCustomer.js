import {
	requestJson,
	getObjectByFilters,
	createObject,
	init
} from './base'

// Static data identifying this AC objects endpoints and object property name
const AC_ECOMCUSTOMER_JSON_PROP = `ecomCustomer`
const AC_ECOMCUSTOMER_ENDPOINT = `ecomCustomers`

// Static filters to be sent with this object for `GET` requests
const acEComCustomerfilters = (obj) => {
	return [
		{ filter: `connectionid`, value: obj.connectionid },
		{ filter: `email`, value: obj.email }
	]
}

export default function (props = {}) {

	this.connectionid = props.connectionid || ''
	this.externalid = props.externalid || ''
	this.email = props.email || ''
	this.acceptsMarketing = props.acceptsMarketing || `0`

	this.requestJson = function () { return requestJson(AC_ECOMCUSTOMER_JSON_PROP, this) }

	this.getObjectByFilters = async () => {
		console.log(`getObjectByFilters...`)
		return await getObjectByFilters({
			acEndpoint: AC_ECOMCUSTOMER_ENDPOINT,
			filters: acEComCustomerfilters(this)
		})
	}

	this.createObject = async () => {
		console.log(`createObject...`)
		return await createObject({
			acEndpoint: AC_ECOMCUSTOMER_ENDPOINT,
			bodyJson: this.requestJson(),
			propName: AC_ECOMCUSTOMER_JSON_PROP
		})
	}

	this.init = async () => {
		console.log(`init...`)
		return await init(
			AC_ECOMCUSTOMER_JSON_PROP,
			this.getObjectByFilters,
			this.createObject
		)
	}
}