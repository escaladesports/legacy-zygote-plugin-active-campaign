import fetch from 'isomorphic-fetch'
import { buildFiltersString, logger } from '../utils'
import acState from '../state'

export const getFilteredACItem = async (type, filters) => {
	logger(`getFilteredACItem filters: `, filters)

	let responseItem = null
	let url = acState.state.devConfig.isDevMode ? acState.state.devConfig.proxyDevUrl : acState.state.config.proxyUrl
	logger(`getFilteredACItem url: `, `${url}${type}${buildFiltersString(filters)}`)
	logger(`current state: `, acState.state)
	await fetch(`${url}${type}${buildFiltersString(filters)}`, { 
		method: `GET`
	})
		.then(response => response.json())
		.then(responseJson => {
			logger(`response from getFilteredACItem: `, responseJson)
			if (responseJson) { 
				if (responseJson.errors) logger(`API Errors: `, responseJson.errors)
				else responseItem = responseJson[type]
			}
		})

	return responseItem
}

export const getACItemById = async (type, id, subQuery = ``) => {
	let responseItem = null

	let url = acState.state.devConfig.isDevMode ? acState.state.devConfig.proxyDevUrl : acState.state.config.proxyUrl

	await fetch(`${url}${type}/${id}/${subQuery}`, {
		method: `GET`
	})
	.then(response => response.json())
	.then(responseJson => {
		logger(`response from getACItemById: `, responseJson)
		if (responseJson) { 
			if (responseJson.errors) logger(`API Errors: `, responseJson.errors)
			else responseItem = responseJson
		}
	})
	return responseItem
}

export const postACItem = async (type, data) => {
	logger(`postACItem data: `, data)

	let responseItem = null
	let url = acState.state.devConfig.isDevMode ? acState.state.devConfig.proxyDevUrl : acState.state.config.proxyUrl
	logger(`postACItem url: `, `${url}${type}`)
	logger(`current state: `, acState.state)
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
			logger(`response from postACItem: `, responseJson)
			if (responseJson) responseItem = responseJson
		})

	return responseItem
}

export const putACItem = async (type, data) => {
	logger(`putACItem data: `, data)

	let responseItem = null
	let url = acState.state.devConfig.isDevMode ? acState.state.devConfig.proxyDevUrl : acState.state.config.proxyUrl
	logger(`putACItem url: `, `${url}${type}`)
	logger(`current state: `, acState)
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
			logger(`response from putACItem: `, responseJson)
			if (responseJson) responseItem = responseJson
		})

	return responseItem
}

export const deleteACItem = async (type) => {
	logger(`deleteACItem type: `, type)

	let responseItem = null
	let url = acState.state.devConfig.isDevMode ? acState.state.devConfig.proxyDevUrl : acState.state.config.proxyUrl
	logger(`deleteACItem url: `, `${url}${type}`)
	logger(`current state: `, acState.state)
	await fetch(`${url}${type}`, {
		method: `DELETE`
	})
		.then(response => response.json())
		.then(responseJson => {
			logger(`response from deleteACItem: `, responseJson)
			if (responseJson) {
				if (responseJson.errors) logger(`API Errors: `, responseJson.errors)
				else responseItem = responseJson[type]
			}
		})

	return responseItem
}