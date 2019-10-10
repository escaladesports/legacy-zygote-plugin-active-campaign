import { serviceName, serviceLogoUrl } from '../utils'
import { BaseClass } from '../classes'

const AC_CONNECTION_JSON_PROP = `connection`
const AC_CONNECTION_ENDPOINT = `connections`

const acConnectionFilters = () => {
	return [
		{ filter: `externalid`, value: window.location.host }
	]
}

export default class extends BaseClass {

	externalid
	name
	linkUrl
	service
	logoUrl


	constructor(props = {}) {
		this.externalid = props.externalid || window.location.host
		this.name = props.name || window.location.host
		this.linkUrl = props.linkUrl || window.location.origin
		this.service = props.service || serviceName
		this.logoUrl = props.logoUrl || serviceLogoUrl
	}

	requestJson() { return super.requestJson(AC_CONNECTION_JSON_PROP) }

	async getObjectByFilters() {
		return await super.getObjectByFilters(
			AC_CONNECTION_ENDPOINT,
			acConnectionFilters()
		)
	}

	async createObject() {
		return await super.createObject(
			AC_CONNECTION_ENDPOINT,
			this.requestJson(),
			AC_CONNECTION_JSON_PROP
		)
	}

	async init() {
		await super.init(
			AC_CONNECTION_JSON_PROP,
			this.getObjectByFilters,
			this.createObject
		)
	}
}