import { Schema } from "mongoose";
import { IName, IUser } from "../../@types/user";
import { nameSchema } from "./name-schema";
import imageSchema from "./image-schema";
import { addressSchema } from "./address-schema";
//Defining schema for mongoose. We set the structure of schema

const userSchema = new Schema<IUser>({
  name: nameSchema,
  //TODO: add default picture
  image: { type: imageSchema, required: false, default: { alt: "", url: "" } },
  address: addressSchema,
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
  password: {
    required: true,
    type: String,
    minlength: 7,
    maxlength: 100,
  },
  isAdmin: {
    type: Boolean,
    required: false,
    default: false,
  },
  isBusiness: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    required: false,
    default: new Date(),
  },
});
export default userSchema;
