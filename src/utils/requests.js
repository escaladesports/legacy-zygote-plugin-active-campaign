import fetch from 'isomorphic-fetch'
import { buildFiltersString } from './dataFormatter'
import { proxyUrl } from './config'


/* const getACItem = async type => {
	let response

	try {
		response = await fetch(`${PROXY_URL}${type}`, {
			method: `GET`,
			body: JSON.stringify(data)
		})
	}
	catch (err) {
		console.error(`Error occured getting item: `, err)
		return null
	}

	let res = await response.json()
	console.log(`response from getACItem: `, res)

	return res
}

const getACItemById = async (type, id) => {
	let response

	try {
		response = await fetch(`${PROXY_URL}${type}/${id}`, {
			method: `GET`,
			body: JSON.stringify(data)
		})
	}
	catch (err) {
		console.error(`Error occured getting filtered item: `, err)
		return null
	}

	let res = await response.json()
	console.log(`response from getACItemById: `, res)

	return res
} */

export const getFilteredACItem = async (type, filters) => {

	let responseItem = null
	await fetch(`${proxyUrl}${type}${buildFiltersString(filters)}`, { 
		method: `GET`
	})
		.then(response => response.json())
		.then(responseJson => {
			console.log(`response from getFilteredACItem: `, responseJson)
			if (responseJson && responseJson.length) responseItem = responseJson[0]
		})
		/* .then(response => {
			// console.log(response)
		}) */

	return responseItem




	/* let response

	try {
		response = await fetch(`/api/3/${type}${buildFiltersString(filters)}`, {
			method: `GET`
		})
	}
	catch (err) {
		console.error(`Error occured getting filtered item: `, err)
		return null
	}

	let res = await response.json()
	console.log(`response from getFilteredACItem: `, res)

	return res */
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


	/* let response

	try {
		response = await fetch(`${PROXY_URL}${type}`, {
			method: `POST`,
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
	}
	catch (err) {
		console.error(`Error occured during post: `, err)
		return null
	}

	let res = await response.json()
	console.log(`response from postACItem: `, res)

	return res */
}


/* export { getACItem, getACItemById, getFilteredACItem, postACItem } */