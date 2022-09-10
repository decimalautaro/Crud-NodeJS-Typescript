import express from 'express';
import { Request, Response } from 'express';
const router = express.Router();

router.get('/signup', (req: Request, res: Response)=>{
    res.render('auth/signup')
})

router.post('/signup',()=>{

})


export { router };
