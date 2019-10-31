import { completeAbandonedStateOrder } from './classes'
import acState from '../state'

const postOrder = async ({response, info, preFetchData}) => {

    const { success } = response
    // Only complete if order was successfully submitted
    try {
        // update current order as unabandoned
        // don't await - let it run in background
        console.log(`completing AC order...`)
        console.log(`Complete order data in state: `, acState.state)
        console.log(`Response from postOrder api: `, response)
        console.log(`Info from postOrder api: `, info)
        console.log(`preFetchData from postOrder api: `, preFetchData)
        if (success) completeAbandonedStateOrder()
    } catch (ex) {
        console.error(`Error!: `, ex)
    }

    return response
}

export { postOrder }