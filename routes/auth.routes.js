const {Router} = require('express');
const authCtrl = require('../controllers/auth.controller.js')



const authRouter =  Router ();
authRouter.get('/login', authCtrl.renderLogin);
authRouter.post('/login', authCtrl.loginLocalAtuh);
authRouter.get('/logout', authCtrl.logout);
authRouter.get('/registro', authCtrl.renderRegistro);
authRouter.post('/registro', authCtrl.register);
authRouter.get('/auth/google', authCtrl.passportGoogleStrategy);
authRouter.get('/auth/facebook', authCtrl.passportFacebookStrategy);
authRouter.get( '/auth/google/callback', authCtrl.gCallback);
authRouter.get('/auth/facebook/callback', authCtrl.fCallback);
module.exports = authRouter
