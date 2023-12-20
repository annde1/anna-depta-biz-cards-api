//Middleware that will check if the user sending the request is owner of the card. He will send the token in the headers. Token will be extracted from headers and verified. User will be found in the
import { RequestHandler } from "express";
import { extractToken } from "./validate-token";
import { auth } from "../service/auth-service";
import { User } from "../database/model/user";
import { Card } from "../database/model/card";
import { IUser } from "../@types/user";
import { BizCardsError } from "../error/biz-cards-error";

const isOwner: RequestHandler = async (req, res, next) => {
  try {
    //Extract token from the request
    const token = extractToken(req);
    //Verify token and retrieve email
    const { email } = auth.verifyJWT(token);
    //Find user in the database
    const user = await User.findOne({ email });
    //If no user was found then throw error
    if (!user) {
      throw new BizCardsError("User not found", 404);
    }
    //Get user id
    const userId = user._id;
    //Extract card id from the request params
    const cardId = req.params.id;
    //Find card in the database
    const card = await Card.findById(cardId);
    //If no card was found throw error
    if (!card) {
      throw new BizCardsError("Card not found", 404);
    }
    //If user id doesnt match userId on the card throw error
    if (card.userId.toString() !== userId.toString()) {
      throw new BizCardsError(
        "Unauthorized: Only the owner of the card can edit it",
        401
      );
    }

    //Store the card in the request
    req.card = card;
    //Go to next in the chain
    next();
  } catch (err) {
    next(err);
  }
};
export default isOwner;
