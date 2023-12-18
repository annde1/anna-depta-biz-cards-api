import Joi from "joi";
import { IAddress, IName, IUser, IImage } from "../@types/user";
import { phoneRegex, passwordRegex } from "./patterns";

const schema = Joi.object<IUser>({
  name: Joi.object<IName>({
    first: Joi.string().min(2).required(),
    middle: Joi.string().min(2).max(20).allow(""),
    last: Joi.string().min(2).max(20),
  }),
  email: Joi.string().email().min(5).max(255).required(),
  address: Joi.object<IAddress>({
    city: Joi.string().min(2).max(50).required(),
    state: Joi.string().min(2).max(50).allow(""),
    country: Joi.string().min(2).max(20).required(),
    street: Joi.string().min(2).max(100).required(),
    zip: Joi.string().max(30).allow(""),
    houseNumber: Joi.number().min(0).max(9999).required(),
  }),
  password: Joi.string().pattern(passwordRegex).min(5).max(30).required(),
  phone: Joi.string().pattern(phoneRegex).min(1).max(50).required(),
  image: Joi.object<IImage>({
    alt: Joi.string().min(5).max(100).required(),
    url: Joi.string().uri().min(5).max(255).required(),
  }),
  isBusiness: Joi.boolean().required(),
});

export { schema as joiUserSchema };
