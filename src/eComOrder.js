import { createEcomOrder, addCartAbandoned, removeCartAbandonment } from './utils/dataFormatter'
import { postACItem } from './utils/requests'

const createAbandonedOrder = async (info, connectionid, customerid) => {
	let orderItem = createEcomOrder(info, connectionid, customerid)
	orderItem.ecomOrder = addCartAbandoned(orderItem.ecomOrder, connectionid, customerid)

	let order = await postACItem(`ecomOrders`, orderItem)
	console.log(`order final: `, order)
	return order
}

const updateAbandonedOrder = async (order) => {
	order.ecomOrder = removeCartAbandonment(order.ecomOrder)
	let updatedOrder = await postACItem(`ecomOrderId`, order)
	console.log(`updatedOrder final: `, updatedOrder)
	return updatedOrder
}


export { createAbandonedOrder, updateAbandonedOrder }