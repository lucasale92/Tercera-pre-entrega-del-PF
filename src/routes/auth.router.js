import express from 'express';
import passport from 'passport';
import { isAdmin, isUser, isLoggedin,  } from '../middlewares/auth.js';
import { sessionController } from '../controllers/auth.controller.js';


export const authRouter = express.Router();

//-------------------------------------- para probar la session -----------------------
authRouter.get('/session/current', sessionController.session);

//------------------------------------passport local------------------------
authRouter.get("/failregister", sessionController.failReg);

authRouter.get('/faillogin', sessionController.failLogin);

authRouter.get('/register', sessionController.register);

authRouter.post('/register', passport.authenticate('register', { failureRedirect: '/auth/failregister' }), sessionController.registerOk);

authRouter.get('/login', sessionController.login);

authRouter.post('/login', passport.authenticate('login', { failureRedirect: '/auth/faillogin' }), sessionController.loginOk);

authRouter.get('/logout', sessionController.logout);

authRouter.get("/profile", isLoggedin, sessionController.profile);

//--------------------------------github -----------------------------------

authRouter.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

authRouter.get("/github/callback", passport.authenticate("github", { failureRedirect: "/error" }), sessionController.callbackProfile);

//-------------------------------- Google -----------------------------------
/*
authRoutes.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

authRoutes.get("/google/callback",passport.authenticate("google", { failureRedirect: "/auth/fail-register" }), sessionController.googleCallback);
*/