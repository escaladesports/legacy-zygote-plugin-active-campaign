import { State } from 'statable'

export default new State({
	connection: null,
	ecomOrderProducts: null,
	ecomOrder: null,
	config: {
		serviceName: `VictoryTailgate`,
		serviceLogoUrl: `https://escaladesports.github.io/zygote-cart/images/logo.png`,
		proxyUrl: `https://ac-preview--victorytailgate.netlify.com/api/3/`,
		origin: `https://ac-preview--victorytailgate.netlify.com`,
		host: `ac-preview--victorytailgate.netlify.com`,
	},
	devConfig: {
		proxyDevUrl: `https://ac-dev-mode--victorytailgate.netlify.com/dev/api/3/`,
		devOrigin: `https://ac-preview--victorytailgate.netlify.com`,
		isDevMode: false,
		isLogging: false,
	},
	pluginConfig: {
		hasFullImageUrl: false,
		acceptsMarketing: false,
		color: `#182A42`,
		text: `I would like to receive emails and updates about my order and special promotions`
	},
	defaultConfig: {
		abandonOffset: 30
	},
	automationConfig: {
		clearAutomations: false
	}
}, {
	init(
		{ serviceName, serviceLogoUrl, proxyUrl, origin, host },
		{ proxyDevUrl, devOrigin, isDevMode, isLogging },
		{ hasFullImageUrl, acceptsMarketing, color, text },
		{ abandonOffset },
		{ clearAutomations }
	) {
		this.setState({
			...this.state,
			config: {
				serviceName: serviceName || this.state.config.serviceName,
				serviceLogoUrl: serviceLogoUrl || this.state.config.serviceLogoUrl,
				proxyUrl: proxyUrl || this.state.config.proxyUrl,
				origin: origin || this.state.config.origin,
				host: host || this.state.config.host,
			},
			devConfig: {
				proxyDevUrl: proxyDevUrl || this.state.devConfig.proxyDevUrl,
				devOrigin: devOrigin || this.state.devConfig.devOrigin,
				isDevMode: isDevMode || this.state.devConfig.isDevMode,
				isLogging: isLogging || this.state.isLogging,
			},
			pluginConfig: {
				hasFullImageUrl: hasFullImageUrl || this.state.pluginConfig.hasFullImageUrl,
				acceptsMarketing: acceptsMarketing || this.state.pluginConfig.acceptsMarketing,
				color: color || this.state.pluginConfig.color,
				text: text || this.state.pluginConfig.text
			},
			defaultConfig: {
				abandonOffset: abandonOffset || this.state.defaultConfig.abandonOffset
			},
			automationConfig: {
				clearAutomations: clearAutomations || this.state.automationConfig.clearAutomations
			}
		})
	}
}, {
	localStorage: 'zygoteActiveCampaign'
})