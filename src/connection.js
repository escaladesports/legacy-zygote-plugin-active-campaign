import { getFilteredACItem, postACItem } from './utils/requests'
import { serviceName, serviceLogoUrl } from './utils/config'

import activeCampaignState from '../state'

function ActiveCampaignConnection (props = {}) {
	this.externalid = props.externalid || window.location.host
	this.name = props.name || window.location.host
	this.linkUrl = props.linkUrl || window.location.origin
	this.service = props.service || serviceName
	this.logoUrl = props.logoUrl || serviceLogoUrl

	this.requestJson = () => {
		return {
			connection: {
				...this
			}
		}
	}

	this.getConnectionByHostUrl = async () => {
		console.log(`getConnectionByHostUrl running...`)

		let connection
		await getFilteredACItem(`connections`, [
			{ filter: `externalid`, value: window.location.host }
		])
			.then(itemJson => {
				if (itemJson && itemJson.length) connection = itemJson[0]
			})

		console.log(`getConnectionByHostUrl returning: `, connection)
		return connection
	}

	this.createConnection = async () => {
		console.log(`createConnection running...`)

		let connection
		await postACItem(`connections`,
			this.requestJson()
		)
			.then(response => connection = response ? response.connection : null)

		console.log(`createConnection returning: `, connection)
		return connection
	}

	this.init = async () => {
		console.log(`ActiveCampaignConnection.init running...`)

		let acItem = activeCampaignState.state.activeCampaignConnection || null
		if (!acItem) {
			await this.getConnectionByHostUrl()
				.then(itemJson => acItem = itemJson)

			if (!acItem) {
				await this.createConnection()
					.then(itemJson => acItem = itemJson)
			}
			if (acItem) activeCampaignState.setState({ activeCampaignConnection: acItem })
		}
		console.log(`ActiveCampaignConnection.init returning: `, acItem)
		return acItem
	}
}

export { 
	ActiveCampaignConnection
} 