import { Schema } from "mongoose";
import imageSchema from "./image-schema";
import { ICard } from "../../@types/card";
import { addressSchema } from "./address-schema";

const cardSchema = new Schema<ICard>({
  title: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 50,
  },
  subtitle: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 50,
  },
  description: {
    required: true,
    type: String,
    minlength: 2,
    description: 100,
  },
  phone: {
    required: true,
    type: String,
    minlength: 9,
    maxlength: 15,
  },
  email: {
    required: true,
    type: String,
    minlength: 7,
    maxlength: 20,
  },
  web: {
    required: false,
    type: String,
    minlength: 10,
    maxlength: 25,
  },
  image: {
    type: imageSchema,
    required: false,
    //TODO : add default image
    default: { alt: "", url: "" },
  },
  address: { type: addressSchema, required: true },
});

export default cardSchema;
