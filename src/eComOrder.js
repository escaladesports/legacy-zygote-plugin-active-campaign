import { createEcomOrder, addCartAbandoned } from './utils/dataFormatter'
import { postACItem } from './utils/requests'

const createAbandonedOrder = async (data, connectionid, customerid) => {
	let order = createEcomOrder(data, connectionid, customerid)
	order = addCartAbandoned(order, connectionid, customerid)

	return postACItem(`ecomOrders`, order)
}


export { createAbandonedOrder }