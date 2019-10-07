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

## Proxy Setup

The Active Campaign API requires **API requests to come from a proxy or a server.**


For *Netlify* you can setup a proxy on your `netlify.toml` file ([docs](https://www.netlify.com/docs/netlify-toml-reference/)).

Add the following to your `netlify.toml` file:

```toml
[[redirects]]
  from = "/api/3/:params"
  to = "https://<account-name>.api-us1.com/api/3/:params"
  status = 200
  force = true
  [redirects.headers]
    Api-Token = "<AC-API-KEY>"
```

For additional info on Proxy setup on Netlify:

[Netlify - Rewrites and Proxying](https://www.netlify.com/docs/redirects/#rewrites-and-proxying)

[Netlify - Toml Reference](https://www.netlify.com/docs/netlify-toml-reference/)

---

## Deep Data Integration

The plugin focuses on creating **deep data integrations** through Active Campaign

[Deep Data Integration - Active Campaign](https://developers.activecampaign.com/reference#connections)

---

## What does the plugin do

On the `postInfo` hook
- Creates/Updates a contact resource
- Creates/Updates eCommerece customer resource
- Creates/Updates order with an abandoned cart flag

On the `postOrder` hook
- Updates the created abandoned cart order

---

## Additional Docs

:loudspeaker: [Active Campaign Documentation](https://developers.activecampaign.com/reference#overview)

:shopping_cart: [Zygote Cart Documentation](https://escaladesports.github.io/zygote-cart/)
