import express from 'express';
import { Request, Response } from 'express';
import { Router } from 'express';
import passport from 'passport'
import auth from '../lib/auth'

const router = Router();

// SIGNUP

router.get('/signup',auth.isNotLoggedIn, (req: Request, res: Response) => {
    res.render('auth/signup')
})

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/signin',
    failureRedirect: '/signup',
    failureFlash: true
}))


// SIGNIN

router.get('/signin',auth.isNotLoggedIn, (req: Request, res: Response) => {
    res.render('auth/signin')
})

router.post('/signin', (req: Request, res: Response, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
    

});


// profile

router.get("/profile", auth.isLoggedIn, (req: Request, res: Response) => {
    res.render("profile");
  });

  router.get('/logout', (req, res, next) => {
    req.logOut( (err: any) => next)
    req.flash('message', 'Gracias por usar la app');
    res.redirect('/signin');
  });

export { router };
