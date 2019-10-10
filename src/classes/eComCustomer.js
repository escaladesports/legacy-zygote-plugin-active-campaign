import { BaseClass } from '../classes'

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

/*
	Active Campaign eComCustomer Object Class Definition
*/
export default class extends BaseClass {

	/*
		Object fields as defined by Active Campaign API endpoints
	*/
	connectionid
	externalid
	email
	acceptsMarketing

	/*
		Constructor -
		pull values from props before using default values
	*/
	constructor(props = {}) {
		// invoke parent constructor
		super(props)

		// set `this` values
		this.connectionid = props.connectionid || ''
		this.externalid = props.externalid || ''
		this.email = props.email || ''
		this.acceptsMarketing = props.acceptsMarketing || `0`
	}

	/*
		overridden parent function 
		for returning an object ready for API requests
	*/
	requestJson() { return super.requestJson(AC_ECOMCUSTOMER_JSON_PROP) }

	/*
		overridden parent function for searching 
		Active Campaign based on endpoint and filters
	*/
	getObjectByFilters = async () => {
		console.log(`getObjectByFilters...`)
		return await super.getObjectByFilters({
			acEndpoint: AC_ECOMCUSTOMER_ENDPOINT,
			filters: acEComCustomerfilters(this)
		})
	}

	/*
		overridden parent function for creating
		Active Campaign object with passed in data
	*/
	createObject = async () => {
		console.log(`createObject...`)
		return await super.createObject({
			acEndpoint: AC_ECOMCUSTOMER_ENDPOINT,
			bodyJson: this.requestJson(),
			propName: AC_ECOMCUSTOMER_JSON_PROP
		})
	}

	/*
		overridden parent function for 
		getting AC object from state or API
		or making a new object
	*/
	init = async () => {
		console.log(`init...`)
		await super.init(
			AC_ECOMCUSTOMER_JSON_PROP,
			this.getObjectByFilters,
			this.createObject
		)
	}
}