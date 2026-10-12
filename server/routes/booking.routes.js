
const bookingController = require('../controller/booking.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const bookingMiddleware = require('../middlewares/booking.middleware');

const routes = (app) => {
    app.post('/mba/api/v1/booking',
        authMiddleware.isAuthenticated,
        bookingMiddleware.validateBookingCreaterequest,
        bookingController.create);
}

module.exports = routes; 