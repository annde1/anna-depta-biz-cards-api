import { RequestHandler, Request } from "express";
import { auth } from "../service/auth-service";
import { User } from "../database/model/user";
import { extractToken } from "./is-admin";
import { BizCardsError } from "../error/biz-cards-error";
import { IUser } from "../@types/user";

//Function for checking if
const isUser: RequestHandler = async (req, res, next) => {
  try {
    //Get id from params
    const { id } = req.params;
    //Get token
    const token = extractToken(req);
    //Get id from payload
    const { email } = auth.verifyJWT(token);
    //Find user by id in the database
    const user = (await User.findOne({ email }).lean()) as IUser;
    //If no user was found then throw error
    if (!user) throw new BizCardsError("User does not exist", 401);

    //If user was found in the database and ids match go to next in the chain
    if (id == user?._id) return next();

    //Return response with status 401 and message
    res.status(401).json({ message: "The id must belong to the user" });
  } catch (err) {
    next(err);
  }
};

export { isUser };
