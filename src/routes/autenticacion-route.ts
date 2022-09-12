import express from 'express';
import { Request, Response } from 'express';
import { Router } from 'express';
import passport from 'passport'
import auth from '../lib/auth'

const router = Router();

// SIGNUP

router.get('/signup', auth.isNotLoggedIn, (req: Request, res: Response) => {
    res.render('auth/signup')
})

router.post('/signup', auth.isNotLoggedIn, auth.isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/signin',
    failureRedirect: '/signup',
    failureFlash: true
}))


// SIGNIN

router.get('/signin', auth.isNotLoggedIn, (req: Request, res: Response) => {
    res.render('auth/signin')
})

router.post('/signin', auth.isNotLoggedIn, (req: Request, res: Response, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
    

});

router.get("/profile", auth.isLoggedIn, (request, response) => {
    response.render("../views/profile");
  });

router.get('/logout', auth.isLoggedIn, function(req: Request, res:Response, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      req.flash('message', 'Gracias por usar la app');
      res.redirect('/signin');
    });
  });

export { router };
