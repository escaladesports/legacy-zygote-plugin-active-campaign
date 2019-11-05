import { getACItemById, deleteACItem } from '../utils'
import acState from '../../state'


const AC_AUTOMATION_ENDPOINT = `contactAutomations`

export const removeFromAutomations = async () => {
    // 1. get contact id from api
    let contactId = acState.state.contact.id
    console.log(`contact: `, acState.state.contact)

    let contact, activeAutomations

    try {
        await getACItemById(`contacts`, contactId)
            .then((response) =>{
                console.log(`getACItemById response: `, response)
                contact = response
            })
    } catch (e) {
        console.log('error getting customer: ', e)
    }

    // filter automations to get all that are in progress
    activeAutomations = (activeAutomations && activeAutomations.length) ? contact.contactAutomations.filter(automation => automation.completeValue !== 100) : null
    console.log(`activeAutomations: `, activeAutomations)

    // Remove contact from automation queue
    if(activeAutomations && activeAutomations.length) {
        activeAutomations.forEach(async (automation) => {
            try {
                await deleteACItem(`${AC_AUTOMATION_ENDPOINT}/${automation.id}`)
                    .then(response => console.log(`delete response: `, response))
            } catch(e) {
		        console.log('error deleting automation: ', e)
            }
        })
    }

}