import { postACItem } from './utils/requests'

function ActiveCampaignEComOrder (props = {}) {
	// priority properties
	this.email = props.email
	this.totalPrice = props.totalPrice || 0
	this.orderNumber = props.orderNumber
	this.connectionid = props.connectionId
	this.customerid = props.customerId

	this.orderProducts = props.orderProducts && props.orderProducts.length ?
		props.orderProducts.map(product => {
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
		: []
	
	// external id is optional, will determine cart abandment
	this.externalid = props.externalid || null

	// optional properties (have default values)
	this.source = props.source || `1`
	this.orderUrl = props.orderUrl || ``
	this.shippingMethod = props.shippingMethod || `UPS Ground`
	this.shippingAmount = props.shippingAmount || 0
	this.taxAmount = props.taxAmount || 0
	this.discountAmount = props.discountAmount || 0
	this.currency = props.currency || `USD`	

	// values that are currently static and need to be updated
	this.externalCreatedDate = props.externalCreatedDate || `2019-09-30T17:41:39-04:00`
	this.externalUpdatedDate = props.externalUpdatedDate || `2019-09-30T17:41:39-04:00`
}

ActiveCampaignEComOrder.prototype.requestJson = () => {
	return {
		ecomOrder: {
			...this
		}
	}
}

ActiveCampaignEComOrder.prototype.abandonCart = (props = {}) => {
	// TODO: Review the id and date
	// Add externalcheckoutid and abandoned_date to make cart abandonded
	delete this.externalid

	this.abandoned_date = `2019-09-30T17:41:39-04:00`
	this.externalcheckoutid =
		props.externalcheckoutid
		|| `${this.totalPrice}-${this.customerid}-${this.connectionid}`
}

ActiveCampaignEComOrder.prototype.setActiveCartStatus = (props = {}) => {
	delete this.externalcheckoutid
	delete this.abandoned_date
	this.externalid = props.externalid || Date.now()
}

ActiveCampaignEComOrder.prototype.updateAbandonedOrder = async () => {
	console.log(`updateAbandonedOrder running...`)

	this.setActiveCartStatus()
	let eComOrder
	await postACItem(`ecomOrderId`, this.requestJson())
		.then(response => eComOrder = response ? response.eComOrder : null)

	console.log(`updateAbandonedOrder returning: `, eComOrder)
	return eComOrder
}

ActiveCampaignEComOrder.prototype.createAbandonedOrder = async () => {
	console.log(`createAbandonedOrder running...`)

	this.abandonCart()
	let eComOrder
	await postACItem(`ecomOrders`, this.requestJson())
		.then(response => eComOrder = response ? response.eComOrder : null)

	console.log(`createAbandonedOrder returning: `, eComOrder)
	return eComOrder
}

export {
	ActiveCampaignEComOrder
} 