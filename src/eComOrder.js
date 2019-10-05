import { createEcomOrder, addCartAbandoned, removeCartAbandonment } from './utils/dataFormatter'
import { postACItem } from './utils/requests'

const createAbandonedOrder = async (data, connectionid, customerid) => {
	let orderItem = createEcomOrder(data, connectionid, customerid)
	orderItem = addCartAbandoned(orderItem, connectionid, customerid)

	let order = await postACItem(`ecomOrders`, orderItem)
	console.log(`order final: `, order)
	return order
}

const updateAbandonedOrder = async (order) => {
	order = removeCartAbandonment(order)
	return await postACItem(`ecomOrderId`, order)
}


export { createAbandonedOrder, updateAbandonedOrder }