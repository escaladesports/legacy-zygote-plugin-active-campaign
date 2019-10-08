import React from 'react'
import { Subscribe } from 'statable'
import { css } from "@emotion/core"
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
				<div css={styles.checkMarketing}>
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

const styles = {
	checkMarketing: css`
        padding: 5px 0px;
        margin-top: 25px;
        text-align: center;
    `,
}


export { Info }