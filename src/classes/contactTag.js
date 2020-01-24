import {
	requestJson,
	createObject,
	init
} from './base'

import acState from '../state'

import { 
        getACItemById, 
        deleteACItem,
        logger
} from '../utils'

const AC_CONTACTTAGS_JSON_PROP = `contactTag`
const AC_CONTACTTAGS_ENDPOINT = `contactTags`

export function ContactTag(props = {}) {

    this.contact = props.contact || '' // ID of current contact
    this.tag = props.tag || '' // ID of abandoned tag

    this.requestJson = function () { return requestJson(AC_CONTACTTAGS_JSON_PROP, this) }

    this.init = async () => {
        logger(`init contactTag...`)
        return await init(
            AC_CONTACTTAGS_JSON_PROP,
            this.getObjectByFilters,
            this.createObject
        )
    }

    this.getObjectByFilters = async () => {
         return await getACItemById(`contacts`, acState.state.contact.id, AC_CONTACTTAGS_ENDPOINT)
                        .then(response => response[AC_CONTACTTAGS_ENDPOINT]
                            .find(tag => { tag === acState.state.tag.id }))
    }

    // Attaches tag to contact
    this.createObject = async () => {
        logger(`Attaching abandoned tag...`)
        return await createObject({
            acEndpoint: AC_CONTACTTAGS_ENDPOINT,
            bodyJson: this.requestJson(),
            propName: AC_CONTACTTAGS_JSON_PROP
        })
    }

}

export const removeContactTag = async () => {
    try {
        await deleteACItem(`${AC_CONTACTTAGS_ENDPOINT}/${acState.state[AC_CONTACTTAGS_JSON_PROP].id}`)
            .then(response => logger(`delete response: `, response))
    } catch(e) {
        logger('error deleting contact tag: ', e)
    }
}