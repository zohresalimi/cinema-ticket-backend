![Lint, Test, Build](https://github.com/zohresalimi/cinema-ticket-backend/workflows/Lint,%20Test,%20Build/badge.svg)
![Heroku](http://heroku-badge.herokuapp.com/?app=cinema-ticket-backend&style=flat&svg=1)

# CinemaTicket backend

This is the back-end system (API layer) for a project called `CinemaTicket` which the frontend is hosted and accessible through following address:

https://cinema-ticket.netlify.app/

### Tech

we are useing a number of open source tools:

- [mongoose] - Schema-based solution to model your application data.
- [nodejs] - open-source, cross-platform, back-end, JavaScript runtime environment that executes JavaScript code outside a web browser
- [express] - Fast, unopinionated, minimalist web framework for Node.js.
- [emailjs] - Sending emails using client .
- [stripe]- Stripe’s APIs to accept payments.

### Installation

Clone the repository

```
$ git clone https://github.com/zohresalimi/cinema-ticket-backend.git
```

Install all dependencies and start the project.

```sh
$ cd cinema-ticket-backend
$ npm install
$ npm run dev
```

### Setup

Eslint must be installed globally: `npm install -g eslint`

A `.env.sample` file is created at the root directory of the application. Just rename it to your environment name (ex. `.env.development`) and add corresponding values to the variables inside the file.

```
MONGO_URI=<mongoDB uri>
PORT=<your backend port>
BASE_URL=http://<frontend url to be used after checkout>
CHECKOUT_BASE_URL=http://<host:port that server listens to>/api/v1

STRIPE_URL=<stripe credentioal>

SECRET_KEY="<stripe secret key>

SERVICE_ID=<emailjs sercive id>
TEMPLATE_ID=<emailjs template>
USER_ID=<emailjs userId>

ACCESS_TOKEN=cinemaTicketSmartCoding
```

**Email verification**
1-Set up an EmailJS account https://www.emailjs.com/, create an email service and an email template with the following:

- toEmail,
- fromName,
- movieName,
- roomName,
- createdAt,
- movieCover,
- seats,
- quantity,
- cinemaName,
- showingTime,
