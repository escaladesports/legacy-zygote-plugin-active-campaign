import { updateAbandonedOrder } from './eComOrder'

class ActiveCampaignStore {
    static currentActiveCampaignOrder = null

    static setCurrentOrder = (order) => {
        console.log(`order: `, order)
        this.currentActiveCampaignOrder = order
        console.log(`currentActiveCampaignOrder: `, this.currentActiveCampaignOrder)
    }
}

const postOrder = async ({response, info, preFetchData}) => {
    try {
        console.log(`info: `, info)
        console.log(`currentActiveCampaignOrder: `, ActiveCampaignStore.currentActiveCampaignOrder)
        if (!ActiveCampaignStore.currentActiveCampaignOrder) return info

        // update current order as unabandoned
        const acOrder = await updateAbandonedOrder(
            ActiveCampaignStore.currentActiveCampaignOrder
        )
        console.log(`acOrder: `, acOrder)
        if (!acOrder) return info

        ActiveCampaignStore.setCurrentOrder(null)
    } catch (ex) {
        console.log(`Error!: `, ex)
    }

    console.log(`info final: `, info)
    return response
}

export { postOrder, ActiveCampaignStore }