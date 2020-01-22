import {
    requestJson,
    getObjectByFilters,
    createObject,
    init
} from './base'

import { logger } from '../utils'

import acState from '../state'

const AC_TAG_JSON_PROP = `tag`
const AC_TAG_ENDPOINT = `tags`

// Static filters to be sent with this object for `GET` requests
const acTagFilters = (obj) => {
	return [
		{ filter: `tag`, value: `${acState.state.config.serviceName}-abandoned-order` }
	]
}

export default function (props = {}) {

    this.tag = props.tag || ''
    this.tagType = props.tagType || '' // should default to so it binds to "contact"
    this.description = props.description ||  ''

    this.requestJson = function () { return requestJson(AC_TAG_JSON_PROP, this) }

    this.init = async () => {
        logger(`init contactTag...`)
        return await init(
            AC_TAG_JSON_PROP,
            this.getObjectByFilters,
            this.createObject
        )
    }

    // Creates the tag
    this.createObject = async () => {
        logger(`Creating tag...`)
        return await createObject({
            acEndpoint: AC_TAG_ENDPOINT,
            bodyJson: this.requestJson(),
            propName: AC_TAG_JSON_PROP
        })
    }

    this.getObjectByFilters = async (tagName) => {
        logger(`Getting object by filter in abandoned tag...`)
        return await getObjectByFilters({
			acEndpoint: AC_TAG_ENDPOINT,
			filters: acTagFilters(this)
        })
    }

}