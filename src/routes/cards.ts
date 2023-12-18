//TODO: add routes for card
import { Router } from "express";
import { Card } from "../database/model/card";
import { validateCard } from "../middleware/validation";
import { ICard } from "../@types/card";
import { ObjectId } from "mongoose";

const router = Router();
//TODO : code refactoring
//Router to post a cards. Access to this endpoint only for business user. Check isBusiness, validate card -> router
//TODO : add check for is business, get jwt token from headers to get id -> card.user_id = id of user
//?? Ask about user_id
router.post("/", validateCard, async (req, res, next) => {
  try {
    const card = new Card(req.body); // TODO : add user_id

    card.save();
    res.status(201).json({ message: "Card saved", cardDetails: card });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

//Router to get all cards
router.get("/", async (req, res, next) => {
  try {
    const allCards = await Card.find();
    res.status(201).json({ message: "OK", cards: allCards });
  } catch (err) {
    next(err);
  }
});

//Router to get card by id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    //Find card in database
    const card = (await Card.findById(id).lean()) as ICard;
    res.status(201).json({ message: "OK", card: card });
  } catch (err) {
    next(err);
  }
});
export { router as cardsRouter };
