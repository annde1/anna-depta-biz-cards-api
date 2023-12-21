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
    default: {
      alt: "People",
      url: "https://img.freepik.com/free-vector/people-analyzing-growth-charts_23-2148866843.jpg?w=1380&t=st=1702916299~exp=1702916899~hmac=6b95e1dba15ac5d47c9e0ae5937febe8eae6137783ad4236f83f87b9c8c0eee6",
    },
  },
  address: { type: addressSchema, required: true },
  userId: { type: String, required: true, default: "Unknown" },
  bizNumber: {
    type: Number,
    required: false,
    default: () => Math.round(Math.random() * 1_000_000),
    unique: true,
  },
  createdAt: {
    type: Date,
    required: false,
    default: new Date(),
  },
  likes: [
    {
      type: String,
    },
  ],
});

export default cardSchema;
