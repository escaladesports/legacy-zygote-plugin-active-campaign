// import {
// 	requestJson,
// 	getObjectByFilters,
// 	createObject,
// 	init
// } from './base'

import { logger } from '../utils'

export default function (props = {}) {

    this.retrieveContactTag = () => {
        // Gets tags attached to a contact
        // TODO:
        // From here pull all the contact tags associated with this contact
        // /api/3/contacts/<CONTACTIDHERE>/contactTags
        logger(`Retrieve contact tag`)
    }

    this.addTag = () => {
        logger(`Add contact tag`)
    }

    this.removeTag = () => {
        logger(`Remove contact tag`)
    }
}