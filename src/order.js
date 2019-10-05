// import { createEcomOrder } from './eComOrder/eComOrder'

const postOrder = async ({response, info, preFetchData}) => {
    // TODO: Handle the order update and remove cart flag

    // Get the current order
    // Update it

    try {
        console.log(`info: `, info)
        // Create the abandoned eComOrder
        let updatedOrder = await updateACOrder(info)
        console.log(`updateACOrder has run`)
        console.log(`updatedOrder final: `, updatedOrder)
    } catch (ex) {
        console.log(`Error!: `, ex)
    }

    console.log(`info final: `, info)
    return response
}

export { postOrder }