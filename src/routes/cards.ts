import { Router } from "express";
import { isBusiness } from "../middleware/is-business";
import { validateCard } from "../middleware/validation";
import { createCard } from "../service/card-service";
import { ICardInput } from "../@types/card";
import { BizCardsError } from "../error/biz-cards-error";
import { Card } from "../database/model/card";
import { validateToken } from "../middleware/validate-token";
import mongoose from "mongoose";

const router = Router();

//Create new card
router.post("/", isBusiness, validateCard, async (req, res, next) => {
  try {
    //Get user id from the user passed in the request
    const userId = req.user?._id;
    //If the user doesn't have an id thn throw error
    if (!userId) {
      throw new BizCardsError("User must have an id", 500);
    }
    const savedCard = await createCard(req.body as ICardInput, userId);

    res.json({ card: savedCard });
  } catch (e) {
    next(e);
  }
});

router.get("/", async (req, res, next) => {
  try {
    //move to service
    const cards = await Card.find();
    return res.status(201).json({ message: "OK", cards: cards });
  } catch (e) {
    next(e);
  }
});

//Route to get all user cards
router.get("/my-cards", validateToken, async (req, res, next) => {
  try {
    //Get user id from user data
    const userId = req.user?._id!;
    //Find cards that belong to the user in the database
    const cards = await Card.find({ userId });
    //Return response with status and cards
    return res.status(201).json({ message: "OK", cards: cards });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    //Retreive id from request params
    const { id } = req.params;
    //TODO : extract to function (service)
    //Validate id
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ message: "Bad request. Inncorrect card id" });
      throw new BizCardsError("Invalid ObjectId Format", 400);
    }
    //Find card in the database
    const card = await Card.findById(id);
    //If no card was found then return response with message

    return res.status(201).json({ message: "OK", card: card });
  } catch (err) {
    next(err);
  }
});

export { router as cardsRouter };
