import React from 'react'
import { Subscribe } from 'statable'
import { css, keyframes } from 'emotion'
import activeCampaignState from '../../state'

// TODO: Import primary color and signUpText text from the config file
// import { primaryColor, signUpText } from 'config'
const primaryColor = `#182A42`
const signUpText = `I would like to receive emails and updates about my order and special promotions`

function setMarketingState() {
	let acceptsMkt = activeCampaignState.state.acceptsMarketing || false
	console.log(`Update marketing state: `, acceptsMkt)
	activeCampaignState.setState({ acceptsMarketing: !acceptsMkt })
	console.log(activeCampaignState)
}

const Info = () => {
	return (
		<Subscribe to={activeCampaignState}>
			{state => (
				<div className={divStyle}>
					<input type="checkbox" id="checkbox_mkt"
						onChange={setMarketingState}
						checked={state.acceptsMarketing}
					/>
					<label htmlFor="checkbox_mkt">{signUpText}</label>
				</div>
			)}
		</Subscribe>
	)
}


const checkedProcess = keyframes`
	from {
		transform: rotate(0deg);
		opacity: 0;
		backgroundColor: #F8F8F8;
	}
	to {
		transform: rotate(45deg);
		opacity: 1;
		backgroundColor: #FFF;
	}
`

const uncheckedProcess = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`

const divStyle = css({
	marginTop: `20px`,
	padding: `20px 2px`,
	'input[type="checkbox"]': {
		display: `none`,
	},
	
	'input[type="checkbox"] + label': {
		display: `block`,
		position: `relative`,
		paddingLeft: `35px`,
		marginBottom: `20px`,
		cursor: `pointer`,
	},

	'input[type="checkbox"] + label:last-child': {
		marginBottom: `0`,
	},

	'input[type="checkbox"] + label:before': {
		content: `''`,
		display: `block`,
		width: `20px`,
		height: `20px`,
		border: `2px solid ${primaryColor}`,
		position: `absolute`,
		left: `0`,
		top: `5px`,
		opacity: `1`,
		borderRadius: `4px`,
		backgroundColor: `#F8F8F8`,
		animation: `${uncheckedProcess} 0.5s ease`,
	},

	'input[type="checkbox"]:checked + label:before': {
		width: `10px`,
		top: `0px`,
		left: `5px`,
		borderRadius: `0`,
		opacity: `1`,
		borderTopColor: `transparent`,
		borderLeftColor: `transparent`,
		backgroundColor: `#FFF`,
		animation: `${checkedProcess} 0.15s ease`,
		transform: `rotate(45deg)`,
	},
})



export { Info }