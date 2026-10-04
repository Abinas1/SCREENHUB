const userController = require('../controller/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const route = (app) => {
    app.patch('/mba/api/v1/user/:id',
        authMiddleware.isAuthenticated,
        authMiddleware.ValidateUpdateUser,
        authMiddleware.isAdmin,
        userController.update);
}

module.exports = route;