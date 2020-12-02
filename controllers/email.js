/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable prefer-destructuring */
const { default: Axios } = require('axios');

const SERVICE_ID = process.env.SERVICE_ID;
const TEMPLATE_ID = process.env.TEMPLATE_ID;
const USER_ID = process.env.USER_ID;

module.exports = {
  async sendTicketToGuestUser({
    user,
    cinemaName,
    movieName,
    roomName,
    createdAt,
    movieCover,
    seatNumbers,
    quantity,
    showing,
  }) {
    try {
      const seats = `<ul>${seatNumbers.map(
        ([row, cols]) =>
          `<li>Row <strong>${row + 1}</strong> Seats: <strong>${cols
            .map((col) => col + 1)
            .join('-')}</strong></li>`
      )}</ul>`;

      const convertDate = (date) =>
        `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}/${date.getHours()}:${date.getMinutes()}`;

      const data = {
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: USER_ID,
        template_params: {
          toEmail: user.email,
          fromName: 'Cinema Ticket',
          movieName,
          roomName,
          createdAt: convertDate(createdAt),
          movieCover,
          seats,
          quantity,
          cinemaName,
          showingTime: convertDate(showing.startTime),
        },
      };
      const response = await Axios({
        method: 'post',
        url: 'https://api.emailjs.com/api/v1.0/email/send',
        data,
      });
      return response;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error sending confirm email: ', error);
      return error;
    }
  },
};
