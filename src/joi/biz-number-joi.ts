import Joi from "joi";
const schema = Joi.object({
  bizNumber: Joi.number().min(1).max(1_000_000).required(),
});
export { schema as JoiBizNumberSchema };
