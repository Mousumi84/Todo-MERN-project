const express=require('express');
const { signupController, loginController, logoutController, logoutFromAllDvController } = require('../Controllers/AuthController');
const isAuth = require('../Middlewares/isAuth');
const AuthRouter=express.Router();

AuthRouter.post('/signup',signupController);
AuthRouter.post('/login',loginController);
//AuthRouter.post('/logout',logoutController);

AuthRouter.post('/logout',isAuth,logoutController);
AuthRouter.post('/logoutfromalldevices',isAuth,logoutFromAllDvController);




module.exports=AuthRouter;