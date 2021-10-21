# Friction Log

## Project Details

Project: Selling Stripe products (precursor to the catering application)

Purpose: To showcase Amplify ISR, Lambda Secrets, NextJS Image Component, Deploy to Amplify Console button

## Project Flow

### Smoke Test

Ran the following command:
`npx create-next-app nextjs-stripe-amplify-product-seller`

Added a few products to Stripe from the Dashboard
Found the API to fetch all my products:
`https://stripe.com/docs/api/products/list?lang=node`

Installed Stripe libraries:
`npm install @stripe/stripe-js stripe`

Updated NextJS code to fetch products in getStaticProps with ISR

Frontend:

```js
const Home = ({ products }) => {
	console.log({ products })

	return <img src={products.data[0].images[0]} alt="" />
}
```

ServerSide:

```js
export async function getServerSideProps() {
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

	const productPriceData = await stripe.prices.list({
		expand: ['data.product'],
	})
	console.log(JSON.stringify(productPriceData, null, 2))

	const products = {}
	return {
		props: { products },
	}
}
```

The product image successfully displayed!

---

### Creating A Checkout Experience

# DO OVER

The app doesn't work in nextjs ssr due to secrets not being available. Opting for a pure client side solution with Amplify. Was going to go with CRA, but there's overhead in setting up routes and ain't nobody got time for that. Plus once the bugs are worked out, NextJS will be a great solution.

---

1. configure Amplify to add an api
