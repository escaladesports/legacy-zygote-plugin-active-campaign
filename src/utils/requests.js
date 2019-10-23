import fetch from 'isomorphic-fetch'
import { buildFiltersString } from '../utils'
import acState from '../../state'

export const getFilteredACItem = async (type, filters) => {
	console.log(`getFilteredACItem filters: `, filters)

	let responseItem = null
	let url = acState.state.config.isDevMode ? acState.state.config.proxyDevUrl : acState.state.config.proxyUrl
	
	await fetch(`${url}${type}${buildFiltersString(filters)}`, { 
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
	console.log(`postACItem data: `, data)

	let responseItem = null
	let url = acState.state.config.isDevMode ? acState.state.config.proxyDevUrl : acState.state.config.proxyUrl
	
	await fetch(`${url}${type}`, {
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
	console.log(`putACItem data: `, data)

	let responseItem = null
	let url = acState.state.config.isDevMode ? acState.state.config.proxyDevUrl : acState.state.config.proxyUrl
	// TODO: Resolve url for dev mode
	await fetch(`${url}${type}`, {
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

export const deleteACItem = async (type) => {
	console.log(`deleteACItem type: `, type)

	let responseItem = null
	let url = acState.state.config.isDevMode ? acState.state.config.proxyDevUrl : acState.state.config.proxyUrl

	await fetch(`${url}${type}`, {
		method: `DELETE`
	})
		.then(response => response.json())
		.then(responseJson => {
			console.log(`response from deleteACItem: `, responseJson)
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