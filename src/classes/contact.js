import {
	requestJson,
	getObjectByFilters,
	createObject,
	init
} from './base'

// Static data identifying this AC objects endpoints and object property name
const AC_CONTACT_JSON_PROP = `contact`
const AC_CONTACT_ENDPOINT = `contacts`

// Static filters to be sent with this object for `GET` requests
const acContactFilters = (obj) => {
	return [
		{ filter: `email`, value: obj.email }
	]
}

export default function (props = {}) {

	this.email = props.email || ''
	this.firstName = props.firstName || ''
	this.lastName = props.lastName || ''
	this.phone = props.phone || ''

	this.requestJson = function () { return requestJson(AC_CONTACT_JSON_PROP, this) }

	this.getObjectByFilters = async () => {
		console.log(`getObjectByFilters...`)
		return await getObjectByFilters({
			acEndpoint: AC_CONTACT_ENDPOINT,
			filters: acContactFilters(this)
		})
	}

	this.createObject = async () => {
		console.log(`createObject...`)
		return await createObject({
			acEndpoint: AC_CONTACT_ENDPOINT,
			bodyJson: this.requestJson(),
			propName: AC_CONTACT_JSON_PROP
		})
	}

	this.init = async () => {
		console.log(`init...`)
		return await init(
			AC_CONTACT_JSON_PROP,
			this.getObjectByFilters,
			this.createObject
		)
	}
}