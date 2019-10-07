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
			if (responseJson) responseItem = responseJson[type]
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
		.then(response => response.json())
		.then(responseJson => {
			console.log(`response from postACItem: `, responseJson)
			if (responseJson) responseItem = responseJson
		})
		/* .then(response => {
			// console.log(response)
		}) */

	return responseItem
}