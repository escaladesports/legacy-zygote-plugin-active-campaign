import { completeAbandonedStateOrder } from './classes'

const postOrder = async ({response, info, preFetchData}) => {
    try {
        // update current order as unabandoned
        // don't await - let it run in background
        console.log(`completing AC order...`)
        completeAbandonedStateOrder()

    } catch (ex) {
        console.error(`Error!: `, ex)
    }
    return response
}

export { postOrder }