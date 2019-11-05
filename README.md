# Zygote Plugin Active Campaign

This plugin is the integration of Zygote and Active Campaign

## :construction: UNDER DEVELOPMENT :construction:

---

## Installation

With npm:

```bash
npm install --save zygote-plugin-active-campaign
```

Or with Yarn:

```bash
yarn add zygote-plugin-active-campaign
```

---

## What does the plugin do

On the `preInfo` hook:

- Creates/Updates a contact resource
- Creates/Updates eCommerce customer resource
- Creates/Updates order with an abandoned cart flag

On the `postOrder` hook:

- Updates the created abandoned cart order

---

## Deep Data Integration

The plugin focuses on creating **deep data integrations** through Active Campaign

[Deep Data Integration - Active Campaign](https://developers.activecampaign.com/reference#connections)

---

## Configuration

On the index the same file that your Cart is being imported from Zygote, import the plugin:

```js
import * as ZygoteAC from "zygote-plugin-active-campaign"
```

Inject the plugin in the cart:

```jsx
<Cart
    plugins={[ZygoteAC]}
/>
```

On `componentDidMount()` initialize the AC plugin by sending in the configurations(view details below about the data expected):

```js
componentDidMount() {
  ZygoteAC.init(config, devConfig, pluginConfig, defaultConfig)
}
```

Initialization Parameter objects description:

1. `config` - Active Campaign account configuration specifications:

    | Property Name        | Data Type | Description                       |
    | -------------------- | --------- | ----------------------------------|
    | serviceName          | `string`  | Name of the service               |
    | serviceLogoUrl       | `string`  | url to logo of service            |
    | proxyUrl             | `string`  | url that points to proxy          |
    | origin               | `string`  | origin of requests                |
    | host                 | `string`  | hosting site                      |

    <details><summary><b>View Example</b></summary>

    ```js
    {
      serviceName: `MyCompanyOne`,
      serviceLogoUrl: `https://www.mycompanyone.com/media/logo.png`,
      proxyUrl: `https://www.mycompanyone.com/api/3/`,
      origin: `https://www.mycompanyone.com/`,
      host: `www.mycompanyone.com`,
    }
    ```

    </details>

2. `devConfig` - define sandbox url and set it to run on dev mode

    | Property Name        | Data Type | Description                       |
    | -------------------- | --------- | ----------------------------------|
    | proxyDevUrl          | `string`  | url for the sanbox account        |
    | isDevMode            | `boolean` | sets plugin to run on dev mode    |

    <details><summary><b>View Example</b></summary>

    ```js
    {
      proxyDevUrl: `https://mysandboxacct.netlify.com/dev/api/3/`,
      isDevMode: true
    }
    ```

    </details>

3. `pluginConfig` - displaying and styling of plugin

    | Property Name        | Data Type | Description                              |
    | -------------------- | --------- | -----------------------------------------|
    | acceptsMarketing     | `boolean` | Set checkbox to start  checked/unchecked |
    | color                | `string`  | HEX value of the checkbox                |
    | text                 | `string`  | Display text for the opt-in              |

    <details><summary><b>View Example</b></summary>

    ```js
    {
        acceptsMarketing: true,
        color: `#182A42`,
        text: `I would like to receive emails and updates about my order and special promotions`,
    }
    ```

    </details>

4. `defaultConfig` - default configurations for the plugin to run based on

    | Property Name        | Data Type | Description                              |
    | -------------------- | --------- | -----------------------------------------|
    | abandonOffset        | `number`  | Offset time in _minutes_ from current time that a cart is flagged as abandoned |

    <details><summary><b>View Example</b></summary>

    ```js
    {
        abandonOffset: 5
    }
    ```

    </details>

5. `automationConfig` - custom configuration for automations
    | Property Name        | Data Type | Description                              |
    | -------------------- | --------- | --------------------------------------------------------------|
    | clearAutomations     | `boolean` | clear contact from all automations after checkout is completed|

    <details><summary><b>View Example</b></summary>

    ```js
    {
        clearAutomations: true
    }
    ```

    </details>

---

## Proxy Setup

The Active Campaign API requires **API requests to come from a proxy or a server.**

For *Netlify* you can setup a proxy on your `netlify.toml` file ([docs](https://www.netlify.com/docs/netlify-toml-reference/)).

Add the following to your `netlify.toml` file:

```toml
[[redirects]]
  from = "/api/3/:params/:id"
  to = "https://<account-name>.api-us1.com/api/3/:params/:id"
  status = 200
  force = true
  [redirects.headers]
    Api-Token = "<AC-API-KEY>"

[[redirects]]
  from = "/api/3/:params"
  to = "https://<account-name>.api-us1.com/api/3/:params"
  status = 200
  force = true
  [redirects.headers]
    Api-Token = "<AC-API-KEY>"

# Optional if you want to be able to run pointing to a Sand Box
[[redirects]]
  from = "/dev/api/3/:params/:id"
  to = "https://<sandbox-account-name>.api-us1.com/api/3/:params/:id"
  status = 200
  force = true
  [redirects.headers]
    Api-Token = "<AC-SANDBOX-API-KEY>"

[[redirects]]
  from = "/dev/api/3/:params"
  to = "https://<sandbox-account-name>.api-us1.com/api/3/:params"
  status = 200
  force = true
  [redirects.headers]
    Api-Token = "<AC-SANDBOX-API-KEY>"
```

For additional info on Proxy setup on Netlify:

[Netlify - Rewrites and Proxying](https://www.netlify.com/docs/redirects/#rewrites-and-proxying)

[Netlify - Toml Reference](https://www.netlify.com/docs/netlify-toml-reference/)

---

## Additional Docs

:loudspeaker: [Active Campaign Documentation](https://developers.activecampaign.com/reference#overview)

:shopping_cart: [Zygote Cart Documentation](https://escaladesports.github.io/zygote-cart/)
