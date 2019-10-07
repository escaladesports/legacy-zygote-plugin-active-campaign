import { postACItem } from './utils/requests'

const createAbandonedOrder = async (info, connectionId, customerId) => {
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

const updateAbandonedOrder = async (order) => {
	console.log(`updateAbandonedOrder running...`)
	ActiveCampaignEComOrder.setActiveCartStatus(order.ecomOrder)

	let eComOrder
	await postACItem(`ecomOrderId`, order)
		.then(response => eComOrder = response ? response.eComOrder : null)

	console.log(`updateAbandonedOrder returning: `, eComOrder)
	return eComOrder
}

const ActiveCampaignEComOrder = function (orderNumber, connectionId, customerId, email = ``, totalPrice = 0, orderProducts = []) {
	this.email = email
	this.totalPrice = totalPrice
	this.orderNumber = orderNumber
	this.connectionid = connectionId
	this.customerid = customerId	
	this.source = `1`
	this.orderUrl = ``
	this.externalCreatedDate = `2019-09-30T17:41:39-04:00`
	this.externalUpdatedDate = `2019-09-30T17:41:39-04:00`
	this.shippingMethod = `UPS Ground`
	this.shippingAmount = 0
	this.taxAmount = 0
	this.discountAmount = 0
	this.currency = `USD`	
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

ActiveCampaignEComOrder.prototype.requestJson = function () {
	return {
		ecomOrder: {
			...this
		}
	}
}

ActiveCampaignEComOrder.prototype.abandonCart = function () {
	// TODO: Review the id and date
	// Add externalcheckoutid and abandoned_date to make cart abandonded
	this.externalcheckoutid = `${this.totalPrice}-${this.customerid}-${this.connectionid}`
	this.abandoned_date = `2019-09-30T17:41:39-04:00`
}

ActiveCampaignEComOrder.setActiveCartStatus = function (eComOrder) {
	delete eComOrder.externalcheckoutid
	delete eComOrder.abandoned_date
	eComOrder.externalid = Date.now()
}

export {
	ActiveCampaignEComOrder,
	updateAbandonedOrder,
	createAbandonedOrder
} 