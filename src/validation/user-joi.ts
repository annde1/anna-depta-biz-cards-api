import Joi from "joi";
import { IName, IUser } from "../@types/user";

//TODO: finish register schema
const registerSchema = Joi.object<IUser>({
  name: Joi.object<IName>({
    first: Joi.string().min(2).required(),
  }),
});
