import { RequestHandler, Request } from "express";
import { BizCardsError } from "../error/biz-cards-error";
import { auth } from "../service/auth-service";
import { User } from "../database/model/user";

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
const validateToken: RequestHandler = async (req, res, next) => {
  try {
    //Extract token from the request
    const token = extractToken(req);
    //Verify JWT token and retrieve email from payload
    const { email } = auth.verifyJWT(token);
    //Find user by email in database
    const user = await User.findOne({ email });
    //If no user was found throw error
    if (!user) throw new BizCardsError("User does not exist", 401);
    //Add to request user data
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};

export { validateToken, extractToken };
