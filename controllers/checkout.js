const stripe = require('stripe')(
  'sk_test_51HlWoOBo1w65UuRVuebqp0BmyhNUgmUhkYXL9OhRIYKLR6UYckuYhMuOLOeFAHTKjrNnrelgMVN9kPvPhikK3Vgy00FOlVynWK'
);

module.exports = {
  async createOne(req, res) {
    console.log(req);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://example.com/success/',
      cancel_url: 'https://example.com/cancel',
    });
    console.log(session);

    res.json({ id: session.id });
  },

  async handleSuccessfulPayment() {},
};
