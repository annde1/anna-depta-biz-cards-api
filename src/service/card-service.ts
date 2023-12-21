import { Card } from "../database/model/card";
import { BizCardsError } from "../error/biz-cards-error";
import { ICardInput } from "./../@types/card.d";
import { Response } from "express";
const createCard = async (data: ICardInput, userId: string) => {
  //bizNumber, userId
  const card = new Card(data);

  card.userId = userId; //?? doesnt work
  console.log(card.userId);
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

export { createCard };
