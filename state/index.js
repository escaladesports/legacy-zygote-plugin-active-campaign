import { State } from 'statable'

export default new State({
	connection: null,
	ecomOrderProducts: null,
	ecomOrder: null,
	acceptsMarketing: true,
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
		abandonOffset: 5
	}
})