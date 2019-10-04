import { createEcomOrder, addCartAbandoned } from './utils/dataFormatter'
import { postACItem } from './utils/requests'

const createAbandonedOrder = (data, connectionid, customerid) => {
    let order = createEcomOrder(data, connectionid, customerid)
    order = addCartAbandoned(order)

    return postACItem(`ecomOrders`, order)
}


export { createAbandonedOrder }