import Stripe from 'stripe'

export default async function fetchProducts(req, res) {
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

	const productPriceData = await stripe.prices.list({
		expand: ['data.product'], // 🎉 Give me the product data too!
	})

	const productData = productPriceData.data.map(
		({ product, unit_amount, id }) => ({
			name: product.name,
			description: product.description,
			price: unit_amount / 100,
			image: product.images[0],
			priceID: id,
		})
	)

	res.status(200).json(productData)
}
