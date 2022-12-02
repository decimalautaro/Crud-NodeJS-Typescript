import express, { request, response } from 'express';
import { Request, Response } from 'express';
import auth from '../lib/auth';



const routerIndex= express.Router();


routerIndex.get("/",  (request:Request, response:Response) => {
    response.render("../views/index");
  });


  routerIndex.get("/facturas", (request, response) => {
    response.render("factura/index")
  })

  routerIndex.get("/add-factura", (request, response) => {
    response.render("factura/add")
  })

export {routerIndex};