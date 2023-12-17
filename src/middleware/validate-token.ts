import { RequestHandler, Request } from "express";
import { BizCardsError } from "../error/biz-cards-error";
import { auth } from "../service/auth-service";

//Middleware for JWT check:
//Extract the token function:
const extractToken = (req: Request) => {
  const authHeader = req.header("Authorization");

  if (
    authHeader &&
    authHeader.length > 7 &&
    authHeader.toLowerCase().startsWith("bearer")
  ) {
    return authHeader.substring(7);
  }
  throw new BizCardsError("Token is missing in Authorization Header", 400);
};
//Validate  token function:
const validateToken: RequestHandler = (req, res, next) => {
  //Extract token from the request
  const token = extractToken(req);
  const { email } = auth.verifyJWT(token);
  req.user = { email };
  next();
};

export { validateToken, extractToken };
