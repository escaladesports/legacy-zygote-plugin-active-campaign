import { getACItemById, deleteACItem } from '../utils'
import acState from '../../state'


const AC_AUTOMATION_ENDPOINT = `contactAutomations`

export const removeFromAutomations = async () => {
    // 1. get contact id from api
    let contactId = acState.state.contact.id
    console.log(`contact: `, acState.state.contact)
    let contact = await getACItemById(`contacts`, contactId)
    console.log(`Contact: `, contact)
    let activeAutomations = contact.contactAutomations.filter(automation => automation.completeValue !== 100)
    console.log(`activeAutomations: `, activeAutomations)
    // Remove contact from automation queue
    if(activeAutomations.length) {
        activeAutomations.forEach(automation => {
            try {
                await deleteACItem(`${AC_AUTOMATION_ENDPOINT}/${automation.id}`)
                    .then(response => console.log(`delete response: `, response))
            } catch(e) {
		        console.log('error deleting order: ', e)
            }
        })
    }

}