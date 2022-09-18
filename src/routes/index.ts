import express from 'express';
import { Request, Response } from 'express';
import auth from '../lib/auth';



const routerIndex= express.Router();


routerIndex.get("/",  (request:Request, response:Response) => {
    response.render("../views/index");
  });


export {routerIndex};