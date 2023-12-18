import { RequestHandler, Request } from "express";
import { auth } from "../service/auth-service";
import { User } from "../database/model/user";
import { extractToken } from "./is-admin";
import { BizCardsError } from "../error/biz-cards-error";

//Function for checking if
const isUser: RequestHandler = async (req, res, next) => {
  try {
    //Get id from params
    const { id } = req.params;
    //Get token
    const token = extractToken(req);
    //Get id from payload
    const { id: userId } = auth.verifyJWT(token);
    //Find user by id in the database
    const user = await User.findById(userId);

    //If no user was found then throw error
    if (!user) throw new BizCardsError("User does not exist", 401);

    //If user was found in the database and ids match go to next in the chain
    if (id == user.id) return next();

    //Return response with status 401 and message
    res.status(401).json({ message: "The id must belong to the user" });
  } catch (err) {
    next(err);
  }
};

export { isUser };
