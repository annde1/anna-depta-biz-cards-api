import { RequestHandler, Request } from "express";
import { auth } from "../service/auth-service";
import { User } from "../database/model/user";
import { extractToken } from "./is-admin";
import { BizCardsError } from "../error/biz-cards-error";

//Function for checking if the user is admin or regular user
const isAdminOrUser: RequestHandler = async (req, res, next) => {
  try {
    //Get id from request params
    const { id } = req.params;
    //Extract token
    const token = extractToken(req);
    //Verify token and retrieve email from payload
    const { email } = auth.verifyJWT(token);

    //Find user by email in the database
    const user = await User.findOne({ email });

    console.log(user);
    //If no user was found then throw error
    if (!user) throw new BizCardsError("User does not exist", 401);
    //If user or admin was found go to next in the chain
    if (id == user.id) return next();
    if (user.isAdmin) return next();

    res
      .status(401)
      .json({ message: "You must be owner of the account or admin" });
  } catch (err) {
    next(err);
  }
};

export { isAdminOrUser };
