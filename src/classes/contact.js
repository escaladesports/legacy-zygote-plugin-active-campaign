import { BaseClass } from '../classes'

// Static data identifying this AC objects endpoints and object property name
const AC_CONTACT_JSON_PROP = `contact`
const AC_CONTACT_ENDPOINT = `contacts`

// Static filters to be sent with this object for `GET` requests
const acContactFilters = (obj) => {
	return [
		{ filter: `email`, value: obj.email }
	]
}

/*
	Active Campaign Contact Object Class Definition
*/
export default class extends BaseClass {

	/*
		Object fields as defined by Active Campaign API endpoints
	*/
	email
	firstName
	lastName
	phone

	/*
		Constructor -
		pull values from props before using default values
	*/
	constructor(props = {}) {
		// invoke parent constructor
		super(props)

		// set `this` values
		this.email = props.email || ''
		this.firstName = props.firstName || ''
		this.lastName = props.lastName || ''
		this.phone = props.phone || ''
	}

	/*
		overridden parent function 
		for returning an object ready for API requests
	*/
	requestJson() { return super.requestJson(AC_CONTACT_JSON_PROP) }

	/*
		overridden parent function for searching 
		Active Campaign based on endpoint and filters
	*/
	getObjectByFilters = async () => {
		console.log(`getObjectByFilters...`)
		return await super.getObjectByFilters({
			acEndpoint: AC_CONTACT_ENDPOINT,
			filters: acContactFilters(this)
		})
	}

	/*
		overridden parent function for creating
		Active Campaign object with passed in data
	*/
	createObject = async () => {
		console.log(`createObject...`)
		return await super.createObject({
			acEndpoint: AC_CONTACT_ENDPOINT,
			bodyJson: this.requestJson(),
			propName: AC_CONTACT_JSON_PROP
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
			AC_CONTACT_JSON_PROP,
			this.getObjectByFilters,
			this.createObject
		)
	}
}