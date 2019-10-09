import React from 'react'
import { Subscribe } from 'statable'
import { css } from 'emotion'
import activeCampaignState from '../../state'


function setMarketingState() {
	let acceptsMkt = activeCampaignState.state.acceptsMarketing || false
	console.log('Update marketing state: ', acceptsMkt)
	activeCampaignState.setState({ acceptsMarketing: !acceptsMkt })
	console.log(activeCampaignState)
}

const Info = () => {
	return (
		<Subscribe to={activeCampaignState}>
			{state => (
				<div className={divStyle}>
					<span className="checkmark"></span>
					<input type="checkbox" id="checkbox_mkt"
						onChange={setMarketingState}
						checked={state.acceptsMarketing}
					/>
					<label htmlFor="checkbox_mkt">I would like to receive emails and updates about my order and special promotions</label>
				</div>
			)}
		</Subscribe>
	)
}

// TODO: Allow to set custom css
const divStyle = css({
	padding: `5px 0px`,
	marginTop: `25px`,
	textAlign: `center`,
})


export { Info }