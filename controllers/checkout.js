const Tickets = require('../models/Tickets');

const stripe = require('stripe')(
  'sk_test_51HlWoOBo1w65UuRVuebqp0BmyhNUgmUhkYXL9OhRIYKLR6UYckuYhMuOLOeFAHTKjrNnrelgMVN9kPvPhikK3Vgy00FOlVynWK'
);

module.exports = {
  async createOne({ body }, res) {
    const { ticketId } = body;
    console.log(ticketId);
    try {
      const ticket = await Tickets.findById(ticketId);
      if (!ticket) {
        return res
          .status(404)
          .json({ message: 'Ticket id provided was not found' });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'sek',
              product_data: {
                name: ticket.movieName,
                images: [ticket.movieCover],
              },
              unit_amount: ticket.unitAmount,
            },
            quantity: ticket.quantity,
          },
        ],
        mode: 'payment',
        success_url: 'https://example.com/success/',
        cancel_url: 'https://example.com/cancel',
      });
      console.log(session);

      return res.status(200).json({ id: session.id });
    } catch (e) {
      return res
        .status(500)
        .json({ message: 'Problem with creating checkout session', error: e });
    }
  },

  async handleSuccessfulPayment() {},
};
