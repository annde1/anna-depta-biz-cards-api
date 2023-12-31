import { Card } from "../database/model/card";
import { BizCardsError } from "../error/biz-cards-error";
import { ICardInput } from "./../@types/card.d";
import { RequestHandler, Response } from "express";
import mongoose from "mongoose";
const createCard = async (data: ICardInput, userId: string) => {
  //bizNumber, userId
  const card = new Card(data);
  card.userId = userId;

  //random number that does not exist in the database:
  while (true) {
    const random = Math.floor(Math.random() * 1_000_000);
    const dbRes = await Card.findOne({ bizNumber: random });
    if (!dbRes) {
      card.bizNumber = random;
      break;
    }
  }

  return card.save();
};
export const likeCard = async (
  cardId: string,
  userId: string,
  res: Response
) => {
  const card = await Card.findById(cardId);
  if (!card) {
    throw new BizCardsError("Card doesn't exist", 404);
  }
  //Check if userId exists in likes array. Returns true or false
  const isLiked = card.likes.includes(userId);
  //If isLiked is true then remove userId from the array by $pull, if it's false then add userId to likes array
  const updateLikesArray = isLiked
    ? { $pull: { likes: userId } }
    : { $push: { likes: userId } };

  const updatedCard = await Card.findByIdAndUpdate(cardId, updateLikesArray, {
    new: true,
  });
  if (!updatedCard) {
    throw new BizCardsError("Card Doesn't Exist", 404);
  }
  return updatedCard;
};

export const getCardById = async (cardId: string) => {
  //Validate id
  if (!mongoose.isValidObjectId(cardId)) {
    throw new BizCardsError("Invalid ObjectId Format", 400);
  }
  //Find card in the database
  const card = await Card.findById(cardId);
  //If no card was found then return response with message
  if (!card) {
    throw new BizCardsError("Card not found", 404);
  }
  return card;
};
export const editCard = async (cardId: string, requestBody: any) => {
  const updatedCard = await Card.findByIdAndUpdate(cardId, requestBody, {
    new: true,
  }).lean();
  if (!updatedCard) {
    throw new BizCardsError("Card not found", 404);
  }
  return updatedCard;
};

export const deleteCard = async (cardId: string) => {
  const card = await Card.findByIdAndDelete(cardId, { new: true }).lean();

  if (!card) {
    throw new BizCardsError("Card not found", 404);
  }
  return card;
};

export const checkUniqueBizNumber: RequestHandler = async (req, res, next) => {
  //Retrieve biz number from the request body
  const { bizNumber } = req.body;
  //Find card in the database by the biz number
  const card = await Card.findOne({ bizNumber: bizNumber });
  //If no card was found go to next in the chain
  if (!card) {
    return next();
  }
  //Card was found so return response with status and error message
  return res.status(400).json({ error: "BizNumber is already taken" });
};

export const updateBizCardNumber = async (
  cardId: string,
  bizNumber: number
) => {
  //Find card in the database and update bizNumber
  const card = await Card.findByIdAndUpdate(
    { _id: cardId },
    { bizNumber: bizNumber },
    { new: true }
  );
  //If no card was found throw error
  if (!card) {
    throw new BizCardsError("Card not found", 404);
  }
  //Return the card
  return card;
};
export { createCard };
