import express from 'express';
import { Request, Response } from 'express';
import { Router } from 'express';
import passport from 'passport'

const router = Router();

// SIGNUP

router.get('/signup', (req: Request, res: Response) => {
    res.render('auth/signup')
})

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/signin',
    failureRedirect: '/signup',
    failureFlash: true
}))


// SIGNIN

router.get('/signin', (req: Request, res: Response) => {
    res.render('auth/signin')
})

router.post('/signin', (req: Request, res: Response, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);

});

export { router };
