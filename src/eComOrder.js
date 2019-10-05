import { postACItem } from './utils/requests'

export const createAbandonedOrder = async (info, connectionId, customerId) => {
	console.log(`createAbandonedOrder running...`)

	let activeOrder = new ActiveCampaignEComOrder(
		`${info.totals.subtotal}-${customerId}-${connectionId}`,
		connectionId,
		customerId,
		info.infoEmail,
		info.totals.subtotal,
		info.products
	).requestJson()

	activeOrder.abandonCart()

	let eComOrder
	await postACItem(`ecomOrders`, activeOrder)
		.then(response => eComOrder = response ? response.eComOrder : null)
	
	console.log(`createAbandonedOrder returning: `, eComOrder)
	return eComOrder
}

export const updateAbandonedOrder = async (order) => {
	console.log(`updateAbandonedOrder running...`)
	ActiveCampaignEComOrder.setActiveCartStatus(order.ecomOrder)

	let eComOrder
	await postACItem(`ecomOrderId`, order)
		.then(response => eComOrder = response ? response.eComOrder : null)

	console.log(`updateAbandonedOrder returning: `, eComOrder)
	return eComOrder
}

export class ActiveCampaignEComOrder {
	source = `1`
	email
	orderUrl = ``
	externalCreatedDate = `2019-09-30T17:41:39-04:00`
	externalUpdatedDate = `2019-09-30T17:41:39-04:00`
	shippingMethod = `UPS Ground`
	totalPrice
	shippingAmount = 0
	taxAmount = 0
	discountAmount = 0
	currency = `USD`
	orderNumber
	connectionid
	customerid
	orderProducts = []

	constructor(orderNumber, connectionId, customerId, email = ``, totalPrice = 0, orderProducts = []) {
		this.email = email
		this.totalPrice = totalPrice
		this.orderNumber = orderNumber
		this.connectionid = connectionId
		this.customerid = customerId
		this.orderProducts = orderProducts.map(product => {
			return {
				externalid: product.id,
				name: product.name,
				price: product.price,
				quantity: product.quantity,
				category: ``,
				sku: ``,
				description: product.description,
				imageUrl: product.image,
				productUrl: ``
			}
		})
	}

	abandonCart() {
		// TODO: Review the id and date
		// Add externalcheckoutid and abandoned_date to make cart abandonded
		this.externalcheckoutid = `${this.totalPrice}-${this.customerid}-${this.connectionid}`
		this.abandoned_date = `2019-09-30T17:41:39-04:00`
	}

	static setActiveCartStatus(eComOrder) {
		delete eComOrder.externalcheckoutid
		delete eComOrder.abandoned_date
		eComOrder.externalid = Date.now()
	}

	requestJson = () => {
		return {
			ecomOrder: {
				...this
			}
		}
	}
}