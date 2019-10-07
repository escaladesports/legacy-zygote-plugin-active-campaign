import fetch from 'isomorphic-fetch'
import { buildFiltersString } from './dataFormatter'
import { proxyUrl } from './config'

export const getFilteredACItem = async (type, filters) => {

	let responseItem = null
	await fetch(`${proxyUrl}${type}${buildFiltersString(filters)}`, { 
		method: `GET`
	})
		.then(response => response.json())
		.then(responseJson => {
			console.log(`response from getFilteredACItem: `, responseJson)
			if (responseJson) { 
				if (responseJson.errors) console.log(`API Errors: `, responseJson.errors)
				else responseItem = responseJson[type]
			}
		})
		/* .then(response => {
			// console.log(response)
		}) */

	return responseItem
}

export const postACItem = async (type, data) => {

	let responseItem = null
	await fetch(`${proxyUrl}${type}`, {
		method: `POST`,
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	})
		.then(response => {
			if (response.errors) console.error(`Response Errors: `, response.errors)
			return response.json()
		})
		.then(responseJson => {
			console.log(`response from postACItem: `, responseJson)
			if (responseJson) responseItem = responseJson
		})
		/* .then(response => {
			// console.log(response)
		}) */

	return responseItem
}

export const putACItem = async (type, data) => {

	let responseItem = null
	await fetch(`${proxyUrl}${type}/${data.id}`, {
		method: `PUT`,
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	})
		.then(response => {
			if (response.errors) console.error(`Response Errors: `, response.errors)
			return response.json()
		})
		.then(responseJson => {
			console.log(`response from putACItem: `, responseJson)
			if (responseJson) responseItem = responseJson
		})
	/* .then(response => {
		// console.log(response)
	}) */

	return responseItem
}