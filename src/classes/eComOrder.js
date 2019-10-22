import {
	requestJson
} from './base'
import moment from 'moment'
import acState from '../../state'
import { putACItem, postACItem } from '../utils'

// Static data identifying this AC objects endpoints and object property name
const AC_ECOMORDER_JSON_PROP = `ecomOrder`
const AC_ECOMORDER_PRODUCTS_JSON_PROP = `ecomOrderProducts`
const AC_ECOMORDER_ENDPOINT = `ecomOrders`

export const setActiveCartStatus = (order = {}, props = {}) => {
	// TODO: Review this if needed
	// delete order.externalcheckoutid
	// delete order.abandoned_date
	// delete order.abandonedDate
	order.externalid = props.externalid || Date.now() // TODO: Check if we have order id available and add here
	// update order products to the order object to complete the order submitted
	order.orderProducts = acState.state[AC_ECOMORDER_PRODUCTS_JSON_PROP]
}

export const updateAbandonedOrder = async (order) => {
	console.log(`updateAbandonedOrder running...`)

	setActiveCartStatus(order)
	let ecomOrder
	await putACItem(`${AC_ECOMORDER_ENDPOINT}/${order.id}`, order)
		.then(response => ecomOrder = response ? response[AC_ECOMORDER_JSON_PROP] : null)

	console.log(`updateAbandonedOrder returning: `, ecomOrder)
	return ecomOrder
}

export const completeAbandonedStateOrder = async () => {
	let ecomOrder = acState.state[AC_ECOMORDER_JSON_PROP]
	if (acState.state[AC_ECOMORDER_JSON_PROP]) {
		ecomOrder = await updateAbandonedOrder({ ...acState.state[AC_ECOMORDER_JSON_PROP] })
		if (ecomOrder) { // When final order is successfull
			acState.setState({
				[AC_ECOMORDER_PRODUCTS_JSON_PROP]: null, // Clear the product array object from state
				[AC_ECOMORDER_JSON_PROP]: null // Clear the order object from state
			})
		}
	}
	return ecomOrder
}

export function EComOrder (props = {}) {

	this.email = props.email
	this.totalPrice = props.totalPrice || 0
	this.orderNumber = props.orderNumber
	this.connectionid = props.connectionid
	this.customerid = props.customerid

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
	this.externalCreatedDate = props.externalCreatedDate || moment().format()
	this.externalUpdatedDate = props.externalUpdatedDate || moment().format()

	this.requestJson = function () { return requestJson(AC_ECOMORDER_JSON_PROP, this) }

	this.abandonCart = (props = {}) => {
		delete this.externalid

		this.abandoned_date = moment().format()
		this.externalcheckoutid =
			props.externalcheckoutid
			|| `${Date.now()}-${this.customerid}-${this.connectionid}`
	}

	this.createAbandonedOrder = async () => {
		console.log(`createAbandonedOrder running...`)

		this.abandonCart()
		let ecomOrder, ecomProducts
		await postACItem(AC_ECOMORDER_ENDPOINT, this.requestJson())
			.then(response => {
				if (response) {
					ecomOrder = response.ecomOrder
					ecomProducts = response.ecomOrderProducts
				}
			})

		console.log(`createAbandonedOrder returning order: `, ecomOrder)
		console.log(`createAbandonedOrder returning products: `, ecomProducts)
		// after cart abandonment is created then we set the data response to state
		acState.setState({
			[AC_ECOMORDER_PRODUCTS_JSON_PROP]: ecomProducts,
			[AC_ECOMORDER_JSON_PROP]: ecomOrder
		})
		return ecomOrder
	}
}