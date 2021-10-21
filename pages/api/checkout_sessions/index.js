import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			// Create Checkout Sessions from body params.
			const session = await stripe.checkout.sessions.create({
				line_items: [
					{
						price: JSON.parse(req.body).priceID,
						quantity: 1,
					},
				],
				payment_method_types: ['card'],
				mode: 'payment',
				success_url: `${req.headers.origin}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
				cancel_url: `${req.headers.origin}/?canceled=true`,
				phone_number_collection: { enabled: true },
				metadata: {
					fullfillmentDate: 'today',
				},
				shipping_address_collection: {
					allowed_countries: ['US'],
				},
			})

			res.status(200).json(session)
		} catch (err) {
			console.log(err)
			res.status(err.statusCode || 500).json(err.message)
		}
	} else {
		res.setHeader('Allow', 'POST')
		res.status(405).end('Method Not Allowed')
	}
}
