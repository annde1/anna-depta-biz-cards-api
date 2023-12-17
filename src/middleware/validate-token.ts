import { RequestHandler, Request } from "express";
import { BizCardsError } from "../error/biz-cards-error";
import { auth } from "../service/auth-service";

//Middleware for JWT check:
//Extract the token function (takes one argument (request))
const extractToken = (req: Request) => {
  //Get the request header
  const authHeader = req.header("Authorization");

  if (
    authHeader &&
    authHeader.length > 7 &&
    authHeader.toLowerCase().startsWith("bearer")
  ) {
    //Return the extracted token:
    return authHeader.substring(7);
  }
  //If no token was provided throw error:
  throw new BizCardsError("Token is missing in Authorization Header", 400);
};

//Validate token function:
const validateToken: RequestHandler = (req, res, next) => {
  //Extract token from the request
  const token = extractToken(req);
  //Get the email from payload
  const { email } = auth.verifyJWT(token);
  req.user = { email };
  next();
};

export { validateToken, extractToken };
