const authController = require('../controller/auth.controller');
const authMiddleWare = require('../middlewares/auth.middleware');

const routes = (app) =>{
    app.post('/mba/api/v1/auth/signup',authMiddleWare.ValidateAuthReq , authController.signup);
};

module.exports = routes;