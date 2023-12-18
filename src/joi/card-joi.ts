import Joi from "joi";
import { ICard } from "../@types/card";
import { IAddress, IImage } from "../@types/user";

const schema = Joi.object<ICard>({
  title: Joi.string().min(2).max(50).required(),
  subtitle: Joi.string().min(2).max(50).required(),
  description: Joi.string().min(2).max(100).required(),
  phone: Joi.string().min(9).max(15).required(),
  email: Joi.string().min(7).max(20).required(),
  web: Joi.string().min(10).max(25).allow(""),
  image: Joi.object<IImage>({
    alt: Joi.string().min(5).max(100).required(),
    url: Joi.string().uri().min(5).max(255).required(),
  }),
  address: Joi.object<IAddress>({
    city: Joi.string().min(2).max(50).required(),
    state: Joi.string().min(2).max(50).allow(""),
    country: Joi.string().min(2).max(20).required(),
    street: Joi.string().min(2).max(100).required(),
    zip: Joi.string().max(30).allow(""),
    houseNumber: Joi.number().min(0).max(9999).required(),
  }),
});
export { schema as JoiCardSchema };
