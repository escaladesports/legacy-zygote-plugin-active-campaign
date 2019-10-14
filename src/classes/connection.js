import {
	requestJson,
	getObjectByFilters,
	createObject,
	init
} from './base'
import acState from '../../state'

// Static data identifying this AC objects endpoints and object property name
const AC_CONNECTION_JSON_PROP = `connection`
const AC_CONNECTION_ENDPOINT = `connections`

// Static filters to be sent with this object for `GET` requests
const acConnectionFilters = () => {
	return [
		{ filter: `externalid`, value: host }
	]
}

export default function (props = {}) {

	const {
		serviceName,
		serviceLogoUrl,
		origin,
		host
	} = acState.state.config

	this.externalid = props.externalid || host
	this.name = props.name || host
	this.linkUrl = props.linkUrl || origin
	this.service = props.service || serviceName
	this.logoUrl = props.logoUrl || serviceLogoUrl

	this.requestJson = function () { return requestJson(AC_CONNECTION_JSON_PROP, this) }

	this.getObjectByFilters = async () => {
		console.log(`getObjectByFilters...`)
		return await getObjectByFilters({
			acEndpoint: AC_CONNECTION_ENDPOINT,
			filters: acConnectionFilters()
		})
	}

	this.createObject = async () => {
		console.log(`createObject...`)
		return await createObject({
			acEndpoint: AC_CONNECTION_ENDPOINT,
			bodyJson: this.requestJson(),
			propName: AC_CONNECTION_JSON_PROP
		})
	}

	this.init = async () => {
		console.log(`init...`)
		await init(
			AC_CONNECTION_JSON_PROP,
			this.getObjectByFilters,
			this.createObject
		)
	}
}