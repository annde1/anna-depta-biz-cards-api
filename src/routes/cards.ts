import { Router } from "express";
import { isBusiness } from "../middleware/is-business";
import { validateBizNumber, validateCard } from "../middleware/validation";
import {
  checkUniqueBizNumber,
  createCard,
  deleteCard,
  editCard,
  likeCard,
  updateBizCardNumber,
} from "../service/card-service";
import { ICardInput } from "../@types/card";
import { BizCardsError } from "../error/biz-cards-error";
import { Card } from "../database/model/card";
import { validateToken } from "../middleware/validate-token";
import isOwner from "../middleware/is-owner";
import isOwnerOrAdmin from "../middleware/is-owner-or-admin";
import { getCardById } from "../service/card-service";
import { isAdmin } from "../middleware/is-admin";

//Create new router
const router = Router();

//Route for creating new card. Only for business users
router.post("/", isBusiness, validateCard, async (req, res, next) => {
  try {
    //Get user id from the user passed in the request
    const userId = req.user?._id;
    //If the user doesn't have an id then throw error
    if (!userId) {
      throw new BizCardsError("User must have an id", 500);
    }
    //Save card in the database
    const savedCard = await createCard(req.body as ICardInput, userId);
    //Response with message and card details
    res.status(201).json({ message: "Saved", cardDetails: savedCard });
  } catch (e) {
    next(e);
  }
});
//Router for getting all cards
router.get("/", async (req, res, next) => {
  try {
    //Find cards in the databse
    const cards = await Card.find();
    //Send response with message and status
    res.status(201).json({ message: "OK", cards: cards });
  } catch (e) {
    next(e);
  }
});

//Route to get all user cards. Onlu for owner of the cards. Middleware validateToken -> router
router.get("/my-cards", validateToken, async (req, res, next) => {
  try {
    //Get user id from user data
    const userId = req.user?._id!;
    //Find cards that belong to the user in the database
    const cards = await Card.find({ userId });
    //Return response with status and cards
    res.status(201).json({ message: "OK", cards: cards });
  } catch (err) {
    next(err);
  }
});

//Route for getting card by id
router.get("/:id", async (req, res, next) => {
  try {
    //Get card id from request params
    const { id } = req.params;
    //Get the card
    const card = await getCardById(id);
    //Return response with status and message and card details
    res.status(201).json({ message: "OK", cardDetails: card });
  } catch (err) {
    next(err);
  }
});

//Route to like card. Only for registered users. Check first if isUser. Find card in the database add id of the user to likes array of the card
router.patch("/:id", isBusiness, async (req, res, next) => {
  try {
    //Get card id from the request params
    const { id } = req.params;
    //Get users userId from req.user
    const userId = req.user._id;
    // Like card
    const updatedCard = await likeCard(id, userId, res);
    //Send response with status and message
    res.status(201).json({ message: "Liked", cardDetails: updatedCard });
  } catch (err) {
    next(err);
  }
});

//Router to edit card. Only the user that created the card can edit it. isOwner, validateCard (middleware)-> router
router.put("/:id", isOwner, validateCard, async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedCard = await editCard(id, req.body);
    res.status(201).json({ message: "Card Updated", cardDetails: updatedCard });
  } catch (err) {
    next(err);
  }
});

//Route for deleting card. Only user who created the card or admin can access this endpoint:
router.delete("/:id", isOwnerOrAdmin, async (req, res, next) => {
  try {
    //Get card id from request params
    const { id } = req.params;
    //Delete the card in the database
    const card = await deleteCard(id);
    //Return response with status and message
    res.status(201).json({ message: "Deleted", cardDetails: card });
  } catch (err) {
    next(err);
  }
});

//Route for changing bizNumber of card. This route is for admin only (BONUS)
router.patch(
  "/change-biz-number/:id",
  isAdmin,
  validateBizNumber,
  checkUniqueBizNumber,
  async (req, res, next) => {
    const { id } = req.params;
    const { bizNumber } = req.body;
    const card = await updateBizCardNumber(id, bizNumber);
    res.status(201).json({ message: "Biz Number Updated", cardDetails: card });
  }
);
export { router as cardsRouter };
