const stripe = require('stripe')(process.env.STRIPE_URL);
const Showing = require('../models/Showing');
const Ticket = require('../models/Ticket');
const emailService = require('./email');

module.exports = {
  async createOne({ body }, res) {
    const { ticketId } = body;
    try {
      const ticket = await Ticket.findById(ticketId).populate('showing').exec();
      if (!ticket) {
        return res
          .status(404)
          .json({ message: 'Ticket id provided was not found' });
      }
      ticket.seatNumbers.forEach(([row, cols]) => {
        cols.forEach((col) => {
          ticket.showing.seats[row][col].taken = 'reserved';
        });
      });

      await Showing.findByIdAndUpdate(ticket.showing._id, {
        $set: {
          seats: ticket.showing.seats,
        },
        capacity: ticket.showing.capacity - ticket.quantity,
      });

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
              unit_amount: ticket.unitAmount * 100,
            },
            quantity: ticket.quantity,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.CHECKOUT_BASE_URL}/checkout/success/{CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CHECKOUT_BASE_URL}/checkout/cancel/{CHECKOUT_SESSION_ID}`,
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

  async handleCancelPayment({ params }, res) {
    const { sessionId } = params;

    try {
      const ticket = await Ticket.findOne({ sessionId })
        .populate('showing')
        .exec();

      ticket.seatNumbers.forEach(([row, cols]) => {
        cols.forEach((col) => {
          ticket.showing.seats[row][col].taken = 'available';
        });
      });

      await Showing.findByIdAndUpdate(ticket.showing._id, {
        $set: {
          seats: ticket.showing.seats,
        },
        capacity: ticket.showing.capacity + ticket.quantity,
      });

      return res.redirect(`${process.env.BASE_URL}/order/cancel`);
    } catch (error) {
      return res.status(500).json({
        message: 'Problem with rolling back the ticket',
        error: error.stack,
      });
    }
  },

  async handleSuccessfulPayment({ params }, res) {
    const { sessionId } = params;
    try {
      const ticket = await Ticket.findOne({ sessionId })
        .populate('showing')
        .populate('user')
        .exec();
      ticket.status = true;

      ticket.seatNumbers.forEach(([row, cols]) => {
        cols.forEach((col) => {
          ticket.showing.seats[row][col].taken = 'taken';
        });
      });

      await Showing.findByIdAndUpdate(ticket.showing._id, {
        $set: {
          seats: ticket.showing.seats,
        },
        capacity: ticket.showing.capacity - ticket.quantity,
      });

      await ticket.save();
      await emailService.sendTicketToGuestUser(ticket);

      return res.redirect(`${process.env.BASE_URL}/order/success`);
    } catch (error) {
      return res.status(500).json({
        message: 'Problem with updating ticket by session',
        error: error.stack,
      });
    }
  },
};
