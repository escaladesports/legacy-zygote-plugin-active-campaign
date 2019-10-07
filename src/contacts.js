import { postACItem, getFilteredACItem } from './utils/requests'

function ActiveCampaignContact (props = {}) {
	this.email = props.email || ''
	this.firstName = props.firstName || ''
	this.lastName = props.lastName || ''
	this.phone = props.phone || ''

	this.requestJson = () => {
		return {
			contact: {
				...this
			}
		}
	}

	this.getContactByEmail = async () => {
		console.log(`getContactByEmail running...`)

		let contact
		await getFilteredACItem(`contacts`, [
			{ filter: `email`, value: this.email }
		])
			.then(itemJson => { 
				if (itemJson && itemJson.length) contact = itemJson[0]
			})

		console.log(`getContactByEmail returning: `, contact)
		return contact
	}

	this.createContact = async () => {
		console.log(`createContact running...`)

		let contact
		await postACItem(`contacts`,
			this.requestJson()
		)
			.then(response => contact = response ? response.contact : null)

		console.log(`createContact returning: `, contact)
		return contact
	}

	this.init = async () => {
		console.log(`ActiveCampaignContact.init running...`)

		let acItem
		await this.getContactByEmail()
			.then(itemJson => acItem = itemJson)

		if (!acItem) {
			await this.createContact()
				.then(itemJson => acItem = itemJson)
		}
		console.log(`ActiveCampaignContact.init returning: `, acItem)
		return acItem
	}
}

export {
	ActiveCampaignContact
} 