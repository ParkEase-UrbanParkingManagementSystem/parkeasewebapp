    import Stripe from 'stripe';

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2022-11-15',
    });

    export default async function handler(req, res) {
        if (req.method === 'POST') {
            try {
                console.log(req.headers.origin);
                console.log("in admin-to-pmccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc")
                const { amount, pmc_id } = req.body;
                console.log("Amount:", amount);
                console.log("PMC ID:", pmc_id);
                // const { amount } = req.body;

                // Create Checkout Sessions from body params.
                const session = await stripe.checkout.sessions.create({
                    
                    payment_method_types: ['card'],
                    line_items: [
                        {
                            price_data: {
                                currency: 'lkr',
                                product_data: {
                                    name: 'Wallet Top Up',
                                },
                                unit_amount: Math.round(amount * 100), // Stripe expects amounts in cents
                            },
                            quantity: 1,
                        },
                    ],
                    mode: 'payment',
                    // console.log(req.headers.origin);
                    
                    success_url: `${req.headers.origin}/admin/allTransactions?session_id={CHECKOUT_SESSION_ID}&pmc_id=${pmc_id}`,
                    cancel_url: `${req.headers.origin}/admin/allTransactions`,
                });

                res.status(200).json({ url: session.url });
            } catch (err) {
                console.error("Error in create-checkout-session:", err);
                res.status(500).json({ statusCode: 500, message: err.message });
            }
        } else {
            res.setHeader('Allow', 'POST');
            res.status(405).end('Method Not Allowed');
        }
    }

