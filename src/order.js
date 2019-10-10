import { EComOrder } from './classes'

const postOrder = async ({response, info, preFetchData}) => {
    try {
        // update current order as unabandoned
        const acOrder = await EComOrder.completeAbandonedStateOrder()
        console.log(`acOrder: `, acOrder)
        if (!acOrder) return info

    } catch (ex) {
        console.error(`Error!: `, ex)
    }
    return response
}

export { postOrder }