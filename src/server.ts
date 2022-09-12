import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { routerUser } from "../src/routes/user-route";
import { routerProduct } from "../src/routes/product-route";
import "./database";
import morgan from "morgan";
import { routerCategory } from "../src/routes/category-route";
import flash from "connect-flash"
import session from "express-session"
import { router } from "./routes/autenticacion-route";
import passport from 'passport';

//inicializacion
const app = express();
require('./lib/passport');



//sesion de express-session
app.use(session({
  secret: "lautarodecima",
  resave: false,
  saveUninitialized: false,
  // store: 
}))

//middlewares
app.use(flash())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());



// variables globales 
app.use((request, response, next) => {

  app.locals.success = request.flash("success")
  app.locals.error = request.flash("error")

  next()
});

//rutas
app.use(router);
app.use(routerUser);
app.use(routerProduct);
app.use(routerCategory);



app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return response.status(400).json({
      error: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

app.listen(3000, () => {
  console.log("Servidor escuchando en puerto 3000");
});
