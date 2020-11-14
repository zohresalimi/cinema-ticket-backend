const stripe = require('stripe')(
  'sk_test_51HlWoOBo1w65UuRVuebqp0BmyhNUgmUhkYXL9OhRIYKLR6UYckuYhMuOLOeFAHTKjrNnrelgMVN9kPvPhikK3Vgy00FOlVynWK'
);
const Showing = require('../models/Showing');
const Tickets = require('../models/Tickets');

module.exports = {
  async createOne({ body }, res) {
    const { ticketId } = body;
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
        success_url:
          'http://localhost:8080/api/v1/checkout/success/{CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:3000/order/cancel',
      });

      ticket.sessionId = session.id;
      ticket.save();
      return res.status(200).json({ id: session.id });
    } catch (e) {
      return res
        .status(500)
        .json({ message: 'Problem with creating checkout session', error: e });
    }
  },

  async handleSuccessfulPayment({ params }, res) {
    const { sessionId } = params;
    try {
      const ticket = await Tickets.findOne({ sessionId })
        .populate('showing')
        .exec();
      ticket.status = true;

      ticket.seatNumbers.forEach(([row, cols]) => {
        cols.forEach((col) => {
          ticket.showing.seats[row][col].taken = true;
        });
      });

      await Showing.findByIdAndUpdate(ticket.showing._id, {
        $set: {
          seats: ticket.showing.seats,
        },
        capacity: ticket.showing.capacity - ticket.quantity,
      });

      ticket.save();
      return res.redirect('http://localhost:3000/order/success');
    } catch (error) {
      return res.status(500).json({
        message: 'Problem with updating ticket by session',
        error: error.stack,
      });
    }
  },
};
