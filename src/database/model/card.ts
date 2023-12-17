import mongoose from "mongoose";
import cardSchema from "../schema/cards-schema";

const Card = mongoose.model("card", cardSchema);

export { Card };
