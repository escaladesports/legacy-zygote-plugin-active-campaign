import { State } from 'statable'

export default new State({
	connection: null,
	ecomOrderProducts: null,
	ecomOrder: null,
	acceptsMarketing: false,
	config: {
		serviceName: `VictoryTailgate`,
		serviceLogoUrl: `https://escaladesports.github.io/zygote-cart/images/logo.png`,
		proxyUrl: `/api/3/`
	}
})