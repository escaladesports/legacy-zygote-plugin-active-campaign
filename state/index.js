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
		isDevMode: false,
	},
	pluginConfig: {
		acceptsMarketing: true,
		color: `#182A42`,
		text: `I would like to receive emails and updates about my order and special promotions`,

	},
	defaultConfig: {
		abandonOffset: 30
	}
}, {
	init(
		{ serviceName, serviceLogoUrl, proxyUrl, origin, host },
		{ proxyDevUrl, isDevMode },
		{ acceptsMarketing, color, text },
		{ abandonOffset }
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
				isDevMode: isDevMode || this.state.devConfig.isDevMode,
			},
			pluginConfig: {
				acceptsMarketing: acceptsMarketing || this.state.pluginConfig.acceptsMarketing,
				color: color || this.state.pluginConfig.color,
				text: text || this.state.pluginConfig.text,
			},
			defaultConfig: {
				abandonOffset: abandonOffset || this.state.defaultConfig.abandonOffset
			}
		})
	}
}, {
	localStorage: 'zygoteActiveCampaign'
})