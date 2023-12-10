import chalk from "chalk";
import { Request, Response, NextFunction, RequestHandler } from "express";
//If giving RequestHandler type to the function no need to use types to parameters (Request, Response, NextFunction)
//Types in express:
//Request, Response, NextFunction, RequestHandler, ErrorRequest handler
type Person = {
  name: string;
  lastName: string;
};
const logger: RequestHandler = (req, res, next) => {
  //   console.log(req.method, req.url);
  console.log(chalk.blue(req.method, req.url));

  //In express middleware can stop the chain of middleware. Example: we can send error to user. We can also continue the middleware chain:. Middleware is a chain of functions that perform some operations to the request before response is sent

  next(); //continue to the next function. Must be included if we don't want to break the chain
};
export { logger };
