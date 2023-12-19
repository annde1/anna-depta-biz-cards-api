//TODO : function that will check if user is business user. Extract token -> extract idform payload (verify)-> find user in db -> check isBussines on the user
import { RequestHandler, Request } from "express";
import { BizCardsError } from "../error/biz-cards-error";
import { auth } from "../service/auth-service";
import { User } from "../database/model/user";
import { extractToken } from "./is-admin";

const isBusiness: RequestHandler = async (req, res, next) => {
  try {
    //Extract token from the request
    const token = extractToken(req);
    //Retrieve email from payload
    const { email } = auth.verifyJWT(token);
    //Find user in the database
    const user = await User.findOne({ email });
    //If no user was found then throw error
    if (!user) {
      throw new BizCardsError("User does not exist", 401);
    }
    //Add to the request the user data found in database
    req.user = user;
    //Will return true or false depending if the user is business or not
    const isBusiness = user?.isBusiness;
    //If isBusiness is true continue in the chain
    if (isBusiness) {
      return next();
    }
    //If isBusiness if false then throw error
    throw new BizCardsError("User Must be a business", 401);
  } catch (e) {
    next(e);
  }
};

export { isBusiness };
