import { updateAbandonedOrder } from './eComOrder'

let currentActiveCampaignOrder

const setCurrentOrder = async (order) => { 
    currentActiveCampaignOrder = order
    console.log(`order: `, order)
    console.log(`currentActiveCampaignOrder: `, currentActiveCampaignOrder)
}

const postOrder = async ({response, info, preFetchData}) => {
    // TODO: Handle the order update and remove cart flag

    // Get the current order
    // Update it

    try {
        console.log(`info: `, info)
        console.log(`currentActiveCampaignOrder: `, currentActiveCampaignOrder)
        if (!currentActiveCampaignOrder) return info
        // Create the abandoned eComOrder
        let updatedOrder = await updateAbandonedOrder(currentActiveCampaignOrder)
        console.log(`updateACOrder has run`)
        console.log(`updatedOrder final: `, updatedOrder)
        setCurrentOrder(null)
    } catch (ex) {
        console.log(`Error!: `, ex)
    }

    console.log(`info final: `, info)
    console.log(`currentActiveCampaignOrder final: `, currentActiveCampaignOrder)
    return response
}

export { postOrder, setCurrentOrder }