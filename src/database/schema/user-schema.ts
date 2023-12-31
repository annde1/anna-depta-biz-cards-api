import { Schema } from "mongoose";
import { IUser } from "../../@types/user";
import { nameSchema } from "./name-schema";
import imageSchema from "./image-schema";
import { addressSchema } from "./address-schema";

//Defining schema for mongoose. We set the structure of schema

const userSchema = new Schema<IUser>({
  name: { type: nameSchema, required: true },

  image: {
    type: imageSchema,
    required: false,
    default: {
      alt: "Profile Photo",
      url: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=1380&t=st=1702918445~exp=1702919045~hmac=ee2f8dfe9eb287d13ca1d372dbbdd0824aef11a2eb0ebe675fc657e15206db2f",
    },
  },
  address: { type: addressSchema, required: true },
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
  failedloginAttempts: {
    type: [Date],
    required: false,
    default: [],
  },
  releaseDate: {
    type: Date,
    required: false,
    default: new Date(),
  },
});
export default userSchema;
