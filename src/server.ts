import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { router } from "../routes/user-route";
import { routerProduct } from "../routes/product-route";
import "./database";
import morgan from "morgan";
import { routerCategory } from "../routes/category-route";



const app = express();

//inicializacion
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//middlewares
app.use(morgan('dev'));


//rutas
app.use(router);
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