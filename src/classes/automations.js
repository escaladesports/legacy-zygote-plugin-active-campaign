import { getACItemById, deleteACItem, logger } from '../utils'
import acState from '../state'


const AC_AUTOMATION_ENDPOINT = `contactAutomations`

export const removeFromAutomations = async () => {
    // 1. get contact id from api
    let contactId = acState.state.contact.id
    logger(`contact: `, acState.state.contact)

    let contact, activeAutomations

    try {
        await getACItemById(`contacts`, contactId)
            .then((response) =>{
                logger(`getACItemById response: `, response)
                contact = response
            })
    } catch (e) {
        logger('error getting customer: ', e)
    }

    // filter automations to get all that are in progress
    activeAutomations = (contact && contact.contactAutomations.length) ? contact.contactAutomations.filter(automation => automation.completeValue !== 100) : null
    logger(`activeAutomations: `, activeAutomations)

    // Remove contact from automation queue
    if (activeAutomations && activeAutomations.length) {
        activeAutomations.forEach(async (automation) => {
            try {
                await deleteACItem(`${AC_AUTOMATION_ENDPOINT}/${automation.id}`)
                    .then(response => logger(`delete response: `, response))
            } catch(e) {
		        logger('error deleting automation: ', e)
            }
        })
    }

}