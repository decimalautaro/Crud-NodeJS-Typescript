import express from 'express';
import { Request, Response } from 'express';
import auth from '../lib/auth';

const RouterIndex= express.Router();


RouterIndex.get("/", auth.isLoggedIn, (request:Request, response:Response) => {
    response.render("../views/index");
  });