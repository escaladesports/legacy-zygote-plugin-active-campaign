import { serviceName, serviceLogoUrl } from '../utils'
import { BaseClass } from '../classes'

// Static data identifying this AC objects endpoints and object property name
const AC_CONNECTION_JSON_PROP = `connection`
const AC_CONNECTION_ENDPOINT = `connections`

// Static filters to be sent with this object for `GET` requests
const acConnectionFilters = () => {
	return [
		{ filter: `externalid`, value: window.location.host }
	]
}

/*
	Active Campaign Connection Object Class Definition
*/
export default class extends BaseClass {

	/*
		Object fields as defined by Active Campaign API endpoints
	*/
	externalid
	name
	linkUrl
	service
	logoUrl

	/*
		Constructor -
		pull values from props before using default values
	*/
	constructor(props = {}) {
		// invoke parent constructor
		super(props)

		// set `this` values
		this.externalid = props.externalid || window.location.host
		this.name = props.name || window.location.host
		this.linkUrl = props.linkUrl || window.location.origin
		this.service = props.service || serviceName
		this.logoUrl = props.logoUrl || serviceLogoUrl
	}

	/*
		overridden parent function 
		for returning an object ready for API requests
	*/
	requestJson() { return super.requestJson(AC_CONNECTION_JSON_PROP) }

	/*
		overridden parent function for searching 
		Active Campaign based on endpoint and filters
	*/
	getObjectByFilters = async () => {
		console.log(`getObjectByFilters...`)
		return await super.getObjectByFilters({
			acEndpoint: AC_CONNECTION_ENDPOINT,
			filters: acConnectionFilters()
		})
	}

	/*
		overridden parent function for creating
		Active Campaign object with passed in data
	*/
	createObject = async () => {
		console.log(`createObject...`)
		return await super.createObject({
			acEndpoint: AC_CONNECTION_ENDPOINT,
			bodyJson: this.requestJson(),
			propName: AC_CONNECTION_JSON_PROP
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
			AC_CONNECTION_JSON_PROP,
			this.getObjectByFilters,
			this.createObject
		)
	}
}