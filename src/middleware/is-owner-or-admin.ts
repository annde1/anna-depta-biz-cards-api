//TODO : function that will check if the user is owner of the card or admin: user needs to send jwt token in the headers. Verify token and get payload -> search in the database by id. if user isAdmin, if id from jwt == user.id

import { RequestHandler } from "express";
import { extractToken } from "./is-admin";
import { auth } from "../service/auth-service";
import { User } from "../database/model/user";
import { BizCardsError } from "../error/biz-cards-error";
import { Card } from "../database/model/card";

const isOwnerOrAdmin: RequestHandler = async (req, res, next) => {
  try {
    //Extract card id from request params
    const { id } = req.params;
    //Extract user token
    const token = extractToken(req);
    //Verify JWT token and retrieve email from payload
    const { email } = auth.verifyJWT(token);
    //Find user in the database
    const user = await User.findOne({ email });
    //If user was not found then throw error
    if (!user) {
      throw new BizCardsError("User not found", 401);
    }
    //Get user id:
    const userId = user._id;
    //Find the card in the database
    const card = await Card.findById(id);
    if (card.likes.includes(userId)) {
      return next();
    }
    if (user.isAdmin) {
      return next();
    }

    res.status(401).json({ message: "You must be owner of the card or admin" });
  } catch (err) {
    next(err);
  }
};
export default isOwnerOrAdmin;
