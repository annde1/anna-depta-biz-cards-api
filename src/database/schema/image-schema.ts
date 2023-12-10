import { Schema } from "mongoose";
import { IImage } from "../../@types/user";

const imageSchema = new Schema<IImage>({
  alt: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  url: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 200,
  },
});

export default imageSchema;
