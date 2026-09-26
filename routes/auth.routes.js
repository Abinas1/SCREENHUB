const authController = require('../controller/auth.controller');
const authMiddleWare = require('../middlewares/auth.middleware');

const routes = (app) =>{
    app.post('/mba/api/v1/auth/signup',authMiddleWare.ValidateSignupRequest , authController.signup);
    app.post('/mba/api/v1/auth/signin',authMiddleWare.ValidateSigninRequest, authController.signin);
    app.patch('/mba/api/v1/auth/reset',authMiddleWare.isAuthenticated,authMiddleWare.ValidateResetPassword, authController.resetPassword);
};

module.exports = routes;