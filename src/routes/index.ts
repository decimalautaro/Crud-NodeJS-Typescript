import express from 'express';
import { Request, Response } from 'express';


const routerIndex= express.Router();


routerIndex.get("/", (request:Request, response:Response) => {
    response.render("../views/index");
  });


export {routerIndex};