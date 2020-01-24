import { completeAbandonedStateOrder, removeFromAutomations, removeContactTag } from './classes'
import { logger } from './utils'
import acState from './state'

const postOrder = async ({response, info, preFetchData}) => {

    const { success } = response
    // Only complete if order was successfully submitted
    try {
        // update current order as unabandoned
        // don't await - let it run in background
        logger(`completing AC order...`)
        logger(`Complete order data in state: `, acState.state)
        logger(`Response from postOrder api: `, response)
        logger(`Info from postOrder api: `, info)
        logger(`preFetchData from postOrder api: `, preFetchData)
        if (success) {
            completeAbandonedStateOrder()
            if (acState.state.automationConfig.clearAutomations) removeFromAutomations()
            if (acState.state.pluginConfig.addAbandonedTag) removeContactTag()
        }
    } catch (ex) {
        console.error(`Error!: `, ex)
    }

    return response
}

export { postOrder }